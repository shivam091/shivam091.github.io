class ScrollTop {
  static isVisible = false;
  static ticking = false;

  static get target() {
    return document.querySelector("[data-scroll-top]");
  }

  static handleClick(event) {
    event.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  static toggleVisibility() {
    const target = ScrollTop.target;
    if (!target) return;

    const threshold = parseInt(target.getAttribute("data-scroll-threshold") || "250", 10);
    const shouldShow = window.scrollY > threshold;

    if (shouldShow && !ScrollTop.isVisible) {
      target.setAttribute("data-state", "visible");

      ScrollTop.isVisible = true;
    } else if (!shouldShow && ScrollTop.isVisible) {
      target.setAttribute("data-state", "hidden");

      ScrollTop.isVisible = false;
    }
  }
}

function bindScrollToTop() {
  const target = ScrollTop.target;
  if (!target) return;

  target.addEventListener("click", ScrollTop.handleClick);

  // Throttle or debounce to avoid over-triggering toggleVisibility()
  window.addEventListener("scroll", () => {
    if (!ScrollTop.ticking) {
      window.requestAnimationFrame(() => {
        ScrollTop.toggleVisibility();
        ScrollTop.ticking = false;
      });
      ScrollTop.ticking = true;
    }
  }, { passive: true });

  window.addEventListener("load", ScrollTop.toggleVisibility);
  ScrollTop.toggleVisibility();
}

export { ScrollTop, bindScrollToTop };
