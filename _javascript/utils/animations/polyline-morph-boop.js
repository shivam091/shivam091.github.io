import BoopController from "./boop-controller";
import PolyLineMorph from "./polyline-morph";

export default class PolyLineMorphBoop extends BoopController {
  constructor(polylines, { boop = [], config } = {}) {
    const morph = new PolyLineMorph(polylines, config);
    const rest = morph.getState().map(polyPts => polyPts.map(pt => [pt.x, pt.y]));
    const boopVals = rest.map((polyPts, pi) =>
      polyPts.map(([rx, ry], i) => {
        const boopPt = (boop[pi] && boop[pi][i]) || [];
        return [
          typeof boopPt[0] === "number" ? boopPt[0] : rx,
          typeof boopPt[1] === "number" ? boopPt[1] : ry,
        ];
      })
    );
    super(morph, rest, boopVals);
  }
}
