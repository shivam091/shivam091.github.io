export default class CodeBlockUtils {
  static toggleLines(wrapper) {
    const btn = wrapper.querySelector(".btn-toggle-lines");
    const gutter = wrapper.querySelector(".gutter");

    btn?.addEventListener("click", () => {
      gutter.classList.toggle("hidden");
    });
  }

  static initAll() {
    document.querySelectorAll(".code-block").forEach(wrapper => {
      this.toggleLines(wrapper);
    });
  }
}
