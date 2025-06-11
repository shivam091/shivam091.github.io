export const Categories = (function () {
  function toggleSubCategories(event, categoryItem, toggleButton, content) {
    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    if (!toggleButton) return;

    toggleButton.setAttribute("aria-expanded", String(!expanded));
    categoryItem.toggleAttribute("data-expanded", !expanded);

    const iconHref = expanded ? "#icon-folder" : "#icon-folder-open";
    const iconElement = categoryItem.querySelector(".category-icon use");

    if (iconElement) SvgSprite.toggle(iconElement, iconHref);

    if (!expanded) {
      content.style.display = "block";
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.offsetHeight;  // Force reflow
      content.style.maxHeight = "0";
    }
  }

  function bindToggle() {
    document.querySelectorAll("[data-category]").forEach((categoryItem) => {
      const toggleButton = categoryItem.querySelector(".btn-category-toggle");
      const content = categoryItem.querySelector(".sub-categories");

      if (!toggleButton || !content) return;

      toggleButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleButton.click();
        }
      });

      toggleButton.addEventListener("click", (event) => {
        toggleSubCategories(event, categoryItem, toggleButton, content);
      });

      content.addEventListener("transitionend", () => {
        if (content.style.maxHeight === "0px") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    });
  }

  return {
    init: function () {
      bindToggle();
    }
  };
})();
