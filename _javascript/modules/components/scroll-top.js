class ScrollTop {
  static isVisible = false;
  static ticking = false;

  static get scrollTopElement() {
    return document.querySelector("[data-scroll-top]");
  }

  static getScrollThreshold() {
    const el = ScrollTop.scrollTopElement;

    return parseInt(el?.getAttribute("data-scroll-threshold") || "250", 10);
  }

  static handleClick(event) {
    event.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  static updateVisibility() {
    const el = ScrollTop.scrollTopElement;
    if (!el) return;

    const threshold = ScrollTop.getScrollThreshold();
    const shouldShow = window.scrollY > threshold;

    if (shouldShow && !ScrollTop.isVisible) {
      el.setAttribute("data-state", "visible");

      ScrollTop.isVisible = true;
    } else if (!shouldShow && ScrollTop.isVisible) {
      el.setAttribute("data-state", "hidden");

      ScrollTop.isVisible = false;
    }
  }

  static initialize() {
    const el = ScrollTop.scrollTopElement;
    if (!el) return;

    el.addEventListener("click", ScrollTop.handleClick);

    // Throttle or debounce to avoid over-triggering updateVisibility()
    window.addEventListener("scroll", () => {
      if (!ScrollTop.ticking) {
        window.requestAnimationFrame(() => {
          ScrollTop.updateVisibility();
          ScrollTop.ticking = false;
        });
        ScrollTop.ticking = true;
      }
    }, { passive: true });

    window.addEventListener("load", ScrollTop.updateVisibility);
    ScrollTop.updateVisibility();
  }
}

export { ScrollTop };
