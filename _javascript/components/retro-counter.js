import { Counter } from "counterapi";

export default class RetroCounter {
  constructor(container, options = {}) {
    this.container = container;
    this.key = this.slugifyPath(window.location.pathname);
    this.client = new Counter({
      version: options.version || "v1",
      namespace: options.namespace,
      debug: options.debug || false,
      timeout: options.timeout || 10000,
    });
    this.init();
  }

  slugifyPath(path) {
    const clean = path.replace(/^\/|\/$/g, "") || "home";
    return clean.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  }

  renderDigits(count) {
    const padded = count.toString().padStart(6, "0");
    this.container.innerHTML = ""; // Clear old

    [...padded].forEach((digit, index) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      svg.classList.add("digit");
      use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#digit-${digit}`);
      svg.appendChild(use);
      this.container.appendChild(svg);
    });
  }

  updateAriaLabel(count) {
    let originalLabel = this.container.getAttribute("aria-label");
    let newLabel = originalLabel.replace("TOTAL_COUNT", count)
    this.container.setAttribute("aria-label", newLabel);
  }

  async init() {
    try {
      const result = await this.client.up(this.key);
      const hitCount = result.data.up_count ?? 0
      this.updateAriaLabel(hitCount);
      this.renderDigits(hitCount);
    } catch (err) {
      this.container.innerHTML = "ERROR";
      console.error("Counter error:", err);
    }
  }

  static initAll(selector, options) {
    document.querySelectorAll(selector).forEach(el => new RetroCounter(el, options));
  }
}
