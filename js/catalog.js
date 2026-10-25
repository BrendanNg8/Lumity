export const COLOR_HEX = {
  black: '#2a2a2e', white: '#f7f5f0', cream: '#efe6d0', beige: '#d8c7a8', tan: '#c19a6b', brown: '#6b4a32',
  gray: '#9a9a9a', 'light gray': '#c7c7c7', charcoal: '#45464a', 'light blue': '#a9c7e0', blue: '#4f78a8',
  'dark blue': '#2f4a6e', navy: '#1f2a44', sky: '#87ceeb', teal: '#2b8c8c', olive: '#66703a', sage: '#9aaa86',
  green: '#3f6b4a', 'forest green': '#254b35', burgundy: '#6e2a35', red: '#b3342f', rust: '#b65f3a',
  orange: '#d77a32', mustard: '#c9a227', yellow: '#e4cc55', purple: '#6a4c93', lavender: '#b6a0d8',
  pink: '#e6a8b8', 'light pink': '#f1cbd5', 'hot pink': '#d94f91', 'off-white': '#f3f0e8', khaki: '#b6a77a'
};
const BLUES = ['light blue', 'blue', 'dark blue', 'navy', 'sky', 'teal'];
export const familyOf = c => (BLUES.includes(c) ? 'blue' : c);
const SEASONS = { p: 'spring', s: 'summer', f: 'fall', w: 'winter' };
export const CATEGORIES = ['top', 'bottom', 'layer', 'shoes', 'accessory', 'onepiece'];

