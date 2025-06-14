class SidebarToggle {
  static TRANSITION_DELAY = 400;

  static get sidebarElement() {
    return document.getElementById("sidebar");
  }

  static get toggleButtonElement() {
    return document.getElementById("sidebar-toggle");
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

    if (!toggleButton || !sidebar) return;

    toggleButton.addEventListener("click", () => {
      const isOpen = sidebar.getAttribute("data-state") === "open";
      const nextState = isOpen ? "close" : "open";

      sidebar.setAttribute("data-state", nextState);
      toggleButton.setAttribute("data-state", nextState);
      toggleButton.setAttribute("aria-expanded", String(nextState === "open"));
      document.body.setAttribute("data-sidebar", nextState);

      if (isOpen) this.gracefullyClose();
    });
  }
}

export { SidebarToggle };
