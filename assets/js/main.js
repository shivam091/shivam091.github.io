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

const ProgressBar = (() => {
  let bar = null;
  let progress = 0;
  let interval;

  function showProgress() {
    if (!bar) return;

    bar.style.width = "0%";
    bar.setAttribute("data-state", "loading");

    progress = 0;

    clearInterval(interval);
    interval = setInterval(() => {
      if (progress < 90) {
        progress += Math.random() * 10;
        bar.style.width = `${Math.min(progress, 90)}%`;
      }
    }, 200);
  }

  function completeProgress() {
    if (!bar) return;

    clearInterval(interval);
    bar.style.width = "100%";

    setTimeout(() => {
      bar.setAttribute("data-state", "done");
      bar.style.width = "0%";
    }, 500);
  }

  return {
    init: () => {
      bar = document.getElementById("progress-bar");

      if (!bar) return;

      window.addEventListener("beforeunload", showProgress);
      window.addEventListener("load", completeProgress);
    },
    start: showProgress,
    done: completeProgress
  }
})();

var Tooltip = (function () {
  const tooltipMap = new WeakMap();
  const DEFAULT_SPACING = 8;

  function generateId() {
    return `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  }

  function createTooltipElement(text) {
    const el = document.createElement("div");

    el.className = "tooltip";
    el.id = generateId();
    el.innerHTML = text;
    el.setAttribute("role", "tooltip");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-describedby", el.id)

    return el;
  }

  function isFixedElement(el) {
    while (el && el !== document.body) {
      if (window.getComputedStyle(el).position === "fixed") return true;
      el = el.parentElement;
    }

    return false;
  }

  function getAvailablePosition(targetRect, tooltipRect) {
    const vw = window.innerWidth, vh = window.innerHeight;

    const fits = {
      top:    targetRect.top >= tooltipRect.height + DEFAULT_SPACING,
      bottom: vh - targetRect.bottom >= tooltipRect.height + DEFAULT_SPACING,
      left:   targetRect.left >= tooltipRect.width + DEFAULT_SPACING,
      right:  vw - targetRect.right >= tooltipRect.width + DEFAULT_SPACING
    };

    return fits.top ? "top" : fits.bottom ? "bottom" : fits.right ? "right" : fits.left ? "left" : "top";
  }

  function getPositionOffset(pos, targetRect, tooltipRect, isFixed) {
    const [scrollX, scrollY] = isFixed ? [0, 0] : [window.scrollX, window.scrollY];

    const midTop  = targetRect.top + (targetRect.height - tooltipRect.height) / 2 + scrollY;
    const midLeft = targetRect.left + (targetRect.width - tooltipRect.width) / 2 + scrollX;

    const positions = {
      top:    {top: targetRect.top - tooltipRect.height - DEFAULT_SPACING + scrollY, left: midLeft},
      bottom: {top: targetRect.bottom + DEFAULT_SPACING + scrollY, left: midLeft},
      left:   {top: midTop, left: targetRect.left - tooltipRect.width - DEFAULT_SPACING + scrollX},
      right:  {top: midTop, left: targetRect.right + DEFAULT_SPACING + scrollX}
    };

    return positions[pos] || {top: 0, left: 0};
  }

  function showTooltip(event) {
    const target = event.currentTarget;
    if (tooltipMap.has(target)) return;

    const tooltipText = target.getAttribute("data-tooltip");
    if (!tooltipText) return;

    const tooltip = createTooltipElement(tooltipText)

    document.body.appendChild(tooltip);

    const [targetRect, tooltipRect] = [target.getBoundingClientRect(), tooltip.getBoundingClientRect()];

    const position = target.getAttribute("data-tooltip-position") || getAvailablePosition(targetRect, tooltipRect);
    const isFixed = isFixedElement(target);
    const coords = getPositionOffset(position, targetRect, tooltipRect, isFixed);

    tooltip.classList.add(`tooltip-${position}`);
    tooltip.style.position = isFixed ? "fixed" : "absolute";
    tooltip.style.top = `${coords.top}px`;
    tooltip.style.left = `${coords.left}px`;

    requestAnimationFrame(() => tooltip.classList.add("show"));
    tooltipMap.set(target, tooltip);

    if ("ontouchstart" in window) {
      const delay = parseInt(target.getAttribute("data-tooltip-delay") || "3000", 10);
      setTimeout(() => hideTooltip({currentTarget: target}), delay);
    }
  }

  function hideTooltip(event) {
    const target = event.currentTarget;
    const tooltip = tooltipMap.get(target);

    if (tooltip) {
      tooltip.classList.remove("show");
      tooltip.classList.add("hide");
      target.removeAttribute("aria-describedby");

      const removeTooltip = () => {
        if (tooltip && tooltip.parentNode) {
          tooltip.remove();
          tooltipMap.delete(target);
        }
      };

      let removed = false;
      const cleanup = () => {
        if (!removed) {
          removeTooltip();
          removed = true;
        }
      };

      tooltip.addEventListener("transitionend", cleanup, {once: true});
      setTimeout(cleanup, 300);
    }
  }

  function handleEscape(event) {
    if (event.key === "Escape") hideTooltip({currentTarget: document.activeElement});
  }

  function attachTooltips() {
    document.querySelectorAll("[data-tooltip]").forEach(tooltipElement => {
      tooltipElement.addEventListener("mouseenter", showTooltip);
      tooltipElement.addEventListener("mouseleave", hideTooltip);

      tooltipElement.addEventListener("focus", showTooltip);
      tooltipElement.addEventListener("blur", hideTooltip);

      tooltipElement.addEventListener("touchstart", showTooltip);
      tooltipElement.addEventListener("touchend", hideTooltip);

      tooltipElement.addEventListener("keydown", handleEscape);
    });
  }

  return {
    init: function () {
      attachTooltips();
    }
  };
})();


(function() {
  "use strict";

  PersonalBlog.init();
  ScrollTop.init();
  ProgressBar.init();
  SideBar.init();
  Tooltip.init();

  document.querySelectorAll("[data-category]").forEach((categoryItem) => {
    const toggle = categoryItem.querySelector(".category-list__header");
    const content = categoryItem.querySelector(".category-list__posts");

    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      }
    });

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      const allowMultiple = event.ctrlKey || event.metaKey;

      if (!allowMultiple) {
        // Close all other categories
        document.querySelectorAll("[data-category]").forEach((item) => {
          const otherToggle = item.querySelector(".category-list__header");
          const otherContent = item.querySelector(".category-list__posts");
          const isCurrent = item === categoryItem;

          otherToggle.setAttribute("aria-expanded", isCurrent ? String(!expanded) : "false");
          otherContent.hidden = !isCurrent || expanded;
          item.toggleAttribute("data-expanded", isCurrent && !expanded);
        });
      }

      toggle.setAttribute("aria-expanded", String(!expanded));
      content.hidden = expanded;
      categoryItem.toggleAttribute("data-expanded", !expanded);
    });

    // Check for URL hash match on load
    const currentHash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    const categoryTitle = toggle.querySelector(".category-list__title").textContent.trim();
    if (currentHash && categoryTitle.toLowerCase() === currentHash) {
      setTimeout(() => {
        toggle.click();
        categoryItem.scrollIntoView({behavior: "smooth", block: "start"});
      }, 300);
    }
  });
})();
