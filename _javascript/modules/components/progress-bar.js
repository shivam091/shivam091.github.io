export default class ProgressBar {
  static barElement = null;
  static progress = 0;
  static intervalId = null;

  static get progressBarElement() {
    return this.barElement;
  }

  static initialize() {
    this.barElement = document.getElementById("progress-bar");

    if (!this.barElement) return;

    window.addEventListener("beforeunload", () => this.start());
    window.addEventListener("load", () => this.complete());
  }

  static start() {
    const bar = this.progressBarElement;
    if (!bar) return;

    this.progress = 0;
    clearInterval(this.intervalId);

    bar.style.width = "0%";
    bar.setAttribute("data-state", "loading");

    this.intervalId = setInterval(() => {
      if (this.progress < 90) {
        this.progress += Math.random() * 10;
        bar.style.width = `${Math.min(this.progress, 90)}%`;
      }
    }, 200);
  }

  static complete() {
    const bar = this.progressBarElement;
    if (!bar) return;

    clearInterval(this.intervalId);
    bar.style.width = "100%";

    setTimeout(() => {
      bar.setAttribute("data-state", "done");
      bar.style.width = "0%";
    }, 500);
  }
}
