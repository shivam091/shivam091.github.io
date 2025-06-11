export const SvgSprite = (function () {
  return {
    toggle: function (element, symbolHref) {
      if (element) element.setAttribute("href", `/assets/img/sprite.svg${symbolHref}`);
    }
  };
})();
