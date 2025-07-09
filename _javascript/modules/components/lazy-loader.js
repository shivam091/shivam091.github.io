// export default class LazyLoader {
//   constructor(options = {}) {
//     this.settings = Object.assign({
//       selector: "[data-src]",
//       root: null,
//       rootMargin: "0px 0px 300px 0px",
//       threshold: 0.1,
//     }, options);
//
//     this.observer = new IntersectionObserver(
//       this.onIntersection.bind(this),
//       {
//         root: this.settings.root,
//         rootMargin: this.settings.rootMargin,
//         threshold: this.settings.threshold
//       }
//     );
//   }
//
//   observe() {
//     const elements = document.querySelectorAll(this.settings.selector);
//     elements.forEach(el => this.observer.observe(el));
//   }
//
//   onIntersection(entries) {
//     for (const entry of entries) {
//       if (entry.isIntersecting) {
//         this.loadElement(entry.target);
//         this.observer.unobserve(entry.target);
//       }
//     }
//   }
//
//   loadElement(el) {
//     // <img> tag support
//     if (el.tagName === "IMG") {
//       if (el.dataset.src) el.src = el.dataset.src;
//       if (el.dataset.srcset) el.srcset = el.dataset.srcset;
//     }
//
//     // Background image support
//     if (el.dataset.bg) {
//       el.style.backgroundImage = `url('${el.dataset.bg}')`;
//     }
//
//     el.classList.remove("shimmer");
//     el.classList.add("loaded");
//   }
//
//   static init(options = {}) {
//     const instance = new LazyLoader(options);
//     instance.observe();
//   }
// }


export default class LazyLoader {
  constructor(options = {}) {
    this.settings = Object.assign({
      selector: "[data-src], [data-bg]",
      root: null,
      rootMargin: "400px 0px",
      threshold: 0.1,
      priorityAttr: "data-priority"
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

    elements.forEach((el) => {
      // Immediately load priority elements
      if (el.hasAttribute(this.settings.priorityAttr)) {
        this.loadElement(el);
      } else if (!el.classList.contains("lazyloaded")) {
        if (!el.classList.contains("lazyloaded") && !el.classList.contains("lazyerror")) {
          this.observer.observe(el);
        }
      }
    });
  }

  onIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    }
  }

  markAsLoading(el) {
    const wrapper = el.closest(".lazy-wrapper");
    wrapper.classList.add("shimmer");
    el.classList.add("lazyloading");
  }

  markAsLoaded(el) {
    const wrapper = el.closest(".lazy-wrapper");
    wrapper.classList.remove("shimmer");

    el.classList.remove("lazyloading");
    el.classList.add("lazyloaded");

    el.removeAttribute("data-src");
    el.removeAttribute("data-srcset");
    el.removeAttribute("data-bg");
  }

  loadElement(el) {
    const isImg = el.tagName === "IMG";
    this.markAsLoading(el);

    const onLoaded = () => {
      this.markAsLoaded(el);
    };

    const onError = (e) => {
      console.warn("LazyLoader failed to load:", el, e?.message || e);
      this.markAsLoaded(el);
      el.classList.add("lazyerror");

      // Fallback image if provided
      if (isImg && el.dataset.fallback) {
        el.src = el.dataset.fallback;
      }
    };

    // Handle <img>
    if (isImg) {
      const img = new Image();

      if (el.dataset.srcset) img.srcset = el.dataset.srcset;
      if (el.dataset.src) img.src = el.dataset.src;

      img.onload = () => {
        if (el.dataset.src) el.src = el.dataset.src;
        if (el.dataset.srcset) el.srcset = el.dataset.srcset;
        onLoaded();
      };

      img.onerror = onError;
    }

    // Handle background image
    else if (el.dataset.bg) {
      const bgImg = new Image();
      bgImg.src = el.dataset.bg;

      bgImg.onload = () => {
        el.style.backgroundImage = `url('${el.dataset.bg}')`;
        onLoaded();
      };

      bgImg.onerror = onError;
    }
  }

  static init(options = {}) {
    const instance = new LazyLoader(options);
    instance.observe();
    return instance;
  }
}
