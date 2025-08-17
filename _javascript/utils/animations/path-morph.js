import Morph from "./morph";
import { buildPath, normalizePath } from "./path-utils";
/**
 * PathMorph
 * ---------
 * Animates coordinate pairs in a path with a *stable* mapping:
 * - Extracts ordered pairs: M(x,y), L(x,y), Q(c,x), C(c1,c2,x)
 * - Normalizes H/V/S/T to L/C/Q so indices never reshuffle
 */
export default class PathMorph extends Morph {
  constructor(paths, config = { stiffness: 0.12, damping: 0.75 }) {
    // Keep per-element normalized segments so we rebuild against the same shape
    const store = new WeakMap();

    super(
      paths,
      config,
      el => {
        const d = el.getAttribute("d") || "";
        const segs = normalizePath(d);
        store.set(el, segs);

        // Flatten the points from all animatable segments into [[x,y], ...]
        const pairs = [];
        for (const s of segs) {
          if (s.type === "M" || s.type === "L") {
            pairs.push([...s.points[0]]);
          } else if (s.type === "Q") {
            pairs.push([...s.points[0]], [...s.points[1]]);
          } else if (s.type === "C") {
            pairs.push([...s.points[0]], [...s.points[1]], [...s.points[2]]);
          }
          // Z and RAW contribute no animatable pairs
        }
        return pairs;
      },
      (el, pointGroups) => {
        const segs = store.get(el);
        let idx = 0;

        // Write current spring values back into the segment points
        for (const s of segs) {
          if (s.type === "M" || s.type === "L") {
            const st = pointGroups[idx++].getState();
            s.points[0][0] = st.x; s.points[0][1] = st.y;
          } else if (s.type === "Q") {
            const c = pointGroups[idx++].getState();
            const e = pointGroups[idx++].getState();
            s.points[0][0] = c.x; s.points[0][1] = c.y;
            s.points[1][0] = e.x; s.points[1][1] = e.y;
          } else if (s.type === "C") {
            const c1 = pointGroups[idx++].getState();
            const c2 = pointGroups[idx++].getState();
            const e  = pointGroups[idx++].getState();
            s.points[0][0] = c1.x; s.points[0][1] = c1.y;
            s.points[1][0] = c2.x; s.points[1][1] = c2.y;
            s.points[2][0] = e.x;  s.points[2][1] = e.y;
          }
        }

        el.setAttribute("d", buildPath(segs));
      }
    );
  }
}
