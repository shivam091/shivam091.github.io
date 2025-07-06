import * as PopperUtils from "./../../utils/popper";

export default class Dropdown {
  static get dropdownElements() {
    return document.querySelectorAll("[data-dropdown]");
  }

  static close(button, menu) {
    button.setAttribute("aria-expanded", "false");
    button.classList.remove("show");
    menu.classList.remove("show");

    PopperUtils.destroyInstance(menu);
  }

  static closeAll() {
    this.dropdownElements.forEach(dropdown => {
      const button = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");
      if (!button || !menu) return;

      this.close(button, menu);
    });
  }

  static toggle(button, menu) {
    const isOpen = menu.classList.contains("show");

    if (isOpen) {
      this.close(button, menu);
    } else {
      this.closeAll();

      button.setAttribute("aria-expanded", "true");
      button.classList.add("show");
      menu.classList.add("show");

      PopperUtils.createInstance(button, menu, {
        placement: button.getAttribute("data-dropdown-position") || "bottom",
      });
    }
  }

  static bind(dropdown) {
    const button = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!button || !menu) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.toggle(button, menu);
    });

    window.addEventListener("resize", () => {
      if (menu.classList.contains("show")) {
        PopperUtils.updateInstance(menu);
      }
    });
  }

  static handleEscape(event) {
    if (event.key === "Escape") {
      Dropdown.closeAll();
    }
  }

  static initialize() {
    this.dropdownElements.forEach(dropdown => this.bind(dropdown));

    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-dropdown]")) {
        this.closeAll();
      }
    });

    document.addEventListener("keydown", (event) => this.handleEscape(event));
  }
}
