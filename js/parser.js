import { familyOf } from './catalog.js';

const GARMENTS = `
barrel jeans|bottom|subtype=barrel jeans
wide leg jeans|bottom|subtype=wide-leg jeans
parachute pants|bottom|subtype=parachute pants
track pants|bottom|subtype=track pants
sweatpants|bottom|subtype=sweatpants
joggers|bottom|subtype=joggers
corduroy pants|bottom|subtype=corduroy pants
carpenter pants|bottom|subtype=carpenter pants
linen shorts|bottom|subtype=linen shorts
athletic shorts|bottom|subtype=athletic shorts
long denim shorts|bottom|subtype=long denim shorts
pleated skirt|bottom|subtype=pleated skirt
denim skirt|bottom|subtype=denim skirt
midi skirt|bottom|subtype=midi skirt
wide leg culottes|bottom|subtype=wide-leg culottes
straight leg jeans|bottom|subtype=straight jeans
straight jeans|bottom|subtype=straight jeans
baggy jeans|bottom|subtype=baggy jeans
relaxed fit jeans|bottom|type=jeans
relaxed jeans|bottom|type=jeans
bootcut jeans|bottom|subtype=bootcut jeans
slim jeans|bottom|subtype=slim jeans
jeans|bottom|type=jeans
pleated trousers|bottom|subtype=pleated trousers
trousers|bottom|type=trousers
slacks|bottom|type=trousers
chinos|bottom|type=chinos
cargo pants|bottom|subtype=cargo pants
linen pants|bottom|subtype=linen pants
pants|bottom|type=trousers,chinos,pants,jeans
denim shorts|bottom|subtype=denim shorts
tailored shorts|bottom|subtype=tailored shorts
cargo shorts|bottom|subtype=cargo shorts
shorts|bottom|type=shorts
skirt|bottom|type=skirt
graphic tee|top|subtype=graphic t-shirt
heavyweight t shirt|top|subtype=heavyweight t-shirt
oversized t shirt|top|subtype=oversized t-shirt
long sleeve t shirt|top|subtype=long-sleeve t-shirt
striped t shirt|top|subtype=striped t-shirt
pocket t shirt|top|subtype=pocket t-shirt
ribbed tank|top|subtype=ribbed tank
knit polo|top|subtype=knit polo
thermal henley|top|subtype=thermal henley
quarter zip|top|subtype=quarter-zip pullover
quarter zip pullover|top|subtype=quarter-zip pullover
cable knit sweater|top|subtype=cable-knit sweater
turtleneck|top|subtype=turtleneck sweater
vest sweater|top|subtype=vest sweater
mesh knit top|top|subtype=mesh-knit top
graphic t shirt|top|subtype=graphic t-shirt
fitted t shirt|top|subtype=fitted t-shirt
relaxed t shirt|top|subtype=relaxed t-shirt
t shirt|top|type=t-shirt
tshirt|top|type=t-shirt
tee|top|type=t-shirt
cropped top|top|subtype=cropped top
tank top|top|type=tank
tank|top|type=tank
polo|top|type=polo
henley|top|type=henley
short sleeve button up|layer|subtype=short-sleeve button-up
short sleeve button-up|layer|subtype=short-sleeve button-up
short sleeve button up shirt|layer|subtype=short-sleeve button-up
linen button up|top|subtype=linen button-up
linen shirt|top|material=linen;type=shirt
button down|top|features=button-down collar
oxford shirt|top|subtype=oxford shirt
oxford|top|subtype=oxford shirt
button up shirt|top|features=button-up
button up|top|features=button-up
shirt|top|type=shirt
sweater|top|type=sweater
jumper|top|type=sweater
cardigan|top|type=cardigan
hoodie|top|type=hoodie
sweatshirt|top|type=sweatshirt
top|top|category=top
retro sneakers|shoes|subtype=retro sneakers
running sneakers|shoes|subtype=running sneakers
skate shoes|shoes|subtype=skate shoes
slip on sneakers|shoes|subtype=slip-on sneakers
penny loafers|shoes|subtype=penny loafers
chelsea boots|shoes|subtype=chelsea boots
hiking boots|shoes|subtype=hiking boots
slides|shoes|type=slides
leather sandals|shoes|subtype=leather sandals
ballet flats|shoes|type=flats
mary jane flats|shoes|subtype=mary jane flats
espadrilles|shoes|type=espadrilles
low top sneakers|shoes|subtype=low-top sneakers
high top sneakers|shoes|subtype=high-top sneakers
sneakers|shoes|type=sneakers
trainers|shoes|type=sneakers
loafers|shoes|type=loafers
boots|shoes|type=boots
sandals|shoes|type=sandals
shoes|shoes|category=shoes
varsity jacket|layer|subtype=varsity jacket
coach jacket|layer|subtype=coach jacket
windbreaker|layer|subtype=windbreaker
utility jacket|layer|subtype=utility jacket
field jacket|layer|subtype=field jacket
puffer jacket|layer|subtype=puffer jacket
overcoat|layer|type=coat
trench coat|layer|subtype=trench coat
fleece jacket|layer|subtype=fleece jacket
flannel overshirt|layer|subtype=flannel overshirt
knit blazer|layer|subtype=knit blazer
rain jacket|layer|subtype=rain jacket
leather jacket|layer|subtype=leather-look jacket
denim jacket|layer|subtype=denim jacket
bomber jacket|layer|subtype=bomber jacket
bomber|layer|subtype=bomber jacket
overshirt|layer|type=overshirt
blazer|layer|type=blazer
jacket|layer|category=layer
layer|layer|category=layer
beanie|accessory|type=hat
bucket hat|accessory|subtype=bucket hat
scarf|accessory|type=scarf
watch|accessory|type=watch
bracelet|accessory|type=jewelry
sunglasses|accessory|type=eyewear
socks|accessory|type=socks
shoulder bag|accessory|subtype=shoulder bag
crossbody bag|accessory|subtype=crossbody bag
backpack|accessory|subtype=backpack
belt|accessory|type=belt
cap|accessory|type=cap
bag|accessory|type=bag
tote|accessory|type=bag
accessory|accessory|category=accessory
shirt dress|onepiece|subtype=shirt dress
sundress|onepiece|subtype=sundress
sweater dress|onepiece|subtype=sweater dress
t shirt dress|onepiece|subtype=casual t-shirt dress
ribbed midi dress|onepiece|subtype=ribbed midi dress
linen romper|onepiece|subtype=linen romper
utility jumpsuit|onepiece|subtype=utility jumpsuit
overalls|onepiece|type=overalls
dress|onepiece|type=dress
jumpsuit|onepiece|type=jumpsuit
`;

