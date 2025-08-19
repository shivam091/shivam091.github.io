import CircleMorphBoop from "./../utils/animations/circle-morph-boop";
import RectMorphBoop from "./../utils/animations/rect-morph-boop";

export default class ListIconBoop {
  constructor(svg, {
    duration = 150,
    triggerOnParent = true,
    config = { stiffness: 0.12, damping: 0.75 }
  } = {}) {
    this.svg = svg;
    this.duration = duration;
    this.triggerOnParent = triggerOnParent;

    const circles = svg.querySelectorAll("circle");
    const rects = svg.querySelectorAll("rect");

    // Setup morph boops
    this.circleBoop = new CircleMorphBoop(circles, {
      config,
      boop: [
        [[5, 6], [1.5, 0]],
        [[5, 12], [1.5, 0]],
        [[5, 18], [1.5, 0]],
      ],
    });

    this.rectBoop = new RectMorphBoop(rects, {
      config,
      boop: [
        [[9, 5.4], [13, 1.5], [0.6, 0]],
        [[9, 11.4], [13, 1.5], [0.6, 0]],
        [[9, 17.4], [13, 1.5], [0.6, 0]],
      ],
    });

    this._bindEvents();
  }

  boop(duration = this.duration) {
    this.circleBoop.trigger(duration);
    this.rectBoop.trigger(duration);
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
      circles: this.circleBoop.getState(),
      rects: this.rectBoop.getState(),
    };
  }

  static initialize(selector = ".icon-list", options = {}) {
    document.querySelectorAll(selector).forEach(icon => new ListIconBoop(icon, options));
  }
}
