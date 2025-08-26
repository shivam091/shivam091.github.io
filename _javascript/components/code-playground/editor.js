export default class Editor {
  constructor(root, type) {
    this.root = root;
    this.type = type;
    this.textarea = root.querySelector(`[data-editor="${type}"] textarea`);
    this.initial = this.textarea.value;
  }

  get value() {
    return this.textarea.value;
  }

  set value(val) {
    this.textarea.value = val;
  }

  reset() {
    this.value = this.initial;
  }
}
