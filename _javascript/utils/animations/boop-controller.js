/**
 * Generic BoopController
 * ----------------------
 * Wraps any animator with "boop" behavior: morph to boop target,
 * then return to rest state after a duration.
 */
export default class BoopController {
  constructor(animator, rest, boopValues) {
    this.animator = animator;
    this.rest = rest;
    this.boopValues = boopValues;
    this.timer = null;
  }

  trigger(duration = 150) {
    clearTimeout(this.timer);

    if (this.animator.morph) {
      this.animator.morph(this.boopValues);
    } else if (this.animator.setTarget) {
      this.animator.setTarget(this.boopValues);
    }

    this.timer = setTimeout(() => {
      if (this.animator.morph) {
        this.animator.morph(this.rest);
      } else if (this.animator.setTarget) {
        this.animator.setTarget(this.rest);
      }
    }, duration);
  }

  getState() {
    return this.animator.getState();
  }
}
