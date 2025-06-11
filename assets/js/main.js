import { ThemeSwitcher } from './modules/ThemeSwitcher.js';
import { PersonalBlog } from './modules/PersonalBlog.js';
import { ProgressBar } from './modules/ProgressBar.js';
import { SideBar } from './modules/SideBar.js';
import { Categories } from './modules/Categories.js';

import { attachTooltips } from "./components/tooltip";
import { bindAllDropdowns } from "./components/dropdown";
import { bindScrollToTop } from "./components/scroll_top";
import { bindHeroTyping } from "./components/hero";

(function() {
  "use strict";

  PersonalBlog.init();
  ProgressBar.init();
  SideBar.init();
  Categories.init();
  ThemeSwitcher.init();
})();

bindAllDropdowns();
attachTooltips();
bindScrollToTop();
bindHeroTyping();
