
import { COLOR_HEX, DEMO_CATALOG, CATEGORIES, importCatalog, exportCatalog, validateItem, normalizeItem, safeUrl, EXAMPLE_ITEM, familyOf } from './catalog.js';
import { parse, chipsOf, applyDismissed, detectBudgetConflict, mergePrefs } from './parser.js';
import { buildOutfits, alternatives, swapItem, SLOT_ORDER } from './outfitEngine.js';
import { load, save, packOutfit, resolveSaved, storageAvailable } from './storage.js';
import { illustrate } from './illustrations.js';
import { h, money } from './dom.js';

const $ = id => document.getElementById(id);

const EXAMPLES = [
  'Summery outfit with barrel jeans and a white button-up under $100.',
  'Minimal black and white outfit under $70, no sandals.',
  'Earthy casual outfit with olive trousers and a cream top.',
  'I own white sneakers. Give me a relaxed outfit under $60.',
  'Smart casual with a navy button-up and beige trousers.',
  'Red barrel jeans and a purple linen shirt under $10.'
];

const state = {
  budget: 10000,
  touched: false,
  ignoredTextBudget: null,
  dismissed: new Set(),
  count: 3,
  owned: load('fw.owned', []).filter(o => o && typeof o.id === 'string' && Array.isArray(o.colors)),
  custom: load('fw.custom', []).filter(i => validateItem(i).length === 0).map(normalizeItem),
  saved: load('fw.saved', []),
  plan: load('fw.plan', []),
  locks: {},
  outfits: [],
  prefs: null,
  swap: null
};

const catalog = () => [...DEMO_CATALOG, ...state.custom];
const say = msg => { $('status').textContent = msg; };

let toastTimer;

function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

const paintRange = () => {
  const r = $('budget-range');
  r.style.setProperty('--pct', `${(r.value / r.max) * 100}%`);
};

function readBudget() {
  const raw = $('budget-num').value.trim();
  const n = Number(raw);
  const err = $('budget-err');

  if (raw === '' || !Number.isFinite(n) || n < 0 || n > 10000) {
    err.hidden = false;
    err.textContent = 'Enter a budget between $0 and $10,000.';
    return null;
  }

  err.hidden = true;
  return Math.round(n * 100);
}

function setBudget(cents) {
  state.budget = cents;
  $('budget-num').value = String(cents / 100);
  $('budget-range').value = String(Math.min(300, cents / 100));
  paintRange();
}

function notice(content, warn) {
  $('notices').appendChild(h('div', {
    class: 'notice' + (warn ? ' warn' : ''),
    role: warn ? 'alert' : null
  }, content));
}

function run() {
  $('notices').textContent = '';

  const cents = readBudget();
  if (cents == null) return;

  const text = $('desc').value;
  const parsed = parse(text);

  if (detectBudgetConflict(parsed.budgetCents, cents) && parsed.budgetCents !== state.ignoredTextBudget) {
    if (!state.touched) setBudget(parsed.budgetCents);
    else return askBudget(parsed.budgetCents, cents);
  } else {
    state.budget = cents;
  }

  parsed.warnings.forEach(w => notice(w));

  const p = applyDismissed(parsed, state.dismissed);
  renderChips(parsed, p);

  if (!text.trim()) {
    notice('No description yet, so these are general outfits for your budget and filters.');
  } else if (parsed.unmatched.length) {
    notice('I matched these supported preferences. You can refine them below. Words I did not recognize: ' + parsed.unmatched.join(', ') + '.');
  }

  state.prefs = mergePrefs(p, {
    budgetCents: state.budget,
    season: $('p-season').value,
    style: $('p-style').value,
    mode: $('p-mode').value,
    owned: state.owned,
    locks: state.locks,
    weather: $('p-weather').value,
    ownedOnly: $('p-owned-only').checked
  });

  const res = buildOutfits(state.prefs, catalog(), state.count);

  state.outfits = res.outfits;
  state.swap = null;

  renderLocks();
  renderOutfits(res);

  say(res.outfits.length ? `${res.outfits.length} outfits built.` : 'No matching outfit found.');
}

