
import { COLOR_HEX } from './catalog.js';

const S = 'stroke="#3a362f" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
const P = (d, f, extra = '') => `<path ${S} fill="${f}" d="${d}" ${extra}/>`;
const L = d => `<path ${S} fill="none" d="${d}"/>`;
const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="1.7" fill="#3a362f"/>`;
const buttons = (x, y0, n, gap) => Array.from({ length: n }, (_, i) => dot(x, y0 + i * gap)).join('');

const SHORT = 'M34 14 L20 20 L8 40 L20 48 L26 40 L26 108 L74 108 L74 40 L80 48 L92 40 L80 20 L66 14 Q50 24 34 14Z';
const LONG = 'M34 14 L20 20 L10 96 L22 98 L28 52 L28 108 L72 108 L72 52 L78 98 L90 96 L80 20 L66 14 Q50 24 34 14Z';
const collar = f => P('M40 12 L50 32 L36 24Z', f) + P('M60 12 L50 32 L64 24Z', f);

const JEANS = {
  straight: 'M28 8 H72 L70 112 H52 L50 36 L48 112 H30Z',
  wide: 'M30 8 H70 L86 112 H54 L50 40 L46 112 H14Z',
  barrel: 'M30 8 H70 Q92 60 68 112 H54 L50 40 L46 112 H32 Q8 60 30 8Z',
  baggy: 'M26 8 H74 L84 112 H54 L50 44 L46 112 H16Z',
  bootcut: 'M30 8 H70 L68 70 L78 112 H54 L50 40 L46 112 H22 L32 70Z',
  slim: 'M32 8 H68 L64 112 H52 L50 36 L48 112 H36Z'
};

function body(it, f) {
  const sub = it.subtype, type = it.type, sil = it.silhouette;

  if (it.category === 'bottom') {
    if (type === 'jeans') return P(JEANS[sil] || JEANS.straight, f) + L('M28 18 H72 M50 18 V40') + L('M34 22 q4 6 0 12');
    if (type === 'shorts') return P('M28 14 H72 L78 62 H52 L50 38 L48 62 H22Z', f) + L('M28 22 H72') + (sil === 'cargo' ? L('M30 44 h10 v10 h-10z M60 44 h10 v10 h-10z') : '');
    if (type === 'skirt') return P('M34 14 H66 L88 98 H12Z', f) + L('M34 22 H66');

    const wide = sil === 'pleated' || sil === 'wide' || sil === 'cargo' || sil === 'relaxed';
    const d = wide ? 'M28 8 H72 L80 112 H54 L50 40 L46 112 H20Z' : JEANS.straight;

    return P(d, f) + L('M28 18 H72') + (sil === 'pleated' ? L('M38 18 V50 M62 18 V50') : '') + (sil === 'cargo' ? L('M26 60 h12 v14 h-12z M62 60 h12 v14 h-12z') : '');
  }

  if (it.category === 'top') {
    if (type === 'tank') return P('M34 10 L38 34 Q50 44 62 34 L66 10 L74 12 L72 108 L28 108 L26 12Z', f);
    if (sub === 'cropped top') return P('M34 14 L20 20 L8 38 L20 46 L26 38 L26 76 L74 76 L74 38 L80 46 L92 38 L80 20 L66 14 Q50 24 34 14Z', f);

    if (type === 'shirt') return P(SHORT, f) + collar(f) + L('M50 32 V108') + buttons(50, 44, 5, 12);
    if (type === 'polo') return P(SHORT, f) + collar(f) + L('M50 32 V56') + buttons(50, 38, 2, 9);
    if (type === 'henley') return P(LONG, f) + L('M50 24 V56') + buttons(50, 30, 3, 9);
    if (type === 'sweater') return P(LONG, f) + L('M28 100 H72 M34 14 Q50 30 66 14');
    if (type === 'cardigan') return P(LONG, f) + L('M50 24 V108') + buttons(50, 38, 4, 14);
    if (type === 'hoodie') return P(LONG, f) + P('M34 14 Q50 -2 66 14 Q50 30 34 14Z', f) + L('M36 80 H64 L66 98 H34Z');
    if (type === 'sweatshirt') return P(LONG, f) + L('M28 100 H72 M36 14 Q50 28 64 14');

    return P(SHORT, f) + (it.pattern === 'graphic' ? `<circle cx="50" cy="58" r="11" fill="#c8553d" stroke="#3a362f" stroke-width="1.4"/><path d="M50 50 L52 56 L58 56 L53 60 L55 66 L50 62 L45 66 L47 60 L42 56 L48 56Z" fill="#f7f5f0"/>` : '');
  }

  if (it.category === 'layer') {
    const base = P(LONG, f) + L('M50 20 V108');

    if (type === 'blazer') return base + P('M36 14 L50 56 L44 14Z', f) + P('M64 14 L50 56 L56 14Z', f) + buttons(50, 66, 2, 12);
    if (type === 'overshirt') return base + collar(f) + L('M32 62 h14 v14 h-14z M54 62 h14 v14 h-14z') + buttons(50, 40, 4, 16);
    if (sub === 'denim jacket') return base + collar(f) + L('M32 56 h14 v12 h-14z M54 56 h14 v12 h-14z M28 80 H72');

    return base + L('M28 98 H72 M28 90 H72') + P('M40 12 Q50 22 60 12 L60 20 Q50 28 40 20Z', f);
  }

  if (it.category === 'shoes') {
    const sole = '<rect x="10" y="90" width="82" height="8" rx="3" fill="#f2efe8" stroke="#3a362f" stroke-width="1.6"/>';

    if (type === 'sandals') return sole + L('M24 90 V80 H52 V90 M52 82 H70 V90') + P('M24 80 Q38 66 52 80Z', f);
    if (type === 'boots') return P('M28 20 H54 V62 L80 72 Q92 76 92 90 H24Z', f) + sole + L('M28 34 H54');
    if (sil === 'high-top') return P('M20 30 H46 L48 62 L76 70 Q90 74 90 90 H14 V76Z', f) + sole + L('M20 40 H46') + buttons(40, 46, 3, 7);
    if (type === 'loafers') return P('M10 86 Q10 70 30 68 L48 62 Q72 62 90 78 V90 H10Z', f) + sole + L('M32 68 Q44 74 56 66');

    return P('M12 78 L14 90 H90 V84 Q90 76 74 74 L54 68 Q46 58 34 58 L22 64 Q12 66 12 78Z', f) + sole + L('M34 58 L40 68 M42 62 L48 70');
  }

  if (it.category === 'accessory') {
    if (type === 'belt') return `<rect ${S} x="6" y="52" width="88" height="14" rx="3" fill="${f}"/>` + `<rect ${S} x="42" y="49" width="16" height="20" rx="2" fill="#d9d2c0"/>` + dot(76, 59) + dot(84, 59);
    if (type === 'cap') return P('M18 70 Q18 28 52 28 Q84 28 84 70Z', f) + P('M60 70 Q92 66 96 80 Q76 82 60 76Z', f) + L('M52 28 V70');

    return P('M22 44 H78 L84 108 H16Z', f) + L('M36 44 Q36 18 50 18 Q64 18 64 44');
  }

  if (type === 'jumpsuit') return P('M34 10 L38 34 L28 50 L20 112 H46 L50 62 L54 112 H80 L72 50 L62 34 L66 10 L72 12 L74 40 L26 40 L28 12Z', f) + L('M28 48 H72');

  return P('M38 10 L34 36 L16 108 H84 L66 36 L62 10 L56 10 Q50 24 44 10Z', f) + L('M34 36 H66');
}

export function illustrate(it, doc = document) {
  const f = COLOR_HEX[it.colors[0]] || '#bdb7aa';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" class="art" role="img" aria-label="Illustration of ${String(it.name).replace(/[^\w\s-]/g, '')}">${body(it, f)}</svg>`;
  return new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement;
}
