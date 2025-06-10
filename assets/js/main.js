const PopperUtils = (() => {
  const instances = new WeakMap();

  function createPopper(target, popperElement, options = {}) {
    const defaultOptions = {
      placement: options.placement || "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: options.offset || [0, 8],
          },
        },
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport",
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top", "bottom", "right", "left"],
          },
        },
        {
          name: "eventListeners",
          options: {
            scroll: true,
            resize: true,
          },
        },
      ],
    };

    const instance = Popper.createPopper(target, popperElement, defaultOptions);
    instances.set(popperElement, instance);

    return instance;
  }

  function destroyPopper(popperElement) {
    const instance = instances.get(popperElement);
    if (instance) {
      instance.destroy();
      instances.delete(popperElement);
    }
  }

  function updatePopper(popperElement) {
    const instance = instances.get(popperElement);
    if (instance) {
      instance.update();
    }
  }

  return {
    create: createPopper,
    destroy: destroyPopper,
    update: updatePopper,
  };
})();

const ThemeSwitcher = (() => {
  const THEME_KEY = "theme"; // "light", "dark", or "system"
  const themeToggleLink = document.getElementById("theme-toggle-link");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  // Get the effective theme based on user/system preference
  function getEffectiveTheme(savedTheme) {
    if (savedTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return savedTheme;
  }

  // Apply theme to document
  function applyTheme(theme) {
    const actualTheme = getEffectiveTheme(theme);
    document.documentElement.setAttribute("data-theme", actualTheme);
    localStorage.setItem(THEME_KEY, theme); // Save user's preference (light/dark/system)
    updateDropdown(theme); // update active class in dropdown
  }

  // Update selected dropdown item
  function updateDropdown(selectedTheme) {
    dropdownItems.forEach((item) => {
      const itemTheme = item.textContent.trim().toLowerCase();

      if (itemTheme === selectedTheme) {
        item.classList.add("dropdown-item-selected");
      } else {
        item.classList.remove("dropdown-item-selected");
      }
    });
  }

  // Function to toggle the theme between light and dark
  function toggleTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "system";
    applyTheme(savedTheme);

    dropdownItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const title = item.textContent.trim().toLowerCase();
        const newTheme = title.includes("system") ? "system" : title;
        applyTheme(newTheme);
      });
    });

    // Listen to system theme changes if user selected "system"
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      const savedTheme = localStorage.getItem(THEME_KEY) || "system";
      if (savedTheme === "system") {
        applyTheme("system");
      }
    });
  }

  return {
    init: () => {
      const savedTheme = localStorage.getItem(THEME_KEY) || "light";
      applyTheme(savedTheme);
      updateDropdown(savedTheme);

      // Event listener for the theme toggle link
      themeToggleLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent link from navigating
        toggleTheme(); // Toggle the theme
      });
    }
  };
})();

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