function askBudget(textCents, controlCents) {
  const choose = (c, ignore) => () => {
    if (ignore) state.ignoredTextBudget = textCents;
    setBudget(c);
    state.touched = !!ignore;
    run();
  };

  notice([
    h('p', null, `Your description says ${money(textCents)}, but the budget control is ${money(controlCents)}. Which should I use?`),
    h('div', { class: 'row' },
      h('button', {
        class: 'secondary',
        type: 'button',
        on: { click: choose(textCents, false) }
      }, `Use ${money(textCents)} from the text`),
      h('button', {
        class: 'secondary',
        type: 'button',
        on: { click: choose(controlCents, true) }
      }, `Keep ${money(controlCents)} from the control`)
    )
  ], true);

  $('outfits').textContent = '';
}

function renderChips(all, active) {
  const box = $('chips');
  box.textContent = '';

  const live = new Set(chipsOf(active).map(c => c.key));

  for (const c of chipsOf(all)) {
    const off = !live.has(c.key);

    box.appendChild(h('span', {
      class: 'chip',
      style: off ? 'opacity:.5;text-decoration:line-through' : null
    },
      c.label,
      h('button', {
        type: 'button',
        'aria-label': `${off ? 'Restore' : 'Remove'}: ${c.label}`,
        on: {
          click: () => {
            if (off) state.dismissed.delete(c.key);
            else state.dismissed.add(c.key);
            run();
          }
        }
      }, off ? '+' : '×')
    ));
  }

  const b = active.noBudget ? 'no limit' : money(state.budget);
  box.appendChild(h('span', { class: 'chip' }, `Budget: ${b}`, h('span', { style: 'width:.5rem' })));
}

function renderLocks() {
  const box = $('locks');
  box.textContent = '';

  const slots = Object.keys(state.locks);
  if (!slots.length) return;

  box.appendChild(h('p', { class: 'fine' },
    'Locked: ' + slots.map(s => state.locks[s].name).join(', '),
    ' ',
    h('button', {
      class: 'secondary',
      type: 'button',
      on: {
        click: () => {
          state.locks = {};
          run();
        }
      }
    }, 'Clear locks')
  ));
}

function itemTag(it) {
  if (it.owned) return h('span', { class: 'meta' }, 'Already owned');
  if (it.isDemo) return h('span', { class: 'meta' }, 'Demo item — illustrative price.');

  return h('span', { class: 'meta' }, [
    it.retailer || 'Custom item',
    it.priceCheckedAt ? ` · price checked ${it.priceCheckedAt}` : '',
    it.sizes && it.sizes.length ? ` · sizes recorded: ${it.sizes.join(', ')}` : ''
  ]);
}

function pieceCard(outfit, slot) {
  const it = outfit.items[slot];
  const locked = state.locks[slot]?.id === it.id;

  return h('figure', {
    class: 'piece',
    style: `--tint:${COLOR_HEX[it.colors[0]] || '#bdb7aa'}`
  },
    h('div', { class: 'swatch' },
      h('span', { class: 'slot' }, slot === 'onepiece' ? 'one-piece' : slot),
      illustrate(it)
    ),
    h('figcaption', null,
      h('div', { class: 'name' }, it.name),
      h('div', null, it.owned ? 'Already owned — $0' : money(it.priceCents)),
      itemTag(it),
      !it.isDemo && !it.owned && safeUrl(it.productUrl)
        ? h('a', {
            href: it.productUrl,
            target: '_blank',
            rel: 'noopener noreferrer'
          }, 'View product')
        : null
    ),
    h('div', { class: 'btns' },
      h('button', {
        type: 'button',
        'aria-pressed': locked,
        on: {
          click: () => {
            if (locked) delete state.locks[slot];
            else state.locks[slot] = it;
            run();
          }
        }
      }, locked ? 'Unlock' : 'Lock'),
      h('button', {
        type: 'button',
        disabled: locked,
        'aria-expanded': state.swap?.id === outfit.id && state.swap?.slot === slot,
        on: {
          click: () => {
            const isOpen = state.swap?.id === outfit.id && state.swap?.slot === slot;
            state.swap = isOpen ? null : { id: outfit.id, slot };
            renderOutfits({ outfits: state.outfits });

            if (state.swap) {
              say(`Choose a replacement for ${slot}.`);
              requestAnimationFrame(() => document.querySelector('.swap')?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
              }));
            }
          }
        }
      }, state.swap?.id === outfit.id && state.swap?.slot === slot ? 'Close swap' : 'Swap')
    )
  );
}

