"use client";
// Logo do header: em repouso o logo COMPLETO (MENOS); no hover recolhe (~1.2s) até ficar só o
// símbolo ⊖ e volta a abrir ao sair. É a animação original do protótipo tocada ao contrário.
// P = 1 é o logo completo, P = 0 é só o símbolo. Em telas sem hover fica sempre completo.
// Portado 1:1 do protótipo (método headerLogo()/headerFrame()). Progresso linear por frame
// + easeInOut por trecho. As cores acompanham o tema do cabeçalho (clock.themeK):
// claro = ⊖ #0E1414 → marca #143C3C e letras #143C3C; escuro = ⊖ #EAF2EE → #8CD9D9 e letras #EAF2EE.
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { M_POLYS, N_POLYS, S_PATH, E, O, STROKE, L_E, GAP, AOFF, seg, clamp, easeIO } from "./menosGeometry";
import { clock } from "../motion/clock";
import { subscribe } from "../motion/frame";
import { COL, mixv, rgb } from "../motion/math";

export default function HeaderLogo() {
  const target = useRef(1), p = useRef(1);
  const wrap = useRef<SVGGElement>(null), circ = useRef<SVGCircleElement>(null), line = useRef<SVGLineElement>(null),
    m = useRef<SVGGElement>(null), n = useRef<SVGGElement>(null), o = useRef<SVGCircleElement>(null), s = useRef<SVGPathElement>(null);

  useEffect(() => {
    const STEP = 1 / 72; // ~1.2s a 60fps
    return subscribe(() => {
      p.current += clamp(target.current - p.current, -STEP, STEP);
      const P = p.current, k = clock.themeK, c = circ.current!;
      const base = mixv(COL.paper, COL.ink0, k), brand = mixv(COL.mint, COL.brand, k), ink = rgb(mixv(COL.paper, COL.brand, k));
      const col = rgb(mixv(base, brand, easeIO(seg(P, 0, 0.3)))), gp = easeIO(seg(P, 0.1, 0.42));
      c.setAttribute("stroke", col); line.current!.setAttribute("stroke", col);
      c.setAttribute("stroke-dasharray", `${L_E - gp * GAP} ${gp * GAP}`); c.setAttribute("stroke-dashoffset", `${-gp * AOFF}`);
      const shift = easeIO(seg(P, 0.22, 0.78));
      wrap.current!.setAttribute("transform", `translate(${(1 - shift) * -55.9} 0)`);
      const L = (el: SVGElement, a: number, b: number, dx: number, attr: "fill" | "stroke") => {
        const kk = easeIO(seg(P, a, b));
        el.style.opacity = `${kk}`; el.style.transform = `translateX(${(1 - kk) * dx}px)`; el.setAttribute(attr, ink);
      };
      L(m.current!, 0.32, 0.8, 26, "fill"); L(n.current!, 0.38, 0.82, -30, "fill");
      L(o.current!, 0.48, 0.9, -60, "stroke"); L(s.current!, 0.58, 1, -90, "stroke");
    });
  }, []);

  const retract = () => (target.current = 0), expand = () => (target.current = 1);
  return (
    <Link href="/" aria-label="MENOS, página inicial" onMouseEnter={retract} onMouseLeave={expand}
      style={{ display: "flex", alignItems: "center", height: 32, width: 150 }}>
      <svg viewBox="-2 -2 254 59" style={{ height: 26, width: "auto", overflow: "visible" }}>
        <g ref={wrap}>
          <g ref={m} fill="#143C3C">{M_POLYS.map((q) => <polygon key={q} points={q} />)}</g>
          <circle ref={circ} cx={E.cx} cy={E.cy} r={E.r} fill="none" stroke="#143C3C" strokeWidth={STROKE} strokeDasharray={`${L_E - GAP} ${GAP}`} strokeDashoffset={-AOFF} />
          <line ref={line} x1={E.x1} y1={E.y1} x2={E.x2} y2={E.y2} stroke="#143C3C" strokeWidth={STROKE} />
          <g ref={n} fill="#143C3C">{N_POLYS.map((q) => <polygon key={q} points={q} />)}</g>
          <circle ref={o} cx={O.cx} cy={O.cy} r={O.r} fill="none" stroke="#143C3C" strokeWidth={STROKE} />
          <path ref={s} d={S_PATH} fill="none" stroke="#143C3C" strokeWidth={STROKE} />
        </g>
      </svg>
    </Link>
  );
}
