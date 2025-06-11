import * as PopperUtils from "./../utils/popper_utils";

class Tooltip {
  static get targets() {
    return document.querySelectorAll("[data-tooltip]");
  }

  static generateId() {
    return `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  }

  static createTooltipElement(text) {
    const el = document.createElement("div");
    const id = Tooltip.generateId();

    el.className = "tooltip";
    el.id = id;
    el.innerHTML = text;
    el.setAttribute("role", "tooltip");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-hidden", "true");

    return el;
  }

  static show(event) {
    const target = event?.currentTarget;
    if (!target) return;

    const tooltipText = target.getAttribute("data-tooltip");
    const delay = parseInt(target.getAttribute("data-tooltip-delay") || "3000", 10);

    const tooltip = Tooltip.createTooltipElement(tooltipText);
    target._tooltip = tooltip; // cache it on the element
    tooltip._target = target;  // reverse reference if needed

    document.body.appendChild(tooltip);

    PopperUtils.createInstance(target, tooltip, {
      placement: target.getAttribute("data-tooltip-position") || "top"
    });

    tooltip.classList.add("show");
    tooltip.setAttribute("aria-hidden", "false");
    target.setAttribute("aria-describedby", tooltip.id);

    if ("ontouchstart" in window) {
      setTimeout(() => Tooltip.hide({ currentTarget: target }), delay);
    }
  }

  static hide(event) {
    const target = event.currentTarget;
    const tooltip = target._tooltip;
    if (!tooltip) return;

    tooltip.classList.remove("show");
    tooltip.classList.add("hide");
    tooltip.setAttribute("aria-hidden", "true");
    target.removeAttribute("aria-describedby");

    const cleanup = () => {
      if (tooltip.parentNode) tooltip.remove();
      PopperUtils.destroyInstance(tooltip);
      delete target._tooltip;
    };

    tooltip.addEventListener("transitionend", cleanup, { once: true });
    setTimeout(cleanup, 300);
  }

  static handleEscape(event) {
    if (event.key === "Escape") {
      Tooltip.hide({ currentTarget: document.activeElement });
    }
  }
}

function attachTooltips() {
  Tooltip.targets.forEach(tooltipElement => {
    let hoverTimer;

    const safeShow = (event) => {
      clearTimeout(hoverTimer);
      const target = event.currentTarget;

      hoverTimer = setTimeout(() => Tooltip.show({ currentTarget: target }), 200);
    };

    const safeHide = (event) => {
      clearTimeout(hoverTimer);
      const target = event.currentTarget;

      hoverTimer = setTimeout(() => Tooltip.hide({ currentTarget: target }), 50);
    };

    tooltipElement.addEventListener("mouseenter", safeShow);
    tooltipElement.addEventListener("mouseleave", safeHide);

    tooltipElement.addEventListener("focus", Tooltip.show);
    tooltipElement.addEventListener("blur", Tooltip.hide);

    tooltipElement.addEventListener("touchstart", Tooltip.show);
    tooltipElement.addEventListener("touchend", Tooltip.hide);

    tooltipElement.addEventListener("pointerdown", Tooltip.show);
    tooltipElement.addEventListener("pointerup", Tooltip.hide);

    tooltipElement.addEventListener("keydown", Tooltip.handleEscape);
  });
}

export { Tooltip, attachTooltips };