const COLORS = {
  black: 'black', white: 'white', cream: 'cream', beige: 'beige', tan: 'tan', khaki: 'khaki', brown: 'brown',
  gray: 'gray', grey: 'gray', 'light gray': 'light gray', 'dark gray': 'charcoal', charcoal: 'charcoal', ivory: 'off-white', 'off white': 'off-white', 'off-white': 'off-white', 'light blue': 'light blue', 'pale blue': 'light blue', 'sky blue': 'sky', sky: 'sky', blue: 'blue',
  'dark wash': 'dark blue', 'dark wash denim': 'dark blue', 'dark denim': 'dark blue', 'blue denim': 'blue', 'black denim': 'black', 'light wash': 'light blue', 'light wash denim': 'light blue', 'medium wash': 'blue', 'medium wash denim': 'blue', 'washed black': 'black', 'faded black': 'black',
  'dark blue': 'dark blue', navy: 'navy', teal: 'teal', olive: 'olive', sage: 'sage', mint: 'sage', green: 'green', 'dark green': 'forest green', 'forest green': 'forest green', burgundy: 'burgundy', maroon: 'burgundy',
  red: 'red', rust: 'rust', orange: 'orange', mustard: 'mustard', yellow: 'yellow', purple: 'purple', lavender: 'lavender', lilac: 'lavender', peach: 'tan', coral: 'rust', pink: 'pink', 'light pink': 'light pink', 'hot pink': 'hot pink'
};

const WORDS = {
  summer: ['season', 'summer'], summery: ['season', 'summer'], winter: ['season', 'winter'],
  spring: ['season', 'spring'], fall: ['season', 'fall'], autumn: ['season', 'fall'],
  'smart casual': ['style', 'smart casual'], casual: ['style', 'casual'], minimal: ['style', 'minimal'],
  minimalist: ['style', 'minimal'], relaxed: ['style', 'relaxed'], streetwear: ['style', 'streetwear'],
  cozy: ['style', 'cozy'], preppy: ['style', 'preppy'], sporty: ['style', 'sporty'], coastal: ['style', 'coastal'],
  retro: ['style', 'retro'], outdoor: ['style', 'outdoor'], school: ['style', 'school'], neutral: ['palette', 'neutral'], neutrals: ['palette', 'neutral'],
  'earth tones': ['palette', 'earth'], 'earth tone': ['palette', 'earth'], earthy: ['palette', 'earth'],
  oversized: ['fit', 'relaxed'], loose: ['fit', 'relaxed'], baggy: ['fit', 'relaxed'],
  fitted: ['fit', 'fitted'], cropped: ['fit', 'fitted']
};

