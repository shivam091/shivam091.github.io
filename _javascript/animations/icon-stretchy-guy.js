import CircleMorph from "./../utils/animations/circle-morph";
import LineMorph from "./../utils/animations/line-morph";
import PathMorph from "./../utils/animations/path-morph";

export default class IconStretchyGuy {
  constructor(svg, { stiffness = 0.12, damping = 0.75 } = {}) {
    this.svg = svg;
    this.spring = { stiffness, damping };

    this.head = svg.querySelector(".head");
    this.body = svg.querySelector(".body");
    this.leftLeg = svg.querySelector(".left-leg");
    this.rightLeg = svg.querySelector(".right-leg");
    this.leftArm = svg.querySelector(".left-arm");
    this.rightArm = svg.querySelector(".right-arm");

    this.leftEye = svg.querySelector(".left-eye");
    this.rightEye = svg.querySelector(".right-eye");
    this.nose = svg.querySelector(".nose");
    this.mouth = svg.querySelector(".mouth");

    this.circlesMorph = new CircleMorph([this.head, this.leftEye, this.rightEye], this.spring);
    this.linesMorph = new LineMorph(
      [this.body, this.leftLeg, this.rightLeg, this.leftArm, this.rightArm, this.nose],
      this.spring
    );
    this.pathMorph = new PathMorph([this.mouth], this.spring);

    this.rest = {
      circles: [
        [[25, 35], [15, 0]],   // Head
        [[20, 30], [0.5, 0]],  // Left eye
        [[30, 30], [0.5, 0]],  // Right eye
      ],
      lines: [
        [[25, 50], [25, 80]],  // Body
        [[25, 80], [15, 100]], // Left leg
        [[25, 80], [35, 100]], // Right leg
        [[25, 57], [15, 70]],  // Left arm
        [[25, 57], [35, 70]],  // Right arm
        [[25, 34], [25, 38]],  // Nose
      ],
      paths: [
        // Mouth (M20 41 Q25 45 30 41)
        [[20, 41], [25, 45], [30, 41]]
      ]
    };

    this.stretchy = {
      circles: [
        [[25, 15], [15, 0]],   // Head
        [[20, 10], [0.5, 0]],  // Left eye
        [[30, 10], [0.5, 0]],  // Right eye
      ],
      lines: [
        [[25, 30], [25, 70]],  // Body
        [[25, 70], [15, 100]], // Left leg
        [[25, 70], [35, 100]], // Right leg
        [[25, 37], [15, 60]],  // Left arm
        [[25, 37], [35, 60]],  // Right arm
        [[25, 14], [25, 18]],  // Nose
      ],
      paths: [
        // Stretchy mouth
        [[20, 21], [25, 25], [30, 21]]
      ]
    };

    this.transition = {
      circles: [
        [[25, 35], [15, 0]],   // Head
        [[20, 30], [0.5, 0]],  // Left eye
        [[30, 30], [0.5, 0]],  // Right eye
      ],
      lines: [
        [[25, 50], [25, 80]],  // Body
        [[25, 80], [15, 100]], // Left leg
        [[25, 80], [35, 100]], // Right leg
        [[25, 57], [5, 50]],   // Left arm
        [[25, 57], [45, 50]],  // Right arm
        [[25, 34], [25, 38]],  // Nose
      ],
      paths: [
        [[20, 41], [25, 45], [30, 41]]
      ]
    };

    this._bindEvents();
  }

  _bindEvents() {
    this.svg.addEventListener("mouseenter", () => this.morphTo(this.stretchy));
    this.svg.addEventListener("mouseleave", () => this.morphLeave());
  }

  morphTo(state) {
    this.circlesMorph.morph(state.circles);
    this.linesMorph.morph(state.lines);
    this.pathMorph.morph(state.paths);
  }

  morphLeave() {
    this.morphTo(this.transition);
    setTimeout(() => this.morphTo(this.rest), 300);
  }

  static initialize(options = {}) {
    const stretchyGuy = document.querySelector(".icon-stretchy-guy");
    if (stretchyGuy) new IconStretchyGuy(stretchyGuy, options);
  }
}
