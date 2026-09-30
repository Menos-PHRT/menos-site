"use client";

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

// Geometria exata extraída do handoff de design (assets/*-original.svg).
// viewBox do lockup completo: -2 -2 254 59 (ou -2 0 254 55 no rodapé).
const R_E = 24.34;
const L_E = 2 * Math.PI * R_E; // circunferência do "e"
const GAP = (L_E * 12.9) / 360; // abertura do "e": 12.9° de arco
const AOFF = (L_E * 5.4) / 360; // deslocamento do centro da abertura

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};

const M_PATHS = [
  "5.87 50.58 0 50.59 3.43 3.4 8.5 3.4 8.38 3.53",
  "8.22 9.5 21.33 50.26 24 42.1 11.15 3.44 8.68 3.43 8.05 9.49",
  "25.89 50.22 21.33 50.26 37.53 3.4 40.27 9.51 25.89 50.22",
  "45.32 3.4 37.53 3.4 40.27 9.51 42.23 50.51 48.26 50.55",
  "19.03 42.5 23.08 39.69 25.68 46.79 21.76 50.01 19.03 42.5"
];
const N_PATHS = [
  "123.1 50.58 117.25 50.55 117.33 3.4 122.53 3.49",
  "122.7 10.92 146.56 50.63 147.72 42.62 123.94 3.4 122.2 3.49",
  "152.83 50.58 152.75 3.32 147.06 3.49 147.96 50.72 152.83 50.58",
  "146.56 50.63 149.45 50.63 149.48 45.41 145.4 38.99"
];
const S_PATH = "M222.11,47.25c1.28.69,3.2,1.58,5.66,2.21,2.17.55,6.27,1.55,11.04.17,2.07-.6,4.32-1.25,6.18-3.37,2.28-2.6,2.98-6.31,2.15-9.5-.88-3.37-3.26-5.28-4.21-6.03-2.03-1.59-2.92-1.28-8.42-3.55-3.47-1.44-5.23-2.18-6.36-3.3-.36-.36-3.93-4.04-2.97-8.83.66-3.29,3.06-5.16,3.96-5.86,3.25-2.53,6.89-2.55,8.92-2.56,3.79-.02,6.76,1.17,8.5,2.06.22.08.44.17.66.25";

interface MenosWordmarkProps {
  className?: string;
  /** Controlado externamente (0 = só o símbolo fechado, 1 = "MENOS" completo).
   * Quando omitido, o componente fica estático em p=1 (rodapé, chamada final).
   * Só é lido uma vez ao montar — para animar quadro a quadro (hover do
   * cabeçalho), use a ref (`setProgress`) em vez desta prop: atualizar uma
   * prop React a 60fps re-renderiza o componente a cada quadro, o que é
   * exatamente o tipo de coisa que faz uma animação perder fluidez. */
  progress?: number;
  /** Cores do traço/símbolo: [fechado, aberto]. Padrão: preto original -> verde da marca. */
  colors?: [string, string];
  /** Cor das letras M/N/O/S. */
  letterColor?: string;
}

export interface MenosWordmarkHandle {
  /** Atualiza o progresso (0-1) direto nos atributos do SVG via ref, sem
   * passar por state/re-render do React — usar dentro de um loop de
   * requestAnimationFrame para animação quadro a quadro suave. */
  setProgress: (p: number) => void;
}

// Lockup "MENOS": M e N são polígonos preenchidos; o "e" é um círculo com uma
// abertura à direita (o mesmo símbolo da marca); O e S completam a palavra.
// Com `progress` de 0 a 1, o símbolo fechado (cor original #0E1414) desliza da
// posição do "e" para a esquerda enquanto M/N/O/S entram e a cor migra para a
// cor da marca — a mesma coreografia do cabeçalho no hover e da intro.
export const MenosWordmark = forwardRef<MenosWordmarkHandle, MenosWordmarkProps>(function MenosWordmark({
  className = "",
  progress,
  colors = ["#0E1414", "#143C3C"],
  letterColor = "#143C3C"
}, ref) {
  const wrapRef = useRef<SVGGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const mRef = useRef<SVGGElement>(null);
  const nRef = useRef<SVGGElement>(null);
  const oRef = useRef<SVGCircleElement>(null);
  const sRef = useRef<SVGPathElement>(null);

  const apply = useCallback((p: number) => {
    const c = circleRef.current, ln = lineRef.current, w = wrapRef.current;
    if (!c || !ln || !w) return;
    const col = mix(colors[0], colors[1], easeIO(seg(p, 0, 0.3)));
    const gp = easeIO(seg(p, 0.1, 0.42));
    c.setAttribute("stroke", col);
    ln.setAttribute("stroke", col);
    c.setAttribute("stroke-dasharray", `${L_E - gp * GAP} ${gp * GAP}`);
    c.setAttribute("stroke-dashoffset", String(-gp * AOFF));
    const shift = easeIO(seg(p, 0.22, 0.78));
    w.setAttribute("transform", `translate(${(1 - shift) * -55.9} 0)`);
    const letter = (el: SVGGElement | SVGCircleElement | SVGPathElement | null, a: number, b: number, dx: number) => {
      if (!el) return;
      const k = easeIO(seg(p, a, b));
      el.style.opacity = String(k);
      el.style.transform = `translateX(${(1 - k) * dx}px)`;
    };
    letter(mRef.current, 0.32, 0.8, 26);
    letter(nRef.current, 0.38, 0.82, -30);
    letter(oRef.current, 0.48, 0.9, -60);
    letter(sRef.current, 0.58, 1, -90);
  }, [colors]);

  useImperativeHandle(ref, () => ({ setProgress: apply }), [apply]);

  useEffect(() => {
    apply(progress ?? 1);
    // Só na montagem / quando `progress` muda como prop (uso estático).
    // Atualizações quadro a quadro devem usar a ref (setProgress), não esta prop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <svg viewBox="-2 -2 254 59" className={className} style={{ overflow: "visible" }} aria-label="MENOS">
      <g ref={wrapRef}>
        <g ref={mRef} fill={letterColor} style={{ transformOrigin: "0 0" }}>
          {M_PATHS.map((pts, i) => <polygon key={i} points={pts} />)}
        </g>
        <circle
          ref={circleRef}
          cx="82.33" cy="27.86" r={R_E}
          fill="none" stroke={colors[0]} strokeWidth="4.2"
        />
        <line ref={lineRef} x1="63.36" y1="27.7" x2="100.9" y2="27.6" stroke={colors[0]} strokeWidth="4.2" />
        <g ref={nRef} fill={letterColor} style={{ transformOrigin: "0 0" }}>
          {N_PATHS.map((pts, i) => <polygon key={i} points={pts} />)}
        </g>
        <circle ref={oRef} cx="187.18" cy="27.43" r="25.43" fill="none" stroke={letterColor} strokeWidth="4.2" style={{ transformOrigin: "0 0" }} />
        <path ref={sRef} d={S_PATH} fill="none" stroke={letterColor} strokeWidth="4.2" style={{ transformOrigin: "0 0" }} />
      </g>
    </svg>
  );
});

export default MenosWordmark;
