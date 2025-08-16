export function useSpring(initialConfig = {}) {
  let running = false;
  let frameId = null;

  const state = {};
  const listeners = new Set();

  // Proxy makes state reactive
  const proxy = new Proxy(state, {
    set(target, key, value) {
      target[key] = value;
      listeners.forEach(fn => fn(proxy));
      return true;
    },
  });

  function animate({ from, to, config = {}, onRest }) {
    running = true;
    if (frameId) cancelAnimationFrame(frameId);

    const {
      stiffness = 0.1,
      damping = 0.8,
      mass = 1,
      threshold = 0.001,
    } = config;

    const pos = { ...from };
    const vel = Object.fromEntries(Object.keys(to).map(k => [k, 0]));

    Object.assign(proxy, pos); // set initial values

    function step() {
      let allSettled = true;

      for (const key in to) {
        const force = -stiffness * (pos[key] - to[key]);
        const accel = force / mass;

        vel[key] += accel;
        vel[key] *= damping;
        pos[key] += vel[key];

        proxy[key] = pos[key]; // reactive update

        if (
          Math.abs(vel[key]) > threshold ||
          Math.abs(pos[key] - to[key]) > threshold
        ) {
          allSettled = false;
        }
      }

      if (!allSettled && running) {
        frameId = requestAnimationFrame(step);
      } else {
        Object.assign(proxy, to);
        running = false;
        onRest?.();
      }
    }

    step();
  }

  const api = {
    start(cfg) {
      animate(cfg);
    },
    stop() {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
    },
    subscribe(fn) {
      listeners.add(fn);
      fn(proxy); // first call immediately
      return () => listeners.delete(fn);
    },
    get state() {
      return proxy;
    }
  };

  return [proxy, api];
}
