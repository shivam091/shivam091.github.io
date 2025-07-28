import * as PopperUtils from "./../../utils/popper";

export default class Tooltip {
  static tooltipMap = new WeakMap();

  static get tooltipElements() {
    return document.querySelectorAll("[data-tooltip]");
  }

  static generateId() {
    return `tooltip-${Math.random().toString(36).slice(2, 11)}`;
  }

  static createElement(text) {
    const el = document.createElement("div");
    const id = this.generateId();

    el.className = "tooltip";
    el.id = id;
    el.innerHTML = text;
    el.setAttribute("role", "tooltip");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-hidden", "true");

    const arrow = document.createElement("div");
    arrow.className = "tooltip-arrow";
    arrow.setAttribute("data-popper-arrow", "");
    el.appendChild(arrow);

    return el;
  }

  static getTooltipDelay(target) {
    return parseInt(target.getAttribute("data-tooltip-delay") || "3000", 10);
  }

  static show(event) {
    const target = event?.currentTarget;
    if (!target || this.tooltipMap.has(target)) return;

    const tooltipText = target.getAttribute("data-tooltip");
    if (!tooltipText) return;

    const delay = this.getTooltipDelay(target);
    const tooltip = this.createElement(tooltipText);

    document.body.appendChild(tooltip);

    PopperUtils.createInstance(target, tooltip, {
      placement: target.getAttribute("data-tooltip-position") || "top",
    });

    requestAnimationFrame(() => tooltip.classList.add("show"));
    target.setAttribute("aria-describedby", tooltip.id);
    this.tooltipMap.set(target, tooltip);

    if ("ontouchstart" in window) {
      setTimeout(() => this.hide({ currentTarget: target }), delay);
    }
  }

  static update(target, newText) {
    if (!target || !newText) return;

    target.setAttribute("data-tooltip", newText);

    const tooltip = this.tooltipMap.get(target);
    if (tooltip) {
      tooltip.innerHTML = newText;
      PopperUtils.updateInstance(tooltip);
    }
  }

  static hide(event) {
    const target = event.currentTarget;
    const tooltip = this.tooltipMap.get(target);

    if (tooltip) {
      tooltip.classList.remove("show");
      tooltip.classList.add("hide");
      target.removeAttribute("aria-describedby");

      const removeTooltip = () => {
        if (tooltip && tooltip.parentNode) {
          tooltip.remove();
          this.tooltipMap.delete(target);
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

      tooltip.addEventListener("transitionend", cleanup, { once: true });
      setTimeout(cleanup, 300);
    }
  }

  static handleEscape(event) {
    if (event.key === "Escape") {
      this.hide({ currentTarget: document.activeElement });
    }
  }

  static getHoverHandlers() {
    let hoverTimer;

    return {
      safeShow: (event) => {
        clearTimeout(hoverTimer);
        const target = event.currentTarget;

        hoverTimer = setTimeout(() => Tooltip.show({ currentTarget: target }), 200);
      },
      safeHide: (event) => {
        clearTimeout(hoverTimer);
        const target = event.currentTarget;

        hoverTimer = setTimeout(() => Tooltip.hide({ currentTarget: target }), 50);
      },
    };
  }

  static initialize() {
    this.tooltipElements.forEach((el) => {
      const { safeShow, safeHide } = this.getHoverHandlers();

      el.addEventListener("mouseenter", safeShow);
      el.addEventListener("mouseleave", safeHide);

      el.addEventListener("focus", (event) => this.show(event));
      el.addEventListener("blur", (event) => this.hide(event));

      el.addEventListener("touchstart", (event) => this.show(event));
      el.addEventListener("touchend", (event) => this.hide(event));

      // el.addEventListener("pointerdown", (event) => this.show(event));
      // el.addEventListener("pointerup", (event) => this.hide(event));

      el.addEventListener("keydown", (event) => this.handleEscape(event));
    });
  }
}
