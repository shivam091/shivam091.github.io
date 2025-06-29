import setStyles from "./../../utils/styles";

export default class Accordion {
  static get accordions() {
    return document.querySelectorAll("[data-accordion]");
  }

  static getItems(container) {
    return container.querySelectorAll(".accordion-item");
  }

  static getHeader(item) {
    return item.querySelector(".accordion-header");
  }

  static getToggle(item) {
    return item.querySelector(".accordion-toggle");
  }

  static getBody(item) {
    return item.querySelector(".accordion-body");
  }

  static isTransitioning(item) {
    return item._isTransitioning === true;
  }

  static setTransitioning(item, value) {
    item._isTransitioning = value;
  }

  static animateHeight(element, targetHeight, callback, startHeight = element.scrollHeight) {
    setStyles(element, {
      overflow: "hidden",
      height: `${startHeight}px`,
    });

    void element.offsetHeight; // force reflow

    requestAnimationFrame(() => {
      element.style.height = `${targetHeight}px`;

      const onTransitionEnd = () => {
        element.removeEventListener("transitionend", onTransitionEnd);
        if (callback) callback();
      };

      element.addEventListener("transitionend", onTransitionEnd, { once: true });
    });
  }

  static expand(item) {
    if (this.isTransitioning(item)) return;
    this.setTransitioning(item, true);

    const body = this.getBody(item);
    setStyles(body, { display: "block" });

    item.setAttribute("data-expanded", true);

    this.animateHeight(body, body.scrollHeight, () => {
      setStyles(body, { height: "auto", overflow: "visible" });
      this.setTransitioning(item, false);
    });
  }

  static collapse(item) {
    if (this.isTransitioning(item)) return;
    this.setTransitioning(item, true);

    const body = this.getBody(item);

    item.removeAttribute("data-expanded");

    this.animateHeight(body, 0, () => {
      setStyles(body, { display: "none" });
      this.setTransitioning(item, false);
    }, body.scrollHeight);
  }

  static collapseAllExcept(container, currentItem) {
    this.getItems(container).forEach(item => {
      if (item !== currentItem && item.hasAttribute("data-expanded")) {
        this.collapse(item);
      }
    });
  }

  static toggle(container, item) {
    if (this.isTransitioning(item)) return;

    const isExpanded = item.hasAttribute("data-expanded");
    const toggleButton = this.getToggle(item);
    toggleButton?.setAttribute("aria-expanded", String(!isExpanded));

    if (isExpanded) {
      this.collapse(item);
    } else {
      this.collapseAllExcept(container, item);
      this.expand(item);
    }
  }

  static bind(container, item) {
    const toggleButton = this.getToggle(item);
    const body = this.getBody(item);
    if (!toggleButton || !body) return;

    toggleButton.addEventListener("click", () => this.toggle(container, item));

    setStyles(body, { display: "none", height: "0" });
  }

  static initialize() {
    this.accordions.forEach(container => {
      this.getItems(container).forEach(item => this.bind(container, item));
    });
  }
}
