export default class Alert {
  static removeAlert(alert) {
    if (!alert) return;
    alert.classList.add("fade-out");
    alert.addEventListener("transitionend", () => alert.remove(), { once: true });
  }

  static init() {
    document.querySelectorAll(".alert-dismiss").forEach((btn) => {
      btn.addEventListener("click", () => {
        Alert.removeAlert(btn.closest(".alert"));
      });
    });
  }
}
