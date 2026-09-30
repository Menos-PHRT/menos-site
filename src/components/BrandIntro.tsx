"use client";

import React, { useEffect, useRef, useState } from "react";

const R_E = 24.34;
const L_E = 2 * Math.PI * R_E;
const GAP = (L_E * 12.9) / 360;
const AOFF = (L_E * 5.4) / 360;

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
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

// Intro de tela cheia ao carregar: o traço original se desenha, o círculo se
// forma, a cor muda para a da marca, o "e" abre a quebra, o símbolo encolhe e
// desliza para a posição do "e" em "MENOS" enquanto as letras entram dos
// lados. ~5.9s, com botão de pular. Toca uma vez por carregamento de página
// (o layout raiz não remonta em navegações internas do Next.js).
// As seções da página revelam sozinhas via framer-motion (whileInView) já
// existente em cada componente — não depende desta intro para acontecer.
// Pulada inteiramente com prefers-reduced-motion (o handoff não cobre esse
// caso, mas 5.9s de tela cheia forçada é exatamente o tipo de coisa que a
// preferência existe para evitar).
export const BrandIntro: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<SVGGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const mRef = useRef<SVGGElement>(null);
  const nosRef = useRef<SVGGElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    setVisible(true);
    const t0 = performance.now();

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      const c = circleRef.current, ln = lineRef.current, w = wrapRef.current;
      if (c && ln && w) {
        const draw = ease(seg(t, 0.2, 1.2));
        const lineP = ease(seg(t, 0.9, 1.5));
        const col = seg(t, 1.7, 2.3);
        const gp = easeIO(seg(t, 2.3, 3.0));
        const asProgress = easeIO(seg(t, 3.1, 4.0));
        const tag = ease(seg(t, 4.0, 4.5));
        const out = easeIO(seg(t, 5.1, 5.8));

        const stroke = mix("#0E1414", "#143C3C", col);
        c.setAttribute("stroke", stroke);
        ln.setAttribute("stroke", stroke);
        if (gp <= 0) {
          c.setAttribute("stroke-dasharray", `${draw * L_E} ${L_E}`);
          c.setAttribute("stroke-dashoffset", "0");
        } else {
          c.setAttribute("stroke-dasharray", `${L_E - gp * GAP} ${gp * GAP}`);
          c.setAttribute("stroke-dashoffset", String(-gp * AOFF));
        }
        ln.setAttribute("x2", String(63.36 + lineP * 37.54));

        const s = 2.3 + (1 - 2.3) * asProgress;
        const cx = 125 + (82.33 - 125) * asProgress;
        w.setAttribute("transform", `translate(${cx} 27.86) scale(${s}) translate(-82.33 -27.86)`);

        const mA = ease(seg(t, 3.3, 4.0));
        const nA = ease(seg(t, 3.45, 4.15));
        if (mRef.current) {
          mRef.current.style.opacity = String(mA);
          mRef.current.style.transform = `translateX(${(1 - mA) * -18}px)`;
        }
        if (nosRef.current) {
          nosRef.current.style.opacity = String(nA);
          nosRef.current.style.transform = `translateX(${(1 - nA) * 18}px)`;
        }
        if (tagRef.current) {
          tagRef.current.style.opacity = String(tag);
          tagRef.current.style.transform = `translateY(${(1 - tag) * 10}px)`;
        }
        if (overlayRef.current) {
          overlayRef.current.style.opacity = String(1 - out);
          overlayRef.current.style.transform = `translateY(${-out * 4}%)`;
        }
        if (t > 5.9) {
          setVisible(false);
          return;
        }
      }
      rafId.current = requestAnimationFrame(frame);
    };
    rafId.current = requestAnimationFrame(frame);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  const skip = () => setVisible(false);

  if (!mounted || !visible) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed", inset: 0, zIndex: 100, background: "#FCFCFA",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40
      }}
    >
      <svg viewBox="-10 -30 270 115" style={{ width: "min(78vw, 760px)", overflow: "visible" }}>
        <g ref={wrapRef}>
          <g ref={mRef} style={{ opacity: 0 }} fill="#143C3C">
            {M_PATHS.map((pts, i) => <polygon key={i} points={pts} />)}
          </g>
          <circle ref={circleRef} cx="82.33" cy="27.86" r={R_E} fill="none" stroke="#0E1414" strokeWidth="4.2" strokeDasharray="0 200" />
          <line ref={lineRef} x1="63.36" y1="27.7" x2="63.36" y2="27.7" stroke="#0E1414" strokeWidth="4.2" />
          <g ref={nosRef} style={{ opacity: 0 }}>
            <g fill="#143C3C">
              {N_PATHS.map((pts, i) => <polygon key={i} points={pts} />)}
            </g>
            <circle cx="187.18" cy="27.43" r="25.43" fill="none" stroke="#143C3C" strokeWidth="4.2" />
            <path d={S_PATH} fill="none" stroke="#143C3C" strokeWidth="4.2" />
          </g>
        </g>
      </svg>
      <div ref={tagRef} style={{ opacity: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 300, letterSpacing: ".12em", color: "#4E5F5D" }}>
        <span>menos vira mais</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#287777" }}></span>
      </div>
      <button
        onClick={skip}
        style={{
          position: "absolute", bottom: 32, right: 32, background: "none", border: "1px solid #D6E0DD",
          borderRadius: 999, padding: "8px 16px", font: "500 12px Outfit, sans-serif", color: "#4E5F5D",
          cursor: "pointer", letterSpacing: ".06em", whiteSpace: "nowrap"
        }}
      >
        Pular intro
      </button>
    </div>
  );
};

export default BrandIntro;
