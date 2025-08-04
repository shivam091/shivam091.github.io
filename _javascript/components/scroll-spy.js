export default class Scrollspy {
  constructor(containerSelector = ".scrollspy", options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    // Default options
    this.options = Object.assign(
      {
        linkSelector: "a[href^='#']",
        activeClass: "active",
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.1,
        smoothScroll: true
      },
      options
    );

    // Collect all links and target elements
    this.links = Array.from(this.container.querySelectorAll(this.options.linkSelector));
    this.targets = this.links
      .map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .filter(Boolean);

    this._initObserver();
    this._setInitialActive();

    // ✅ Handle hash changes (back/forward, direct hash load)
    window.addEventListener("hashchange", () => {
      const hashId = decodeURIComponent(location.hash.slice(1));
      if (hashId) {
        this._setActive(hashId);
      }
    });

    // ✅ Optional smooth scroll on click
    if (this.options.smoothScroll) {
      this._enableSmoothScroll();
    }
  }

  _initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => this._onIntersect(entries),
      {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold,
      }
    );

    this.targets.forEach(target => this.observer.observe(target));
  }

  _onIntersect(entries) {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.target.offsetTop - b.target.offsetTop);

    if (visible.length > 0) {
      this._setActive(visible[0].target.id);
    }
  }

  _setActive(id) {
    this.links.forEach(link => {
      const isActive = decodeURIComponent(link.hash.slice(1)) === id;
      link.classList.toggle(this.options.activeClass, isActive);
    });
  }

  _setInitialActive() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const offset = parseInt(this.options.rootMargin.split(" ")[0]) || 0;

    const currentTarget = [...this.targets]
      .reverse()
      .find(target => scrollPosition >= target.offsetTop + offset);

    if (currentTarget) {
      this._setActive(currentTarget.id);
    } else if (this.targets.length) {
      this._setActive(this.targets[0].id);
    }
  }

  _enableSmoothScroll() {
    this.links.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = decodeURIComponent(link.hash.slice(1));
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          e.preventDefault(); // Prevent default jump
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

          // Update hash manually without jumping
          history.pushState(null, "", `#${targetId}`);
          this._setActive(targetId);
        }
      });
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
