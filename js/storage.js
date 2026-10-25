
const mem = new Map();
let usable = true;

try {
  localStorage.setItem('__fw', '1');
  localStorage.removeItem('__fw');
} catch {
  usable = false;
}

export const storageAvailable = () => usable;

export function load(key, fallback) {
  try {
    const raw = usable ? localStorage.getItem(key) : mem.get(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  const raw = JSON.stringify(value);

  try {
    if (usable) localStorage.setItem(key, raw);
    else mem.set(key, raw);

    return true;
  } catch {
    mem.set(key, raw);
    return false;
  }
}

export function packOutfit(outfit) {
  const items = {};

  for (const [slot, it] of Object.entries(outfit.items)) {
    items[slot] = it.owned ? { owned: it } : { ref: it.id };
  }

  return {
    id: `${outfit.id}@${Date.now()}`,
    tplName: outfit.tplName,
    savedAt: new Date().toISOString(),
    items
  };
}

export function resolveSaved(saved, catalog) {
  const index = new Map(catalog.map(i => [i.id, i]));

  return (Array.isArray(saved) ? saved : []).map(s => {
    const items = {};
    const missing = [];

    for (const [slot, v] of Object.entries(s.items || {})) {
      const it = v && v.owned
        ? v.owned
        : v && index.get(v.ref);

      if (it) items[slot] = it;
      else missing.push(slot);
    }

    return { ...s, items, missing };
  });
}
