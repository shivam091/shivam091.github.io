export default class SharableState {
  constructor(root, editor) {
    const shareBtn = root.querySelector('[data-action="share"]');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', () => {
      const code = editor.getAll();
      const payload = btoa(unescape(encodeURIComponent(JSON.stringify(code))));
      const url = `${location.origin}${location.pathname}?playground=${payload}`;
      navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
    });

    const params = new URLSearchParams(location.search);
    const encoded = params.get('playground');
    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
        if (decoded.html) editor.editors.html.value = decoded.html;
        if (decoded.css) editor.editors.css.value = decoded.css;
        if (decoded.js) editor.editors.js.value = decoded.js;
      } catch (e) {
        console.error('Invalid shared code:', e);
      }
    }
  }
}