const DEFINITIONS = [
  ['classic t-shirt','top','t-shirt','regular','regular','cotton','casual,minimal','psfw',0,14,'basics'],
  ['heavyweight t-shirt','top','t-shirt','boxy','relaxed','heavy cotton','casual,streetwear,minimal','psfw',0,24,'basics'],
  ['oversized t-shirt','top','t-shirt','oversized','relaxed','cotton','casual,streetwear,relaxed','psfw',0,22,'street'],
  ['graphic t-shirt','top','t-shirt','boxy','relaxed','cotton','casual,streetwear','psfw',0,24,'street'],
  ['fitted t-shirt','top','t-shirt','fitted','fitted','cotton','casual,minimal','psfw',0,18,'basics'],
  ['long-sleeve t-shirt','top','t-shirt','regular','regular','cotton','casual,minimal,relaxed','psfw',0,22,'basics'],
  ['striped t-shirt','top','t-shirt','regular','regular','cotton','casual,relaxed,coastal','pss',0,20,'basics'],
  ['pocket t-shirt','top','t-shirt','regular','regular','cotton','casual,relaxed','psfw',0,18,'basics'],
  ['tank top','top','tank','fitted','fitted','cotton','casual,minimal','s',0,12,'summer'],
  ['ribbed tank','top','tank','fitted','fitted','rib knit','casual,minimal','ps',0,16,'summer'],
  ['cropped top','top','top','cropped','fitted','cotton','casual,streetwear','ps',0,18,'summer'],
  ['polo shirt','top','polo','regular','regular','cotton piqué','smart casual,casual,preppy','pssf',1,30,'basics'],
  ['knit polo','top','polo','regular','regular','cotton knit','smart casual,minimal,preppy','pssf',1,38,'basics'],
  ['henley shirt','top','henley','regular','regular','cotton','casual,relaxed','psfw',0,26,'basics'],
  ['oxford button-down','top','shirt','regular','regular','oxford cotton','smart casual,preppy,minimal','psfw',2,42,'smart'],
  ['classic button-up','top','shirt','regular','regular','cotton','casual,smart casual,minimal','psfw',2,32,'smart'],
  ['linen button-up','top','shirt','relaxed','relaxed','linen','casual,relaxed,minimal,coastal','ps',1,42,'summer'],
  ['short-sleeve button-up','layer','shirt','boxy','relaxed','cotton','casual,relaxed,coastal','ps',1,30,'summer'],
  ['flannel shirt','top','shirt','relaxed','relaxed','flannel','casual,cozy,streetwear','fw',0,38,'earth'],
  ['denim shirt','top','shirt','regular','regular','denim','casual,streetwear','psfw',1,42,'denim'],
  ['chambray shirt','top','shirt','regular','regular','chambray','casual,smart casual','pssf',1,38,'denim'],
  ['thermal henley','top','henley','regular','regular','waffle knit','casual,cozy','fw',0,30,'earth'],
  ['crewneck sweatshirt','top','sweatshirt','relaxed','relaxed','fleece','casual,relaxed,cozy','fw',0,36,'basics'],
  ['quarter-zip pullover','top','pullover','regular','regular','cotton blend','casual,smart casual,preppy','pfw',1,44,'basics'],
  ['hoodie','top','hoodie','oversized','relaxed','fleece','casual,streetwear,cozy,relaxed','pfw',0,42,'street'],
  ['zip-up hoodie','top','hoodie','regular','regular','fleece','casual,streetwear,cozy','pfw',0,46,'street'],
  ['crewneck sweater','top','sweater','regular','regular','wool blend','cozy,smart casual,casual','fw',1,52,'earth'],
  ['cable-knit sweater','top','sweater','regular','regular','cotton knit','cozy,preppy,smart casual','fw',1,58,'earth'],
  ['turtleneck sweater','top','sweater','fitted','fitted','knit','minimal,smart casual,cozy','fw',2,48,'smart'],
  ['cardigan','top','cardigan','relaxed','relaxed','knit','cozy,relaxed,minimal','pfw',1,48,'earth'],
  ['vest sweater','top','vest','regular','regular','knit','preppy,smart casual,minimal','pfw',1,36,'smart'],
  ['mesh-knit top','top','top','regular','regular','knit','casual,coastal,minimal','ps',0,28,'summer'],
  ['straight-leg jeans','bottom','jeans','straight','regular','denim','casual,minimal','psfw',1,48,'denim'],
  ['wide-leg jeans','bottom','jeans','wide','relaxed','denim','casual,streetwear,relaxed','psfw',1,58,'denim'],
  ['barrel jeans','bottom','jeans','barrel','relaxed','denim','casual,streetwear,relaxed','psf',1,54,'denim'],
  ['baggy jeans','bottom','jeans','baggy','relaxed','denim','casual,streetwear','psfw',0,52,'denim'],
  ['slim jeans','bottom','jeans','slim','fitted','denim','casual,minimal','psfw',1,46,'denim'],
  ['bootcut jeans','bottom','jeans','bootcut','regular','denim','casual,retro','psfw',1,52,'denim'],
  ['ripped jeans','bottom','jeans','straight','relaxed','distressed denim','casual,streetwear','pssf',0,50,'denim'],
  ['pleated trousers','bottom','trousers','pleated','relaxed','wool blend','smart casual,minimal,preppy','psfw',3,62,'smart'],
  ['relaxed trousers','bottom','trousers','relaxed','relaxed','cotton twill','casual,relaxed,minimal','psfw',2,50,'smart'],
  ['tailored trousers','bottom','trousers','straight','regular','wool blend','smart casual,minimal','psfw',3,68,'smart'],
  ['chinos','bottom','chinos','straight','regular','cotton twill','casual,smart casual,preppy','pssf',2,42,'basics'],
  ['cargo pants','bottom','pants','cargo','relaxed','cotton','casual,streetwear','psfw',1,52,'street'],
  ['parachute pants','bottom','pants','wide','relaxed','nylon','streetwear,casual','pssf',0,48,'street'],
  ['track pants','bottom','pants','tapered','regular','polyester','sporty,streetwear,casual','psfw',0,38,'sport'],
  ['joggers','bottom','pants','tapered','relaxed','fleece','casual,cozy,sporty','psfw',0,34,'sport'],
  ['sweatpants','bottom','pants','relaxed','relaxed','fleece','casual,cozy,relaxed','fw',0,34,'sport'],
  ['linen pants','bottom','pants','wide','relaxed','linen','casual,relaxed,minimal,coastal','ps',1,46,'summer'],
  ['corduroy pants','bottom','pants','straight','regular','corduroy','casual,cozy,retro','fw',1,52,'earth'],
  ['carpenter pants','bottom','pants','relaxed','relaxed','cotton canvas','casual,streetwear','psfw',0,48,'street'],
  ['denim shorts','bottom','shorts','regular','regular','denim','casual','s',0,28,'summer'],
  ['long denim shorts','bottom','shorts','long','relaxed','denim','casual,streetwear','s',0,32,'summer'],
  ['tailored shorts','bottom','shorts','straight','regular','cotton','smart casual,casual,preppy','s',2,34,'summer'],
  ['cargo shorts','bottom','shorts','cargo','relaxed','cotton','casual,streetwear','s',0,32,'summer'],
  ['linen shorts','bottom','shorts','relaxed','relaxed','linen','casual,coastal,relaxed','s',1,34,'summer'],
  ['athletic shorts','bottom','shorts','athletic','regular','polyester','sporty,casual','ps',0,24,'sport'],
  ['pleated skirt','bottom','skirt','pleated','regular','cotton','preppy,smart casual','pssf',1,38,'smart'],
  ['denim skirt','bottom','skirt','a-line','regular','denim','casual,retro','pss',0,34,'denim'],
  ['midi skirt','bottom','skirt','midi','regular','viscose','minimal,smart casual,coastal','pssf',1,42,'smart'],
  ['wide-leg culottes','bottom','pants','wide','relaxed','cotton','smart casual,relaxed,minimal','pss',1,44,'smart'],
  ['denim jacket','layer','jacket','boxy','regular','denim','casual,streetwear','pf',1,62,'denim'],
  ['bomber jacket','layer','jacket','boxy','regular','nylon','casual,streetwear','pfw',1,72,'street'],
  ['varsity jacket','layer','jacket','oversized','relaxed','wool blend','streetwear,preppy','fw',1,84,'street'],
  ['coach jacket','layer','jacket','regular','regular','nylon','streetwear,casual','psf',0,58,'street'],
  ['windbreaker','layer','jacket','regular','regular','nylon','sporty,streetwear,casual','pssf',0,54,'sport'],
  ['lightweight jacket','layer','jacket','regular','regular','nylon','casual,minimal','psf',1,58,'basics'],
  ['utility jacket','layer','jacket','relaxed','relaxed','cotton canvas','casual,streetwear','pf',1,72,'earth'],
  ['field jacket','layer','jacket','regular','regular','cotton','casual,smart casual','pfw',1,88,'earth'],
  ['puffer jacket','layer','jacket','oversized','relaxed','recycled polyester','casual,cozy,streetwear','w',0,110,'winter'],
  ['wool overcoat','layer','coat','long','regular','wool blend','smart casual,minimal,cozy','fw',3,140,'smart'],
  ['trench coat','layer','coat','long','regular','cotton blend','smart casual,minimal','pf',2,125,'smart'],
  ['fleece jacket','layer','jacket','regular','relaxed','fleece','casual,cozy,outdoor','fw',0,62,'winter'],
  ['overshirt','layer','overshirt','boxy','relaxed','cotton twill','casual,relaxed,minimal','pf',1,52,'earth'],
  ['flannel overshirt','layer','overshirt','oversized','relaxed','flannel','casual,cozy,streetwear','fw',0,48,'earth'],
  ['unstructured blazer','layer','blazer','relaxed','regular','cotton blend','smart casual,minimal','psfw',3,92,'smart'],
  ['knit blazer','layer','blazer','regular','regular','knit','smart casual,preppy','pfw',2,78,'smart'],
  ['leather-look jacket','layer','jacket','boxy','regular','faux leather','streetwear,retro','fw',1,98,'street'],
  ['rain jacket','layer','jacket','regular','regular','water-resistant nylon','outdoor,casual','psfw',0,68,'sport'],
  ['low-top sneakers','shoes','sneakers','low-top','regular','canvas','casual,minimal,streetwear','psfw',0,42,'basics'],
  ['retro sneakers','shoes','sneakers','retro','regular','synthetic leather','casual,retro,streetwear','psfw',0,68,'sport'],
  ['running sneakers','shoes','sneakers','running','regular','mesh','sporty,casual','psfw',0,76,'sport'],
  ['high-top sneakers','shoes','sneakers','high-top','regular','canvas','casual,streetwear','psfw',0,62,'street'],
  ['skate shoes','shoes','sneakers','skate','regular','suede','streetwear,casual','psfw',0,64,'street'],
  ['slip-on sneakers','shoes','sneakers','slip-on','regular','canvas','casual,minimal','pss',0,38,'basics'],
  ['loafers','shoes','loafers','loafer','regular','leather-look','smart casual,minimal,preppy','psfw',2,72,'smart'],
  ['penny loafers','shoes','loafers','penny','regular','leather','smart casual,preppy','psfw',2,88,'smart'],
  ['Chelsea boots','shoes','boots','chelsea','regular','leather-look','casual,smart casual,minimal','fw',1,82,'earth'],
  ['lace-up boots','shoes','boots','lace-up','regular','leather-look','casual,streetwear,cozy','fw',1,88,'earth'],
  ['hiking boots','shoes','boots','hiking','regular','synthetic','outdoor,casual','pfw',0,94,'sport'],
  ['sandals','shoes','sandals','sandal','regular','synthetic','casual,relaxed','s',0,24,'summer'],
  ['slides','shoes','slides','slide','regular','rubber','casual,sporty','ps',0,20,'summer'],
  ['leather sandals','shoes','sandals','sandal','regular','leather-look','casual,minimal,coastal','s',1,48,'summer'],
  ['ballet flats','shoes','flats','flat','regular','leather-look','smart casual,minimal','pss',1,52,'smart'],
  ['Mary Jane flats','shoes','flats','mary jane','regular','leather-look','preppy,smart casual,retro','pssf',1,58,'smart'],
  ['canvas espadrilles','shoes','espadrilles','espadrille','regular','canvas','coastal,casual','s',1,44,'summer'],
  ['web belt','accessory','belt','web','regular','woven nylon','casual,streetwear','psfw',0,18,'street'],
  ['leather belt','accessory','belt','classic','regular','leather-look','casual,smart casual,minimal','psfw',1,24,'basics'],
  ['baseball cap','accessory','cap','baseball','regular','cotton','casual,streetwear,sporty','pssf',0,18,'street'],
  ['beanie','accessory','hat','beanie','regular','knit','casual,cozy,streetwear','fw',0,18,'winter'],
  ['bucket hat','accessory','hat','bucket','regular','cotton','casual,streetwear','s',0,22,'summer'],
  ['scarf','accessory','scarf','long','regular','knit','cozy,smart casual,minimal','fw',1,26,'winter'],
  ['tote bag','accessory','bag','tote','regular','canvas','casual,minimal,coastal','psfw',0,22,'basics'],
  ['crossbody bag','accessory','bag','crossbody','regular','nylon','casual,streetwear','psfw',0,32,'street'],
  ['backpack','accessory','bag','backpack','regular','canvas','casual,streetwear,school','psfw',0,38,'street'],
  ['shoulder bag','accessory','bag','shoulder','regular','faux leather','smart casual,minimal','pssf',1,42,'smart'],
  ['watch','accessory','watch','classic','regular','metal','smart casual,minimal','psfw',2,48,'smart'],
  ['beaded bracelet','accessory','jewelry','bracelet','regular','beads','casual,coastal','pss',0,12,'summer'],
  ['sunglasses','accessory','eyewear','sunglasses','regular','plastic','casual,streetwear,coastal','s',0,22,'summer'],
  ['baseball socks','accessory','socks','crew','regular','cotton','casual,sporty,streetwear','psfw',0,10,'basics'],
  ['casual t-shirt dress','onepiece','dress','straight','relaxed','cotton','casual,minimal','pss',0,42,'basics'],
  ['ribbed midi dress','onepiece','dress','midi','fitted','rib knit','minimal,smart casual','pss',1,54,'smart'],
  ['shirt dress','onepiece','dress','shirt','regular','cotton','smart casual,minimal,coastal','pssf',1,62,'smart'],
  ['sundress','onepiece','dress','a-line','regular','cotton','casual,coastal,relaxed','s',0,48,'summer'],
  ['sweater dress','onepiece','dress','midi','regular','knit','cozy,smart casual,minimal','fw',1,68,'winter'],
  ['jumpsuit','onepiece','jumpsuit','wide','relaxed','cotton','casual,relaxed,minimal','pssf',1,64,'basics'],
  ['utility jumpsuit','onepiece','jumpsuit','straight','regular','cotton twill','casual,streetwear','psfw',0,72,'earth'],
  ['linen romper','onepiece','romper','relaxed','relaxed','linen','casual,coastal,relaxed','s',0,48,'summer'],
  ['wide-leg overalls','onepiece','overalls','wide','relaxed','denim','casual,streetwear,relaxed','pssf',0,68,'denim']
];

