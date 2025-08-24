import SpringMorph from "./spring-morph";

export default class LineMorph extends SpringMorph {
  constructor(lines, config = { stiffness: 0.12, damping: 0.75 }) {
    super(
      lines,
      config,
      el => [
        [parseFloat(el.getAttribute("x1")) || 0, parseFloat(el.getAttribute("y1")) || 0],
        [parseFloat(el.getAttribute("x2")) || 0, parseFloat(el.getAttribute("y2")) || 0],
        [parseFloat(el.style.opacity) || 1, 0], // treat opacity as a 1D point
      ],
      (el, pointGroups) => {
        const [p1, p2, op] = pointGroups.map(g => g.getState());
        el.setAttribute("x1", p1.x.toFixed(2));
        el.setAttribute("y1", p1.y.toFixed(2));
        el.setAttribute("x2", p2.x.toFixed(2));
        el.setAttribute("y2", p2.y.toFixed(2));
        el.style.opacity = op.x.toFixed(2);
      }
    );
  }
}
