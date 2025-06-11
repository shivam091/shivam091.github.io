import Typed from "typed.js";

export const PersonalBlog = (function() {
  function initTypedJs() {
    const typedElement = document.getElementById("hero-highlight");

    if (!typedElement || typeof Typed === "undefined") return;

    const strings = typedElement.getAttribute("data-typed-items")?.split(",").map(str => str.trim());

    if (!strings || strings.length === 0) return;

    new Typed(typedElement, {strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000});
  }

  function bindSkipLinkFocus() {
    const skipLink = document.getElementById("skip-link");
    const main = document.getElementById("main-content");

    if (!skipLink || !main) return;

    skipLink.addEventListener("click", (event) => {
      event.preventDefault();

      main.focus();
    });
  }

  return {
    init: function() {
      initTypedJs();
      bindSkipLinkFocus();
    }
  };
})();
