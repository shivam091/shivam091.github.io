import { PopperUtils } from './utils/PopperUtils.js';
import { ThemeSwitcher } from './modules/ThemeSwitcher.js';
import { PersonalBlog } from './modules/PersonalBlog.js';
import { ScrollTop } from './modules/ScrollTop.js';
import { ProgressBar } from './modules/ProgressBar.js';
import { SideBar } from './modules/SideBar.js';
import { Tooltip } from './modules/Tooltip.js';
import { Categories } from './modules/Categories.js';
import { Dropdown } from './modules/Dropdown.js';

















(function() {
  "use strict";

  PersonalBlog.init();
  ScrollTop.init();
  ProgressBar.init();
  SideBar.init();
  Tooltip.init();
  Categories.init();
  Dropdown.init();
  ThemeSwitcher.init();
})();
