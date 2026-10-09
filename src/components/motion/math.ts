// Funções de tempo e cor usadas pelas animações do site (mesmos nomes e curvas
// do protótipo de design v8). Reexporta o que já existe na geometria da marca
// para ter um único lugar de import.
export { clamp, seg, easeIO, easeOut as ease } from "../brand/menosGeometry";

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** easeOutExpo */
export const expo = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const HX = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mixv = (A: number[], B: number[], t: number) => A.map((v, i) => v + (B[i] - v) * t);
export const rgb = (A: number[]) => `rgb(${A.map((v) => Math.round(v)).join(",")})`;
export const mix = (a: string, b: string, t: number) => rgb(mixv(HX(a), HX(b), t));

/** Paleta usada na troca de tema do logo do cabeçalho. */
export const COL = {
  paper: HX("#EAF2EE"),
  ink0: HX("#0E1414"),
  mint: HX("#8CD9D9"),
  brand: HX("#143C3C")
};
