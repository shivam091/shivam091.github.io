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

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("use[href='#star']");

  stars.forEach(star => {
    const twinkle = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    twinkle.setAttribute("attributeName", "opacity");
    twinkle.setAttribute("values", `${Math.random()*0.4+0.6};1;${Math.random()*0.4+0.6}`);
    twinkle.setAttribute("dur", `${(Math.random()*3+5).toFixed(1)}s`);
    twinkle.setAttribute("begin", `${(Math.random()*2).toFixed(1)}s`);
    twinkle.setAttribute("repeatCount", "indefinite");
    star.appendChild(twinkle);

    const drift = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    drift.setAttribute("attributeName", "transform");
    drift.setAttribute("type", "translate");
    const xMove = (Math.random()*12 - 6).toFixed(1); // random -6 to +6
    const yMove = (Math.random()*8 - 4).toFixed(1);  // random -4 to +4
    drift.setAttribute("values", `0 0; ${xMove} ${yMove}; 0 0`);
    drift.setAttribute("dur", `${(Math.random()*15+15).toFixed(1)}s`);
    drift.setAttribute("repeatCount", "indefinite");
    star.appendChild(drift);
  });
});
