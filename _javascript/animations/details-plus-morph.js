import { useSpring } from "./../utils/use-spring";

export default class DetailsPlusMorph {
  constructor(details) {
    this.details = details;
    this.svg = details.querySelector("summary .icon-plus");
    if (!this.svg) return;

    const [horizontal, vertical] = this.svg.querySelectorAll("line");
    this.lines = { horizontal, vertical };

    // Define states for both lines
    this.frames = {
      plus: [
        { x1: 6,  y1: 12, x2: 18, y2: 12 },
        { x1: 12, y1: 18, x2: 12, y2: 6 }
      ],
      flat: [
        { x1: 8,  y1: 12, x2: 16, y2: 12 },
        { x1: 8,  y1: 12, x2: 16, y2: 12 }
      ],
      chevron: [
        { x1: 6,  y1: 9,  x2: 12, y2: 15 },
        { x1: 12, y1: 15, x2: 18, y2: 9 }
      ]
    };

    // Create springs for each line
    this.springs = [useSpring(), useSpring()];

    this.springs.forEach(([spring, api], i) => {
      const line = i === 0 ? this.lines.horizontal : this.lines.vertical;

      api.subscribe(values => {
        if (values.x1 !== undefined && values.y1 !== undefined && values.x2 !== undefined && values.y2 !== undefined) {
          line.setAttribute("x1", values.x1);
          line.setAttribute("y1", values.y1);
          line.setAttribute("x2", values.x2);
          line.setAttribute("y2", values.y2);
        }
      });
    });

    this.bindEvents();
    this.syncToState();
  }

  morphLines(target, config = { stiffness: 0.12, damping: 0.75 }) {
    this.springs.forEach(([spring, api], i) => {
      const current = {
        x1: spring.x1 ?? target[i].x1,
        y1: spring.y1 ?? target[i].y1,
        x2: spring.x2 ?? target[i].x2,
        y2: spring.y2 ?? target[i].y2,
      };

      api.start({ from: current, to: target[i], config});
    });
  }

  syncToState() {
    if (this.details.hasAttribute("open")) {
      this.morphLines(this.frames.chevron);
    } else {
      this.morphLines(this.frames.plus);
    }
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
