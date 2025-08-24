export default class Tabs {
  constructor(root) {
    const tabButtons = root.querySelectorAll('[data-tab]');
    const editors = root.querySelectorAll('[data-editor]');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        tabButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
        btn.setAttribute('aria-selected', 'true');

        editors.forEach(editor => {
          editor.style.display = editor.dataset.editor === tab ? 'block' : 'none';
        });
      });
    });
  }
}
