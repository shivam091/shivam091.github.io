var PersonalBlog = (function() {
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

const SideBar = (() => {
  const toggleButton = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");

  function collapseSidebarWithFallback() {
    if (!sidebar) return;

    sidebar.setAttribute("data-state", "close");
    setTimeout(() => {
      if (sidebar.getAttribute("data-state") === "close") {
        sidebar.setAttribute("data-state", "idle");
      }
    }, 400);
  }

  function initSidebarToggle() {
    if (!toggleButton || !sidebar || !mainContent) return;

    toggleButton.addEventListener("click", () => {
      const isOpen = sidebar.getAttribute("data-state") === "open";
      const nextState = isOpen ? "close" : "open";

      sidebar.setAttribute("data-state", nextState);
      mainContent.setAttribute("data-sidebar", nextState);
      toggleButton.setAttribute("data-state", nextState);
      toggleButton.setAttribute("aria-expanded", String(nextState === "open"));

      if (!isOpen) return;
      collapseSidebarWithFallback();
    });
  }

  return {
    init: () => {
      initSidebarToggle();
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
    if (!scrollTopBtn) return;

    const shouldShow = window.scrollY > 250;

    if (shouldShow && !isVisible) {
      scrollTopBtn.setAttribute("data-state", "visible");
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      scrollTopBtn.setAttribute("data-state", "hidden");
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
  SideBar.init();
})();
