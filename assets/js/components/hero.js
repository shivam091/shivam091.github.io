import Typed from "typed.js";

export function bindHeroTyping() {
  const target = document.getElementById("hero-highlight");
  if (!target) return;

  const strings = target.getAttribute("data-typed-items")?.split(",").map(str => str.trim());
  if (!strings || strings.length === 0) return;

  new Typed(target, { strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000 });
}
