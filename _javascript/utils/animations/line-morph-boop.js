import BoopController from "./boop-controller";
import LineMorph from "./line-morph";

export default class LineMorphBoop extends BoopController {
  constructor(lines, { boop = [], config } = {}) {
    const morph = new LineMorph(lines, config);
    const rest = morph.getState().map(linePts => linePts.map(pt => [pt.x, pt.y]));
    const boopVals = rest.map((linePts, li) =>
      linePts.map(([rx, ry], i) => {
        const boopPt = (boop[li] && boop[li][i]) || [];
        return [
          typeof boopPt[0] === "number" ? boopPt[0] : rx,
          typeof boopPt[1] === "number" ? boopPt[1] : ry,
        ];
      })
    );
    super(morph, rest, boopVals);
  }
}