function renderOutfits(res) {
  const box = $('outfits');
  box.textContent = '';
  $('more').hidden = !res.outfits || res.outfits.length < state.count;
  $('clear-outfits').hidden = !state.outfits.length;

  if (!state.outfits.length) {
    box.appendChild(h('div', { class: 'empty' },
      h('p', null,
        h('strong', null, 'No outfits displayed.'),
        'Enter a prompt and build new outfits whenever you are ready.'
      )
    ));
    return;
  }

  if (res.noMatch) return renderNoMatch(res.noMatch);

  state.outfits.forEach((o, idx) => {
    const budget = state.prefs.noBudget ? null : state.prefs.budgetCents;
    const slots = SLOT_ORDER.filter(s => o.items[s]);
    const pct = budget ? Math.min(100, Math.round((o.newCents / budget) * 100)) : 0;

    const card = h('article', { class: 'outfit', style: `--i:${idx}` },
      h('header', null,
        h('h3', null, o.tplName),
        h('button', {
          class: 'secondary',
          type: 'button',
          on: { click: () => saveOutfit(o) }
        }, 'Save outfit')
      ),
      h('div', { class: 'plan-picker' },
        h('label', { for: `plan-day-${idx}` }, 'Plan for'),
        h('select', {
          id: `plan-day-${idx}`,
          'aria-label': 'Day to plan this outfit'
        }, ...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d =>
          h('option', { value: d }, d)
        )),
        h('button', {
          class: 'secondary',
          type: 'button',
          on: {
            click: () => planOutfit(o, $(`plan-day-${idx}`).value)
          }
        }, 'Add to week')
      ),
      h('div', { class: 'board' }, slots.map(s => pieceCard(o, s))),
      h('div', { class: 'totals' },
        h('span', null, 'Item subtotal: ', h('strong', null, money(o.newCents))),
        budget != null
          ? h('span', null, 'Remaining: ', h('strong', null, money(budget - o.newCents)))
          : null
      ),
      budget != null
        ? h('div', {
            class: 'meter',
            role: 'img',
            'aria-label': `${pct}% of budget used`
          }, h('span', { style: `--w:${pct}%` }))
        : null,
      h('p', { class: 'fine' }, 'Item subtotal; tax and shipping not included. Only new purchases are counted.'),
      h('ul', { class: 'why' }, o.why.map(w => h('li', null, w)))
    );

    if (state.swap && state.swap.id === o.id) {
      card.appendChild(swapPanel(o, state.swap.slot));
    }

    box.appendChild(card);
  });
}

function swapPanel(o, slot) {
  const { list, error } = alternatives(o, slot, state.prefs, catalog());

  return h('div', { class: 'swap' },
    h('strong', null, `Alternatives for ${slot}`),
    error ? h('p', { class: 'error' }, error) : null,
    !error && !list.length
      ? h('p', null, 'No alternatives fit while the other pieces and your constraints stay as they are.')
      : null,
    h('ul', { class: 'plain' }, list.map(it =>
      h('li', null,
        h('span', null, `${it.name} — ${it.owned ? 'owned' : money(it.priceCents)}`),
        h('button', {
          class: 'secondary',
          type: 'button',
          on: {
            click: () => {
              const r = swapItem(o, slot, it, state.prefs);
              if (!r.error) {
                state.outfits = state.outfits.map(x => x.id === o.id ? r.outfit : x);
              }
              state.swap = null;
              renderOutfits({ outfits: state.outfits });
              say(`Swapped ${slot}.`);
            }
          }
        }, 'Use this')
      )
    )),
    h('button', {
      class: 'secondary',
      type: 'button',
      on: {
        click: () => {
          state.swap = null;
          renderOutfits({ outfits: state.outfits });
        }
      }
    }, 'Cancel')
  );
}

function renderNoMatch(nm) {
  const row = h('div', { class: 'row' });

  for (const a of nm.actions) {
    if (a.type === 'set-budget') {
      row.appendChild(h('button', {
        class: 'secondary',
        type: 'button',
        on: {
          click: () => {
            setBudget(a.cents);
            state.touched = true;
            run();
          }
        }
      }, `Raise budget to ${money(a.cents)}`));
    }

    if (a.type === 'drop-require') {
      row.appendChild(h('button', {
        class: 'secondary',
        type: 'button',
        on: {
          click: () => {
            state.dismissed.add(a.key);
            run();
          }
        }
      }, `Remove requirement: ${a.label.replace(/^Required: /, '')}`));
    }

    if (a.type === 'clear-locks') {
      row.appendChild(h('button', {
        class: 'secondary',
        type: 'button',
        on: {
          click: () => {
            state.locks = {};
            run();
          }
        }
      }, 'Clear locks'));
    }
  }

  $('outfits').appendChild(h('div', { class: 'notice warn', role: 'alert' },
    h('p', null, nm.message),
    row,
    h('p', { class: 'fine' }, 'Nothing was substituted and nothing goes over budget. You can also browse individual items under Catalog tools.')
  ));
}

