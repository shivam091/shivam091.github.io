export const ThemeSwitcher = (() => {
  const THEME_KEY = "theme";
  const themeToggleLink = document.getElementById("theme-toggle-link");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  function getEffectiveTheme(savedTheme) {
    if (savedTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return savedTheme;
  }

  function applyTheme(theme) {
    const actualTheme = getEffectiveTheme(theme);
    document.documentElement.setAttribute("data-theme", actualTheme);
    localStorage.setItem(THEME_KEY, theme);
    updateDropdown(theme);
  }

  function updateDropdown(selectedTheme) {
    dropdownItems.forEach((item) => {
      const itemTheme = item.textContent.trim().toLowerCase();
      item.classList.toggle("dropdown-item-selected", itemTheme === selectedTheme);
    });
  }

  function toggleTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "system";
    applyTheme(savedTheme);

    dropdownItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const title = item.textContent.trim().toLowerCase();
        const newTheme = title.includes("system") ? "system" : title;
        applyTheme(newTheme);
      });
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      const savedTheme = localStorage.getItem(THEME_KEY) || "system";
      if (savedTheme === "system") {
        applyTheme("system");
      }
    });
  }

  return {
    init: () => {
      const savedTheme = localStorage.getItem(THEME_KEY) || "light";
      applyTheme(savedTheme);
      updateDropdown(savedTheme);
      themeToggleLink.addEventListener("click", (event) => {
        event.preventDefault();
        toggleTheme();
      });
    }
  };
})();
