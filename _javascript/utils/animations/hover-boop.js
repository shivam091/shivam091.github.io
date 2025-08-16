import SpringBoop from "./spring-boop";

export default class HoverBoop {
  constructor(
    selector,
    { stiffness = 0.2, damping = 0.7, boop = {}, triggerOnParent = true } = {}
  ) {
    this.config = { stiffness, damping, boop };
    this.triggerOnParent = triggerOnParent;

    document.querySelectorAll(selector).forEach(el => this._setup(el));
  }

  _setup(el) {
    // Ensure defaults are applied immediately
    el.style.transform = this._transform({});
    el.style.backfaceVisibility = "hidden";

    // Init only for keys in boop
    const init = Object.fromEntries(
      Object.keys(this.config.boop).map(k => [k, k.includes("scale") ? 1 : 0])
    );

    const spring = new SpringBoop(init, this.config);

    spring.onUpdate(vals => {
      el.style.transform = this._transform(vals);
      el.style.backfaceVisibility = "hidden";
    });

    const target = this.triggerOnParent && el.parentElement ? el.parentElement : el;
    const trigger = () => spring.trigger();

    target.addEventListener("mouseenter", trigger);
    target.addEventListener("touchstart", trigger, { passive: true });
  }

  _transform(vals) {
    const v = { translateX: 0, translateY: 0, rotate: 0, scale: 1, ...vals };
    return `translate(${v.translateX}px, ${v.translateY}px) rotate(${v.rotate}deg) scale(${v.scale})`;
  }

  static initialize(selector = ".icon", options = {}) {
    new HoverBoop(selector, options);
  }
}
