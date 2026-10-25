
import { TEMPLATES, PALETTES, COLOR_PAIRS } from './templates.js';
import { money } from './dom.js';

const PRUNE = 8, CHEAPEST = 2, OPTIONAL_MIN = 2, POOL_LIMIT = 400;
export const SLOT_ORDER = ['top', 'bottom', 'onepiece', 'layer', 'shoes', 'accessory'];

const colorHit = (it, c) => it.colors.includes(c) || it.colorFamily === c;

export function matchesSpec(it, spec) {
  return Object.entries(spec).every(([f, vals]) => {
    const v = it[f];
    return Array.isArray(v) ? v.some(x => vals.includes(x)) : vals.includes(v);
  });
}

const colorOk = (it, colors) => !colors || !colors.length || colors.some(c => colorHit(it, c));

export const hitsExclusion = (it, ex) =>
  (!ex.slot || ex.slot === it.category) && (!ex.match || matchesSpec(it, ex.match)) && colorOk(it, ex.colors);

export const meetsRequirement = (it, r) =>
  it.category === r.slot && matchesSpec(it, r.match) && colorOk(it, r.colors);

export const newCents = items => items.reduce((s, i) => s + (i.owned ? 0 : i.priceCents), 0);

const inPalette = (it, p) => (PALETTES[p] ? PALETTES[p].includes(it.colors[0]) || PALETTES[p].includes(it.colorFamily) : colorHit(it, p));
const paired = (a, b) => COLOR_PAIRS.some(([x, y]) => (colorHit(a, x) && colorHit(b, y)) || (colorHit(a, y) && colorHit(b, x)));
const budgetOf = p => (p.noBudget || p.budgetCents == null ? Infinity : p.budgetCents);
const byScoreThenId = (a, b) => b[1] - a[1] || (a[0].id < b[0].id ? -1 : 1);

function itemScore(it, prefs, tpl) {
  let s = 0;
  for (const st of prefs.styles) if (it.styles.includes(st)) s += 2;
  if (tpl.styles.some(x => it.styles.includes(x))) s += 1;
  if (prefs.seasons.length) s += prefs.seasons.some(x => it.seasons.includes(x)) ? 2 : -3;
  if (prefs.fit.includes(it.fit)) s += 1;
  for (const p of prefs.palette) if (inPalette(it, p)) s += 2;
  if (PALETTES[tpl.palette] && inPalette(it, tpl.palette)) s += 1;
  if (tpl.sil[it.category]?.includes(it.silhouette)) s += 1.5;
  const pf = tpl.prefer?.[it.category];
  if (pf && matchesSpec(it, pf)) s += 1.5;
  if (it.formality >= tpl.form[0] && it.formality <= tpl.form[1]) s += 1;

  const weather = prefs.weather;
  const material = String(it.material || '').toLowerCase();
  const features = it.features || [];

  if (weather === 'hot') {
    if (it.seasons.includes('summer')) s += 2;
    if (/linen|cotton|mesh|breathable/.test(material) || features.includes('breathable')) s += 1.5;
    if (/fleece|wool|heavy|thermal|puffer/.test(`${material} ${it.subtype}`)) s -= 2;
  } else if (weather === 'warm') {
    if (it.seasons.includes('spring') || it.seasons.includes('summer')) s += 1.5;
    if (it.category === 'layer' && !/lightweight|windbreaker|linen/.test(it.subtype)) s -= .5;
  } else if (weather === 'cool') {
    if (it.seasons.includes('fall') || it.seasons.includes('spring')) s += 1.5;
    if (it.category === 'layer') s += 2;
  } else if (weather === 'cold') {
    if (it.seasons.includes('winter')) s += 2;
    if (it.category === 'layer') s += 3;
    if (/fleece|wool|knit|thermal/.test(material)) s += 1.5;
    if (it.category === 'sandals') s -= 3;
  } else if (weather === 'rainy') {
    if (it.category === 'layer') s += 2;
    if (features.includes('water-resistant') || /water-resistant|waterproof/.test(material)) s += 5;
    if (/nylon/.test(material)) s += 1;
    if (it.type === 'sandals' || it.type === 'slides') s -= 2;
  }

  return s;
}

function comboScore(items, prefs, tpl) {
  let s = items.reduce((a, i) => a + itemScore(i, prefs, tpl), 0);
  s += 3 * prefs.styles.filter(x => tpl.styles.includes(x)).length;
  if (prefs.seasons.some(x => tpl.seasons.includes(x))) s += 2;

  const by = Object.fromEntries(items.map(i => [i.category, i]));
  const main = by.top || by.onepiece;

  if (main && by.bottom && paired(main, by.bottom)) s += 3;
  if (by.bottom && by.shoes && paired(by.bottom, by.shoes)) s += 1;
  if (tpl.palette === 'mono') s += new Set(items.map(i => i.colorFamily)).size <= 2 ? 3 : -2;

  const f = items.map(i => i.formality);
  s -= 2 * (Math.max(...f) - Math.min(...f));
  s -= newCents(items) / 20000;

  return Math.round(s * 1000) / 1000;
}

