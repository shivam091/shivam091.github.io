export const ScrollTop = (() => {
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
