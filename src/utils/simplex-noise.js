/**
 * Minified by jsDelivr using Terser v5.15.1.
 * Original file: /npm/simplex-noise@4.0.1/dist/cjs/simplex-noise.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 * This file is intended to be accessed with a CDN, it has been copied here for convenience.
 */
let exports = {};
("use strict");
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.buildPermutationTable =
    exports.createNoise4D =
    exports.createNoise3D =
    exports.createNoise2D =
      void 0);
const F2 = 0.5 * (Math.sqrt(3) - 1),
  G2 = (3 - Math.sqrt(3)) / 6,
  F3 = 1 / 3,
  G3 = 1 / 6,
  F4 = (Math.sqrt(5) - 1) / 4,
  G4 = (5 - Math.sqrt(5)) / 20,
  fastFloor = (t) => 0 | Math.floor(t),
  grad2 = new Float64Array([
    1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0,
    -1,
  ]),
  grad3 = new Float64Array([
    1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0,
    -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
  ]),
  grad4 = new Float64Array([
    0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1,
    -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0,
    -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1,
    1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1,
    0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1,
    1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
  ]);
function createNoise2D(t = Math.random) {
  const e = buildPermutationTable(t),
    r = new Float64Array(e).map((t) => grad2[(t % 12) * 2]),
    o = new Float64Array(e).map((t) => grad2[(t % 12) * 2 + 1]);
  return function (t, a) {
    let s = 0,
      n = 0,
      l = 0;
    const i = (t + a) * F2,
      c = fastFloor(t + i),
      f = fastFloor(a + i),
      G = (c + f) * G2,
      u = t - (c - G),
      F = a - (f - G);
    let d, m;
    u > F ? ((d = 1), (m = 0)) : ((d = 0), (m = 1));
    const p = u - d + G2,
      b = F - m + G2,
      y = u - 1 + 2 * G2,
      w = F - 1 + 2 * G2,
      A = 255 & c,
      g = 255 & f;
    let D = 0.5 - u * u - F * F;
    if (D >= 0) {
      const t = A + e[g];
      (D *= D), (s = D * D * (r[t] * u + o[t] * F));
    }
    let N = 0.5 - p * p - b * b;
    if (N >= 0) {
      const t = A + d + e[g + m];
      (N *= N), (n = N * N * (r[t] * p + o[t] * b));
    }
    let x = 0.5 - y * y - w * w;
    if (x >= 0) {
      const t = A + 1 + e[g + 1];
      (x *= x), (l = x * x * (r[t] * y + o[t] * w));
    }
    return 70 * (s + n + l);
  };
}
function createNoise3D(t = Math.random) {
  const e = buildPermutationTable(t),
    r = new Float64Array(e).map((t) => grad3[(t % 12) * 3]),
    o = new Float64Array(e).map((t) => grad3[(t % 12) * 3 + 1]),
    a = new Float64Array(e).map((t) => grad3[(t % 12) * 3 + 2]);
  return function (t, s, n) {
    let l, i, c, f;
    const G = (t + s + n) * F3,
      u = fastFloor(t + G),
      F = fastFloor(s + G),
      d = fastFloor(n + G),
      m = (u + F + d) * G3,
      p = t - (u - m),
      b = s - (F - m),
      y = n - (d - m);
    let w, A, g, D, N, x;
    p >= b
      ? b >= y
        ? ((w = 1), (A = 0), (g = 0), (D = 1), (N = 1), (x = 0))
        : p >= y
        ? ((w = 1), (A = 0), (g = 0), (D = 1), (N = 0), (x = 1))
        : ((w = 0), (A = 0), (g = 1), (D = 1), (N = 0), (x = 1))
      : b < y
      ? ((w = 0), (A = 0), (g = 1), (D = 0), (N = 1), (x = 1))
      : p < y
      ? ((w = 0), (A = 1), (g = 0), (D = 0), (N = 1), (x = 1))
      : ((w = 0), (A = 1), (g = 0), (D = 1), (N = 1), (x = 0));
    const M = p - w + G3,
      h = b - A + G3,
      P = y - g + G3,
      T = p - D + 2 * G3,
      q = b - N + 2 * G3,
      v = y - x + 2 * G3,
      _ = p - 1 + 0.5,
      j = b - 1 + 0.5,
      O = y - 1 + 0.5,
      U = 255 & u,
      k = 255 & F,
      z = 255 & d;
    let B = 0.6 - p * p - b * b - y * y;
    if (B < 0) l = 0;
    else {
      const t = U + e[k + e[z]];
      (B *= B), (l = B * B * (r[t] * p + o[t] * b + a[t] * y));
    }
    let C = 0.6 - M * M - h * h - P * P;
    if (C < 0) i = 0;
    else {
      const t = U + w + e[k + A + e[z + g]];
      (C *= C), (i = C * C * (r[t] * M + o[t] * h + a[t] * P));
    }
    let E = 0.6 - T * T - q * q - v * v;
    if (E < 0) c = 0;
    else {
      const t = U + D + e[k + N + e[z + x]];
      (E *= E), (c = E * E * (r[t] * T + o[t] * q + a[t] * v));
    }
    let H = 0.6 - _ * _ - j * j - O * O;
    if (H < 0) f = 0;
    else {
      const t = U + 1 + e[k + 1 + e[z + 1]];
      (H *= H), (f = H * H * (r[t] * _ + o[t] * j + a[t] * O));
    }
    return 32 * (l + i + c + f);
  };
}
function createNoise4D(t = Math.random) {
  const e = buildPermutationTable(t),
    r = new Float64Array(e).map((t) => grad4[(t % 32) * 4]),
    o = new Float64Array(e).map((t) => grad4[(t % 32) * 4 + 1]),
    a = new Float64Array(e).map((t) => grad4[(t % 32) * 4 + 2]),
    s = new Float64Array(e).map((t) => grad4[(t % 32) * 4 + 3]);
  return function (t, n, l, i) {
    let c, f, G, u, F;
    const d = (t + n + l + i) * F4,
      m = fastFloor(t + d),
      p = fastFloor(n + d),
      b = fastFloor(l + d),
      y = fastFloor(i + d),
      w = (m + p + b + y) * G4,
      A = t - (m - w),
      g = n - (p - w),
      D = l - (b - w),
      N = i - (y - w);
    let x = 0,
      M = 0,
      h = 0,
      P = 0;
    A > g ? x++ : M++,
      A > D ? x++ : h++,
      A > N ? x++ : P++,
      g > D ? M++ : h++,
      g > N ? M++ : P++,
      D > N ? h++ : P++;
    const T = x >= 3 ? 1 : 0,
      q = M >= 3 ? 1 : 0,
      v = h >= 3 ? 1 : 0,
      _ = P >= 3 ? 1 : 0,
      j = x >= 2 ? 1 : 0,
      O = M >= 2 ? 1 : 0,
      U = h >= 2 ? 1 : 0,
      k = P >= 2 ? 1 : 0,
      z = x >= 1 ? 1 : 0,
      B = M >= 1 ? 1 : 0,
      C = h >= 1 ? 1 : 0,
      E = P >= 1 ? 1 : 0,
      H = A - T + G4,
      I = g - q + G4,
      J = D - v + G4,
      K = N - _ + G4,
      L = A - j + 2 * G4,
      Q = g - O + 2 * G4,
      R = D - U + 2 * G4,
      S = N - k + 2 * G4,
      V = A - z + 3 * G4,
      W = g - B + 3 * G4,
      X = D - C + 3 * G4,
      Y = N - E + 3 * G4,
      Z = A - 1 + 4 * G4,
      $ = g - 1 + 4 * G4,
      tt = D - 1 + 4 * G4,
      et = N - 1 + 4 * G4,
      rt = 255 & m,
      ot = 255 & p,
      at = 255 & b,
      st = 255 & y;
    let nt = 0.6 - A * A - g * g - D * D - N * N;
    if (nt < 0) c = 0;
    else {
      const t = rt + e[ot + e[at + e[st]]];
      (nt *= nt), (c = nt * nt * (r[t] * A + o[t] * g + a[t] * D + s[t] * N));
    }
    let lt = 0.6 - H * H - I * I - J * J - K * K;
    if (lt < 0) f = 0;
    else {
      const t = rt + T + e[ot + q + e[at + v + e[st + _]]];
      (lt *= lt), (f = lt * lt * (r[t] * H + o[t] * I + a[t] * J + s[t] * K));
    }
    let it = 0.6 - L * L - Q * Q - R * R - S * S;
    if (it < 0) G = 0;
    else {
      const t = rt + j + e[ot + O + e[at + U + e[st + k]]];
      (it *= it), (G = it * it * (r[t] * L + o[t] * Q + a[t] * R + s[t] * S));
    }
    let ct = 0.6 - V * V - W * W - X * X - Y * Y;
    if (ct < 0) u = 0;
    else {
      const t = rt + z + e[ot + B + e[at + C + e[st + E]]];
      (ct *= ct), (u = ct * ct * (r[t] * V + o[t] * W + a[t] * X + s[t] * Y));
    }
    let ft = 0.6 - Z * Z - $ * $ - tt * tt - et * et;
    if (ft < 0) F = 0;
    else {
      const t = rt + 1 + e[ot + 1 + e[at + 1 + e[st + 1]]];
      (ft *= ft), (F = ft * ft * (r[t] * Z + o[t] * $ + a[t] * tt + s[t] * et));
    }
    return 27 * (c + f + G + u + F);
  };
}
function buildPermutationTable(t) {
  const e = 512,
    r = new Uint8Array(e);
  for (let t = 0; t < 256; t++) r[t] = t;
  for (let e = 0; e < 255; e++) {
    const o = e + ~~(t() * (256 - e)),
      a = r[e];
    (r[e] = r[o]), (r[o] = a);
  }
  for (let t = 256; t < e; t++) r[t] = r[t - 256];
  return r;
}
(exports.createNoise2D = createNoise2D),
  (exports.createNoise3D = createNoise3D),
  (exports.createNoise4D = createNoise4D),
  (exports.buildPermutationTable = buildPermutationTable);

export { createNoise2D, createNoise3D, createNoise4D, buildPermutationTable };
//# sourceMappingURL=/sm/24212129df12bc5a07c2ced7fe5e2e2e9c50461c7bf703fe68e0d336d6c254cc.map
