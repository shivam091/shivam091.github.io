import BoopController from "./boop-controller";
import PolygonMorph from "./polygon-morph";

export default class PolygonMorphBoop extends BoopController {
  constructor(polygons, { boop = [], config } = {}) {
    const morph = new PolygonMorph(polygons, config);

    // Rest state: [[x,y], [x,y], ...]
    const rest = morph.getState().map(polygonPts =>
      polygonPts.map(pt => [pt.x, pt.y])
    );

    // Boop values with fallback to rest
    const boopVals = rest.map((polygonPts, pi) =>
      polygonPts.map(([rx, ry], i) => {
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
