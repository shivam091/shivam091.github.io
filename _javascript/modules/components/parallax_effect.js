export default class ParallaxEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.parallaxStrength = options.parallaxStrength || 0.2;

    this._applyParallax = () => {
      const offset = window.scrollY * this.parallaxStrength;
      this.cloudsElement?.style.setProperty("--parallax-offset", `${offset}px`);
    };

    this.init();
  }

  get cloudsElement() {
    return this.element.querySelector("svg");
  }

  init() {
    window.addEventListener("scroll", this._applyParallax);
    this._applyParallax();
  }

  destroy() {
    window.removeEventListener("scroll", this._applyParallax);
  }

  static initAll(selector, options = {}) {
    document.querySelectorAll(selector).forEach(el => new ParallaxEffect(el, options));
  }
}
