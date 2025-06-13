import * as SvgSprite from "./../../utils/svg-sprite";

class Accordion {
  constructor(categoryItem) {
    this.categoryItem = categoryItem;
    this.toggleButton = categoryItem.querySelector(".btn-category-toggle");
    this.content = categoryItem.querySelector(".sub-categories");
    if (this.toggleButton && this.content) this.addEventListeners();
  }

  addEventListeners() {
    this.toggleButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.toggleButton.click();
      }
    });

    this.toggleButton.addEventListener("click", (event) => this.toggle(event));

    this.content.addEventListener("transitionend", () => {
      this.content.style.display =
        this.content.style.maxHeight === "0px" ? "none" : "block";
    });
  }

  toggle(event) {
    event.preventDefault();
    const expanded = this.toggleButton.getAttribute("aria-expanded") === "true";
    this.toggleButton.setAttribute("aria-expanded", String(!expanded));
    this.categoryItem.toggleAttribute("data-expanded", !expanded);

    const iconHref = expanded ? "#icon-folder" : "#icon-folder-open";
    const iconEl = this.categoryItem.querySelector(".category-icon use");
    if (iconEl) SvgSprite.toggle(iconEl, iconHref);

    if (!expanded) {
      this.content.style.display = "block";
      this.content.style.maxHeight = `${this.content.scrollHeight}px`;
    } else {
      this.content.style.maxHeight = `${this.content.scrollHeight}px`;
      this.content.offsetHeight; // force reflow
      this.content.style.maxHeight = "0";
    }
  }
}

export { Accordion };
