class SidebarToggle {
  static get sidebarElement() {
    return document.getElementById("sidebar");
  }

  static get toggleButtonElement() {
    return document.getElementById("sidebar-toggle");
  }

  static get maskElement() {
    return document.getElementById("mask");
  }

  static get transitionDuration() {
    const sidebar = this.sidebarElement;
    if (!sidebar) return 0;

    const durationStr = getComputedStyle(sidebar).getPropertyValue("--sidebar-transition-duration").trim();

    const duration = durationStr.endsWith("ms")
      ? parseFloat(durationStr)
      : durationStr.endsWith("s")
      ? parseFloat(durationStr) * 1000
      : 0;

    return duration;
  }

  static gracefullyClose() {
    const sidebar = this.sidebarElement;
    if (!sidebar) return;

    sidebar.setAttribute("data-state", "close");

    setTimeout(() => {
      if (sidebar.getAttribute("data-state") === "close") {
        sidebar.setAttribute("data-state", "idle");
      }
    }, this.transitionDuration);
  }

  static toggleSidebar() {
    const sidebar = this.sidebarElement;
    const toggleButton = this.toggleButtonElement;

    if (!toggleButton || !sidebar) return;

    const isOpen = sidebar.getAttribute("data-state") === "open";
    const nextState = isOpen ? "close" : "open";

    sidebar.setAttribute("data-state", nextState);
    toggleButton.setAttribute("data-state", nextState);
    toggleButton.setAttribute("aria-expanded", String(nextState === "open"));
    document.body.setAttribute("data-sidebar", nextState);

    if (isOpen) {
      this.gracefullyClose();
    }
  }

  static initialize() {
    const toggleButton = this.toggleButtonElement;
    const mask = this.maskElement;

    if (!toggleButton || !mask) return;

    toggleButton.addEventListener("click", this.toggleSidebar.bind(this));
    mask.addEventListener("click", this.toggleSidebar.bind(this));
  }
}

export { SidebarToggle };
