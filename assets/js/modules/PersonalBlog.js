export const PersonalBlog = (function() {
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
      bindSkipLinkFocus();
    }
  };
})();
