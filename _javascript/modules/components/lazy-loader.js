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


// lazyload.js
export default class LazyLoader {
  static observe() {
    const observer = new IntersectionObserver(LazyLoader.onIntersection, {
      rootMargin: "200px",
      threshold: 0.01,
    });

    document.querySelectorAll("[data-src], [data-bg]").forEach((el) => {
      if (!el.classList.contains("lazyloaded")) {
        observer.observe(el);
      }
    });
  }

  static onIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        LazyLoader.load(entry.target);
      }
    });
  }

  static load(el) {
    const isImg = el.tagName === "IMG";
      const src = isImg ? el.dataset.src : el.dataset.bg;
      if (!src) return;

      const onLoaded = () => {
        el.classList.remove("lazyloading", "shimmer");
        el.classList.add("lazyloaded");
      };

      // For <img>
      if (isImg) {
        const img = new Image();
        img.onload = () => {
          el.src = src;
          el.onload = onLoaded;
        };
        img.onerror = onLoaded;
        img.src = src;
      }
      // For background-image
      else {
        const bg = new Image();
        bg.onload = () => {
          el.style.backgroundImage = `url('${src}')`;
          onLoaded();
        };
        bg.onerror = onLoaded;
        bg.src = src;
      }

  }
}
