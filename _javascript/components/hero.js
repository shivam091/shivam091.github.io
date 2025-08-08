import Typed from "typed.js";

export function bindHeroTyped() {
  const target = document.getElementById("hero-highlight");
  if (!target) return;

  const strings = target.getAttribute("data-typed-items")?.split(",").map(str => str.trim());
  if (!strings || strings.length === 0) return;

  new Typed(target, {
    strings,
    loop: true,
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 2000,
    smartBackspace: true
  });
}
