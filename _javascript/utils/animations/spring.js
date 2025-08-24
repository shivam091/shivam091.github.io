// Animate a number:
//
// import Spring from "./spring";
//
// const s = new Spring(0);
// s.setTarget(100);
//
// // in group, snapshot → { x: 42.3 }
//
// Animate a color:
//
// import Spring from "./spring";
// import { colorMix } from "./utils/interpolators";
//
// const colorSpring = new Spring("rgb(255,0,0)", { interpolator: colorMix });
// colorSpring.setTarget("rgb(0,0,255)");
//
// // snapshot → { color: "rgb(128,0,128)" }
//
// Animate an SVG path
//
// import Spring from "./spring";
// import { pathMorph } from "./utils/interpolators";
//
// const startPath = [[0,0], [50,100], [100,0]];
// const endPath   = [[0,50], [50,150], [100,50]];
//
// const pathSpring = new Spring(startPath, { interpolator: pathMorph });
// pathSpring.setTarget(endPath);
//
// // snapshot → { path: [[0,25],[50,125],[100,25]] }
//
// Animate HSLA
// import { hslaColorMix } from "./utils/interpolators";
//
// const spring = new Spring("hsla(200 100% 50% / 0.2)", { interpolator: hslaColorMix });
// spring.setTarget("hsla(200 100% 50% / 1)"); // fade in while staying blue

import { lerp } from "./../interpolators";

export default class Spring {
  constructor(value, { stiffness = 0.1, damping = 0.8, mass = 1, threshold = 0.001, interpolator = null } = {}) {
    this.value = value;
    this.target = value;

    // progress spring
    this.progress = 0;
    this.velocity = 0;

    // config
    this.spring = { stiffness, damping, mass, threshold };

    // interpolation
    this.from = value;
    this.to = value;
    this.interpolator = interpolator || ((a, b, t) => lerp(a, b, t));
  }

  setTarget(target) {
    this.from = this.value;   // start from current
    this.to = target;         // animate towards
    this.progress = 0;        // reset spring
    this.target = 1;          // normalized target
  }

  update(dt) {
    // spring physics on progress
    const force = (this.target - this.progress) * this.spring.stiffness;
    const acceleration = force / this.spring.mass;

    // this.velocity *= Math.exp(-this.spring.damping * dt);
    // this.velocity += acceleration * dt;

    this.velocity = this.velocity * Math.pow(this.spring.damping, dt) + acceleration * dt;
    this.progress += this.velocity * dt;

    const settled =
      Math.abs(this.velocity) < this.spring.threshold &&
      Math.abs(this.target - this.progress) < this.spring.threshold;

    if (settled) {
      this.progress = this.target;
      this.velocity = 0;
    }

    // compute interpolated value
    this.value = this.interpolator(this.from, this.to, this.progress);

    return settled;
  }
}
