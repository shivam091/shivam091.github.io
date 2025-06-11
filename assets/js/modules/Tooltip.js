export const Tooltip = (function () {
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
