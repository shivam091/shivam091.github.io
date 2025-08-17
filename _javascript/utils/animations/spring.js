export default class Spring {
  constructor(value = 0, { stiffness = 0.1, damping = 0.8, mass = 1, threshold = 0.001 } = {}) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.threshold = threshold;
    this.raf = null;
  }

  setTarget(target) {
    this.target = target;
    if (!this.raf) this.animate();
  }

  animate() {
    const update = () => {
      const force = (this.target - this.value) * this.stiffness;
      const acceleration = force / this.mass;
      this.velocity = this.velocity * this.damping + acceleration;
      this.value += this.velocity;

      if (Math.abs(this.velocity) < this.threshold && Math.abs(this.target - this.value) < this.threshold) {
        this.value = this.target;
        this.raf = null;
        return;
      }

      this.raf = requestAnimationFrame(update);
    };
    update();
  }
}
