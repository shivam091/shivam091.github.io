import { lerp, clamp } from "./../utils/animations";
import { MOTION_DURATIONS } from "./../constants/motion";

export default class IconWobble {
  constructor(selectors, { duration = MOTION_DURATIONS.medium, keyframes = [0, -25, 25, 0] } = {}) {
    this.icons = document.querySelectorAll(selectors);
    this.duration = duration;
    this.keyframes = keyframes;

    this.bindEvents();
  }

  bindEvents() {
    this.icons.forEach(icon => {
      icon.addEventListener("mouseenter", () => this.animate(icon));
      icon.addEventListener("touchstart", () => this.animate(icon));
    });
  }

  animate(icon) {
    let startTime;

    const step = (time) => {
      if (!startTime) startTime = time;
      let elapsed = time - startTime;
      let t = Math.min(elapsed / this.duration, 1);

      const segmentCount = this.keyframes.length - 1;
      const segment = clamp(Math.floor(t * segmentCount), 0, segmentCount - 1);

      const deg = lerp(this.keyframes[segment], this.keyframes[segment + 1], (t * segmentCount) - segment);
      icon.style.transform = `rotate(${deg}deg)`;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        // ensure exact final position
        icon.style.transform = `rotate(${this.keyframes[this.keyframes.length - 1]}deg)`;
      }
    };

    requestAnimationFrame(step);
  }

  static initialize(selectors = ".icon", options = {}) {
    new IconWobble(selectors, options);
  }
}
