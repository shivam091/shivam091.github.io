import BoopController from "./boop-controller";
import UseMorph from "./use-morph";

export default class UseMorphBoop extends BoopController {
  constructor(uses, { boop = [], config } = {}) {
    const morph = new UseMorph(uses, config);

    // Rest state: [ [x,y], [w,h], [opacity,0], [tx,ty], [sx,sy], [rot,0] ]
    const rest = morph.getState().map(usePts =>
      usePts.map(pt => [pt.x, pt.y])
    );

    // Boop values with fallback to rest
    const boopVals = rest.map((usePts, ui) =>
      usePts.map(([rx, ry], i) => {
        const boopPt = (boop[ui] && boop[ui][i]) || [];
        return [
          typeof boopPt[0] === "number" ? boopPt[0] : rx,
          typeof boopPt[1] === "number" ? boopPt[1] : ry,
        ];
      })
    );

    super(morph, rest, boopVals);
  }
}
