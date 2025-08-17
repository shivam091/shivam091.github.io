import Morph from "./morph";

export default class EllipseMorph extends Morph {
  constructor(ellipses, config = { stiffness: 0.12, damping: 0.75 }) {
    super(
      ellipses,
      config,

      // Extract points
      el => {
        const cx = parseFloat(el.getAttribute("cx")) || 0;
        const cy = parseFloat(el.getAttribute("cy")) || 0;
        const rx = parseFloat(el.getAttribute("rx")) || 0;
        const ry = parseFloat(el.getAttribute("ry")) || 0;

        // Represent as point groups
        return [
          [cx, cy],      // center
          [rx, ry],      // radii
        ];
      },

      // Build attributes
      (el, pointGroups) => {
        const [center, radii] = pointGroups.map(g => g.getState());

        el.setAttribute("cx", center.x.toFixed(2));
        el.setAttribute("cy", center.y.toFixed(2));
        el.setAttribute("rx", radii.x.toFixed(2));
        el.setAttribute("ry", radii.y.toFixed(2));
      }
    );
  }
}
