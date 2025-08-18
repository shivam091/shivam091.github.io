import LineMorphBoop from "./../utils/animations/line-morph-boop";
import PolyLineMorphBoop from "./../utils/animations/polyline-morph-boop";

export default class ArrowRightBoop {
  constructor(svg, { duration = 150, triggerOnParent = true, config = { stiffness: 0.12, damping: 0.75 } } = {}) {
    this.svg = svg;
    this.duration = duration;
    this.triggerOnParent = triggerOnParent

    const line = svg.querySelector("line");
    const polyLine = svg.querySelector("polyline");

    // Setup morph boops
    this.lineBoop = new LineMorphBoop([line], {
      config,
      boop: [[[5, 12], [23, 12]]],
    });

    this.polyLineBoop = new PolyLineMorphBoop([polyLine], {
      config,
      boop: [[[17, 6], [24, 12], [17, 18]]],
    });

    this._bindEvents();
  }

  boop(duration = this.duration) {
    this.lineBoop.trigger(duration);
    this.polyLineBoop.trigger(duration);
  }

  _bindEvents() {
    const el = this.svg;
    const target = this.triggerOnParent && el.parentElement ? el.parentElement : el;
    const trigger = () => this.boop(this.duration);

    target.addEventListener("mouseenter", trigger);
    target.addEventListener("touchstart", trigger, { passive: true });
  }

  getState() {
    return {
      line: this.lineBoop.getState(),
      polyLine: this.polyLineBoop.getState(),
    };
  }

  static initialize(selector, options = {}) {
    document.querySelectorAll(selector).forEach(icon => new ArrowRightBoop(icon, options))
  }
}
