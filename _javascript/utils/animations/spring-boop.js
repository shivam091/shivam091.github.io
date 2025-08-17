import BoopController from "./boop-controller";
import SpringGroup from "./spring-group";

export default class SpringBoop extends BoopController {
  constructor(initial = {}, { stiffness = 0.1, damping = 0.8, boop = {} } = {}) {
    const animator = new SpringGroup(initial, { stiffness: stiffness, damping: damping });
    const rest = initial;
    const boopVals = Object.assign({}, initial, boop);
    super(animator, rest, boopVals);
    animator.subscribe(vals => this.onUpdateCallback?.(vals));
  }
  onUpdate(fn) { this.onUpdateCallback = fn; }
}
