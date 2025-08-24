// const timeline = new SpringTimeline();
// timeline.add(opacity, { at: 0 });
// timeline.add(bg, { at: 500 }); // start after 500ms

export default class SpringTimeline {
  constructor() {
    this.items = [];
    this.time = 0;
  }

  add(spring, { at = 0 } = {}) {
    this.items.push({ spring, at });
  }

  update(dt) {
    this.time += dt;
    this.items.forEach(({ spring, at }) => {
      if (this.time >= at) spring.update(dt);
    });
  }

  reset() {
    this.time = 0;
  }
}
