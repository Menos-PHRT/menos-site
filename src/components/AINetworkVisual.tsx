"use client";
// Rede de pontos do hero (portada do método network() do protótipo v8).
// 40 nós fixos num viewBox 1000x480. O ponteiro (suavizado, lerp .12) "acende" os
// nós a menos de 240 de distância e as linhas candidatas entre nós próximos.
// Sem ponteiro, tudo apaga suavemente. Escreve direto no DOM, sem estado.
import React, { useEffect, useRef } from "react";
import { subscribe } from "./motion/frame";
import { clamp, mix } from "./motion/math";

const NODES = [[491,267],[131,127],[445,243],[95,407],[586,201],[293,364],[651,54],[499,123],[665,90],[558,234],[189,42],[922,447],[136,215],[937,103],[422,262],[665,144],[184,454],[448,122],[545,165],[167,360],[358,174],[96,428],[249,409],[472,124],[599,197],[749,307],[151,119],[452,60],[66,201],[674,305],[937,163],[441,238],[441,389],[453,213],[273,124],[733,78],[280,357],[844,446],[910,399],[737,302]].map(([x, y]) => ({ x, y }));

const NEAR = 240, LINK = 170;
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

interface Link { i: number; j: number; x1: number; y1: number; x2: number; y2: number }
const REST: Link[] = [], CAND: Link[] = [];
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    const d = dist(NODES[i], NODES[j]);
    const k = { i, j, x1: NODES[i].x, y1: NODES[i].y, x2: NODES[j].x, y2: NODES[j].y };
    if (d < 75) REST.push(k);
    if (d < LINK) CAND.push(k);
  }
}

export default function AINetworkVisual() {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current!;
    const circles = Array.from(el.querySelectorAll<SVGCircleElement>("[data-nn]"));
    const links = Array.from(el.querySelectorAll<SVGLineElement>("[data-al]"));
    const strength = NODES.map(() => 0);
    let ptr: { x: number; y: number } | null = null, smooth: { x: number; y: number } | null = null;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { ptr = null; return; }
      // preserveAspectRatio "xMidYMid slice": escala pelo maior eixo
      const k = Math.max(r.width / 1000, r.height / 480), ox = (r.width - 1000 * k) / 2, oy = (r.height - 480 * k) / 2;
      ptr = { x: (e.clientX - r.left - ox) / k, y: (e.clientY - r.top - oy) / k };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const unsub = subscribe(() => {
      if (ptr) smooth = smooth ? { x: smooth.x + (ptr.x - smooth.x) * 0.12, y: smooth.y + (ptr.y - smooth.y) * 0.12 } : { ...ptr };
      const P = ptr ? smooth : null;
      NODES.forEach((n, i) => {
        const tgt = P ? clamp(1 - dist(n, P) / NEAR) : 0;
        strength[i] += (tgt - strength[i]) * 0.12;
        const k = strength[i], c = circles[i];
        if (!c) return;
        c.setAttribute("r", (3.5 + k * 3).toFixed(2));
        c.setAttribute("fill", mix("#A7B9B5", "#143C3C", clamp(k * 2.2)));
      });
      links.forEach((l) => {
        const v = Math.min(strength[+l.dataset.i!], strength[+l.dataset.j!]);
        l.setAttribute("opacity", v > 0.02 ? (v * 1.3).toFixed(3) : "0");
      });
    });
    return () => { unsub(); window.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <svg ref={svg} viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {REST.map((k) => <line key={`r${k.i}-${k.j}`} x1={k.x1} y1={k.y1} x2={k.x2} y2={k.y2} stroke="#D6E0DD" strokeWidth="1" />)}
      {CAND.map((k) => <line key={`c${k.i}-${k.j}`} data-al="" data-i={k.i} data-j={k.j} x1={k.x1} y1={k.y1} x2={k.x2} y2={k.y2} stroke="#287777" strokeWidth="1.5" opacity="0" />)}
      {NODES.map((n, i) => <circle key={i} data-nn="" cx={n.x} cy={n.y} r="3.5" fill="#A7B9B5" />)}
    </svg>
  );
}
