import BoopController from "./boop-controller";
import RectMorph from "./rect-morph";

export default class RectMorphBoop extends BoopController {
  constructor(rects, { boop = [], config } = {}) {
    const morph = new RectMorph(rects, config);

    // rest state: [ [x, y], [width, height], [rx, ry] ]
    const rest = morph.getState().map(rectPts =>
      rectPts.map(pt => [pt.x, pt.y])
    );

    // boop values with fallback to rest
    const boopVals = rest.map((rectPts, ri) =>
      rectPts.map(([rx, ry], i) => {
        const boopPt = (boop[ri] && boop[ri][i]) || [];
        return [
          typeof boopPt[0] === "number" ? boopPt[0] : rx,
          typeof boopPt[1] === "number" ? boopPt[1] : ry,
        ];
      })
    );

    super(morph, rest, boopVals);
  }
}
