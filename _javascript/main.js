import { ThemeSwitcher } from "./modules/components/theme-switcher";
import { AnalyticsTracker } from "./modules/analytics-tracker";
import { ScrollTop } from "./modules/components/scroll-top";
import { ProgressBar } from "./modules/components/progress-bar";
import { SkipLink } from "./modules/components/skip-link";
import { Tooltip } from "./modules/components/tooltip";
import { Dropdown } from "./modules/components/dropdown";
import { SidebarToggle } from "./modules/components/layouts/sidebar-toggle";
import { Categories } from "./modules/categories";
import { Clipboard } from "./utils/clipboard"

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

// const CodeLineNumberer = (() => {
//   function wrapLines(wrapper) {
//     const codeEl = wrapper.querySelector("pre > code");
//     if (!codeEl || codeEl.dataset.linesWrapped) return;
//
//     const codeText = codeEl.innerHTML;
//     const lines = codeText.trim().split(/\r?\n/);
//     const numberedLines = lines.map((line, i) => {
//       return `<span class="code-line"><span class="line-number" aria-hidden="true">${i + 1}</span>${line}</span>`;
//     });
//
//     codeEl.innerHTML = numberedLines.join("\n");
//     codeEl.dataset.linesWrapped = "true";
//   }
//
//   function toggleLines(wrapper) {
//     const btn = wrapper.querySelector(".toggle-lines");
//     const lines = wrapper.querySelectorAll(".line-number");
//     btn?.addEventListener("click", () => {
//       lines.forEach(ln => ln.classList.toggle("hidden"));
//     });
//   }
//
//   function initAll() {
//     document.querySelectorAll(".code-block-wrapper").forEach(wrapper => {
//       wrapLines(wrapper);
//       toggleLines(wrapper);
//     });
//   }
//
//   return { initAll };
// })();
//
// document.addEventListener("DOMContentLoaded", CodeLineNumberer.initAll);
