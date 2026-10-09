"use client";
// [03] Nosso Posicionamento (handoff v8, captura 15): folha clara sobre os
// cases, ⊖ gigante ao fundo que se desenha conforme a rolagem, e o manifesto
// que acende palavra por palavra.
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { subscribe } from "./motion/frame";
import { clamp, ease, seg } from "./motion/math";

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";
const L_C = 2 * Math.PI * 24.32, GAP_C = (L_C * 12.9) / 360;

const MANIFESTO = "A MENOS nasce da ideia de que bons sistemas não são aqueles que exibem mais recursos, mas aqueles que tornam a vida mais simples. Antes de desenvolver, buscamos entender. Antes de automatizar, organizamos. Antes de acrescentar, perguntamos o que pode ser retirado. Unimos IA ao desenvolvimento com curadoria técnica especializada, decidindo arquitetura, segurança e adequação ao problema em times pequenos e próximos do cliente, para que pessoas e organizações dediquem menos tempo ao processo e mais tempo ao que realmente importa.";
const HL = new Set(["simples", "entender", "organizamos", "retirado", "IA", "importa"]);

export default function ScrollRevealText() {
  const root = useRef<HTMLElement>(null), circle = useRef<SVGCircleElement>(null), line = useRef<SVGLineElement>(null);
  const tokens = MANIFESTO.split(" ").map((t) => ({ t, hl: HL.has(t.replace(/[.,]/g, "")) }));

  useEffect(() => {
    const el = root.current!;
    const ws = Array.from(el.querySelectorAll<HTMLElement & { _v?: number }>("[data-w]")), N = ws.length;
    return subscribe(() => {
      const r = el.getBoundingClientRect(), vh = innerHeight;
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp((vh * 0.8 - r.top) / (r.height * 0.7)) * 1.06;
      for (let i = 0; i < N; i++) {
        const v = +(0.14 + 0.86 * clamp(p * N - i)).toFixed(3);
        if (ws[i]._v !== v) { ws[i].style.opacity = String(v); ws[i]._v = v; }
      }
      const q = clamp((vh - r.top) / (r.height + vh));
      circle.current?.setAttribute("stroke-dasharray", `${(ease(seg(q, 0.1, 0.62)) * (L_C - GAP_C)).toFixed(2)} ${L_C}`);
      line.current?.setAttribute("x2", (7.37 + ease(seg(q, 0.38, 0.72)) * 37.54).toFixed(2));
    });
  }, []);

  return (
    <section
      ref={root}
      data-theme="light"
      style={{ position: "relative", zIndex: 3, marginTop: -32, borderRadius: "32px 32px 0 0", background: "#F6F8F7", color: "#0C2424", padding: "clamp(110px,12vw,180px) 0", overflow: "hidden" }}
    >
      <svg viewBox="0 0 52.74 52.7" aria-hidden="true" style={{ position: "absolute", right: "-20vw", top: "50%", width: "min(84vw,1100px)", height: "auto", transform: "translateY(-50%)", pointerEvents: "none", overflow: "visible" }}>
        <circle ref={circle} cx="26.43" cy="26.38" r="24.32" fill="none" stroke="#143C3C" strokeOpacity=".07" strokeWidth="4.2" strokeDasharray="0 200" strokeDashoffset="-2.29" />
        <line ref={line} x1="7.37" y1="26.24" x2="7.37" y2="26.24" stroke="#143C3C" strokeOpacity=".07" strokeWidth="4.2" />
      </svg>
      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "0 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "clamp(28px,3.4vw,48px)" }}>
        <span data-scramble="" style={{ font: `600 12px ${MONO}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#287777" }}>{"[03] Nosso Posicionamento"}</span>
        <h2 data-reveal="mask" style={{ margin: 0, fontSize: "clamp(32px,4.2vw,64px)", fontWeight: 300, letterSpacing: "-.04em", lineHeight: 1.04, maxWidth: 860, textWrap: "balance" }}>
          Tecnologia não precisa aumentar a complexidade.
        </h2>
        <p style={{ margin: 0, display: "flex", flexWrap: "wrap", columnGap: ".26em", rowGap: ".04em", fontSize: "clamp(22px,2.5vw,40px)", fontWeight: 300, lineHeight: 1.28, letterSpacing: "-.02em" }}>
          {tokens.map((w, i) => (
            <span key={i} data-w="" style={{ opacity: 0.14, color: w.hl ? "#287777" : "#0C2424", fontWeight: w.hl ? 500 : 300 }}>{w.t}</span>
          ))}
        </p>
        <Link
          href="/a-menos"
          className="self-start inline-flex items-center gap-[10px] text-[15px] font-medium rounded-full bg-[#0C2424] text-white whitespace-nowrap transition-colors duration-300 hover:bg-[#287777]"
          style={{ padding: "14px 26px" }}
        >
          Conheça nossa história
        </Link>
      </div>
    </section>
  );
}