function pool(prefs, catalog) {
  const available = prefs.ownedOnly ? [...(prefs.owned || [])] : [...catalog.filter(i => !i.owned), ...(prefs.owned || [])];
  return available.filter(it => !prefs.excludes.some(ex => hitsExclusion(it, ex)));
}

function slotCandidates(slot, items, prefs, tpl) {
  const lock = prefs.locks[slot];
  if (lock) return [lock];

  let list = items.filter(i => i.category === slot);
  const mine = list.filter(i => i.owned);
  if (mine.length) list = mine;

  const slotRequirements = prefs.requires.filter(r => r.slot === slot);
  if (slotRequirements.length) {
  list = list.filter(item => slotRequirements.some(requirement => meetsRequirement(item, requirement)));
}

  const ranked = list.map(i => [i, itemScore(i, prefs, tpl)]).sort(byScoreThenId).map(x => x[0]);
  const keep = new Set(ranked.slice(0, PRUNE));

  [...ranked].sort((a, b) => a.priceCents - b.priceCents || (a.id < b.id ? -1 : 1)).slice(0, CHEAPEST).forEach(i => keep.add(i));

  return ranked.filter(i => keep.has(i));
}

function generate(prefs, catalog) {
  const items = pool(prefs, catalog);
  const budget = budgetOf(prefs);
  const locks = prefs.locks;
  const reqSlots = new Set(prefs.requires.map(r => r.slot));
  const found = new Map();

  for (const tpl of TEMPLATES) {
    const one = tpl.kind === 'onepiece';

    if (one && (reqSlots.has('top') || reqSlots.has('bottom') || locks.top || locks.bottom)) continue;
    if (!one && (reqSlots.has('onepiece') || locks.onepiece)) continue;

    const need = one ? ['onepiece'] : ['top', 'bottom'];
    const ownsShoes = items.some(i => i.owned && i.category === 'shoes');

    if (prefs.mode !== 'clothes' || locks.shoes || reqSlots.has('shoes') || ownsShoes) need.push('shoes');

    const optional = [];

    for (const s of ['layer', 'accessory']) {
      if (reqSlots.has(s) || locks[s]) need.push(s);
      else if (tpl.optional.includes(s)) optional.push(s);
    }

    const lists = need.map(s => slotCandidates(s, items, prefs, tpl));
    if (lists.some(l => !l.length)) continue;

    const optLists = optional.map(s => slotCandidates(s, items, prefs, tpl));

    const finish = (acc, base) => {
      const chosen = [...acc];
      let cost = base;

      for (const l of optLists) {
        const pick = l.find(it => cost + (it.owned ? 0 : it.priceCents) <= budget && itemScore(it, prefs, tpl) >= OPTIONAL_MIN);
        if (pick) {
          chosen.push(pick);
          cost += pick.owned ? 0 : pick.priceCents;
        }
      }

      const key = chosen.map(i => i.id).sort().join('+');
      const score = comboScore(chosen, prefs, tpl);
      const prev = found.get(key);

      if (!prev || score > prev.score) {
        found.set(key, {
          key,
          tplId: tpl.id,
          score,
          cents: cost,
          baseCents: base,
          items: Object.fromEntries(chosen.map(i => [i.category, i]))
        });
      }
    };

    const walk = (d, acc, cost) => {
      if (cost > budget) return;
      if (d === need.length) return finish(acc, cost);

      for (const it of lists[d]) {
        walk(d + 1, [...acc, it], cost + (it.owned ? 0 : it.priceCents));
      }
    };

    walk(0, [], 0);
  }

  return [...found.values()].sort((a, b) => b.score - a.score || (a.key < b.key ? -1 : 1));
}

function explain(c, prefs) {
  const tpl = TEMPLATES.find(t => t.id === c.tplId);
  const items = Object.values(c.items);
  const why = [tpl.note];

  for (const r of prefs.requires) why.push(`Includes ${r.label.replace(/^Required: /, '')}.`);

  const seasons = prefs.seasons.filter(s => items.every(i => i.seasons.includes(s)));
  if (seasons.length) why.push(`Every piece is tagged for ${seasons.join(' and ')}.`);

  const styles = prefs.styles.filter(s => items.some(i => i.styles.includes(s)));
  if (styles.length) why.push(`Style tags matched: ${styles.join(', ')}.`);

  for (const i of items) {
    if (i.owned) why.push(`Uses what you already own: ${i.name.replace(/^Your /, '')}.`);
  }

  const b = budgetOf(prefs);

  if (prefs.weather) {
    why.push(`Weather preference applied: ${({hot:'hot weather',warm:'warm weather',cool:'cool weather',cold:'cold weather',rainy:'rainy weather'})[prefs.weather] || prefs.weather}; this is a manual estimate, not a live forecast.`);
  }

  if (prefs.ownedOnly) why.push('Closet-only mode: every piece comes from your owned items.');
  if (b !== Infinity) why.push(`${money(b - c.cents)} under your ${money(b)} item budget.`);

  return why;
}

