"use client";

import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef } from "react";

// Posições fixas (não Math.random() — evita mismatch de hidratação SSR/cliente).
const NODES_BOXED: { x: number; y: number }[] = [
  { x: 508, y: 308 }, { x: 548, y: 292 }, { x: 333, y: 275 }, { x: 352, y: 48 },
  { x: 410, y: 295 }, { x: 414, y: 139 }, { x: 430, y: 352 }, { x: 566, y: 334 },
  { x: 129, y: 76 }, { x: 384, y: 313 }, { x: 118, y: 180 }, { x: 199, y: 198 },
  { x: 392, y: 44 }, { x: 325, y: 288 }, { x: 264, y: 280 }, { x: 96, y: 338 },
  { x: 287, y: 90 }, { x: 504, y: 93 }, { x: 214, y: 289 }, { x: 183, y: 40 },
  { x: 559, y: 93 }, { x: 387, y: 351 }
];

const NODES_FULLBLEED: { x: number; y: number }[] = [
  { x: 491, y: 267 }, { x: 131, y: 127 }, { x: 445, y: 243 }, { x: 95, y: 407 },
  { x: 586, y: 201 }, { x: 293, y: 364 }, { x: 651, y: 54 }, { x: 499, y: 123 },
  { x: 665, y: 90 }, { x: 558, y: 234 }, { x: 189, y: 42 }, { x: 922, y: 447 },
  { x: 136, y: 215 }, { x: 937, y: 103 }, { x: 422, y: 262 }, { x: 665, y: 144 },
  { x: 184, y: 454 }, { x: 448, y: 122 }, { x: 545, y: 165 }, { x: 167, y: 360 },
  { x: 358, y: 174 }, { x: 96, y: 428 }, { x: 249, y: 409 }, { x: 472, y: 124 },
  { x: 599, y: 197 }, { x: 749, y: 307 }, { x: 151, y: 119 }, { x: 452, y: 60 },
  { x: 66, y: 201 }, { x: 674, y: 305 }, { x: 937, y: 163 }, { x: 441, y: 238 },
  { x: 441, y: 389 }, { x: 453, y: 213 }, { x: 273, y: 124 }, { x: 733, y: 78 },
  { x: 280, y: 357 }, { x: 844, y: 446 }, { x: 910, y: 399 }, { x: 737, y: 302 }
];

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};

interface AINetworkVisualProps {
  /** Modo de fundo cheio: preenche o container pai (ex.: atrás do hero inteiro),
   * sem moldura/cartão, com mais nós espalhados por uma área mais larga. */
  fullBleed?: boolean;
}