const NEG = new Set(['no', 'without', 'avoid', 'not', 'skip', 'exclude', 'never']);
const OWN = ['i already own', 'i already have', 'already own', 'already have', 'i own', 'i have', 'i got', 'own', 'have'];
const LINK = new Set(['and', 'a', 'an', 'the', 'with', 'in', 'of', 'some', 'plus', 'also', 'maybe', 'or', 'my', 'any']);
const STOP = new Set(['i', 'want', 'need', 'outfit', 'outfits', 'look', 'looks', 'something', 'give', 'me', 'under', 'below', 'for', 'to', 'that', 'is', 'it', 'please', 'like', 'would', 'wear', 'build', 'make', 'up', 'new', 'pieces', 'clothes', 'budget', 'around', 'about', 'than', 'less', 'max', 'within', 'total', 'dollars', 'bucks', 'usd', 'one', 'this', 'im', 'id', 'ive', 'dont', 'already', 'can', 'you', 'on', 'at', 'be', 'but']);

const lex = new Map();

for (const line of GARMENTS.trim().split('\n')) {
  const [phrase, slot, spec] = line.split('|');
  const match = {};
  for (const part of spec.split(';')) {
    const [f, v] = part.split('=');
    match[f] = v.split(',');
  }
  lex.set(phrase, { kind: 'garment', slot, match, phrase });
}

for (const [p, c] of Object.entries(COLORS)) lex.set(p, { kind: 'color', color: c });
for (const [p, [k, v]] of Object.entries(WORDS)) lex.set(p, { kind: k, value: v });
for (const p of OWN) lex.set(p, { kind: 'own' });

function lookup(tokens, i) {
  for (let n = Math.min(4, tokens.length - i); n >= 1; n--) {
    const words = tokens.slice(i, i + n);
    const last = words[n - 1];
    const variants = [last, last.endsWith('s') ? last.slice(0, -1) : last + 's'];
    for (const v of variants) {
      const hit = lex.get([...words.slice(0, -1), v].join(' '));
      if (hit) return { hit, n };
    }
  }
  return null;
}

export const emptyParse = () => ({
  budgetCents: null, noBudget: false, seasons: [], styles: [], palette: [], fit: [],
  requires: [], excludes: [], owned: [], unmatched: [], warnings: []
});

const uniq = a => [...new Set(a)];
const colorLabel = cs => (cs.length ? cs.join(' / ') + ' ' : '');

