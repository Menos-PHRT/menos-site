// Geometria exata da marca MENOS (extraída do SVG original). Não alterar valores.
export const M_POLYS = [
  "5.87 50.58 0 50.59 3.43 3.4 8.5 3.4 8.38 3.53",
  "8.22 9.5 21.33 50.26 24 42.1 11.15 3.44 8.68 3.43 8.05 9.49",
  "25.89 50.22 21.33 50.26 37.53 3.4 40.27 9.51 25.89 50.22",
  "45.32 3.4 37.53 3.4 40.27 9.51 42.23 50.51 48.26 50.55",
  "19.03 42.5 23.08 39.69 25.68 46.79 21.76 50.01 19.03 42.5",
];
export const N_POLYS = [
  "123.1 50.58 117.25 50.55 117.33 3.4 122.53 3.49",
  "122.7 10.92 146.56 50.63 147.72 42.62 123.94 3.4 122.2 3.49",
  "152.83 50.58 152.75 3.32 147.06 3.49 147.96 50.72 152.83 50.58",
  "146.56 50.63 149.45 50.63 149.48 45.41 145.4 38.99",
];
export const S_PATH =
  "M222.11,47.25c1.28.69,3.2,1.58,5.66,2.21,2.17.55,6.27,1.55,11.04.17,2.07-.6,4.32-1.25,6.18-3.37,2.28-2.6,2.98-6.31,2.15-9.5-.88-3.37-3.26-5.28-4.21-6.03-2.03-1.59-2.92-1.28-8.42-3.55-3.47-1.44-5.23-2.18-6.36-3.3-.36-.36-3.93-4.04-2.97-8.83.66-3.29,3.06-5.16,3.96-5.86,3.25-2.53,6.89-2.55,8.92-2.56,3.79-.02,6.76,1.17,8.5,2.06.22.08.44.17.66.25";
export const E = { cx: 82.33, cy: 27.86, r: 24.34, x1: 63.36, y1: 27.7, x2: 100.9, y2: 27.6 };
export const O = { cx: 187.18, cy: 27.43, r: 25.43 };
export const STROKE = 4.2;
export const L_E = 2 * Math.PI * E.r;
export const GAP = (L_E * 12.9) / 360;
export const AOFF = (L_E * 5.4) / 360;

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};
