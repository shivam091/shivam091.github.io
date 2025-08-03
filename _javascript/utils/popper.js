import { createPopper } from "@popperjs/core";

const instances = new WeakMap();

const defaultModifiers = [
  { name: "offset", options: { offset: [0, 8] } },
  { name: "preventOverflow", options: { boundary: "viewport" } },
  { name: "flip", options: { fallbackPlacements: ["top", "bottom", "right", "left"] } },
  { name: "eventListeners", options: { scroll: true, resize: true } },
];

export function createInstance(target, popperElement, options = {}) {
  const arrow = popperElement.querySelector("[data-popper-arrow]");

  if (arrow) {
    defaultModifiers.push({ name: "arrow", options: { element: arrow, padding: 5 } });
  }

  const defaultOptions = {
    placement: options.placement || "top",
    modifiers: options.modifiers || defaultModifiers,
    boundary: options.boundary || "viewport",
    strategy: options.strategy || "absolute",
  };
  const instance = createPopper(target, popperElement, defaultOptions);

  instances.set(popperElement, instance);

  return instance;
}

export function destroyInstance(popperElement) {
  const instance = instances.get(popperElement);

  if (instance) {
    instance.destroy();
    instances.delete(popperElement);
  }
}

export function updateInstance(popperElement) {
  const instance = instances.get(popperElement);

  if (instance) instance.update();
}
