import * as PopperUtils from "./../../utils/popper";

class Tooltip {
  static tooltipMap = new WeakMap();

  static get tooltipElements() {
    return document.querySelectorAll("[data-tooltip]");
  }

  static generateId() {
    return `tooltip-${Math.random().toString(36).slice(2, 11)}`;
  }

  static createElement(text) {
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

  static getTooltipDelay(target) {
    return parseInt(target.getAttribute("data-tooltip-delay") || "3000", 10);
  }

  static show(event) {
    const target = event?.currentTarget;
    if (Tooltip.tooltipMap.has(target)) return;

    const tooltipText = target.getAttribute("data-tooltip");
    if (!tooltipText) return;

    const delay = Tooltip.getTooltipDelay(target);
    const tooltip = Tooltip.createElement(tooltipText);

    document.body.appendChild(tooltip);

    PopperUtils.createInstance(target, tooltip, {
      placement: target.getAttribute("data-tooltip-position") || "top",
    });

    requestAnimationFrame(() => tooltip.classList.add("show"));
    target.setAttribute("aria-describedby", tooltip.id);
    Tooltip.tooltipMap.set(target, tooltip);

    if ("ontouchstart" in window) {
      setTimeout(() => Tooltip.hide({ currentTarget: target }), delay);
    }
  }

  static hide(event) {
    const target = event.currentTarget;
    const tooltip = Tooltip.tooltipMap.get(target);

    if (tooltip) {
      tooltip.classList.remove("show");
      tooltip.classList.add("hide");
      target.removeAttribute("aria-describedby");

      const removeTooltip = () => {
        if (tooltip && tooltip.parentNode) {
          tooltip.remove();
          Tooltip.tooltipMap.delete(target);
          PopperUtils.destroyInstance(tooltip);
        }
      };

      let removed = false;
      const cleanup = () => {
        if (!removed) {
          removeTooltip();
          removed = true;
        }
      };

      tooltip.addEventListener("transitionend", cleanup, {once: true});
      setTimeout(cleanup, 300);
    }
  }

  static handleEscape(event) {
    if (event.key === "Escape") {
      Tooltip.hide({ currentTarget: document.activeElement });
    }
  }

  static initialize() {
    Tooltip.tooltipElements.forEach((el) => {
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

      el.addEventListener("mouseenter", safeShow);
      el.addEventListener("mouseleave", safeHide);
      el.addEventListener("focus", Tooltip.show);
      el.addEventListener("blur", Tooltip.hide);

      el.addEventListener("touchstart", Tooltip.show);
      el.addEventListener("touchend", Tooltip.hide);

      el.addEventListener("pointerdown", Tooltip.show);
      el.addEventListener("pointerup", Tooltip.hide);

      el.addEventListener("keydown", Tooltip.handleEscape);
    });
  }
}

export { Tooltip };
