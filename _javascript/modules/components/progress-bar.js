class ProgressBar {
  static barElement = null;
  static progress = 0;
  static intervalId = null;

  static get progressBarElement() {
    return ProgressBar.barElement;
  }

  static initialize() {
    ProgressBar.barElement = document.getElementById("progress-bar");

    if (!ProgressBar.barElement) return;

    window.addEventListener("beforeunload", ProgressBar.start);
    window.addEventListener("load", ProgressBar.complete);
  }

  static start() {
    const bar = ProgressBar.progressBarElement;
    if (!bar) return;

    ProgressBar.progress = 0;
    clearInterval(ProgressBar.intervalId);

    bar.style.width = "0%";
    bar.setAttribute("data-state", "loading");

    ProgressBar.intervalId = setInterval(() => {
      if (ProgressBar.progress < 90) {
        ProgressBar.progress += Math.random() * 10;
        bar.style.width = `${Math.min(ProgressBar.progress, 90)}%`;
      }
    }, 200);
  }

  static complete() {
    const bar = ProgressBar.progressBarElement;
    if (!bar) return;

    clearInterval(ProgressBar.intervalId);
    bar.style.width = "100%";

    setTimeout(() => {
      bar.setAttribute("data-state", "done");
      bar.style.width = "0%";
    }, 500);
  }
}

export { ProgressBar };