export function parse(input) {
  const out = emptyParse();
  let text = String(input ?? '');

  if (text.length > 600) {
    text = text.slice(0, 600);
    out.warnings.push('Description was long, so only the first 600 characters were read.');
  }

  text = text.toLowerCase().replace(/['’]/g, '');

  const money = text.match(/\$\s?(\d+(?:\.\d{1,2})?)|(\d+(?:\.\d{1,2})?)\s?(?:dollars|bucks|usd)\b/);

  if (money) {
    const cents = Math.round(parseFloat(money[1] ?? money[2]) * 100);
    if (cents > 0 && cents <= 100000000) out.budgetCents = cents;
    else out.warnings.push('Ignored a budget amount that was not a usable positive number.');
    text = text.replace(money[0], ' ');
  }

  const nb = /\b(?:no|without|unlimited)\s+(?:budget|spending)(?:\s+limit)?\b|\bmoney is no object\b|\bno limit\b/;

  if (nb.test(text)) {
    out.noBudget = true;
    text = text.replace(nb, ' ');
  }

  text = text.replace(/[-_]/g, ' ').replace(/[.,;!?]+/g, ' | ').replace(/[^a-z0-9| ]+/g, ' ');
  const tokens = text.split(/\s+/).filter(Boolean);

  let neg = false, own = false, pending = [];

  const flush = () => {
    for (const c of pending) {
      if (neg) out.excludes.push({ label: `Exclude: ${c}`, colors: [c] });
      else out.palette.push(c);
    }
    if (pending.length) neg = false;
    pending = [];
  };

  for (let i = 0; i < tokens.length;) {
    const tok = tokens[i];

    if (tok === '|' || tok === 'but') {
      flush();
      neg = false;
      own = false;
      i++;
      continue;
    }

    const found = lookup(tokens, i);

    if (found) {
      const { hit, n } = found;
      i += n;

      if (hit.kind === 'color') pending.push(hit.color);
      else if (hit.kind === 'own') own = true;
      else if (hit.kind === 'garment') {
        const colors = pending;
        pending = [];
        const what = hit.phrase;

        if (neg) {
          out.excludes.push({ label: `Exclude: ${colorLabel(colors)}${what}`, slot: hit.slot, match: hit.match, colors });
          neg = false;
        } else if (own) {
          out.owned.push({
            id: `owned-text-${out.owned.length + 1}`,
            name: `Your ${colorLabel(colors)}${what}`.trim(),
            category: hit.slot,
            type: (hit.match.type || [what])[0],
            subtype: (hit.match.subtype || hit.match.type || [what])[0],
            silhouette: null,
            fit: 'regular',
            colors: colors.length ? colors : ['unspecified'],
            colorFamily: familyOf(colors[0] || 'unspecified'),
            material: null,
            styles: [],
            seasons: ['spring', 'summer', 'fall', 'winter'],
            formality: 1,
            features: [],
            priceCents: 0,
            owned: true,
            isDemo: false
          });
          own = false;
        } else {
          out.requires.push({ label: `Required: ${colorLabel(colors)}${what}`, slot: hit.slot, match: hit.match, colors });
        }
      } else if (hit.kind === 'season') out.seasons.push(hit.value);
      else if (hit.kind === 'style') out.styles.push(hit.value);
      else if (hit.kind === 'palette') out.palette.push(hit.value);
      else if (hit.kind === 'fit') out.fit.push(hit.value);

      continue;
    }

    i++;

    if (NEG.has(tok)) {
      neg = true;
      continue;
    }

    if (LINK.has(tok)) continue;

    flush();

    if (!STOP.has(tok) && !/^\d+$/.test(tok)) out.unmatched.push(tok);
  }

  flush();

  out.seasons = uniq(out.seasons);
  out.styles = uniq(out.styles);
  out.palette = uniq(out.palette);
  out.fit = uniq(out.fit);
  out.unmatched = uniq(out.unmatched);

  return out;
}

export function chipsOf(p) {
  const chips = [];
  const add = (kind, label) => chips.push({ key: `${kind}:${label}`, label, kind });

  p.seasons.forEach(s => add('season', `Season: ${s}`));
  p.styles.forEach(s => add('style', `Style: ${s}`));
  p.palette.forEach(s => add('palette', `Palette: ${s}`));
  p.fit.forEach(s => add('fit', `Fit: ${s}`));
  p.requires.forEach(r => add('require', r.label));
  p.excludes.forEach(r => add('exclude', r.label));
  p.owned.forEach(o => add('owned', `Owned: ${o.name.replace(/^Your /, '')}`));

  return chips;
}

export function applyDismissed(p, keys) {
  const keep = (kind, label) => !keys.has(`${kind}:${label}`);

  return {
    ...p,
    seasons: p.seasons.filter(s => keep('season', `Season: ${s}`)),
    styles: p.styles.filter(s => keep('style', `Style: ${s}`)),
    palette: p.palette.filter(s => keep('palette', `Palette: ${s}`)),
    fit: p.fit.filter(s => keep('fit', `Fit: ${s}`)),
    requires: p.requires.filter(r => keep('require', r.label)),
    excludes: p.excludes.filter(r => keep('exclude', r.label)),
    owned: p.owned.filter(o => keep('owned', `Owned: ${o.name.replace(/^Your /, '')}`))
  };
}

export function detectBudgetConflict(parsedCents, controlCents) {
  return parsedCents != null && controlCents != null && parsedCents !== controlCents;
}

export function mergePrefs(p, c) {
  return {
    budgetCents: c.budgetCents ?? null,
    noBudget: !!(p.noBudget || c.noBudget),
    seasons: uniq([...p.seasons, ...(c.season ? [c.season] : [])]),
    styles: uniq([...p.styles, ...(c.style ? [c.style] : [])]),
    palette: p.palette,
    fit: p.fit,
    requires: p.requires,
    excludes: p.excludes,
    owned: [...(c.owned || []), ...p.owned],
    locks: c.locks || {},
    mode: c.mode || 'complete',
    weather: c.weather || '',
    ownedOnly: !!c.ownedOnly
  };
}