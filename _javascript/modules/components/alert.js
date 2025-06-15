export default class Alert {
  static init() {
    document.querySelectorAll(".alert-dismiss").forEach((btn) => {
      btn.addEventListener("click", () => {
        const alert = btn.closest(".alert");
        if (!alert) return;

        alert.classList.add("fade-out");

        alert.addEventListener("transitionend", () => {
          alert.remove();
        }, { once: true });
      });
    });
  }
}