function saveOutfit(o) {
  state.saved = [packOutfit(o), ...state.saved].slice(0, 50);
  save('fw.saved', state.saved);
  renderSaved();
  say('Outfit saved.');
  toast('Outfit saved');
}

function renderSaved() {
  const box = $('saved');
  box.textContent = '';

  if (!storageAvailable()) {
    box.appendChild(h('p', { class: 'fine' }, 'Browser storage is unavailable, so saves last only until you close this page.'));
  }

  const list = resolveSaved(state.saved, catalog());

  if (!list.length) {
    return box.appendChild(h('p', { class: 'fine' }, 'Nothing saved yet.'));
  }

  for (const s of list) {
    const total = Object.values(s.items).reduce((a, i) => a + (i.owned ? 0 : i.priceCents), 0);

    box.appendChild(h('div', { class: 'notice' },
      h('strong', null, s.tplName || 'Saved outfit'),
      ` — ${money(total)} new items`,
      h('ul', { class: 'plain' }, [
        ...Object.entries(s.items).map(([, i]) => h('li', null, i.name)),
        ...s.missing.map(m => h('li', { class: 'error' }, `${m}: item no longer in the catalog`))
      ]),
      h('button', {
        class: 'secondary',
        type: 'button',
        on: {
          click: () => {
            state.saved = state.saved.filter(x => x.id !== s.id);
            save('fw.saved', state.saved);
            renderSaved();
          }
        }
      }, 'Remove')
    ));
  }
}

function renderOwned() {
  const ul = $('owned-list');
  ul.textContent = '';

  for (const o of state.owned) {
    const price = Number(o.purchasePriceCents || 0);
    const wears = Math.max(0, Number(o.wears || 0));
    const cpw = price > 0 && wears > 0 ? money(Math.round(price / wears)) : null;

    ul.appendChild(h('li', null,
      h('span', null,
        `${o.name} (${o.category}, ${o.colors[0]})`,
        h('small', { class: 'owned-meta' },
          price > 0
            ? ` · paid ${money(price)} · ${wears} wears${cpw ? ` · ${cpw}/wear` : ' · add wears to calculate cost per wear'}`
            : ` · ${wears} wears`
        )
      ),
      h('span', { class: 'owned-actions' },
        h('button', {
          class: 'secondary',
          type: 'button',
          on: { click: () => updateWear(o.id, 1) }
        }, 'Mark worn'),
        h('button', {
          class: 'secondary',
          type: 'button',
          on: {
            click: () => {
              state.owned = state.owned.filter(x => x.id !== o.id);
              save('fw.owned', state.owned);
              renderOwned();
              renderImpact();
              renderPlan();
              if (state.prefs) run();
            }
          }
        }, 'Remove')
      )
    ));
  }

  if (!state.owned.length) {
    ul.appendChild(h('li', { class: 'fine' }, 'Add a few real items from your closet to unlock closet-only outfits and wardrobe insights.'));
  }
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function updateWear(id, amount = 1) {
  state.owned = state.owned.map(o => o.id === id
    ? { ...o, wears: Math.max(0, Number(o.wears || 0) + amount) }
    : o
  );

  save('fw.owned', state.owned);
  renderOwned();
  renderImpact();
}

function planOutfit(outfit, day) {
  const entry = {
    id: `plan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    day,
    tplName: outfit.tplName,
    items: Object.fromEntries(Object.entries(outfit.items).map(([slot, it]) => [
      slot,
      { id: it.id, name: it.name, owned: !!it.owned, priceCents: it.priceCents || 0 }
    ])),
    plannedAt: new Date().toISOString()
  };

  state.plan = [entry, ...state.plan.filter(p => p.day !== day)]
    .sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day));

  save('fw.plan', state.plan);
  renderPlan();
  toast(`${day}'s outfit planned.`);
  say(`${day}'s outfit added to your weekly plan.`);
}

function renderPlan() {
  const box = $('planner');
  if (!box) return;

  box.textContent = '';

  if (!state.plan.length) {
    return box.appendChild(h('p', { class: 'fine' }, 'Your week is empty. Generate an outfit and choose a day to plan it.'));
  }

  for (const p of [...state.plan].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day))) {
    const items = Object.values(p.items || {});
    const total = items.reduce((sum, it) => sum + (it.owned ? 0 : Number(it.priceCents || 0)), 0);

    box.appendChild(h('div', { class: 'plan-row' },
      h('span', { class: 'plan-day' }, p.day),
      h('span', { class: 'plan-detail' },
        h('strong', null, p.tplName),
        h('small', null, `${items.map(i => i.name).join(' · ')} · ${money(total)} new-item estimate`)
      ),
      h('span', { class: 'plan-actions' },
        h('button', {
          class: 'secondary',
          type: 'button',
          on: { click: () => markPlanWorn(p) }
        }, 'Mark worn'),
        h('button', {
          class: 'secondary',
          type: 'button',
          on: {
            click: () => {
              state.plan = state.plan.filter(x => x.id !== p.id);
              save('fw.plan', state.plan);
              renderPlan();
            }
          }
        }, 'Remove')
      )
    ));
  }
}

