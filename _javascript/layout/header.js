export default class Header {
  static scrollThreshold = 50;

  static get element() {
    return document.querySelector(".site-header");
  }

  static _onScroll() {
    const isScrolled = window.scrollY >= this.scrollThreshold;
    this.element?.classList.toggle("header-scrolled", isScrolled);
  }

  static initialize() {
    window.addEventListener("scroll", this._onScroll.bind(this));
    this._onScroll();
  }

  static destroy() {
    window.removeEventListener("scroll", this._onScroll.bind(this));
  }
}
