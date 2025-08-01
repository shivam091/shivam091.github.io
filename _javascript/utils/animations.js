/**
 * Linear interpolation between two numbers
 * @param {number} a - start value
 * @param {number} b - end value
 * @param {number} t - progress (0-1)
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Clamp a number between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Remap a number from one range to another
 * @param {number} value - input number
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Cubic Bezier easing function generator
 * Returns an easing function mapping t(0-1) -> eased t
 */
export function cubicBezier(p0, p1, p2, p3) {
  return function (t) {
    const cX = 3 * p0;
    const bX = 3 * (p2 - p0) - cX;
    const aX = 1 - cX - bX;

    const cY = 3 * p1;
    const bY = 3 * (p3 - p1) - cY;
    const aY = 1 - cY - bY;

    // Only y curve is used for easing
    const y = ((aY * t + bY) * t + cY) * t;
    return y;
  };
}

/**
 * Animate numeric values using requestAnimationFrame
 * @param {function(number)} onUpdate - callback for each frame with eased progress (0-1)
 * @param {number} duration - total duration in ms
 * @param {function} easing - easing function mapping [0,1] -> [0,1]
 * @param {function=} onComplete - optional callback on finish
 */
export function animate(onUpdate, duration = 300, easing = t => t, onComplete) {
  const start = performance.now();

  function step(now) {
    let t = Math.min((now - start) / duration, 1);
    t = easing(t);
    onUpdate(t);
    if (t < 1) {
      requestAnimationFrame(step);
    } else if (onComplete) {
      onComplete();
    }
  }

  requestAnimationFrame(step);
}

/**
 * Spring animation using Hooke's law approximation
 * @param {function(number)} onUpdate
 * @param {object} config - { stiffness, damping, mass, initialVelocity }
 * @param {function=} onComplete
 */
export function spring(onUpdate, config = {}, onComplete) {
  const {
    stiffness = 0.1,   // how strong spring pulls back
    damping = 0.8,     // energy loss per frame
    mass = 1,
    initialVelocity = 0,
    threshold = 0.001  // stop condition
  } = config;

  let position = 0;       // start (0)
  let velocity = initialVelocity;

  function step() {
    // Spring force F = -kx
    const force = -stiffness * position;
    // Acceleration = Force / mass
    const accel = force / mass;

    velocity = velocity + accel;
    velocity *= damping;  // apply friction/damping
    position += velocity;

    onUpdate(1 - position); // progress from 0->1

    if (Math.abs(velocity) > threshold || Math.abs(position) > threshold) {
      requestAnimationFrame(step);
    } else if (onComplete) {
      onComplete();
    }
  }

  step();
}
