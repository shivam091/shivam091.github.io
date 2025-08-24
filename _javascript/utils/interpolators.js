// Linear interpolation
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Parse HSL/HSLA string into components
function parseHSL(str) {
  // hsl(h s% l%) OR hsla(h s% l% / a)
  const match = str.match(/hsla?\(([^)]+)\)/i);
  if (!match) throw new Error(`Invalid HSL/HSLA color: ${str}`);

  // Split values by space or comma, handle optional alpha
  const parts = match[1].replace(/,/g, " ").split(/\s+/).filter(Boolean);

  let h = parseFloat(parts[0]);
  let s = parseFloat(parts[1]);
  let l = parseFloat(parts[2]);
  let a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;

  return [h, s, l, a];
}

// Interpolate hue correctly (shortest arc)
function mixHue(h1, h2, t) {
  let dh = h2 - h1;
  if (dh > 180) dh -= 360;
  else if (dh < -180) dh += 360;
  return (h1 + dh * t + 360) % 360;
}

// HSL interpolation
export function hslColorMix(a, b, t) {
  const [h1, s1, l1] = parseHSL(a);
  const [h2, s2, l2] = parseHSL(b);

  const h = mixHue(h1, h2, t);
  const s = lerp(s1, s2, t);
  const l = lerp(l1, l2, t);

  return `hsl(${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`;
}

// HSLA interpolation (with alpha)
export function hslaColorMix(a, b, t) {
  const [h1, s1, l1, a1] = parseHSL(a);
  const [h2, s2, l2, a2] = parseHSL(b);

  const h = mixHue(h1, h2, t);
  const s = lerp(s1, s2, t);
  const l = lerp(l1, l2, t);
  const alpha = lerp(a1, a2, t);

  return `hsla(${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}% / ${alpha.toFixed(3)})`;
}

// Path morphing (same number of points assumed!)
export function pathMorph(aPoints, bPoints, t) {
  return aPoints.map((p, i) => [
    lerp(p[0], bPoints[i][0], t),
    lerp(p[1], bPoints[i][1], t)
  ]);
}

function parseColor(color) {
  // Handles hsl, rgb, and hex
  if (color.startsWith("hsl")) {
    const [h, s, l] = color.match(/[\d.]+/g).map(Number);
    return { h, s, l };
  } else if (color.startsWith("rgb")) {
    const [r, g, b] = color.match(/[\d.]+/g).map(Number);
    return rgbToHsl(r, g, b);
  } else if (color.startsWith("#")) {
    const { r, g, b } = hexToRgb(color);
    return rgbToHsl(r, g, b);
  }
  throw new Error("Unsupported color format: " + color);
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToCss({ h, s, l }) {
  return `hsl(${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}
function mixHsl(from, to, t) {
  // handle hue wraparound (circular interpolation)
  let h = from.h + (((to.h - from.h + 540) % 360) - 180) * t;
  let s = from.s + (to.s - from.s) * t;
  let l = from.l + (to.l - from.l) * t;
  return { h, s, l };
}

function springColorMix(from, to, stiffness, damping, onUpdate) {
  const fromHsl = parseColor(from);
  const toHsl = parseColor(to);
  let value = { ...fromHsl };
  let velocity = { h: 0, s: 0, l: 0 };

  function step() {
    ["h", "s", "l"].forEach((key) => {
      const displacement = toHsl[key] - value[key];
      const accel = stiffness * displacement - damping * velocity[key];
      velocity[key] += accel * 0.016; // dt ~ 16ms
      value[key] += velocity[key] * 0.016;
    });

    onUpdate(hslToCss(value));

    if (
      Math.abs(toHsl.h - value.h) > 0.1 ||
      Math.abs(toHsl.s - value.s) > 0.1 ||
      Math.abs(toHsl.l - value.l) > 0.1
    ) {
      requestAnimationFrame(step);
    }
  }

  step();
}

// springColorMix("hsl(200 80% 50%)", "hsl(340 70% 60%)", 120, 15, (color) => {
//   document.body.style.backgroundColor = color;
// });
