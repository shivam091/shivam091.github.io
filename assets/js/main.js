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

  function _bindScrollTop() {
    const scrollTop = document.querySelector(".scroll-top");

    if (!scrollTop) return;

    scrollTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  function _toggleScrollTop() {
    const scrollTop = document.querySelector(".scroll-top");

    if (!scrollTop) return;

    const shouldShow = window.scrollY > 250;
    const isVisible = scrollTop.classList.contains("animate-in");

    if (shouldShow && !isVisible) {
      scrollTop.classList.remove("animate-out");
      scrollTop.classList.add("animate-in");
    } else if (!shouldShow && isVisible) {
      scrollTop.classList.remove("animate-in");
      scrollTop.classList.add("animate-out");
    }
  }

  return {
    init: function() {
      _initTypedJs();
      _initSideBar();
      _bindMainContentFocus();
      _bindScrollTop();
      _toggleScrollTop();

      window.addEventListener("load", _toggleScrollTop);
      document.addEventListener("scroll", _toggleScrollTop);
    }
  };
})();

(function() {
  "use strict";

  PersonalBlog.init();
})();
