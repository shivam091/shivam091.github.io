export default class SvgSprite {
  static toggle(element, symbolName) {
    if (element) element.setAttribute("href", `/assets/img/sprite.svg#icon-${symbolName}`);
  }
}
