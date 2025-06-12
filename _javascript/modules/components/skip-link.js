class SkipLink {
  static get skipLinkElement() {
    return document.getElementById("skip-link");
  }

  static get mainContentElement() {
    return document.getElementById("main-content");
  }

  static initialize() {
    const skipLink = SkipLink.skipLinkElement;
    const mainContent = SkipLink.mainContentElement;

    if (!skipLink || !mainContent) return;

    skipLink.addEventListener("click", (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  }
}

export { SkipLink };
