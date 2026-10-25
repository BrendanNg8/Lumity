
export const PALETTES = {
  neutral: ['black', 'white', 'cream', 'beige', 'tan', 'brown', 'gray', 'navy', 'light blue', 'dark blue'],
  earth: ['olive', 'brown', 'tan', 'beige', 'cream', 'burgundy', 'mustard', 'green']
};

export const COLOR_PAIRS = [
  ['white', 'blue'], ['white', 'black'], ['black', 'gray'], ['cream', 'olive'], ['beige', 'navy'], ['white', 'olive'],
  ['cream', 'brown'], ['olive', 'beige'], ['burgundy', 'cream'], ['tan', 'blue'], ['gray', 'blue'], ['black', 'blue'],
  ['cream', 'blue'], ['white', 'beige'], ['white', 'navy'], ['olive', 'black'], ['green', 'cream']
];

export const TEMPLATES = [
  {
    id: 'relaxed-neutral-summer',
    name: 'Relaxed neutral summer',
    kind: 'separates',
    styles: ['relaxed', 'minimal', 'casual'],
    seasons: ['summer', 'spring'],
    palette: 'neutral',
    sil: { top: ['boxy', 'regular'], bottom: ['barrel', 'wide', 'straight', 'relaxed'] },
    form: [0, 2],
    optional: ['accessory'],
    note: 'Loose, airy shapes in a quiet palette.'
  },
  {
    id: 'casual-denim',
    name: 'Casual denim',
    kind: 'separates',
    styles: ['casual'],
    seasons: ['spring', 'summer', 'fall'],
    palette: 'any',
    sil: { top: ['regular', 'boxy', 'fitted'], bottom: ['straight', 'slim', 'bootcut', 'wide', 'barrel'] },
    form: [0, 2],
    optional: ['layer', 'accessory'],
    prefer: { bottom: { type: ['jeans'] } },
    note: 'An everyday pairing built around denim.'
  },
  {
    id: 'earth-tone-casual',
    name: 'Earth-tone casual',
    kind: 'separates',
    styles: ['casual', 'relaxed', 'minimal'],
    seasons: ['spring', 'fall'],
    palette: 'earth',
    sil: { top: ['regular', 'boxy', 'relaxed'], bottom: ['relaxed', 'straight', 'cargo'] },
    form: [0, 2],
    optional: ['layer', 'accessory'],
    note: 'Olive, tan and cream tones that sit close together.'
  },
  {
    id: 'minimal-monochrome',
    name: 'Minimal monochrome',
    kind: 'separates',
    styles: ['minimal'],
    seasons: ['spring', 'summer', 'fall', 'winter'],
    palette: 'mono',
    sil: { top: ['fitted', 'regular'], bottom: ['straight', 'slim', 'wide', 'pleated'] },
    form: [0, 3],
    optional: ['accessory'],
    note: 'Two color families at most, with clean shapes.'
  },
  {
    id: 'smart-casual',
    name: 'Smart casual',
    kind: 'separates',
    styles: ['smart casual'],
    seasons: ['spring', 'fall', 'winter'],
    palette: 'any',
    sil: { top: ['regular'], bottom: ['slim', 'straight', 'pleated'] },
    form: [1, 3],
    optional: ['layer', 'accessory'],
    prefer: { shoes: { type: ['loafers', 'boots'] } },
    note: 'A step up from casual without going fully formal.'
  },
  {
    id: 'relaxed-streetwear',
    name: 'Relaxed streetwear',
    kind: 'separates',
    styles: ['streetwear', 'relaxed', 'casual'],
    seasons: ['spring', 'fall', 'winter'],
    palette: 'any',
    sil: { top: ['boxy'], bottom: ['baggy', 'wide', 'barrel', 'cargo'] },
    form: [0, 1],
    optional: ['layer', 'accessory'],
    note: 'Boxy tops over wider-leg bottoms.'
  },
  {
    id: 'lightweight-linen',
    name: 'Lightweight linen',
    kind: 'separates',
    styles: ['relaxed', 'minimal'],
    seasons: ['summer'],
    palette: 'neutral',
    sil: { top: ['relaxed', 'boxy'], bottom: ['wide', 'relaxed', 'barrel'] },
    form: [1, 2],
    optional: ['accessory'],
    prefer: { top: { material: ['linen'] }, bottom: { material: ['linen'] } },
    note: 'Breathable fabrics for warm days.'
  },
  {
    id: 'cozy-layered',
    name: 'Cozy layered',
    kind: 'separates',
    styles: ['cozy', 'casual'],
    seasons: ['fall', 'winter'],
    palette: 'any',
    sil: { top: ['regular', 'boxy', 'relaxed'], bottom: ['straight', 'slim', 'relaxed', 'bootcut'] },
    form: [0, 2],
    optional: ['layer', 'accessory'],
    note: 'Knits and layers for cooler weather.'
  },
  {
    id: 'button-up-and-denim',
    name: 'Clean button-up and denim',
    kind: 'separates',
    styles: ['casual', 'smart casual', 'minimal'],
    seasons: ['spring', 'summer', 'fall'],
    palette: 'any',
    sil: { top: ['regular', 'relaxed'], bottom: ['straight', 'slim', 'barrel', 'wide'] },
    form: [1, 2],
    optional: ['layer', 'accessory'],
    prefer: { top: { features: ['button-up'] }, bottom: { type: ['jeans'] } },
    note: 'A collared shirt kept casual by the denim.'
  },
  {
    id: 'casual-one-piece',
    name: 'Casual one-piece',
    kind: 'onepiece',
    styles: ['casual', 'relaxed', 'minimal'],
    seasons: ['spring', 'summer', 'fall'],
    palette: 'any',
    sil: { onepiece: ['a-line', 'wide'] },
    form: [0, 2],
    optional: ['layer', 'accessory'],
    note: 'One piece does the work, so the shoes and extras stay simple.'
  }
];
