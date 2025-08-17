/**
 * Normalize a path string into an array of absolute segments with explicit commands:
 * M, L, Q, C, Z only. (H/V -> L, T -> Q, S -> C; relative -> absolute)
 */
export function normalizePath(d) {
  // tokenization
  const CMD = /[a-zA-Z]/;
  const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;

  // split into [ {cmd, nums:number[]} ... ]
  const raw = [];
  let i = 0;
  while (i < d.length) {
    while (i < d.length && !CMD.test(d[i])) i++;
    if (i >= d.length) break;
    const cmd = d[i++];
    let j = i;
    while (j < d.length && !CMD.test(d[j])) j++;
    const chunk = d.slice(i, j);
    const nums = (chunk.match(NUM) || []).map(Number);
    raw.push({ cmd, nums });
    i = j;
  }

  const segs = [];
  let cx = 0, cy = 0; // current point
  let sx = 0, sy = 0; // subpath start
  let prevQCtrl = null; // last Q/T control
  let prevC2 = null;    // last C/S control2

  const pushM = (x, y) => { segs.push({ type: "M", points: [[x, y]] }); };
  const pushL = (x, y) => { segs.push({ type: "L", points: [[x, y]] }); };
  const pushQ = (cx1, cy1, x, y) => { segs.push({ type: "Q", points: [[cx1, cy1], [x, y]] }); };
  const pushC = (c1x, c1y, c2x, c2y, x, y) => { segs.push({ type: "C", points: [[c1x, c1y], [c2x, c2y], [x, y]] }); };

  const reflect = (px, py, x, y) => [2 * x - px, 2 * y - py];

  raw.forEach(({ cmd, nums }) => {
    const isRel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();

    let k = 0;
    const take = n => {
      const out = nums.slice(k, k + n);
      k += n;
      return out;
    };

    if (C === "M") {
      while (k < nums.length) {
        let [x, y] = take(2);
        if (isRel) { x += cx; y += cy; }
        cx = x; cy = y;
        if (segs.length === 0 || segs[segs.length - 1].type === "Z") {
          pushM(x, y);
          sx = x; sy = y;
        } else {
          // subsequent M pairs are L
          pushL(x, y);
        }
        prevQCtrl = null; prevC2 = null;
      }
    }

    else if (C === "L") {
      while (k < nums.length) {
        let [x, y] = take(2);
        if (isRel) { x += cx; y += cy; }
        pushL(x, y);
        cx = x; cy = y;
        prevQCtrl = null; prevC2 = null;
      }
    }

    else if (C === "H") {
      while (k < nums.length) {
        let [x] = take(1);
        if (isRel) x += cx;
        pushL(x, cy);
        cx = x;
        prevQCtrl = null; prevC2 = null;
      }
    }

    else if (C === "V") {
      while (k < nums.length) {
        let [y] = take(1);
        if (isRel) y += cy;
        pushL(cx, y);
        cy = y;
        prevQCtrl = null; prevC2 = null;
      }
    }

    else if (C === "Q") {
      while (k < nums.length) {
        let [qcx, qcy, x, y] = take(4);
        if (isRel) { qcx += cx; qcy += cy; x += cx; y += cy; }
        pushQ(qcx, qcy, x, y);
        prevQCtrl = [qcx, qcy];
        prevC2 = null;
        cx = x; cy = y;
      }
    }

    else if (C === "T") {
      while (k < nums.length) {
        let [x, y] = take(2);
        if (isRel) { x += cx; y += cy; }
        let qcx, qcy;
        if (prevQCtrl) {
          [qcx, qcy] = reflect(prevQCtrl[0], prevQCtrl[1], cx, cy);
        } else {
          qcx = cx; qcy = cy;
        }
        pushQ(qcx, qcy, x, y);
        prevQCtrl = [qcx, qcy];
        prevC2 = null;
        cx = x; cy = y;
      }
    }

    else if (C === "C") {
      while (k < nums.length) {
        let [c1x, c1y, c2x, c2y, x, y] = take(6);
        if (isRel) { c1x += cx; c1y += cy; c2x += cx; c2y += cy; x += cx; y += cy; }
        pushC(c1x, c1y, c2x, c2y, x, y);
        prevC2 = [c2x, c2y];
        prevQCtrl = null;
        cx = x; cy = y;
      }
    }

    else if (C === "S") {
      while (k < nums.length) {
        let [c2x, c2y, x, y] = take(4);
        if (isRel) { c2x += cx; c2y += cy; x += cx; y += cy; }
        let c1x, c1y;
        if (prevC2) {
          [c1x, c1y] = reflect(prevC2[0], prevC2[1], cx, cy);
        } else {
          c1x = cx; c1y = cy;
        }
        pushC(c1x, c1y, c2x, c2y, x, y);
        prevC2 = [c2x, c2y];
        prevQCtrl = null;
        cx = x; cy = y;
      }
    }

    else if (C === "Z") {
      segs.push({ type: "Z", points: [] });
      cx = sx; cy = sy;
      prevQCtrl = null; prevC2 = null;
    }

    else {
      // A/a or unsupported: keep as-is by inserting a non-animated raw segment
      // (not used in your icon; present for safety)
      segs.push({ type: "RAW", raw: `${cmd} ${nums.join(" ")}` });
      prevQCtrl = null; prevC2 = null;
    }
  });

  return segs;
}

// Build back to string
export function buildPath(segs) {
  const f2 = n => n.toFixed(2);
  const parts = [];
  for (const s of segs) {
    if (s.type === "M" || s.type === "L") {
      const [p] = s.points;
      parts.push(`${s.type} ${f2(p[0])} ${f2(p[1])}`);
    } else if (s.type === "Q") {
      const [c, e] = s.points;
      parts.push(`Q ${f2(c[0])} ${f2(c[1])} ${f2(e[0])} ${f2(e[1])}`);
    } else if (s.type === "C") {
      const [c1, c2, e] = s.points;
      parts.push(`C ${f2(c1[0])} ${f2(c1[1])} ${f2(c2[0])} ${f2(c2[1])} ${f2(e[0])} ${f2(e[1])}`);
    } else if (s.type === "Z") {
      parts.push("Z");
    } else if (s.type === "RAW") {
      parts.push(s.raw);
    }
  }
  return parts.join(" ");
}
