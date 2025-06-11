export const SideBar = (() => {
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
