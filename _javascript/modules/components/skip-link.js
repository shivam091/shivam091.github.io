export default class SkipLink {
  static get skipLinkElement() {
    return document.querySelector("[data-skip-link]");
  }

  static initialize() {
    const skipLink = this.skipLinkElement;
    const targetSelector = skipLink.getAttribute("data-skip-to");
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) return;

    skipLink.addEventListener("click", (event) => {
      event.preventDefault();

      // Make sure the target is focusable
      if (!targetElement.hasAttribute("tabindex")) {
        targetElement.setAttribute("tabindex", "-1");
      }

      targetElement.focus({ preventScroll: true });
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}
