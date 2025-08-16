import LineMorph from "./../utils/animations/line-morph";

export default class DetailsPlusMorph {
  constructor(details) {
    this.details = details;
    this.svg = details.querySelector("summary .icon-plus");
    if (!this.svg) return;

    const lines = this.svg.querySelectorAll("line");
    this.lineMorph = new LineMorph(lines);

    this.frames = {
      plus: [
        [[6, 12], [18, 12]],
        [[12, 18], [12, 6]]
      ],
      flat: [
        [[8, 12], [16, 12]],
        [[8, 12], [16, 12]]
      ],
      chevron: [
        [[6, 9],  [12, 15]],
        [[12, 15],[18, 9]]
      ]
    };

    this.bindEvents();
    this.syncToState();
  }

  morphLines(target) {
    this.lineMorph.morph(target);
  }

  syncToState() {
    this.details.hasAttribute("open")
      ? this.morphLines(this.frames.chevron)
      : this.morphLines(this.frames.plus);
  }

  pressIn() {
    this.morphLines(this.frames.flat);
  }

  pressOut() {
    this.syncToState();
  }

  bindEvents() {
    const summary = this.details.querySelector("summary");

    summary.addEventListener("mousedown", () => this.pressIn());
    summary.addEventListener("mouseup",   () => this.pressOut());
    summary.addEventListener("mouseleave",() => this.pressOut());
    summary.addEventListener("touchstart", () => this.pressIn());
    summary.addEventListener("touchend",   () => this.pressOut());

    this.details.addEventListener("toggle", () => this.syncToState());
  }

  static initialize() {
    document.querySelectorAll("details").forEach(details => {
      new DetailsPlusMorph(details);
    });
  }
}
