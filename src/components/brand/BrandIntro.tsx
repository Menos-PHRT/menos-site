"use client";
// Intro de entrada em tela cheia. Portado 1:1 do protótipo (método intro()).
// Anima por requestAnimationFrame escrevendo atributos direto no DOM (sem re-render),
// é isso que dá a fluidez. Não trocar por framer-motion nem CSS transitions.
import React, { useEffect, useRef, useState } from "react";
import { M_POLYS, N_POLYS, S_PATH, E, O, STROKE, L_E, GAP, AOFF, seg, easeOut, easeIO, mix } from "./menosGeometry";

export default function BrandIntro({ onDone }: { onDone?: () => void }) {
  const [done, setDone] = useState(false);
  const ov = useRef<HTMLDivElement>(null), wrap = useRef<SVGGElement>(null), circ = useRef<SVGCircleElement>(null),
    line = useRef<SVGLineElement>(null), mG = useRef<SVGGElement>(null), nG = useRef<SVGGElement>(null), tag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDone(true); onDone?.(); return; }
    document.body.style.overflow = "hidden";
    const t0 = performance.now(); let raf = 0;
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      const draw = easeOut(seg(t, 0.2, 1.2)), lineP = easeOut(seg(t, 0.9, 1.5)), col = seg(t, 1.7, 2.3),
        gp = easeIO(seg(t, 2.3, 3.0)), as = easeIO(seg(t, 3.1, 4.0)), tg = easeOut(seg(t, 4.0, 4.5)), out = easeIO(seg(t, 5.1, 5.8));
      const c = circ.current!, l = line.current!, stroke = mix("#0E1414", "#143C3C", col);
      c.setAttribute("stroke", stroke); l.setAttribute("stroke", stroke);
      if (gp <= 0) { c.setAttribute("stroke-dasharray", `${draw * L_E} ${L_E}`); c.setAttribute("stroke-dashoffset", "0"); }
      else { c.setAttribute("stroke-dasharray", `${L_E - gp * GAP} ${gp * GAP}`); c.setAttribute("stroke-dashoffset", `${-gp * AOFF}`); }
      l.setAttribute("x2", `${E.x1 + lineP * (E.x2 - E.x1)}`);
      const s = 2.3 + (1 - 2.3) * as, cx = 125 + (E.cx - 125) * as;
      wrap.current!.setAttribute("transform", `translate(${cx} ${E.cy}) scale(${s}) translate(${-E.cx} ${-E.cy})`);
      const mA = easeOut(seg(t, 3.3, 4.0)), nA = easeOut(seg(t, 3.45, 4.15));
      mG.current!.style.opacity = `${mA}`; mG.current!.style.transform = `translateX(${(1 - mA) * -18}px)`;
      nG.current!.style.opacity = `${nA}`; nG.current!.style.transform = `translateX(${(1 - nA) * 18}px)`;
      tag.current!.style.opacity = `${tg}`; tag.current!.style.transform = `translateY(${(1 - tg) * 10}px)`;
      ov.current!.style.opacity = `${1 - out}`; ov.current!.style.transform = `translateY(${-out * 4}%)`;
      if (t > 5.9) { document.body.style.overflow = ""; setDone(true); onDone?.(); return; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);

  if (done) return null;
  const skip = () => { document.body.style.overflow = ""; setDone(true); onDone?.(); };
  return (
    <div ref={ov} style={{ position: "fixed", inset: 0, zIndex: 100, background: "#FCFCFA", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
      <svg viewBox="-10 -30 270 115" style={{ width: "min(78vw,760px)", overflow: "visible" }}>
        <g ref={wrap}>
          <g ref={mG} style={{ opacity: 0 }} fill="#143C3C">{M_POLYS.map((p) => <polygon key={p} points={p} />)}</g>
          <circle ref={circ} cx={E.cx} cy={E.cy} r={E.r} fill="none" stroke="#0E1414" strokeWidth={STROKE} strokeDasharray="0 200" />
          <line ref={line} x1={E.x1} y1={E.y1} x2={E.x1} y2={E.y1} stroke="#0E1414" strokeWidth={STROKE} />
          <g ref={nG} style={{ opacity: 0 }}>
            <g fill="#143C3C">{N_POLYS.map((p) => <polygon key={p} points={p} />)}</g>
            <circle cx={O.cx} cy={O.cy} r={O.r} fill="none" stroke="#143C3C" strokeWidth={STROKE} />
            <path d={S_PATH} fill="none" stroke="#143C3C" strokeWidth={STROKE} />
          </g>
        </g>
      </svg>
      <div ref={tag} style={{ opacity: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 300, letterSpacing: ".12em", color: "#4E5F5D" }}>
        <span>menos vira mais</span><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#287777" }} />
      </div>
      <button onClick={skip} style={{ position: "absolute", bottom: 32, right: 32, background: "none", border: "1px solid #D6E0DD", borderRadius: 999, padding: "8px 16px", font: "500 12px var(--font-outfit),sans-serif", color: "#4E5F5D", cursor: "pointer", letterSpacing: ".06em", whiteSpace: "nowrap" }}>Pular intro</button>
    </div>
  );
}
