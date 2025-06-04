var PersonalBlog = (function() {
  function initTypedJs() {
    const typedElement = document.getElementById("hero-highlight");

    if (!typedElement || typeof Typed === "undefined") return;

    const strings = typedElement.getAttribute("data-typed-items")?.split(",").map(str => str.trim());

    if (!strings || strings.length === 0) return;

    new Typed(typedElement, {strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000});
  }

  function initSidebarToggle() {
    const toggleButton = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");

    if (!toggleButton || !sidebar || !mainContent) return;

    toggleButton.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("open");

      sidebar.classList.toggle("close", !isOpen);
      mainContent.classList.toggle("sidebar-active", isOpen);
      toggleButton.classList.toggle("open", isOpen);
      toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  function bindSkipLinkFocus() {
    const skipLink = document.getElementById("skip-link");
    const main = document.getElementById("main-content");

    if (!skipLink || !main) return;

    skipLink.addEventListener("click", function (event) {
      event.preventDefault();

      main.focus();
    });
  }

  return {
    init: function() {
      initTypedJs();
      initSidebarToggle();
      bindSkipLinkFocus();
    }
  };
})();

const ScrollTop = (() => {
  let scrollTopBtn = null;
  let isVisible = false;
  let ticking = false;

  function handleClick(event) {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  function toggleVisibility() {
    const shouldShow = window.scrollY > 250;

    if (shouldShow && !isVisible) {
      scrollTopBtn.setAttribute("data-state", "visible");
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      scrollTopBtn.classList.remove("animate-in");
      isVisible = false;
    }
  }

  return {
    init: () => {
      scrollTopBtn = document.getElementById("scroll-top");
      if (!scrollTopBtn) return;

      scrollTopBtn.addEventListener("click", handleClick);

      // Throttle or debounce to avoid over-triggering toggleVisibility()
      window.addEventListener("scroll", () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            toggleVisibility();
            ticking = false;
          });
          ticking = true;
        }
      }, {passive: true});

      window.addEventListener("load", toggleVisibility);
      toggleVisibility();
    }
  };
})();

(function() {
  "use strict";

  PersonalBlog.init();
  ScrollTop.init();
})();
