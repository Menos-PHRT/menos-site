"use client";
// Logo do header: em repouso só o ⊖ preto; no hover se desdobra em MENOS (~1.2s) e volta ao sair.
// Portado 1:1 do protótipo (método headerLogo()). Progresso linear por frame + easeInOut por trecho.
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { M_POLYS, N_POLYS, S_PATH, E, O, STROKE, L_E, GAP, AOFF, seg, clamp, easeIO, mix } from "./menosGeometry";

export default function HeaderLogo() {
  const target = useRef(0), p = useRef(0);
  const wrap = useRef<SVGGElement>(null), circ = useRef<SVGCircleElement>(null), line = useRef<SVGLineElement>(null),
    m = useRef<SVGGElement>(null), n = useRef<SVGGElement>(null), o = useRef<SVGCircleElement>(null), s = useRef<SVGPathElement>(null);

  useEffect(() => {
    let raf = 0;
    const STEP = 1 / 72; // ~1.2s a 60fps
    const frame = () => {
      p.current += clamp(target.current - p.current, -STEP, STEP);
      const P = p.current, c = circ.current!;
      const col = mix("#0E1414", "#143C3C", easeIO(seg(P, 0, 0.3))), gp = easeIO(seg(P, 0.1, 0.42));
      c.setAttribute("stroke", col); line.current!.setAttribute("stroke", col);
      c.setAttribute("stroke-dasharray", `${L_E - gp * GAP} ${gp * GAP}`); c.setAttribute("stroke-dashoffset", `${-gp * AOFF}`);
      const shift = easeIO(seg(P, 0.22, 0.78));
      wrap.current!.setAttribute("transform", `translate(${(1 - shift) * -55.9} 0)`);
      const L = (el: SVGElement, a: number, b: number, dx: number) => { const k = easeIO(seg(P, a, b)); el.style.opacity = `${k}`; el.style.transform = `translateX(${(1 - k) * dx}px)`; };
      L(m.current!, 0.32, 0.8, 26); L(n.current!, 0.38, 0.82, -30); L(o.current!, 0.48, 0.9, -60); L(s.current!, 0.58, 1, -90);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const on = () => (target.current = 1), off = () => (target.current = 0);
  return (
    <Link href="/" aria-label="MENOS, página inicial" onMouseEnter={on} onMouseLeave={off} onFocus={on} onBlur={off}
      style={{ display: "flex", alignItems: "center", height: 32, width: 150 }}>
      <svg viewBox="-2 -2 254 59" style={{ height: 26, width: "auto", overflow: "visible" }}>
        <g ref={wrap}>
          <g ref={m} fill="#143C3C" style={{ opacity: 0 }}>{M_POLYS.map((q) => <polygon key={q} points={q} />)}</g>
          <circle ref={circ} cx={E.cx} cy={E.cy} r={E.r} fill="none" stroke="#0E1414" strokeWidth={STROKE} />
          <line ref={line} x1={E.x1} y1={E.y1} x2={E.x2} y2={E.y2} stroke="#0E1414" strokeWidth={STROKE} />
          <g ref={n} fill="#143C3C" style={{ opacity: 0 }}>{N_POLYS.map((q) => <polygon key={q} points={q} />)}</g>
          <circle ref={o} cx={O.cx} cy={O.cy} r={O.r} fill="none" stroke="#143C3C" strokeWidth={STROKE} style={{ opacity: 0 }} />
          <path ref={s} d={S_PATH} fill="none" stroke="#143C3C" strokeWidth={STROKE} style={{ opacity: 0 }} />
        </g>
      </svg>
    </Link>
  );
}
