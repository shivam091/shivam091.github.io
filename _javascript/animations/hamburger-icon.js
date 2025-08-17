import { HOVER_FRAMES, PRESSED_FRAME } from "./../constants/hamburger-frames";

export default class HamburgerIcon {
  constructor(parent) {
    this.parent = parent; // reference to HamburgerMorph
    this.isHovering = false;
    this.isPressed = false;
    this.hoverTimeout = null;

    this.addHoverEvents();
    this.addPressEvents();
  }

  get hoverDuration() { return 150; }

  handleHoverIn = () => {
    this.clearHoverTimeout();
    this.hover(true);
    this.hoverTimeout = setTimeout(() => this.handleHoverOut(), this.hoverDuration);
  }

  handleHoverOut = () => {
    this.clearHoverTimeout();
    this.hover(false);
  }

  clearHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  hover(isHovering) {
    this.isHovering = isHovering;
    const state = this.parent.isOpen ? "open" : "closed";
    const target = isHovering ? HOVER_FRAMES[state] : this.parent.frames[state];
    this.parent.morphLines(target);
  }

  morphToPressed() {
    this.clearHoverTimeout();
    this.isHovering = false;
    this.parent.morphLines(PRESSED_FRAME);
  }

  restoreFromPressed() {
    const state = this.parent.isOpen ? "open" : "closed";
    const target = this.isHovering ? HOVER_FRAMES[state] : this.parent.frames[state];
    this.parent.morphLines(target);
  }

  addHoverEvents() {
    const btn = this.parent.button;
    btn.addEventListener("mouseenter", this.handleHoverIn);
    btn.addEventListener("touchstart", this.handleHoverIn, { passive: true });
  }

  addPressEvents() {
    const btn = this.parent.button;

    const pressIn = () => {
      if (this.isPressed) return;
      this.isPressed = true;
      this.morphToPressed();
    };

    const pressOut = () => {
      if (!this.isPressed) return;
      this.isPressed = false;
      this.restoreFromPressed();
    };

    btn.addEventListener("mousedown", pressIn);
    btn.addEventListener("touchstart", pressIn, { passive: true });
    btn.addEventListener("mouseup", pressOut);
    btn.addEventListener("mouseleave", pressOut);
    btn.addEventListener("touchend", pressOut);
    btn.addEventListener("touchcancel", pressOut);
  }
}
