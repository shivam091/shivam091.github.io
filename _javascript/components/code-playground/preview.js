export default class Preview {
  constructor(root, consolePanel) {
    this.iframe = root.querySelector(".iframe");
    this.consolePanel = consolePanel;
  }

  run(html, css, js) {
    const doc = this._composeDocument(html, css, js);

    const blob = new Blob([doc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    this.iframe.src = url;
    this.iframe.onload = () => URL.revokeObjectURL(url);
  }

  _composeDocument(html, css, js) {
    const consolePatch = `
      <script>
        (function(){
          const orig = {
            log: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error
          };
          function send(level, args){
            try {
              parent.postMessage(
                {type:"cp-console", level, msg: args.map(a => {
                  try { return (typeof a === "object" ? JSON.stringify(a) : String(a)); }
                  catch(e){ return String(a); }
                })},
                "*"
              );
            } catch(e){}
            orig[level](...args); // forward to DevTools console
          }
          console.log = (...a)=>send("log", a);
          console.info = (...a)=>send("info", a);
          console.warn = (...a)=>send("warn", a);
          console.error = (...a)=>send("error", a);
          window.onerror = (msg,src,line,col)=>send("error",[msg+" ("+line+":"+col+")"]);
        })();
      <\/script>
    `;

    const body = `
      ${html}
      ${consolePatch}
      <script>${js}<\/script>
    `;

    return `<!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Playground</title>
  <style>html,body{height:100%}body{margin:0}${css}</style>
  </head>
  <body>
  ${body}
  </body>
  </html>`;
  }
}
