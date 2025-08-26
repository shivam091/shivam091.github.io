export default class Share {
  constructor(root, editors, preview, tabs) {
    this.root = root;
    this.container = root.closest('.playground') || root;
    this.editors = editors;
    this.preview = preview;
    this.tabs = tabs;
    this.btnCopy = this.container.querySelector("[data-cp-copy]");
    this.btnExport = this.container.querySelector("[data-cp-export]");
    this._bind();
  }

  _bind() {
    if (this.btnCopy) {
      this.btnCopy.addEventListener("click", () => this.copyActive());
    }
    if (this.btnExport) {
      this.btnExport.addEventListener("click", () => this.exportHTML());
    }
  }

  copyActive(){
    const activeTab = this.tabs.activeTab;
    const active = activeTab ? activeTab.dataset[this.tabs.tabAttr] : 'html';
    const val = this.editors[active].value;

    navigator.clipboard.writeText(val).then(()=>{
      this._flash(this.btnCopy, 'Copied!');
    }).catch(err=>{
      console.error("Copy failed", err);
      this._flash(this.btnCopy, 'Copy failed', true);
    });
  }

  _flash(el, text, danger=false){
     const prev = el.textContent;
     el.textContent = text;
     const oldClass = el.className;
     el.className = `cp-btn small ${danger? 'danger':''}`.trim();
     setTimeout(()=>{ el.textContent = prev; el.className = oldClass; }, 1000);
   }

  exportHTML() {
    const html = this.editors.html.value;
    const css = this.editors.css.value;
    const js = this.editors.js.value;
    const doc = this.preview._composeDocument(html, css, js, true, true);
    const blob = new Blob([doc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "playground.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
}
