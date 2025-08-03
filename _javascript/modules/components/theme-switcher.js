export default class ThemeSwitcher {
  static THEME_KEY = "theme";

  static get container() {
    return document.querySelector("[data-theme-switcher]");
  }

  static get toggleLink() {
    return this.container?.querySelector("[data-theme-switcher-list]");
  }

  static get dropdownItems() {
    return this.container?.querySelectorAll("[data-theme-switcher-list-items]");
  }

  static getEffectiveTheme(savedTheme) {
    if (savedTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return savedTheme;
  }

  static apply(theme) {
    const actualTheme = this.getEffectiveTheme(theme);
    document.documentElement.setAttribute("data-theme", actualTheme);
    localStorage.setItem(this.THEME_KEY, theme);
    this.updateDropdown(theme);
  }

  static updateDropdown(selectedTheme) {
    this.dropdownItems.forEach((item) => {
      const itemTheme = item.dataset.colorScheme;
      const isChecked = itemTheme === selectedTheme;

      item.classList.toggle("dropdown-item-selected", isChecked);
      item.setAttribute("aria-selected", isChecked);
    });
  }

  static setupDropdownListeners() {
    this.dropdownItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const newTheme = item.dataset.colorScheme;
        this.apply(newTheme);
      });
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      const savedTheme = localStorage.getItem(this.THEME_KEY) || "system";
      if (savedTheme === "system") {
        this.apply("system");
      }
    });
  }

  static initialize() {
    if (!this.container) return;

    const savedTheme = localStorage.getItem(this.THEME_KEY) || "system";
    this.apply(savedTheme);

    this.setupDropdownListeners();
  }
}
