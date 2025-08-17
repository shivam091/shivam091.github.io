import SpringBoop from "./../utils/animations/spring-boop";

export default class DiamondBoop {
  constructor(svg, options = {}) {
    this.svg = svg;
    this.paths = svg.querySelectorAll("path");

    const initial = { top: 0, left: 0, right: 0, bottom: 0 };
    const boop = { top: 3, left: 3, right: -3, bottom: -3 };

    this.boopInstance = new SpringBoop(initial, { ...options, boop });
    this.boopInstance.onUpdate(state => this.render(state));
  }

  boop(duration = 150) {
    this.boopInstance.trigger(duration);
  }

  render(state) {
    const [top, left, right, bottom] = this.paths;

    if (top) top.style.transform = `translateY(${state.top}px)`;
    if (left) left.style.transform = `translateX(${state.left}px)`;
    if (right) right.style.transform = `translateX(${state.right}px)`;
    if (bottom) bottom.style.transform = `translateY(${state.bottom}px)`;
  }
}
