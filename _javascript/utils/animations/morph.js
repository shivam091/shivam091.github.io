import SpringGroup from "./spring-group";

/**
 * Morph
 * -----
 * Generic base class for morphing SVG primitives.
 * Accepts extract/build functions to handle different shapes.
 */
export default class Morph {
  constructor(elements, config, extractPoints, buildAttr) {
    this.elements = Array.from(elements);
    this.groups = [];

    this.elements.forEach(el => {
      const pts = extractPoints(el); // [[x,y], [x,y], ...]
      const pointGroups = pts.map(([x, y]) => new SpringGroup({ x, y }, config));

      // Subscribe and update element on each frame
      pointGroups.forEach(g =>
        g.subscribe(() => buildAttr(el, pointGroups))
      );

      this.groups.push(pointGroups);
      buildAttr(el, pointGroups); // initial update
    });
  }

  morph(targetsPerElement) {
    this.groups.forEach((pointGroups, ei) => {
      const targets = targetsPerElement[ei];
      if (!Array.isArray(targets)) return;

      targets.forEach((pt, i) => {
        if (!pt || pt.length !== 2) return;
        const [x, y] = pt;
        if (pointGroups[i] && !isNaN(x) && !isNaN(y)) {
          pointGroups[i].setTarget({ x, y });
        }
      });
    });
  }

  getState() {
    return this.groups.map(pointGroups =>
      pointGroups.map(g => g.getState())
    );
  }
}