const PALETTES = {
  basics: ['black','white','off-white','cream','gray','charcoal','navy','beige','brown','olive','light blue','burgundy'],
  street: ['black','white','gray','charcoal','navy','olive','green','burgundy','red','purple','blue','cream','brown'],
  summer: ['white','off-white','cream','beige','tan','light blue','sky','sage','green','pink','yellow','blue','black'],
  earth: ['cream','beige','tan','brown','khaki','olive','sage','green','forest green','rust','burgundy','charcoal','navy'],
  denim: ['light blue','blue','dark blue','black','gray','white','cream','charcoal'],
  smart: ['black','white','off-white','cream','beige','tan','brown','gray','charcoal','navy','burgundy','olive','light blue','sage'],
  sport: ['black','white','gray','charcoal','navy','blue','red','green','olive','sky','purple'],
  winter: ['black','white','cream','gray','charcoal','navy','brown','olive','forest green','burgundy','rust','camel'],
  all: Object.keys(COLOR_HEX)
};

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const cap = s => s.split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1) : w).join(' ');

function buildDemo() {
  const out = [];
  for (const def of DEFINITIONS) {
    const [sub, category, type, silhouette, fit, material, styles, seasons, formality, basePrice, paletteKey] = def;
    const palette = PALETTES[paletteKey] || PALETTES.basics;
    for (let index = 0; index < palette.length; index++) {
      const color = palette[index];
      if (!COLOR_HEX[color]) continue;
      const seasonal = seasons.includes('s') && !seasons.includes('w');
      const priceAdjust = (index % 5 === 0 ? 2 : index % 5 === 1 ? 0 : index % 5 === 2 ? -1 : index % 5 === 3 ? 1 : 0);
      const price = Math.max(8, basePrice + priceAdjust);
      const features = [];
      if (sub.includes('button-up') || sub.includes('button-down') || sub.includes('oxford')) features.push('button-up');
      if (sub.includes('oxford')) features.push('button-down collar');
      if (sub.includes('cargo') || sub.includes('utility') || sub.includes('carpenter')) features.push('utility pockets');
      if (sub.includes('linen')) features.push('breathable');
      if (sub.includes('water') || sub.includes('rain')) features.push('water-resistant');
      if (sub.includes('striped')) features.push('striped');
      if (sub.includes('graphic')) features.push('graphic');
      if (sub.includes('athletic') || sub.includes('running') || sub.includes('track')) features.push('performance');
      const id = `${category}-${slug(sub)}-${slug(color)}-01`;
      out.push({
        id,
        name: `${cap(color)} ${sub}`,
        category, type, subtype: sub, silhouette, fit,
        length: type === 'shorts' ? 'short' : type === 'skirt' ? 'midi' : (type === 'coat' ? 'long' : 'full'),
        colors: [color], colorFamily: familyOf(color), material,
        pattern: sub.includes('graphic') ? 'graphic' : sub.includes('striped') ? 'striped' : 'solid',
        styles: styles.split(','), seasons: [...new Set([...seasons].map(c => SEASONS[c]))],
        formality: Number(formality), features,
        priceCents: price * 100, currency: 'USD', image: null,
        isDemo: true, retailer: null, productUrl: null, priceCheckedAt: null, sizes: null
      });
    }
  }
  return out;
}
export const DEMO_CATALOG = buildDemo();