function markPlanWorn(plan) {
  const ids = new Set(Object.values(plan.items || {}).filter(i => i.owned).map(i => i.id));

  state.owned = state.owned.map(o => ids.has(o.id)
    ? { ...o, wears: Math.max(0, Number(o.wears || 0)) + 1 }
    : o
  );

  save('fw.owned', state.owned);
  renderOwned();
  renderImpact();
  toast('Wear counts updated for owned items.');
}

function renderImpact() {
  const box = $('impact-stats');
  if (!box) return;

  box.textContent = '';

  const owned = state.owned.length;
  const priced = state.owned.filter(o => Number(o.purchasePriceCents) > 0);
  const totalWears = state.owned.reduce((n, o) => n + Math.max(0, Number(o.wears || 0)), 0);
  const avg = priced.filter(o => Number(o.wears) > 0).map(o => Number(o.purchasePriceCents) / Number(o.wears));
  const mean = avg.length ? Math.round(avg.reduce((a, b) => a + b, 0) / avg.length) : null;

  const stats = [
    [owned, 'items in your closet'],
    [totalWears, 'logged wears'],
    [priced.length ? `${priced.length}/${owned}` : '—', 'items with purchase prices'],
    [mean != null ? money(mean) : '—', 'average cost per wear']
  ];

  for (const [value, label] of stats) {
    box.appendChild(h('div', { class: 'impact-stat' },
      h('strong', null, String(value)),
      h('span', null, label)
    ));
  }
}

const csv = s => String(s || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean);

function renderCatalog() {
  const cat = $('f-cat').value;
  const ty = $('f-type').value.trim().toLowerCase();
  const co = $('f-color').value.trim().toLowerCase();
  const max = $('f-price').value === '' ? Infinity : Number($('f-price').value) * 100;
  const ul = $('catalog-list');

  ul.textContent = '';

  const rows = catalog().filter(i =>
    (!cat || i.category === cat) &&
    (!ty || `${i.type} ${i.subtype}`.toLowerCase().includes(ty)) &&
    (!co || i.colors.some(c => c.includes(co))) &&
    i.priceCents <= max
  );

  rows.slice(0, 120).forEach(i => {
    ul.appendChild(h('li', null,
      h('span', null, i.name, i.isDemo ? '' : ' (custom)'),
      h('span', null, money(i.priceCents))
    ));
  });

  if (!rows.length) {
    ul.appendChild(h('li', null, 'No items match these filters.'));
  }
}

const toolMsg = (m, ok) => {
  const e = $('tools-msg');
  e.textContent = m;
  e.style.color = ok ? 'inherit' : '';
};

function addCustom(items) {
  const ids = new Set(items.map(i => i.id));
  state.custom = [...state.custom.filter(i => !ids.has(i.id)), ...items];
  save('fw.custom', state.custom);
  renderCatalog();
  renderSaved();
}

function download(name, text) {
  const a = h('a', {
    href: URL.createObjectURL(new Blob([text], { type: 'application/json' })),
    download: name
  });

  document.body.appendChild(a);
  a.click();
  a.remove();
}

