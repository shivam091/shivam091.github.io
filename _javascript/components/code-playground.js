export default class CodePlayground {
  constructor(root){
    this.root = root;
    // Elements
    this.tabs = [...root.querySelectorAll('.cp-tab')];
    this.editors = {
      html: root.querySelector('[data-editor="html"] textarea'),
      css:  root.querySelector('[data-editor="css"] textarea'),
      js:   root.querySelector('[data-editor="js"] textarea'),
    };
    this.iframe = root.querySelector('.cp-iframe');

    // Controls
    this.btnRun   = root.querySelector('[data-cp-run]');
    this.btnCopy  = root.querySelector('[data-cp-copy]');
    this.chkAuto  = root.querySelector('[data-cp-autorun]');
    this.btnReset = document.querySelector('[data-cp-reset]');
    this.btnExport= document.querySelector('[data-cp-export]');
    this.chkBoiler= root.querySelector('[data-cp-html-boiler]');
    this.chkConsole= root.querySelector('[data-cp-console]');

    // State
    this.initial = {
      html: this.editors.html.value,
      css:  this.editors.css.value,
      js:   this.editors.js.value,
    };

    // Seed via <script type> blocks if provided
    this._applySeeds();

    // Bind
    this._bindTabs();
    this._bindControls();

    this.previewTabs = [...root.querySelectorAll('.cp-preview-tabs .cp-tab')];
    this.previewPanels = root.querySelectorAll('.cp-preview-panel');
    this.consoleBox = root.querySelector('#cp-console');
    this._bindPreviewTabs();
    this._patchConsole();

    window.addEventListener("message", (e) => {
      if (e.data?.type === "cp-console" && this.consoleBox) {
        const div = document.createElement("div");
        div.textContent = e.data.msg;
        div.style.color = e.data.level === "error" ? "#ff6b6b" : "#e6e6e6";
        this.consoleBox.appendChild(div);
        this.consoleBox.scrollTop = this.consoleBox.scrollHeight;
      }
    });


    // Autorun
    const wantAuto = this.root.getAttribute('data-autorun') !== 'false';
    this.chkAuto.checked = wantAuto;
    if (wantAuto) this.run();
  }

  _applySeeds(){
    const sHTML = this.root.querySelector('script.cp-seed-html');
    const sCSS  = this.root.querySelector('script.cp-seed-css');
    const sJS   = this.root.querySelector('script.cp-seed-js');
    if (sHTML) this.editors.html.value = sHTML.textContent.trim();
    if (sCSS)  this.editors.css.value  = sCSS.textContent.trim();
    if (sJS)   this.editors.js.value   = sJS.textContent.trim();
  }

  _bindTabs(){
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });
  }

  _bindControls(){
    // Copy active panel
    this.btnCopy.addEventListener('click', () => this.copyActive());

    // Run
    this.btnRun.addEventListener('click', () => this.run());

    // Autorun on input (debounced)
    const debounced = this._debounce(() => { if (this.chkAuto.checked) this.run(); }, 400);
    Object.values(this.editors).forEach(t => t.addEventListener('input', debounced));

    // Reset
    if (this.btnReset) this.btnReset.addEventListener('click', () => this.reset());

    // Export HTML (single file)
    if (this.btnExport) this.btnExport.addEventListener('click', () => this.exportHTML());
  }

  switchTab(name){
    // Tabs UI
    this.tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
    // Panels
    this.root.querySelectorAll('.cp-editor').forEach(p => {
      p.setAttribute('aria-hidden', String(p.dataset.editor !== name));
    });
  }

  copyActive(){
    const active = this.tabs.find(t => t.getAttribute('aria-selected') === 'true')?.dataset.tab || 'html';
    const val = this.editors[active].value;
    navigator.clipboard.writeText(val).then(()=>{
      this._flash(this.btnCopy, 'Copied!');
    }).catch(()=>{
      this._flash(this.btnCopy, 'Copy failed', true);
    });
  }

  reset(){
    this.editors.html.value = this.initial.html;
    this.editors.css.value  = this.initial.css;
    this.editors.js.value   = this.initial.js;
    if (this.chkAuto.checked) this.run();
  }

  exportHTML(){
    const doc = this._composeDocument();
    const blob = new Blob([doc], {type:'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'playground.html';
    document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
  }

  run(){
    if (this.consoleBox) this.consoleBox.textContent = "";

    const doc = this._composeDocument();
    const blob = new Blob([doc], {type:'text/html'});
    const url = URL.createObjectURL(blob);
    this.iframe.src = url;
    // Revoke after load to free memory
    this.iframe.onload = () => URL.revokeObjectURL(url);
  }

  _composeDocument(){
    const html = this.editors.html.value;
    const css  = this.editors.css.value;
    const js   = this.editors.js.value;

    const boiler = this.chkBoiler?.checked !== false;
    const withConsole = this.chkConsole?.checked === true;

    const consolePatch = `
      <script>
      (function(){
        function send(type, args){
          parent.postMessage({type: "cp-console", level: type, msg: args.join(" ")}, "*");
        }
        const log = console.log, err = console.error;
        console.log = function(){ send("log", Array.from(arguments)); log.apply(console, arguments); };
        console.error = function(){ send("error", Array.from(arguments)); err.apply(console, arguments); };
      })();
      <\/script>`;

    const consoleBox = withConsole ? `<div id="cp-console" style="font:12px/1.4 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; background:#0b1220;color:#e6e6e6;border-top:1px solid #0f1a2e; padding:8px; min-height:24px"></div>` : '';

    if (!boiler){
      // Return raw, but still splice in CSS/JS blocks for convenience
      return `${html}\n<style>${css}<\/style>\n<script>${js}<\/script>${consolePatch}${consoleBox}`;
    }

    return `<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Playground</title>\n<style>\nhtml,body{height:100%} body{margin:0} ${css}\n</style>\n</head>\n<body>\n${html}\n${consoleBox}\n<script>\n${js}\n<\/script>\n${consolePatch}\n</body>\n</html>`;
  }

  _flash(el, text, danger=false){
    const prev = el.textContent;
    el.textContent = text;
    const oldClass = el.className;
    el.className = `cp-btn small ${danger? 'danger':''}`.trim();
    setTimeout(()=>{ el.textContent = prev; el.className = oldClass; }, 1000);
  }

  _debounce(fn, ms){
    let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn.apply(this,args), ms); };
  }

  _bindPreviewTabs(){
    this.previewTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const name = tab.dataset.preview;
        // tabs UI
        this.previewTabs.forEach(t => t.setAttribute('aria-selected', String(t===tab)));
        // panels
        this.previewPanels.forEach(p => p.setAttribute('aria-hidden', String(p.dataset.panel !== name)));
      });
    });
  }

  _patchConsole(){
    if(!this.consoleBox) return;
    const box = this.consoleBox;
    const log = console.log;
    const err = console.error;
    function append(type, args){
      const div = document.createElement('div');
      div.textContent = (type==='error'?'[error] ':'') + args.join(' ');
      div.style.color = type==='error'?'#ff6b6b':'#e6e6e6';
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
    }
    console.log = (...args)=>{ append('log', args); log.apply(console, args); };
    console.error = (...args)=>{ append('error', args); err.apply(console, args); };
  }

  static initAll() {
    document.querySelectorAll("[data-code-playground]").forEach(el => new CodePlayground(el));
  }
}
