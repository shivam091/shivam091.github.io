import { lerp, cubicBezier, animate } from "./../utils/animations";

export default class HamburgerMorph {
  constructor(button) {
    this.button = button;
    this.svg = button.querySelector("svg");
    const [top, middle, bottom] = this.svg.querySelectorAll("line");

    this.lines = { top, middle, bottom };
    this.isOpen = false;
    this.isPressed = false
    this.hoverTimeout = null;

    // Frames for closed/open and hover states
    this.frames = {
      closed: {
        top: { x1: 3, y1: 5, x2: 21, y2: 5 },
        middle: { x1: 3, y1: 12, x2: 21, y2: 12, opacity: 1 },
        bottom: { x1: 3, y1: 19, x2: 21, y2: 19 }
      },
      open: {
        top: { x1: 5, y1: 5, x2: 19, y2: 19 },
        middle: { x1: 3, y1: 12, x2: 21, y2: 12, opacity: 0 },
        bottom: { x1: 5, y1: 19, x2: 19, y2: 5 }
      }
    };

    this.hoverFrames = {
      closed: {
        top: { x1: 3, y1: 7, x2: 21, y2: 7 },
        middle: { x1: 3, y1: 12, x2: 21, y2: 12, opacity: 1 },
        bottom: { x1: 3, y1: 17, x2: 21, y2: 17 }
      },
      open: {
        top: { x1: 5, y1: 7, x2: 19, y2: 17 },
        middle: { x1: 3, y1: 12, x2: 21, y2: 12, opacity: 0 },
        bottom: { x1: 5, y1: 17, x2: 19, y2: 7 }
      }
    };

    this.pressedFrame = {
      top: { x1: 3, y1: 12, x2: 21, y2: 12 },
      middle: { x1: 3, y1: 12, x2: 21, y2: 12, opacity: 1 },
      bottom: { x1: 3, y1: 12, x2: 21, y2: 12 }
    };

    this.addHoverEvents();
    this.addPressEvents();
    this.observeDrawerState();
  }

  static get timing() {
    return { duration: 300, easing: cubicBezier(0.17, 0.67, 0.51, 1), fill: "forwards" };
  }

  get duration() { return this.constructor.timing.duration; }
  get hoverDuration() { return 150; }

  setLine(line, from, to, t) {
    line.setAttribute("x1", lerp(from.x1, to.x1, t));
    line.setAttribute("y1", lerp(from.y1, to.y1, t));
    line.setAttribute("x2", lerp(from.x2, to.x2, t));
    line.setAttribute("y2", lerp(from.y2, to.y2, t));
    if ("opacity" in from && "opacity" in to) {
      line.style.opacity = lerp(from.opacity, to.opacity, t);
    }
  }

  morphLines(from, to, duration = this.duration) {
    animate((t) => {
      const eased = this.constructor.timing.easing(t);
      this.setLine(this.lines.top, from.top, to.top, eased);
      this.setLine(this.lines.middle, from.middle, to.middle, eased);
      this.setLine(this.lines.bottom, from.bottom, to.bottom, eased);
    }, duration);
  }

  hover(isHovering) {
    const state = this.isOpen ? "open" : "closed";
    const from  = isHovering ? this.frames[state] : this.hoverFrames[state];
    const to    = isHovering ? this.hoverFrames[state] : this.frames[state];
    this.morphLines(from, to, this.hoverDuration);
  }

  handleHoverIn() {
    clearTimeout(this.hoverTimeout);
    this.hover(true);
    this.hoverTimeout = setTimeout(() => this.handleHoverOut(), this.hoverDuration);
  }

  handleHoverOut() {
    clearTimeout(this.hoverTimeout);
    this.hover(false);
  }

  morphToPressed() {
    const state = this.isOpen ? "open" : "closed";
    this.morphLines(this.frames[state], this.pressedFrame, 120);
  }

  restoreFromPressed() {
    const state = this.isOpen ? "open" : "closed";
    this.morphLines(this.pressedFrame, this.frames[state], 120);
  }

  observeDrawerState() {
    const observer = new MutationObserver(() => this.syncWithDrawer());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-drawer"] });
  }

  syncWithDrawer() {
    const open = document.documentElement.getAttribute("data-drawer") === "open";
    const from = open ? this.frames.closed : this.frames.open;
    const to = open ? this.frames.open : this.frames.closed;
    this.morphLines(from, to);
    this.isOpen = open;
  }

  addHoverEvents() {
    this.button.addEventListener("mouseenter", () => this.handleHoverIn());
    this.button.addEventListener("touchstart", () => this.handleHoverIn(), { passive: true });
  }

  addPressEvents() {
    const pressIn = () => {
      this.isPressed = true;
      this.morphToPressed();
    };

    const pressOut = () => {
      if (!this.isPressed) return;
      this.isPressed = false;
      this.restoreFromPressed();
    };

    this.button.addEventListener("mousedown", pressIn);
    this.button.addEventListener("touchstart", pressIn, { passive: true });

    this.button.addEventListener("mouseup", pressOut);
    this.button.addEventListener("mouseleave", pressOut);
    this.button.addEventListener("touchend", pressOut);
  }

  animateMorph(fromProgress, toProgress, duration = this.duration) {
    animate((t) => {
      const eased = this.constructor.timing.easing(t);
      const p = fromProgress + (toProgress - fromProgress) * eased;
      this.setLine(this.lines.top, this.frames.closed.top, this.frames.open.top, p);
      this.setLine(this.lines.middle, this.frames.closed.middle, this.frames.open.middle, p);
      this.setLine(this.lines.bottom, this.frames.closed.bottom, this.frames.open.bottom, p);
    }, duration);
  }
}