function init() {
  $('examples').append(...EXAMPLES.map(t => h('button', {
    type: 'button',
    on: {
      click: () => {
        $('desc').value = t;
        $('desc').focus();
        state.dismissed.clear();
        run();
      }
    }
  }, t)));

  const cats = CATEGORIES.map(c => h('option', { value: c }, c));
  $('f-cat').append(...cats.map(o => o.cloneNode(true)));
  $('c-cat').append(...cats);

  $('budget-range').addEventListener('input', e => {
    paintRange();
    state.touched = true;
    $('budget-num').value = e.target.value;
  });

  $('budget-num').addEventListener('input', e => {
    state.touched = true;
    const n = Number(e.target.value);

    if (Number.isFinite(n)) {
      $('budget-range').value = String(Math.min(300, Math.max(0, n)));
      paintRange();
    }
  });

  $('build').addEventListener('click', () => {
    state.count = 3;
    state.dismissed.clear();
    run();
  });

  $('more').addEventListener('click', () => {
    state.count += 3;
    run();
  });
  
  $('clear-outfits').addEventListener('click', () => {
  state.outfits = [];
  state.swap = null;
  $('outfits').textContent = '';
  $('outfits').appendChild(h('div', { class: 'empty' },
    h('p', null,
      h('strong', null, 'Outfits cleared.'),
      'Your prompt is still here. Build new outfits whenever you are ready.'
    )
  ));
  $('more').hidden = true;
  $('clear-outfits').hidden = true;
  say('Generated outfits cleared.');
});

  $('desc').addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      state.count = 3;
      run();
    }
  });

  for (const id of ['p-season', 'p-style', 'p-mode', 'p-weather', 'p-owned-only']) {
    $(id).addEventListener('change', () => {
      if (state.prefs) run();
    });
  }

  $('owned-form').addEventListener('submit', e => {
    e.preventDefault();

    const color = $('o-color').value.trim().toLowerCase();

    state.owned.push({
      id: `owned-${Date.now()}`,
      name: $('o-name').value.trim(),
      category: $('o-cat').value,
      type: $('o-type').value.trim().toLowerCase(),
      subtype: $('o-type').value.trim().toLowerCase(),
      silhouette: $('o-sil').value.trim().toLowerCase() || null,
      fit: 'regular',
      colors: [color],
      colorFamily: familyOf(color),
      material: null,
      styles: csv($('o-styles').value),
      seasons: ['spring', 'summer', 'fall', 'winter'],
      formality: 1,
      features: [],
      priceCents: 0,
      owned: true,
      isDemo: false
    });

    save('fw.owned', state.owned);
    e.target.reset();
    renderOwned();
  });

  for (const id of ['f-cat', 'f-type', 'f-color', 'f-price']) {
    $(id).addEventListener('input', renderCatalog);
  }

  $('custom-form').addEventListener('submit', e => {
    e.preventDefault();

    const color = $('c-color').value.trim().toLowerCase();
    const type = $('c-type').value.trim().toLowerCase();
    const dollars = Number($('c-price').value);

    const item = {
      id: `custom-${Date.now()}`,
      name: $('c-name').value.trim(),
      category: $('c-cat').value,
      type,
      subtype: $('c-sub').value.trim().toLowerCase() || type,
      silhouette: null,
      fit: 'regular',
      colors: [color],
      styles: ['casual'],
      seasons: ['spring', 'summer', 'fall', 'winter'],
      formality: 1,
      priceCents: Math.round(dollars * 100),
      currency: 'USD',
      isDemo: false,
      retailer: $('c-retailer').value.trim() || null,
      productUrl: $('c-url').value.trim() || null,
      priceCheckedAt: $('c-date').value || null
    };

    const errs = Number.isFinite(dollars) ? validateItem(item) : ['Enter a valid price.'];

    if (errs.length) return toolMsg(errs.join(' '));

    addCustom([normalizeItem(item)]);
    e.target.reset();
    toolMsg('Item added.', true);
  });

  $('export').addEventListener('click', () => {
    download('lumity-catalog.json', exportCatalog(catalog()));
  });

  $('example-schema').addEventListener('click', () => {
    download('lumity-example-item.json', exportCatalog([EXAMPLE_ITEM]));
  });

  $('import').addEventListener('change', async e => {
    const f = e.target.files[0];
    if (!f) return;

    if (f.size > 2000000) {
      return toolMsg('That file is too large (limit 2 MB).');
    }

    const r = importCatalog(await f.text());

    if (r.errors.length) {
      toolMsg('Import rejected: ' + r.errors.slice(0, 3).join(' | '));
    } else {
      addCustom(r.items);
      toolMsg(`Imported ${r.items.length} items.`, true);
    }

    e.target.value = '';
  });

  renderOwned();
  renderSaved();
  renderCatalog();
  renderPlan();
  renderImpact();
  setBudget(state.budget);
}

init();
