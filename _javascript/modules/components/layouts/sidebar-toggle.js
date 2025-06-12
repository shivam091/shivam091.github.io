class SidebarToggle {
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
    const sidebar = SidebarToggle.sidebarElement;
    if (!sidebar) return;

    sidebar.setAttribute("data-state", "close");

    setTimeout(() => {
      if (sidebar.getAttribute("data-state") === "close") {
        sidebar.setAttribute("data-state", "idle");
      }
    }, 400);
  }

  static initialize() {
    const sidebar = SidebarToggle.sidebarElement;
    const toggleButton = SidebarToggle.toggleButtonElement;
    const mainContent = SidebarToggle.mainContentElement;

    if (!toggleButton || !sidebar || !mainContent) return;

    toggleButton.addEventListener("click", () => {
      const isOpen = sidebar.getAttribute("data-state") === "open";
      const nextState = isOpen ? "close" : "open";

      sidebar.setAttribute("data-state", nextState);
      mainContent.setAttribute("data-sidebar", nextState);
      toggleButton.setAttribute("data-state", nextState);
      toggleButton.setAttribute("aria-expanded", String(nextState === "open"));

      if (isOpen) {
        SidebarToggle.gracefullyClose();
      }
    });
  }
}

export { SidebarToggle };
