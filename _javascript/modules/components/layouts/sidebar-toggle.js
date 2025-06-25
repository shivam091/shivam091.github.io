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

    const durationStr = getComputedStyle(sidebar).getPropertyValue("--sidebar-motion-duration").trim();

    const duration = durationStr.endsWith("ms")
      ? parseFloat(durationStr)
      : durationStr.endsWith("s")
      ? parseFloat(durationStr) * 1000
      : 0;

    return duration;
  }

  static toggleSidebar() {
    const toggleButton = this.toggleButtonElement;
    if (!toggleButton) return;

    const isOpen = document.body.getAttribute("data-sidebar") === "open";
    const nextState = isOpen ? "close" : "open";

    toggleButton.setAttribute("aria-expanded", String(nextState === "open"));
    document.body.setAttribute("data-sidebar", nextState);
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
