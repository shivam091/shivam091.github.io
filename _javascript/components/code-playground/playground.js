import Editor from './editor.js';
import Preview from './preview.js';
import Tabs from './tabs.js';
import Clipboard from './clipboard.js';
import ResizableIframe from './resizable-iframe.js';
import EditorToggles from './editor-toggles.js';
import SharableState from './sharable-state.js';

export default class Playground {
  constructor(root) {
    this.root = root;
    this.tabs = new Tabs(root);
    this.editor = new Editor(root);
    this.preview = new Preview(root);
    this.clipboard = new Clipboard(root, this.editor);
    this.resize = new ResizableIframe(root);
    this.toggles = new EditorToggles(root);
    this.sharing = new SharableState(root, this.editor);

    const refreshBtn = root.querySelector('[data-refresh]');
    refreshBtn.addEventListener('click', () => this.updatePreview());

    this.updatePreview();
  }

  updatePreview() {
    const { html, css, js } = this.editor.getAll();
    this.preview.render(html, css, js);
  }
}
