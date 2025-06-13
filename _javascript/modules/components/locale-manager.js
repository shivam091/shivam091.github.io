class LocaleManager {
  constructor(translations, defaultLang = 'en') {
    this.translations = translations;
    this.supportedLangs = Object.keys(translations);
    this.defaultLang = defaultLang;
    this.lang = this.detectInitialLang();

    this.bindLangButtons();
    this.applyTranslations();
  }

  detectInitialLang() {
    // 1. Check localStorage
    const storedLang = localStorage.getItem('lang');
    if (this.isValidLang(storedLang)) return storedLang;

    // 2. Use browser language
    const browserLang = navigator.language.slice(0, 2);
    if (this.isValidLang(browserLang)) return browserLang;

    // 3. Fallback to default
    return this.defaultLang;
  }

  isValidLang(lang) {
    return this.supportedLangs.includes(lang);
  }

  bindLangButtons() {
    document.querySelectorAll(".lang-option").forEach(button => {
      button.addEventListener('click', () => {
        const selectedLang = button.getAttribute('data-lang');
        if (this.isValidLang(selectedLang)) {
          this.setLang(selectedLang);
        }
      });
    });
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('lang', lang);
    this.applyTranslations();
  }

  applyTranslations() {
    const t = this.translations[this.lang];
    for (const key in t) {
      const el = document.getElementById(key);
      if (el) el.textContent = t[key];
    }

    // Optionally update <html lang="...">
    document.documentElement.lang = this.lang;
  }
}

// Initialize after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new LocaleManager(translations);
});
