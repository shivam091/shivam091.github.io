import BoopController from "./boop-controller";
import EllipseMorph from "./ellipse-morph";

export default class EllipseMorphBoop extends BoopController {
  constructor(ellipses, { boop = [], config } = {}) {
    const morph = new EllipseMorph(ellipses, config);

    // Rest state: [ [cx,cy], [rx,ry] ]
    const rest = morph.getState().map(ellipsePts =>
      ellipsePts.map(pt => [pt.x, pt.y])
    );

    // Boop values with fallback to rest
    const boopVals = rest.map((ellipsePts, ei) =>
      ellipsePts.map(([rx, ry], i) => {
        const boopPt = (boop[ei] && boop[ei][i]) || [];
        return [
          typeof boopPt[0] === "number" ? boopPt[0] : rx,
          typeof boopPt[1] === "number" ? boopPt[1] : ry,
        ];
      })
    );

    super(morph, rest, boopVals);
  }
}
