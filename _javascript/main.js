import { ThemeSwitcher } from "./modules/components/theme-switcher";
import { AnalyticsTracker } from "./modules/analytics-tracker";
import { ScrollTop } from "./modules/components/scroll-top";
import { ProgressBar } from "./modules/components/progress-bar";
import { SkipLink } from "./modules/components/skip-link";
import { Tooltip } from "./modules/components/tooltip";
import { Dropdown } from "./modules/components/dropdown";
import { SidebarToggle } from "./modules/components/layouts/sidebar-toggle";
import { Categories } from "./modules/categories.js";
import { Clipboard } from "./utils/clipboard";

import { bindHeroTyping } from "./modules/components/hero";

ThemeSwitcher.initialize();
AnalyticsTracker.initialize();
ScrollTop.initialize();
ProgressBar.initialize();
SkipLink.initialize();
Tooltip.initialize();
Dropdown.initialize();
SidebarToggle.initialize();
Categories.initialize();
Clipboard.initAll();

bindHeroTyping();
