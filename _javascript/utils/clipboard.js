import * as SvgSprite from "./svg-sprite";
import { Tooltip } from "./../modules/components/tooltip";

class Clipboard {
  constructor(root) {
    this.root = root;
    this.isCode = root.hasAttribute("data-copy-code");
    this.isLink = root.hasAttribute("data-copy-link");
    this.targetSelector = root.getAttribute("data-copy-target");
    this.isHTML = root.hasAttribute("data-copy-html");

    this.button = this.findButton();
    this.textSource = this.findTextSource();

    this.attachEvents();
  }

  findButton() {
    if (this.isCode) return this.root.querySelector(".copy-btn");
    if (this.isLink || this.targetSelector) return this.root;
    return null;
  }

  findTextSource() {
    if (this.targetSelector) {
      const targetEl = document.querySelector(this.targetSelector);
      if (targetEl) return targetEl;
    } else if (this.isCode) {
      return this.root.querySelector("td.code > pre");
    } else if (this.isLink) {
      return this.root.getAttribute("href") || window.location.href;
    }
    return null;
  }

  attachEvents() {
    if (!this.button || !this.textSource) return;

    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.copyText();
    });
  }

  async copyText() {
    let text = "";

    if (typeof this.textSource === "string") {
      text = this.textSource.trim();
    } else if (this.textSource instanceof HTMLInputElement || this.textSource instanceof HTMLTextAreaElement) {
      text = this.textSource.value.trim();
    } else if (this.isHTML) {
      text = this.textSource.innerHTML.trim();
    } else {
      text = this.textSource.innerText.trim();
    }

    try {
      await navigator.clipboard.writeText(text);
      this.showFeedback();
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  }

  showFeedback() {
    const triggerer = this.button;
    const iconEl = triggerer.querySelector("use");
    if (iconEl) {
      SvgSprite.toggle(iconEl, "#icon-check");
      iconEl.parentElement.setAttribute("id", "icon-check");
    }

    const originalLabel = triggerer.getAttribute("data-tooltip") || "";
    triggerer.setAttribute("aria-label", "Copied!");

    Tooltip.update(triggerer, "Copied!");

    setTimeout(() => {
      if (iconEl) {
        SvgSprite.toggle(iconEl, "#icon-copy");
        iconEl.parentElement.setAttribute("id", "icon-copy");
      }
      triggerer.setAttribute("aria-label", originalLabel);
      Tooltip.update(triggerer, originalLabel);
    }, 1500);
  }

  static initAll() {
    document.querySelectorAll("[data-copy-code], [data-copy-link], [data-copy-target]").forEach(el => {
      new Clipboard(el);
    });
  }
}

export { Clipboard };
