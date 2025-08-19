import LineMorph from "./../utils/animations/line-morph";

export default class HashIconMorph {
  constructor(svg, { stiffness = 0.12, damping = 0.75, triggerOnParent = true } = {}) {
    this.svg = svg;
    this.lines = svg.querySelectorAll("line");
    this.spring = { stiffness, damping };
    this.triggerOnParent = triggerOnParent;

    this.lineMorph = new LineMorph(this.lines, this.spring);

    this.rest = this.lineMorph.getState().map(polyPts =>
      polyPts.map(pt => [pt.x, pt.y])
    );

    this.plus = [
      [[4, 12], [20, 12]],
      [[4, 12], [20, 12]],
      [[12, 3], [12, 21]],
      [[12, 3], [12, 21]],
    ];

    this.active = false;

    this._bindEvents();
  }

  _bindEvents() {
    const el = this.svg;
    const target = this.triggerOnParent && el.parentElement ? el.parentElement : el;

    target.addEventListener("mousedown", () => this.morphToPlus());
    target.addEventListener("mouseup", () => this.morphToHash());
    target.addEventListener("mouseleave", () => this.morphToHash());
    target.addEventListener("touchstart", e => {
      e.preventDefault();
      this.morphToPlus();
    });
    target.addEventListener("touchend", () => this.morphToHash());
  }

  morphToPlus() {
    if (!this.active) {
      this.lineMorph.morph(this.plus);
      this.active = true;
    }
  }

  morphToHash() {
    if (this.active) {
      this.lineMorph.morph(this.rest);
      this.active = false;
    }
  }

  static initialize(options = {}) {
    document.querySelectorAll(".icon-hash").forEach(svg => {
      new HashIconMorph(svg, options);
    });
  }
}