const Tooltip = (function () {
  function generateId() {
    return `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  }

  function createTooltipElement(text) {
    const el = document.createElement("div");
    const id = generateId();

    el.className = "tooltip";
    el.id = id;
    el.innerHTML = text;
    el.setAttribute("role", "tooltip");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-hidden", "true");

    return el;
  }

  function show(event) {
    const target = event?.currentTarget;
    if (!target) return;

    const tooltipText = target.getAttribute("data-tooltip");
    const delay = parseInt(target.getAttribute("data-tooltip-delay") || "3000", 10);

    // Prevent double creation
    if (target._tooltip) {
      const tooltip = target._tooltip;
      tooltip.classList.add("show");
      tooltip.classList.remove("hide");
      tooltip.setAttribute("aria-hidden", "false");
      target.setAttribute("aria-describedby", tooltip.id);

      PopperUtils.update(tooltip);
      return;
    }

    const tooltip = createTooltipElement(tooltipText);
    target._tooltip = tooltip; // cache it on the element
    tooltip._target = target;  // reverse reference if needed

    document.body.appendChild(tooltip);

    PopperUtils.create(target, tooltip, {
      placement: target.getAttribute("data-tooltip-position") || "top",
      offset: [0, 8],
    });

    tooltip.classList.add("show");
    tooltip.setAttribute("aria-hidden", "false");
    target.setAttribute("aria-describedby", tooltip.id);

    if ("ontouchstart" in window) {
      setTimeout(() => hide({currentTarget: target}), delay);
    }
  }

  function hide(event) {
    const target = event.currentTarget;
    const tooltip = target._tooltip;
    if (!tooltip) return;

    tooltip.classList.remove("show");
    tooltip.classList.add("hide");
    tooltip.setAttribute("aria-hidden", "true");
    target.removeAttribute("aria-describedby");

    const cleanup = () => {
      if (tooltip.parentNode) tooltip.remove();
      PopperUtils.destroy(tooltip);
      delete target._tooltip;
    };

    tooltip.addEventListener("transitionend", cleanup, {once: true});
    setTimeout(cleanup, 300);
  }

  function handleEscape(event) {
    if (event.key === "Escape") {
      hide({currentTarget: document.activeElement});
    }
  }

  function attachTooltips() {
    document.querySelectorAll("[data-tooltip]").forEach(tooltipElement => {
      let hoverTimer;

      const safeShow = (e) => {
        clearTimeout(hoverTimer);
        const target = e.currentTarget; // <--- Cache target early
        hoverTimer = setTimeout(() => show({currentTarget: target}), 200);
      };

      const safeHide = (e) => {
        clearTimeout(hoverTimer);
        const target = e.currentTarget;
        hoverTimer = setTimeout(() => hide({currentTarget: target}), 50);
      };

      tooltipElement.addEventListener("mouseenter", safeShow);
      tooltipElement.addEventListener("mouseleave", safeHide);

      tooltipElement.addEventListener("focus", show);
      tooltipElement.addEventListener("blur", hide);

      tooltipElement.addEventListener("touchstart", show);
      tooltipElement.addEventListener("touchend", hide);

      tooltipElement.addEventListener("pointerdown", show);
      tooltipElement.addEventListener("pointerup", hide);

      tooltipElement.addEventListener("keydown", handleEscape);
    });
  }

  return {
    init: function () {
      attachTooltips();
    }
  };
})();

var SvgSprite = (function () {
  return {
    toggle: function (element, symbolHref) {
      if (element) element.setAttribute("href", `/assets/img/sprite.svg${symbolHref}`);
    }
  };
})();

var Categories = (function () {
  function toggleSubCategories(event, categoryItem, toggleButton, content) {
    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    if (!toggleButton) return;

    toggleButton.setAttribute("aria-expanded", String(!expanded));
    categoryItem.toggleAttribute("data-expanded", !expanded);

    const iconHref = expanded ? "#icon-folder" : "#icon-folder-open";
    const iconElement = categoryItem.querySelector(".category-icon use");

    if (iconElement) SvgSprite.toggle(iconElement, iconHref);

    if (!expanded) {
      content.style.display = "block";
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.offsetHeight;  // Force reflow
      content.style.maxHeight = "0";
    }
  }

  function bindToggle() {
    document.querySelectorAll("[data-category]").forEach((categoryItem) => {
      const toggleButton = categoryItem.querySelector(".btn-category-toggle");
      const content = categoryItem.querySelector(".sub-categories");

      if (!toggleButton || !content) return;

      toggleButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleButton.click();
        }
      });

      toggleButton.addEventListener("click", (event) => {
        toggleSubCategories(event, categoryItem, toggleButton, content);
      });

      content.addEventListener("transitionend", () => {
        if (content.style.maxHeight === "0px") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    });
  }

  return {
    init: function () {
      bindToggle();
    }
  };
})();

const Dropdown = (() => {
  const dropdowns = document.querySelectorAll("[data-dropdown]");

  function closeAll() {
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");

      button.setAttribute("aria-expanded", "false");
      menu.classList.remove("show");
      button.classList.remove("show");

      PopperUtils.destroy(menu);
    });
  }

  function bindDropdowns() {
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");

      if (!button || !menu) return;

      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains("show");

        closeAll();

        if (!isOpen) {
          button.setAttribute("aria-expanded", "true");
          menu.classList.add("show");
          button.classList.add("show");

          PopperUtils.create(button, menu, {
            placement: button.getAttribute("data-dropdown-position") || "bottom",
            offset: [0, 8]
          });
        }
      });

      window.addEventListener("resize", () => {
        if (menu.classList.contains("show")) {
          PopperUtils.update(menu);
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("[data-dropdown]")) {
        closeAll();
      }
    });
  }

  return {
    init: () => {
      bindDropdowns();
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
  Categories.init();
  Dropdown.init();
  ThemeSwitcher.init();
})();
