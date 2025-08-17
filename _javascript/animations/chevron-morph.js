import PolyLineMorph from "./../utils/animations/polyline-morph";

export default class ChevronMorph {
  /**
   * @param {SVGElement} svg - the <svg> element containing a <polyline>
   * @param {Object} options - spring config: { stiffness, damping }
   */
  constructor(svg, options = {}) {
    this.svg = svg;
    this.polyline = svg.querySelector("polyline");

    if (!this.polyline) {
      throw new Error("SVG must contain a <polyline> element");
    }

    this.morph = new PolyLineMorph([this.polyline], options);

    // store original points as rest
    this.rest = this.morph.getState().map(polyPts =>
      polyPts.map(pt => [pt.x, pt.y])
    );

    // default up shape (chevron-up)
    this.upPoints = [[[6, 14], [12, 8], [18, 14]]];
  }

  up() {
    this.morph.morph(this.upPoints);
  }

  reset() {
    this.morph.morph(this.rest);
  }
}
