export default class LazyLoader {
  constructor(options = {}) {
    this.settings = Object.assign({
      selector: ".lazy",
      root: null,
      rootMargin: "0px 0px 300px 0px",
      threshold: 0.1,
    }, options);

    this.observer = new IntersectionObserver(
      this.onIntersection.bind(this),
      {
        root: this.settings.root,
        rootMargin: this.settings.rootMargin,
        threshold: this.settings.threshold
      }
    );
  }

  observe() {
    const elements = document.querySelectorAll(this.settings.selector);
    elements.forEach(el => this.observer.observe(el));
  }

  onIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    }
  }

  loadElement(el) {
    // <img> tag support
    if (el.tagName === "IMG") {
      if (el.dataset.src) el.src = el.dataset.src;
      if (el.dataset.srcset) el.srcset = el.dataset.srcset;
    }

    // Background image support
    if (el.dataset.bg) {
      el.style.backgroundImage = `url('${el.dataset.bg}')`;
    }

    el.classList.add("loaded");
  }

  static init(options = {}) {
    const instance = new LazyLoader(options);
    instance.observe();
  }
}