export function safeUrl(u) {
  if (typeof u !== 'string' || !u) return false;
  try { const p = new URL(u); return p.protocol === 'https:' || p.protocol === 'http:'; } catch { return false; }
}
function safeImage(u) {
  if (typeof u !== 'string') return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return safeUrl(u);
  return !u.includes('..') && !u.startsWith('/');
}

export function validateItem(it) {
  const errs = [];
  if (!it || typeof it !== 'object') return ['Item is not an object.'];
  const str = k => typeof it[k] === 'string' && it[k].trim() && it[k].length <= 120;
  for (const k of ['id', 'name', 'type', 'subtype']) if (!str(k)) errs.push(`"${k}" must be a short non-empty string.`);
  if (!CATEGORIES.includes(it.category)) errs.push(`"category" must be one of ${CATEGORIES.join(', ')}.`);
  if (!Number.isInteger(it.priceCents) || it.priceCents < 0 || it.priceCents > 10000000) errs.push('"priceCents" must be a non-negative integer.');
  if (!Array.isArray(it.colors) || !it.colors.length || it.colors.some(c => typeof c !== 'string')) errs.push('"colors" must be a non-empty array of strings.');
  for (const k of ['styles', 'seasons']) if (!Array.isArray(it[k]) || it[k].some(x => typeof x !== 'string')) errs.push(`"${k}" must be an array of strings.`);
  if (!Number.isInteger(it.formality) || it.formality < 0 || it.formality > 3) errs.push('"formality" must be an integer from 0 to 3.');
  if (it.productUrl != null && !safeUrl(it.productUrl)) errs.push('"productUrl" must be an http(s) URL.');
  if (it.image != null && !safeImage(it.image)) errs.push('"image" must be a relative path or an http(s) URL.');
  if (it.sizes != null && (!Array.isArray(it.sizes) || it.sizes.some(s => typeof s !== 'string'))) errs.push('"sizes" must be an array of strings or null.');
  return errs;
}

