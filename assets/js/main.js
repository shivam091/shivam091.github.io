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

  return {
    init: function() {
      _initTypedJs();
    }
  };
})();

(function() {
  "use strict";

  PersonalBlog.init();
})();
