export default function setStyles(el, styles) {
  for (const prop in styles) el.style[prop] = styles[prop];
}
