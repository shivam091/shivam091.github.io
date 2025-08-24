// import SpringGroup from "./spring-group";
// import { hslColorMix } from "./utils/interpolators";
//
// const group = new SpringGroup({
//   color: "hsl(350, 100%, 50%)" // red
// });
//
// // Override interpolator for this spring
// group.springs.color.interpolator = hslColorMix;
//
// group.subscribe(state => {
//   document.body.style.background = state.color; // animate background smoothly
// });
//
// // Animate from red to green via shortest hue rotation
// group.setTarget({
//   color: "hsl(120, 100%, 50%)"
// });
//
// import SpringGroup from "./spring-group";
// import { hslaColorMix } from "./utils/interpolators";
//
// const group = new SpringGroup({
//   bg: "hsla(0 100% 50% / 0.5)"
// });
//
// // custom interpolator for background
// group.springs.bg.interpolator = hslaColorMix;
//
// group.subscribe(state => {
//   document.body.style.backgroundColor = state.bg;
// });
//
// group.setTarget({
//   bg: "hsla(240 100% 50% / 1)" // semi-transparent red → solid blue
// });

import Spring from "./spring";

export default class SpringGroup {
  constructor(initial = {}, config = {}) {
    this.springs = {};
    this.listeners = new Set();

    for (const key in initial) {
      this.springs[key] = new Spring(initial[key], config);
    }

    this.running = false;
    this.frameId = null;
    this.lastTime = 0;
  }

  setTarget(targets) {
    for (const key in targets) {
      if (this.springs[key]) {
        this.springs[key].setTarget(targets[key]);
      } else {
        // lazy-create new spring if missing
        this.springs[key] = new Spring(targets[key]);
      }
    }

    if (!this.running) {
      this.animate();
    } else {
      this.lastTime = performance.now(); // smooth retargeting
    }
  }

  animate() {
    this.running = true;
    this.lastTime = performance.now();

    const step = () => {
      const now = performance.now();
      const dt = (now - this.lastTime) / 16.67; // normalize to ~60fps
      this.lastTime = now;

      let allSettled = true;
      const snapshot = {};

      for (const key in this.springs) {
        const s = this.springs[key];
        const settled = s.update(dt);
        snapshot[key] = s.value;
        if (!settled) allSettled = false;
      }

      this.listeners.forEach(fn => fn(snapshot));

      if (!allSettled) {
        this.frameId = requestAnimationFrame(step);
      } else {
        this.running = false;
        this.frameId = null;
      }
    };

    this.frameId = requestAnimationFrame(step);
  }

  subscribe(fn) {
    this.listeners.add(fn);
    fn(this.getState());
    return () => this.listeners.delete(fn);
  }

  getState() {
    const snapshot = {};
    for (const key in this.springs) {
      snapshot[key] = this.springs[key].value;
    }
    return snapshot;
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
      this.running = false;
    }
  }

  resume() {
    if (!this.running) {
      this.animate();
    }
  }
}