// Visual do hero: uma rede de pontos dispersos que se conecta e escurece perto
// do cursor, quanto mais perto, mais a rede se organiza. Em modo fullBleed,
// cobre todo o hero (inclusive atrás dos botões de CTA): o cursor é rastreado
// via window, então aproximar-se de um botão já aproxima o cursor daquela
// região da rede. O ponteiro e a força de cada nó são suavizados (lerp .12 a
// cada quadro) para tudo acender e apagar de forma fluida, não abrupta.
// Sem rótulos de terminal. Sem loop ambiente: movimento só em resposta à
// interação (gate de reduzir movimento apenas suaviza a transição, já que
// isso não é um gatilho vestibular).
export const AINetworkVisual: React.FC<AINetworkVisualProps> = ({ fullBleed = false }) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafId = useRef<number | undefined>(undefined);
  const ptr = useRef<{ x: number; y: number } | null>(null);
  const sp = useRef<{ x: number; y: number } | null>(null);
  const nodeStrength = useRef<number[]>([]);

  const NODES = fullBleed ? NODES_FULLBLEED : NODES_BOXED;
  const VIEW_W = fullBleed ? 1000 : 600;
  const VIEW_H = fullBleed ? 480 : 400;
  const NEAR_RADIUS = fullBleed ? 240 : 170;
  const LINK_RADIUS = fullBleed ? 170 : 130;
  const restThreshold = fullBleed ? 75 : 60;
  const REST_COLOR = "#A7B9B5";
  const ACTIVE_COLOR = "#143C3C";
  const LINK_COLOR = "#287777";
  const REST_LINK_COLOR = "#D6E0DD";

  const restLinks: [number, number][] = [];
  const candLinks: [number, number][] = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const d = dist(NODES[i], NODES[j]);
      if (d < restThreshold) restLinks.push([i, j]);
      if (d < LINK_RADIUS) candLinks.push([i, j]);
    }
  }

  useEffect(() => {
    nodeStrength.current = NODES.map(() => 0);

    const updateFromClient = (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      if (!inside) { ptr.current = null; return; }
      ptr.current = {
        x: ((clientX - rect.left) / rect.width) * VIEW_W,
        y: ((clientY - rect.top) / rect.height) * VIEW_H
      };
    };
    const onMouseMove = (e: MouseEvent) => updateFromClient(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => { const t = e.touches[0]; if (t) updateFromClient(t.clientX, t.clientY); };
    const onTouchEnd = () => { ptr.current = null; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const lerpFactor = shouldReduceMotion ? 1 : 0.12;
    const loop = () => {
      const svg = svgRef.current;
      if (svg) {
        if (ptr.current) {
          sp.current = sp.current
            ? { x: sp.current.x + (ptr.current.x - sp.current.x) * lerpFactor, y: sp.current.y + (ptr.current.y - sp.current.y) * lerpFactor }
            : { ...ptr.current };
        }
        const P = ptr.current ? sp.current : null;
        const circles = svg.querySelectorAll<SVGCircleElement>("[data-nn]");
        NODES.forEach((n, i) => {
          const target = P ? clamp(1 - dist(n, P) / NEAR_RADIUS) : 0;
          nodeStrength.current[i] += (target - nodeStrength.current[i]) * lerpFactor;
          const s = nodeStrength.current[i];
          const el = circles[i];
          if (!el) return;
          el.setAttribute("r", String(3.5 + s * 3));
          el.setAttribute("fill", mix(REST_COLOR, ACTIVE_COLOR, clamp(s * 2.2)));
        });
        svg.querySelectorAll<SVGLineElement>("[data-al]").forEach((l) => {
          const i = Number(l.dataset.i), j = Number(l.dataset.j);
          const a = nodeStrength.current[i], b = nodeStrength.current[j];
          const strength = Math.min(a, b);
          l.setAttribute("opacity", strength > 0.02 ? String(strength * 1.3) : "0");
        });
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullBleed, shouldReduceMotion]);

  const wrapperClass = fullBleed
    ? "absolute inset-0"
    : "relative w-full h-[400px] flex items-center justify-center bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-100/50 overflow-hidden bg-dot-grid";

  return (
    <div ref={containerRef} className={wrapperClass}>
      <svg
        ref={svgRef}
        className={fullBleed ? "w-full h-full" : "w-full h-full max-w-[500px] max-h-[350px]"}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio={fullBleed ? "xMidYMid slice" : "xMidYMid meet"}
      >
        {restLinks.map(([i, j], idx) => (
          <line key={`rest-${idx}`} x1={NODES[i].x} y1={NODES[i].y} x2={NODES[j].x} y2={NODES[j].y} stroke={REST_LINK_COLOR} strokeWidth={1} />
        ))}
        {candLinks.map(([i, j], idx) => (
          <line key={`cand-${idx}`} data-al="" data-i={i} data-j={j} x1={NODES[i].x} y1={NODES[i].y} x2={NODES[j].x} y2={NODES[j].y} stroke={LINK_COLOR} strokeWidth={1.5} opacity={0} />
        ))}
        {NODES.map((node, i) => (
          <circle key={i} data-nn="" cx={node.x} cy={node.y} r={3.5} fill={REST_COLOR} />
        ))}
      </svg>
    </div>
  );
};

export default AINetworkVisual;
