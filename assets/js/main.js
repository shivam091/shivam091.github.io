var PersonalBlog = (function() {
  function _initTypedJs() {
    if (typeof Typed === "undefined") return;

    const selectTyped = document.querySelector(".typed");

    if (selectTyped) {
      let typedStrings = selectTyped.getAttribute("data-typed-items");
      typedStrings = typedStrings.split(",");

      new Typed(".typed", {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  function _initSideBar() {
    const toggleButton = document.querySelector(".sidebar-toggle");
    const mainContent = document.querySelector(".main-content");
    const sidebar = document.querySelector(".sidebar");

    if (toggleButton && mainContent && sidebar) {
      toggleButton.addEventListener("click", () => {
        const isOpen = sidebar.classList.contains("open");

        if (isOpen) {
          sidebar.classList.remove("open");
          sidebar.classList.add("close");
          mainContent.classList.remove("sidebar-active");
          toggleButton.classList.remove("open");
        } else {
          sidebar.classList.remove("close");
          sidebar.classList.add("open");
          mainContent.classList.add("sidebar-active");
          toggleButton.classList.add("open");
        }
      });
    }
  }

  function _bindMainContentFocus() {
    const skipLink = document.querySelector(".skip-link");
    const main = document.getElementById("main-content");

    if (!skipLink || !main) return;

    skipLink.addEventListener("click", function (event) {
      event.preventDefault();

      main.focus();
    });
  }

  return {
    init: function() {
      _initTypedJs();
      _initSideBar();
      _bindMainContentFocus();
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
      scrollTopBtn = document.querySelector("#scroll-top");
      if (!scrollTopBtn) return;

      scrollTopBtn.addEventListener("click", handleClick);
      window.addEventListener("scroll", toggleVisibility, {passive: true});
      window.addEventListener("load", toggleVisibility);
      toggleVisibility(); // Initial check
    }
  };
})();

(function() {
  "use strict";

  PersonalBlog.init();
  ScrollTop.init();
})();
