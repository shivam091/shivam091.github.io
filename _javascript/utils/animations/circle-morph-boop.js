import BoopController from "./boop-controller";
import CircleMorph from "./circle-morph";

export default class CircleMorphBoop extends BoopController {
  constructor(circles, { boop = [], config } = {}) {
    const morph = new CircleMorph(circles, config);

    // rest state: [ [cx, cy], [r, 0] ]
    const rest = morph.getState().map(circlePts =>
      circlePts.map(pt => [pt.x, pt.y])
    );

    // boop values with fallback to rest
    const boopVals = rest.map((circlePts, ci) =>
      circlePts.map(([rx, ry], i) => {
        const boopPt = (boop[ci] && boop[ci][i]) || [];
        return [
          typeof boopPt[0] === "number" ? boopPt[0] : rx,
          typeof boopPt[1] === "number" ? boopPt[1] : ry,
        ];
      })
    );

    super(morph, rest, boopVals);
  }
}
