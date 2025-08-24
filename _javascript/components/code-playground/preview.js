export default class Preview {
  constructor(root) {
    this.iframe = root.querySelector('[data-preview]');
  }

  render(html, css, js) {
    const doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html><head><style>${css}</style></head>
      <body>${html}<script>${js}<\/script></body>
      </html>
    `);
    doc.close();
  }
}
