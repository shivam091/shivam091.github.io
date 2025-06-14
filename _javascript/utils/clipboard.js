import SvgSprite from "./svg-sprite";
import { Tooltip } from "./../modules/components/tooltip";

class Clipboard {
  constructor(root) {
    this.root = root;
    this.button = root.querySelector(".code-copy-btn");
    this.code = root.querySelector("code");

    this.attachEvents();
  }

  attachEvents() {
    if (!this.button || !this.code) return;

    this.button.addEventListener("click", () => this.copyCode());
  }

  async copyCode() {
    const text = this.code.innerText.trim();

    try {
      await navigator.clipboard.writeText(text);
      this.showFeedback();
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  }

  showFeedback() {
    const iconEl = this.button.querySelector("use");
    if (iconEl) SvgSprite.toggle(iconEl, "check");

    this.button.setAttribute("aria-label", "Copied to clipboard!");

    setTimeout(() => {
      if (iconEl) SvgSprite.toggle(iconEl, "copy");
      this.button.setAttribute("aria-label", "Copy code");
    }, 1500);
  }

  static initAll() {
    document.querySelectorAll("[data-clipboard]").forEach(el => {
      new Clipboard(el);
    });
  }
}

export { Clipboard }
