export function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);

  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;

    if (k === 'on') {
      for (const [ev, fn] of Object.entries(v)) {
        el.addEventListener(ev, fn);
      }
    } else {
      el.setAttribute(k, v === true ? '' : String(v));
    }
  }

  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    el.appendChild(
      typeof kid === 'object'
        ? kid
        : document.createTextNode(String(kid))
    );
  }

  return el;
}

export const money = c =>
  '$' + (c / 100).toFixed(2).replace(/\.00$/, '');
