import HeaderGlassEffect from "./layout/header-glass-effect";
import HeaderDrawer from "./layout/header-drawer";
import ThemeSwitcher from "./modules/components/theme-switcher";
import AnalyticsTracker from "./modules/analytics-tracker";
import ScrollTop from "./modules/components/scroll-top";
import SkipLink from "./modules/components/skip-link";
import Tooltip from "./modules/components/tooltip";
import Dropdown from "./modules/components/dropdown";
import Accordion from "./modules/components/accordion";
import Clipboard from "./utils/clipboard";
import Alert from "./modules/components/alert";
import CodeBlockUtils from "./utils/code-block-utils";
import LazyLoader from "./modules/components/lazy-loader";
import RetroCounter from "./components/retro-counter";
import Scrollspy from "./components/scroll-spy";
import Playground from './components/code-playground/playground';
import DetailsPlusMorph from "./animations/details-plus-morph";
import DetailsAnimator from "./animations/details-animator";
import ArrowRightBoop from "./animations/arrow-right-boop";
import HoverBoop from "./utils/animations/hover-boop";

import { bindHeroTyped } from "./components/hero";

HeaderGlassEffect.initialize();
HeaderDrawer.initialize();
ThemeSwitcher.initialize();
AnalyticsTracker.initialize();
ScrollTop.initialize();
SkipLink.initialize();
Tooltip.initialize();
Dropdown.initialize();
Accordion.initialize();
Clipboard.initAll();
Alert.init();
CodeBlockUtils.initAll();
LazyLoader.init();
DetailsPlusMorph.initialize();
DetailsAnimator.initialize();
ArrowRightBoop.initialize(".icon-arrow-right");

HoverBoop.initialize(".alert-dismiss .icon-times", {boop: {rotate: 15, scale: 1.2}});
HoverBoop.initialize(".icon-arrow-up", {boop: {translateY: -3}});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-playground]').forEach(el => new Playground(el));
});

RetroCounter.initAll("[data-retro-counter]", {
  version: "v2",
  namespace: "shivam091-github-io",
  debug: false,
});

new Scrollspy(".toc-wrapper", {
  activeClass: "active",
  rootMargin: "80px 0px -70% 0px"
});

bindHeroTyped();
