export default class EditorToggles {
  constructor(root) {
    const editors = root.querySelectorAll('.editor');
    root.querySelectorAll('[data-action]').forEach(btn => {
      const action = btn.dataset.action;
      if (action === 'expand') {
        btn.addEventListener('click', () => editors.forEach(e => e.style.display = 'block'));
      } else if (action === 'collapse') {
        btn.addEventListener('click', () => editors.forEach(e => e.style.display = 'none'));
      }
    });
  }
}