export function normalizeItem(it) {
  const colors = it.colors.map(c => c.toLowerCase());
  return {
    length: 'full', silhouette: null, fit: 'regular', material: null, pattern: 'solid', features: [], currency: 'USD',
    image: null, isDemo: false, retailer: null, productUrl: null, priceCheckedAt: null, sizes: null,
    ...it, colors, colorFamily: it.colorFamily || familyOf(colors[0])
  };
}

export function importCatalog(text) {
  let data;
  try { data = JSON.parse(text); } catch { return { items: [], errors: ['That is not valid JSON.'] }; }
  const list = Array.isArray(data) ? data : data && Array.isArray(data.items) ? data.items : null;
  if (!list) return { items: [], errors: ['Expected an array of items or an object with an "items" array.'] };
  if (list.length > 2000) return { items: [], errors: ['Too many items (limit 2000).'] };
  const errors = [], items = [];
  list.forEach((it, i) => {
    const e = validateItem(it);
    if (e.length) errors.push(`Item ${i + 1}: ${e.join(' ')}`);
    else items.push(normalizeItem(it));
  });
  return errors.length ? { items: [], errors } : { items, errors: [] };
}

export const exportCatalog = items => JSON.stringify({ version: 1, items }, null, 2);
export const EXAMPLE_ITEM = {
  id: 'bottom-chinos-khaki-02', name: 'Khaki chinos', category: 'bottom', type: 'chinos', subtype: 'chinos',
  silhouette: 'straight', fit: 'regular', colors: ['tan'], material: 'cotton', pattern: 'solid',
  styles: ['casual'], seasons: ['spring', 'summer', 'fall'], formality: 2, priceCents: 3999, currency: 'USD',
  isDemo: false, retailer: 'Example Store', productUrl: 'https://example.com/chinos', priceCheckedAt: '2026-01-15',
  image: null, sizes: ['30', '32', '34']
};