import * as PopperUtils from "./../../utils/popper";

class Dropdown {
  static get dropdownElements() {
    return document.querySelectorAll("[data-dropdown]");
  }

  static closeAll() {
    Dropdown.dropdownElements.forEach(dropdown => {
      const button = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");
      if (!button || !menu) return;

      button.setAttribute("aria-expanded", "false");
      button.classList.remove("show");
      menu.classList.remove("show");

      PopperUtils.destroyInstance(menu);
    });
  }

  static toggle(button, menu) {
    const isOpen = menu.classList.contains("show");
    if (isOpen) return;

    Dropdown.closeAll();

    button.setAttribute("aria-expanded", "true");
    button.classList.add("show");
    menu.classList.add("show");

    PopperUtils.createInstance(button, menu, {
      placement: button.getAttribute("data-dropdown-position") || "bottom",
    });
  }

  static bind(dropdown) {
    const button = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!button || !menu) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      Dropdown.toggle(button, menu);
    });

    window.addEventListener("resize", () => {
      if (menu.classList.contains("show")) {
        PopperUtils.updateInstance(menu);
      }
    });
  }

  static initialize() {
    Dropdown.dropdownElements.forEach(Dropdown.bind);

    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-dropdown]")) {
        Dropdown.closeAll();
      }
    });
  }
}

export { Dropdown };
