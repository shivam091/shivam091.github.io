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

    toggleButton?.addEventListener("click", () => {
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

  return {
    init: function() {
      _initTypedJs();
      _initSideBar();
    }
  };
})();

(function() {
  "use strict";

  PersonalBlog.init();
})();
