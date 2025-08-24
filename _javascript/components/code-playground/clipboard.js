export default class Clipboard {
  constructor(root, editor) {
    const actions = {
      'copy-html': () => navigator.clipboard.writeText(editor.get('html')),
      'copy-css': () => navigator.clipboard.writeText(editor.get('css')),
      'copy-js': () => navigator.clipboard.writeText(editor.get('js')),
    };

    root.querySelectorAll('[data-action]').forEach(btn => {
      const action = btn.dataset.action;
      if (actions[action]) {
        btn.addEventListener('click', actions[action]);
      }
    });
  }
}
