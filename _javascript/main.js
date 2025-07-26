import Header from "./layout/header";
import ThemeSwitcher from "./modules/components/theme-switcher";
import AnalyticsTracker from "./modules/analytics-tracker";
import ScrollTop from "./modules/components/scroll-top";
import ProgressBar from "./modules/components/progress-bar";
import SkipLink from "./modules/components/skip-link";
import Tooltip from "./modules/components/tooltip";
import Dropdown from "./modules/components/dropdown";
import Accordion from "./modules/components/accordion";
import Clipboard from "./utils/clipboard";
import Alert from "./modules/components/alert";
import CodeBlockUtils from "./utils/code-block-utils";
import LazyLoader from "./modules/components/lazy-loader";
import RetroCounter from "./components/retro-counter";
import ParallaxEffect from "./modules/components/parallax_effect";

import { bindHeroTyping } from "./modules/components/hero";

Header.initialize();
ThemeSwitcher.initialize();
AnalyticsTracker.initialize();
ScrollTop.initialize();
ProgressBar.initialize();
SkipLink.initialize();
Tooltip.initialize();
Dropdown.initialize();
Accordion.initialize();
Clipboard.initAll();
Alert.init();
CodeBlockUtils.initAll();
LazyLoader.init();

ParallaxEffect.initAll("[data-parallax]", {
  parallaxStrength: 0.25,
});

RetroCounter.initAll("[data-retro-counter]", {
  version: "v2",
  namespace: "shivam091-github-io",
  debug: false,
});

bindHeroTyping();

// (function () {
//   let lastScroll = 0;
//   const threshold = 10;
//   const body = document.body;
//
//   window.addEventListener("scroll", () => {
//     const currentScroll = window.scrollY;
//
//     // Ignore tiny scrolls
//     if (Math.abs(currentScroll - lastScroll) <= threshold) return;
//
//     if (currentScroll > lastScroll && currentScroll > 100) {
//       // Scrolling down
//       body.setAttribute("data-header", "hidden");
//     } else {
//       // Scrolling up
//       body.removeAttribute("data-header");
//     }
//
//     lastScroll = currentScroll;
//   });
// })();

// document.addEventListener("scroll", () => {
//   const maxScroll = 200;
//   const clouds = document.querySelector(".clouds svg");
//   const scrollY = window.scrollY;
//   const offset = scrollY * 0.2; // adjust parallax strength here (e.g., 0.1–0.3)
//   clouds.style.setProperty("--parallax-offset", `${offset}px`);
//
//   if (scrollY >= 80) {
//     document.querySelector(".site-header").classList.add("header-scrolled");
//   } else {
//     document.querySelector(".site-header").classList.remove("header-scrolled");
//   }
// });

// let ticking = false;
//
// window.addEventListener("scroll", () => {
//   if (!ticking) {
//     window.requestAnimationFrame(() => {
//       const scrollTop = window.scrollY;
//       const maxScroll = 300;
//       const offset = Math.min(scrollTop * 0.4, maxScroll);
//
//       document.documentElement.style.setProperty('--cloud-scroll-offset', `${offset}px`);
//       document.documentElement.dataset.frozen = scrollTop >= maxScroll;
//       ticking = false;
//     });
//
//     ticking = true;
//   }
//
// });
// window.addEventListener('scroll', () => {
//   const scrollY = window.scrollY;
//   const maxScroll = 200;
//   const offset = Math.min(scrollY * 0.2, maxScroll); // Parallax effect
//   document.documentElement.style.setProperty('--cloud-offset', `${offset}px`);
// });
//
// document.addEventListener("scroll", () => {
//   const scrollY = window.scrollY;
//   const skyEl = document.querySelector(".sky-bottom");
//
//   const freezeAt = 1200; // scrollY px where effect "freezes"
//   const maxOffset = 50; // max cloud movement
//
//   if (scrollY < freezeAt) {
//     const offset = Math.min(scrollY / 10, maxOffset);
//     skyEl.style.setProperty("--cloud-offset", `${offset}px`);
//   } else {
//     skyEl.style.setProperty("--cloud-offset", `${maxOffset}px`);
//   }
// });


document.addEventListener("scroll", () => {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const scrollY = window.scrollY;
  if (scrollY > 10) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});
