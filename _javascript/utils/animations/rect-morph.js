import Morph from "./morph";

export default class RectMorph extends Morph {
  constructor(rects, config = { stiffness: 0.12, damping: 0.75 }) {
    super(
      rects,
      config,
      el => [ // extract points
        [parseFloat(el.getAttribute("x")) || 0, parseFloat(el.getAttribute("y")) || 0],
        [parseFloat(el.getAttribute("width")) || 0, parseFloat(el.getAttribute("height")) || 0],
        [parseFloat(el.getAttribute("rx")) || 0, parseFloat(el.getAttribute("ry")) || 0],
      ],
      (el, pointGroups) => { // build attributes
        const [pos, size, radius] = pointGroups.map(g => g.getState());
        el.setAttribute("x", pos.x.toFixed(2));
        el.setAttribute("y", pos.y.toFixed(2));
        el.setAttribute("width", size.x.toFixed(2));
        el.setAttribute("height", size.y.toFixed(2));
        el.setAttribute("rx", Math.max(0, radius.x).toFixed(2));
        el.setAttribute("ry", Math.max(0, radius.x).toFixed(2));
      }
    );
  }
}
