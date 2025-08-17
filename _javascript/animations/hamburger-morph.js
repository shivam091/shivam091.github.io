import SpringGroup from "./../utils/animations/spring-group";
import { BASE_FRAMES } from "./../constants/hamburger-frames";
import HamburgerIcon from "./hamburger-icon";
import { lerp } from "./../utils/animations";

export default class HamburgerMorph {
  constructor(button) {
    this.button = button;
    this.svg = button.querySelector("svg");
    const [top, middle, bottom] = this.svg.querySelectorAll("line");
    this.lines = [top, middle, bottom];
    this.isOpen = false;

    this.frames = BASE_FRAMES;

    // Springs
    this.springs = this.lines.map((line, i) => {
      const initial = { ...this.frames.closed[i] };
      const group = new SpringGroup(initial, { stiffness: 0.12, damping: 0.75 });
      group.subscribe(values => {
        line.setAttribute("x1", values.x1);
        line.setAttribute("y1", values.y1);
        line.setAttribute("x2", values.x2);
        line.setAttribute("y2", values.y2);
        line.style.opacity = values.opacity;
      });
      return group;
    });

    // Interactions manager
    this.interactions = new HamburgerIcon(this);

    this.observeDrawerState();
  }

  morphLines(targetFrames) {
    this.springs.forEach((group, i) => {
      group.setTarget(targetFrames[i]);
    });
  }

  observeDrawerState() {
    const observer = new MutationObserver(() => this.syncWithDrawer());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-drawer"] });
  }

  syncWithDrawer() {
    const open = document.documentElement.getAttribute("data-drawer") === "open";
    const state = open ? "open" : "closed";
    this.morphLines(this.frames[state]);
    this.isOpen = open;
  }

  animateMorph(fromProgress, toProgress) {
    const targetFrames = this.frames.closed.map((c, i) => {
      const o = this.frames.open[i];
      return {
        x1: lerp(c.x1, o.x1, toProgress),
        y1: lerp(c.y1, o.y1, toProgress),
        x2: lerp(c.x2, o.x2, toProgress),
        y2: lerp(c.y2, o.y2, toProgress),
        opacity: lerp(c.opacity, o.opacity, toProgress)
      };
    });
    this.morphLines(targetFrames);
  }
}
