import Morph from "./morph";

export default class PolyLineMorph extends Morph {
  constructor(polylines, config = { stiffness: 0.12, damping: 0.75 }) {
    super(
      polylines,
      config,
      el => { // extract points
        const nums = el.getAttribute("points").trim().split(/\s+/).map(Number);
        if (nums.length % 2 !== 0) throw new Error("Invalid polyline points");
        const pts = [];
        for (let i = 0; i < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
        return pts;
      },
      (el, pointGroups) => { // build attribute
        const pts = pointGroups
          .map(g => `${g.getState().x.toFixed(2)} ${g.getState().y.toFixed(2)}`)
          .join(" ");
        el.setAttribute("points", pts);
      }
    );
  }
}
