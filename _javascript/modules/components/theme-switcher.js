class ThemeSwitcher {
  static THEME_KEY = "theme";

  static get toggleLink() {
    return document.getElementById("theme-toggle-link");
  }

  static get dropdownItems() {
    return document.querySelectorAll(".dropdown-item");
  }

  static getEffectiveTheme(savedTheme) {
    if (savedTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return savedTheme;
  }

  static apply(theme) {
    const actualTheme = ThemeSwitcher.getEffectiveTheme(theme);
    document.documentElement.setAttribute("data-theme", actualTheme);
    localStorage.setItem(ThemeSwitcher.THEME_KEY, theme);
    ThemeSwitcher.updateDropdown(theme);
  }

  static updateDropdown(selectedTheme) {
    ThemeSwitcher.dropdownItems.forEach((item) => {
      const itemTheme = item.textContent.trim().toLowerCase();
      item.classList.toggle("dropdown-item-selected", itemTheme === selectedTheme);
    });
  }

  static setupDropdownListeners() {
    ThemeSwitcher.dropdownItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const title = item.textContent.trim().toLowerCase();
        const newTheme = title.includes("system") ? "system" : title;
        ThemeSwitcher.apply(newTheme);
      });
    });

    // Update if system preference changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      const savedTheme = localStorage.getItem(ThemeSwitcher.THEME_KEY) || "system";
      if (savedTheme === "system") {
        ThemeSwitcher.apply("system");
      }
    });
  }

  static initialize() {
    const savedTheme = localStorage.getItem(ThemeSwitcher.THEME_KEY) || "light";
    ThemeSwitcher.apply(savedTheme);
    ThemeSwitcher.updateDropdown(savedTheme);

    const toggle = ThemeSwitcher.toggleLink;
    if (toggle) {
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        ThemeSwitcher.setupDropdownListeners();
      });
    }
  }
}

export { ThemeSwitcher };