function toOutfit(c, prefs) {
  const tpl = TEMPLATES.find(t => t.id === c.tplId);

  return {
    id: c.key,
    tplId: c.tplId,
    tplName: tpl.name,
    items: c.items,
    newCents: c.cents,
    score: c.score,
    why: explain(c, prefs)
  };
}

function select(combos, count) {
  const pool = combos.slice(0, POOL_LIMIT);
  const picked = [];

  const shared = (a, b) => Object.values(a.items).filter(i => !i.owned && b.items[i.category]?.id === i.id && !(a.lockedIds?.has(i.id))).length;

  while (picked.length < count && pool.length) {
    let best = 0, bs = -Infinity;

    pool.forEach((c, i) => {
      const adj = c.score - picked.reduce((a, p) => a + 4 * shared(c, p) + (p.tplId === c.tplId ? 1.5 : 0), 0);
      if (adj > bs + 1e-9) {
        bs = adj;
        best = i;
      }
    });

    picked.push(pool.splice(best, 1)[0]);
  }

  return picked;
}

function diagnose(prefs, catalog) {
  const items = pool(prefs, catalog);
  const budget = budgetOf(prefs);
  const drops = prefs.requires.map(r => ({ type: 'drop-require', label: r.label, key: `require:${r.label}` }));

  for (const r of prefs.requires) {
    if (!items.some(i => meetsRequirement(i, r))) {
      return { message: `There is nothing in the current catalog that matches "${r.label.replace(/^Required: /, '')}".`, actions: drops };
    }
  }

  const lockCost = newCents(Object.values(prefs.locks));

  if (budget !== Infinity && lockCost > budget) {
    return {
      message: 'Your locked items already exceed your budget.',
      actions: [{ type: 'clear-locks' }, { type: 'set-budget', cents: lockCost }]
    };
  }

  const free = generate({ ...prefs, budgetCents: null, noBudget: true }, catalog);

  if (!free.length) {
    return {
      message: 'No complete outfit can be built from these requirements, exclusions, locks and owned items together.',
      actions: [...drops, { type: 'clear-locks' }]
    };
  }

  const min = Math.min(...free.map(c => c.baseCents));

  return {
    message: `No complete outfit in this catalog fits your ${money(budget)} budget. The lowest achievable item subtotal for these constraints is ${money(min)}.`,
    minCents: min,
    actions: [{ type: 'set-budget', cents: min }, ...drops]
  };
}

export function buildOutfits(prefs, catalog, count = 3) {
  const p = { ...prefs, locks: prefs.locks || {}, owned: prefs.owned || [] };
  const combos = generate(p, catalog);

  if (!combos.length) return { outfits: [], total: 0, noMatch: diagnose(p, catalog) };

  const lockedIds = new Set(Object.values(p.locks).map(i => i.id));
  combos.forEach(c => { c.lockedIds = lockedIds; });

  return { outfits: select(combos, count).map(c => toOutfit(c, p)), total: combos.length, noMatch: null };
}

export function alternatives(outfit, slot, prefs, catalog, limit = 8) {
  const locks = prefs.locks || {};
  if (locks[slot]) return { error: 'This item is locked. Unlock it to swap.', list: [] };

  const tpl = TEMPLATES.find(t => t.id === outfit.tplId);
  const others = Object.entries(outfit.items).filter(([s]) => s !== slot).map(e => e[1]);
  const budget = budgetOf(prefs);
  const p = { ...prefs, locks, owned: prefs.owned || [] };

  let list = pool(p, catalog).filter(i => i.category === slot && i.id !== outfit.items[slot]?.id);

  for (const r of p.requires) {
    if (r.slot === slot) list = list.filter(i => meetsRequirement(i, r));
  }

  list = list.filter(i => newCents(others) + (i.owned ? 0 : i.priceCents) <= budget);

  const ranked = list.map(i => [i, comboScore([...others, i], p, tpl)]).sort(byScoreThenId).slice(0, limit).map(x => x[0]);

  return { error: null, list: ranked };
}

export function swapItem(outfit, slot, item, prefs) {
  if ((prefs.locks || {})[slot]) return { error: 'This item is locked.', outfit };

  const items = { ...outfit.items, [slot]: item };
  const cents = newCents(Object.values(items));

  if (cents > budgetOf(prefs)) return { error: 'That swap would go over budget.', outfit };

  const tpl = TEMPLATES.find(t => t.id === outfit.tplId);
  const p = { ...prefs, locks: prefs.locks || {}, owned: prefs.owned || [] };
  const c = {
    key: Object.values(items).map(i => i.id).sort().join('+'),
    tplId: outfit.tplId,
    items,
    cents,
    score: comboScore(Object.values(items), p, tpl)
  };

  return { error: null, outfit: toOutfit(c, p) };
}
