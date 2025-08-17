import BoopController from "./boop-controller";
import PathMorph from "./path-morph";

export default class PathMorphBoop extends BoopController {
  constructor(paths, { boop = [], config } = {}) {
    const morph = new PathMorph(paths, config);

    // rest state: [[x,y], [x,y], ...] for each path element
    const rest = morph.getState().map(pathPairs =>
      pathPairs.map(pt => [pt.x, pt.y])
    );

    const boopVals = rest.map((pairs, i) =>
      pairs.map(([rx, ry], j) => {
        const bp = (boop[i] && boop[i][j]) || [];
        return [
          typeof bp[0] === "number" ? bp[0] : rx,
          typeof bp[1] === "number" ? bp[1] : ry,
        ];
      })
    );

    super(morph, rest, boopVals);
  }
}
