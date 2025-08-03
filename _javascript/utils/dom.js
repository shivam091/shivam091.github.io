/**
 * Generate a unique ID with optional prefix
 * @param {string} prefix - Optional prefix for the ID (default: 'floating')
 */
export function generateId(prefix = "floating") {
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Creates a DOM element with optional attributes, dataset, styles, events, and children.
 *
 * @param {string} tag - The HTML tag name to create (e.g., 'div', 'span', 'button').
 * @param {Object} [options={}] - Configuration options for the element.
 * @param {string|string[]} [options.className] - Class or array of classes to assign.
 * @param {string} [options.id] - Element ID.
 * @param {string} [options.text] - Text content for the element (ignored if `html` is provided).
 * @param {string} [options.html] - Inner HTML for the element (overrides `text` if both provided).
 * @param {Object} [options.attrs={}] - Plain attributes to set (e.g., `{ role: "button" }`).
 * @param {Object} [options.dataset={}] - Data attributes (without `data-` prefix).
 * @param {Object} [options.style={}] - Inline styles as an object (e.g., `{ color: "red" }`).
 * @param {Object} [options.events={}] - Event listeners as an object (e.g., `{ click: fn }`).
 * @param {Array<Node|string>} [options.children=[]] - Child nodes or strings to append.
 *
 * @returns {HTMLElement} The newly created DOM element.
 *
 * @example
 * // Create a button with classes, dataset, and click handler
 * const btn = createElement('button', {
 *   className: ['btn', 'btn-primary'],
 *   text: 'Click Me',
 *   dataset: { action: 'save' },
 *   events: { click: () => alert('Saved!') }
 * });
 *
 * document.body.appendChild(btn);
 */
export function createElement(tag, {
  className,
  id,
  text,
  html,
  attrs = {},
  dataset = {},
  style = {},
  events = {},
  children = []
} = {}) {
  const el = document.createElement(tag);

  if (Array.isArray(className)) el.className = className.join(" ");
  else if (className) el.className = className;

  if (id) el.id = id;
  if (text != null) el.textContent = text;
  if (html != null) el.innerHTML = html;

  for (const [key, value] of Object.entries(attrs)) {
    if (value != null) el.setAttribute(key, value);
  }

  for (const [key, value] of Object.entries(dataset)) {
    if (value != null) el.dataset[key] = value;
  }

  Object.assign(el.style, style);

  for (const [event, handler] of Object.entries(events)) {
    if (typeof handler === "function") el.addEventListener(event, handler);
  }

  for (const child of children) {
    if (child instanceof Node) el.appendChild(child);
    else if (child != null) el.appendChild(document.createTextNode(child));
  }

  return el;
}
