export default class ResizableIframe {
  constructor(root) {
    const resizer = document.createElement('div');
    resizer.className = 'iframe-resizer';
    root.querySelector('.preview').appendChild(resizer);

    let isDragging = false;
    resizer.addEventListener('mousedown', e => {
      isDragging = true;
      document.body.style.cursor = 'row-resize';
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const iframe = root.querySelector('[data-preview]');
      iframe.style.height = `${e.clientY - iframe.getBoundingClientRect().top}px`;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.cursor = '';
    });
  }
}
