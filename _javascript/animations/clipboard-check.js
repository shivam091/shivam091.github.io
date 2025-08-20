import SpringGroup from "./../utils/animations/spring-group";

export default class ClipboardCheck {
  constructor(svg, { stiffness = 0.12, damping = 0.75 } = {}) {
    this.svg = svg;
    this.checkPath = this.svg.querySelector("path[d^='m9 14']");
    this.spring = { stiffness, damping };

    this.frames = {
      hidden: { strokeOpacity: 0 },
      visible: { strokeOpacity: 1 }
    };

    this.spring = new SpringGroup(this.frames.hidden, this.spring);
    this.spring.subscribe(values => {
      this.checkPath.setAttribute("stroke-opacity", values.strokeOpacity);
    });

    this.defaultStroke = this.svg.getAttribute("stroke") || "currentColor";
    this.successStroke = "var(--color-fg-success)";
  }

  showCheck() {
    this.svg.setAttribute("stroke", this.successStroke);
    this.spring.setTarget(this.frames.visible);
  }

  resetCheck() {
    this.svg.setAttribute("stroke", this.defaultStroke);
    this.spring.setTarget(this.frames.hidden);
  }
}
