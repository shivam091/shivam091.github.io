import { ThemeSwitcher } from "./modules/components/theme-switcher";
import { LocaleManager } from "./modules/components/locale-manager";
import { ScrollTop } from "./modules/components/scroll-top";
import { ProgressBar } from "./modules/components/progress-bar";
import { SkipLink } from "./modules/components/skip-link";
import { Tooltip } from "./modules/components/tooltip";
import { Dropdown } from "./modules/components/dropdown";
import { SidebarToggle } from "./modules/components/layouts/sidebar-toggle";
import { bindHeroTyping } from "./modules/components/hero";
import { Categories } from "./modules/categories.js";

ThemeSwitcher.initialize();
ScrollTop.initialize();
ProgressBar.initialize();
SkipLink.initialize();
Tooltip.initialize();
Dropdown.initialize();
SidebarToggle.initialize();
Categories.initialize();

bindHeroTyping();

const localeManager = new LocaleManager({
  supportedLocales: ['en', 'fr', 'hi'],
  defaultLocale: 'en',
  storageKey: 'locale'
});

localeManager.init();

// Optional: Hook to dropdown
document.querySelector('#language-switcher')?.addEventListener('change', (e) => {
  localeManager.setLocale(e.target.value);
});
