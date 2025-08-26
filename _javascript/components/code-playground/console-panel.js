export default class ConsolePanel {
  constructor(el) {
    this.el = el;
    this.logArea = el.querySelector(".console-log-area");
    this.btnClearConsole = el.querySelector("[data-cp-clear-console]");

    this._bindEvents();
    this._bindMessages();
  }

  _bindEvents() {
    if (this.btnClearConsole) {
      this.btnClearConsole.addEventListener("click", () => this.clear());
    }
  }

  clear() {
    if (this.logArea) {
      this.logArea.textContent = "";
    }
  }

  append(level, args) {
    if (!this.logArea) return;

    const div = document.createElement("div");
    div.className = `console-line console-${level}`;
    div.textContent = `[${level}] ${Array.isArray(args) ? args.join(" ") : args}`;

    this.logArea.appendChild(div);
    this.logArea.scrollTop = this.logArea.scrollHeight;
  }

  _bindMessages() {
    window.addEventListener("message", (e) => {
      if (e.data?.type === "cp-console") {
        this.append(e.data.level, e.data.msg);
      }
    });
  }
}
