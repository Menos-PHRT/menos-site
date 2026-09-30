"use client";

import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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

interface AINetworkVisualProps {
  /** Modo de fundo cheio: preenche o container pai (ex.: atrás do hero inteiro),
   * sem moldura/cartão, com mais nós espalhados por uma área mais larga. */
  fullBleed?: boolean;
}

// Visual do hero: uma rede de pontos dispersos que se conecta e escurece perto
// do cursor — a ideia de "quanto mais perto do seu problema/proposta, mais a
// rede se organiza". Em modo fullBleed, cobre todo o hero (inclusive atrás dos
// botões de CTA): o cursor é rastreado via window, então aproximar-se de um
// botão já aproxima o cursor daquela região da rede — sem precisar acoplar a
// lógica aos próprios botões. Sem rótulos de terminal. Sem loop ambiente:
// movimento só em resposta à interação.
export const AINetworkVisual: React.FC<AINetworkVisualProps> = ({ fullBleed = false }) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const NODES = fullBleed ? NODES_FULLBLEED : NODES_BOXED;
  const VIEW_W = fullBleed ? 1000 : 600;
  const VIEW_H = fullBleed ? 480 : 400;
  const NEAR_RADIUS = fullBleed ? 240 : 170;
  const LINK_RADIUS = fullBleed ? 170 : 130;

  useEffect(() => {
    const updateFromClient = (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!inside) {
          setPointer(null);
          return;
        }
        setPointer({
          x: ((clientX - rect.left) / rect.width) * VIEW_W,
          y: ((clientY - rect.top) / rect.height) * VIEW_H
        });
      });
    };

    const onMouseMove = (e: MouseEvent) => updateFromClient(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateFromClient(t.clientX, t.clientY);
    };
    const onTouchEnd = () => setPointer(null);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullBleed]);

  // Links "de repouso": pares de nós naturalmente próximos, sempre visíveis
  // e discretos — para a rede nunca parecer vazia sem o cursor por perto.
  const restLinks: [number, number][] = [];
  const restThreshold = fullBleed ? 75 : 60;
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      if (dist(NODES[i], NODES[j]) < restThreshold) restLinks.push([i, j]);
    }
  }

  const activeLinks: [number, number, number][] = []; // [i, j, strength]
  if (pointer) {
    for (let i = 0; i < NODES.length; i++) {
      const di = dist(NODES[i], pointer);
      if (di > NEAR_RADIUS) continue;
      for (let j = i + 1; j < NODES.length; j++) {
        const dj = dist(NODES[j], pointer);
        if (dj > NEAR_RADIUS) continue;
        const dij = dist(NODES[i], NODES[j]);
        if (dij > LINK_RADIUS) continue;
        const strength = 1 - Math.max(di, dj) / NEAR_RADIUS;
        activeLinks.push([i, j, strength]);
      }
    }
  }

  const transitionMs = shouldReduceMotion ? 0 : 220;

  const wrapperClass = fullBleed
    ? "absolute inset-0"
    : "relative w-full h-[400px] flex items-center justify-center bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-100/50 overflow-hidden bg-dot-grid";

  return (
    <div ref={containerRef} className={wrapperClass}>
      <svg
        className={fullBleed ? "w-full h-full" : "w-full h-full max-w-[500px] max-h-[350px]"}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio={fullBleed ? "xMidYMid slice" : "xMidYMid meet"}
      >
        {/* Links de repouso — discretos, sempre presentes */}
        {restLinks.map(([i, j], idx) => (
          <line
            key={`rest-${idx}`}
            x1={NODES[i].x} y1={NODES[i].y}
            x2={NODES[j].x} y2={NODES[j].y}
            stroke="#CBD5E1"
            strokeWidth={1}
          />
        ))}

        {/* Links ativos — a rede "se organizando" perto do cursor */}
        {activeLinks.map(([i, j, strength], idx) => (
          <line
            key={`active-${idx}`}
            x1={NODES[i].x} y1={NODES[i].y}
            x2={NODES[j].x} y2={NODES[j].y}
            stroke="#287777"
            strokeWidth={1.5}
            style={{ opacity: strength, transition: `opacity ${transitionMs}ms ease-out` }}
          />
        ))}

        {/* Nós */}
        {NODES.map((node, i) => {
          const d = pointer ? dist(node, pointer) : Infinity;
          const active = d < NEAR_RADIUS;
          const strength = active ? 1 - d / NEAR_RADIUS : 0;
          const r = 3.5 + strength * 3;
          return (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={r}
              fill={active ? "#143c3c" : "#94A3B8"}
              style={{
                transition: shouldReduceMotion
                  ? "none"
                  : `r ${transitionMs}ms ease-out, fill ${transitionMs}ms ease-out`
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default AINetworkVisual;
