export default class Editor {
  constructor(root) {
    this.editors = {
      html: root.querySelector('[data-editor="html"]'),
      css: root.querySelector('[data-editor="css"]'),
      js: root.querySelector('[data-editor="js"]'),
    };
  }

  get(type) {
    return this.editors[type]?.value || '';
  }

  getAll() {
    return {
      html: this.get('html'),
      css: this.get('css'),
      js: this.get('js')
    };
  }
}
