import * as PopperUtils from "./../utils/PopperUtils.js";

export const Dropdown = (() => {
  const dropdowns = document.querySelectorAll("[data-dropdown]");

  function closeAll() {
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");

      if (!button || !menu) return;

      button.setAttribute("aria-expanded", "false");
      button.classList.remove("show");
      menu.classList.remove("show");

      PopperUtils.destroyInstance(menu);
    });
  }

  function toggleDropdown(button, menu) {
    const isOpen = menu.classList.contains("show");

    closeAll();

    if (!isOpen) {
      button.setAttribute("aria-expanded", "true");
      button.classList.add("show");
      menu.classList.add("show");

      PopperUtils.createInstance(button, menu, {
        placement: button.getAttribute("data-dropdown-position") || "bottom",
        offset: [0, 8]
      });
    }
  }

  function bindDropdown(dropdown) {
    const button = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!button || !menu) return;

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(button, menu);
    });

    window.addEventListener("resize", () => {
      if (menu.classList.contains("show")) PopperUtils.updateInstance(menu);
    });
  }

  function bindAllDropdowns() {
    dropdowns.forEach(bindDropdown);

    document.addEventListener("click", (e) => {
      if (!e.target.closest("[data-dropdown]")) closeAll();
    });
  }

  return {
    init: bindAllDropdowns
  };
})();
