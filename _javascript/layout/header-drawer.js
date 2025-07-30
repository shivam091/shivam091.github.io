import HamburgerMorph from "./../animations/hamburger-morph";

export default class HeaderDrawer {
  static drawer = null;
  static toggleButton = document.querySelector(".toggle-menu");
  static animation = null;
  static isOpen = false;
  static hamburger = null;

  static get timing() {
    return { duration: 300, easing: "cubic-bezier(0.17, 0.67, 0.51, 1)", fill: "forwards" };
  }

  static get keyframes() {
    return [
      { opacity: 0, transform: "translateX(25%)" },
      { opacity: 1, transform: "translateX(0)" }
    ];
  }

  static ensureDrawer() {
    if (!this.drawer) {
      const template = document.getElementById("header-drawer-template");
      document.body.appendChild(template.content.cloneNode(true));
      this.drawer = document.getElementById("header-drawer");

      this.animation = this.drawer.animate(this.keyframes, this.timing);
      this.animation.pause();
      this.animation.currentTime = 0;
    }
  }

  static openDrawer() {
    this.ensureDrawer();
    this.isOpen = true;
    document.documentElement.setAttribute("data-drawer", "open");
    this.toggleButton?.setAttribute("aria-expanded", "true");

    this.animation.playbackRate = 1;
    this.animation.play();
    this.hamburger?.animateMorph(0, 1, this.timing.duration);
  }

  static closeDrawer() {
    if (!this.drawer || !this.animation) return;
    this.isOpen = false;
    document.documentElement.setAttribute("data-drawer", "close");
    this.toggleButton?.setAttribute("aria-expanded", "false");

    this.animation.playbackRate = -1;
    this.animation.play();
    this.hamburger?.animateMorph(1, 0, this.timing.duration);
  }

  static toggleDrawer() {
    this.isOpen ? this.closeDrawer() : this.openDrawer();
  }

  static initialize() {
    document.documentElement.setAttribute("data-drawer", "close");

    if (!this.toggleButton) return;
    if (!this.hamburger) this.hamburger = new HamburgerMorph(this.toggleButton);

    this.toggleButton.addEventListener("click", () => this.toggleDrawer());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) this.closeDrawer();
    });
  }
}
