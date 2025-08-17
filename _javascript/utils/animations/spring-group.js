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
  }

  setTarget(targets) {
    for (const key in targets) {
      if (this.springs[key]) {
        this.springs[key].setTarget(targets[key]);
      }
    }
    if (!this.running) this.animate();
  }

  animate() {
    this.running = true;

    const step = () => {
      let allSettled = true;
      const snapshot = {};

      for (const key in this.springs) {
        const s = this.springs[key];
        snapshot[key] = s.value;
        if (s.raf) allSettled = false;
      }

      this.listeners.forEach(fn => fn(snapshot));

      if (!allSettled) {
        this.frameId = requestAnimationFrame(step);
      } else {
        this.running = false;
      }
    };

    step();
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
}
