export const ProgressBar = (() => {
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
