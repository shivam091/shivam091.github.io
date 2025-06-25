class SkipLink {
  static get skipLinkElement() {
    return document.querySelector("[data-skip-link]");
  }

  static get mainContentElement() {
    return document.getElementById("main-content");
  }

  static initialize() {
    const skipLink = this.skipLinkElement;
    const mainContent = this.mainContentElement;

    if (!skipLink || !mainContent) return;

    skipLink.addEventListener("click", (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  }
}

export { SkipLink };
