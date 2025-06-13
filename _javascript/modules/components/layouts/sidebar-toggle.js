class SidebarToggle {
  static TRANSITION_DELAY = 400;

  static get sidebarElement() {
    return document.getElementById("sidebar");
  }

  static get toggleButtonElement() {
    return document.getElementById("sidebar-toggle");
  }

  static get mainContentElement() {
    return document.getElementById("main-content");
  }

  static gracefullyClose() {
    const sidebar = this.sidebarElement;
    if (!sidebar) return;

    sidebar.setAttribute("data-state", "close");

    setTimeout(() => {
      if (sidebar.getAttribute("data-state") === "close") {
        sidebar.setAttribute("data-state", "idle");
      }
    }, this.TRANSITION_DELAY);
  }

  static initialize() {
    const sidebar = this.sidebarElement;
    const toggleButton = this.toggleButtonElement;
    const mainContent = this.mainContentElement;

    if (!toggleButton || !sidebar || !mainContent) return;

    toggleButton.addEventListener("click", () => {
      const isOpen = sidebar.getAttribute("data-state") === "open";
      const nextState = isOpen ? "close" : "open";

      sidebar.setAttribute("data-state", nextState);
      mainContent.setAttribute("data-sidebar", nextState);
      toggleButton.setAttribute("data-state", nextState);
      toggleButton.setAttribute("aria-expanded", String(nextState === "open"));

      if (isOpen) {
        this.gracefullyClose();
      }
    });
  }
}

export { SidebarToggle };
