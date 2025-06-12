import { ScrollTop } from "./modules/components/scroll-top";
import { ProgressBar } from "./modules/components/progress-bar";
import { SkipLink } from "./modules/components/skip-link";
import { Tooltip } from "./modules/components/tooltip";
import { SidebarToggle } from "./modules/components/layouts/sidebar-toggle";
import { bindHeroTyping } from "./modules/components/hero";
import { Categories } from "./modules/categories.js";

ScrollTop.initialize();
ProgressBar.initialize();
SkipLink.initialize();
Tooltip.initialize();
SidebarToggle.initialize();
Categories.initialize();

bindHeroTyping();
