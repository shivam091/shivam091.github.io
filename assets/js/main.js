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

var ScrollTop = (()=> {
  let scrollTopBtn = null;
  let isVisible = false;

  function handleClick(event) {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  function toggleVisibility() {
    const shouldShow = window.scrollY > 250;

    if (shouldShow && !isVisible) {
      scrollTopBtn.classList.remove("animate-out");
      scrollTopBtn.classList.add("animate-in");
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      scrollTopBtn.classList.remove("animate-in");
      scrollTopBtn.classList.add("animate-out");
      isVisible = false;
    }
  }

  return {
    init: ()=> {
      scrollTopBtn = document.getElementById("scroll-top");
      if (!scrollTopBtn) return;

      scrollTopBtn.addEventListener("click", handleClick);
      window.addEventListener("scroll", toggleVisibility, {passive: true});
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
