"use client";
// [07] Simplifique hoje (handoff v8, capturas 19 e 20): ⊖ gigante que se
// desenha conforme a seção entra; no hover de "Conte seu problema" o traço
// vertical cresce do centro (1,1s, easeInOut) e forma uma cruz exata (⊕).
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { subscribe } from "../motion/frame";
import { clamp, ease, easeIO, mix, seg } from "../motion/math";

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";
const L_C = 2 * Math.PI * 24.32, GAP_C = (L_C * 12.9) / 360;

export default function CtaSection() {
  const root = useRef<HTMLElement>(null), circle = useRef<SVGCircleElement>(null),
    line = useRef<SVGLineElement>(null), vline = useRef<SVGLineElement>(null);
  const hover = useRef(false);

  useEffect(() => {
    let plus = 0;
    return subscribe((_now, dt) => {
      const el = root.current;
      if (!el) return;
      // tween linear em 1,1s até o alvo
      const step = dt / 1.1, target = hover.current ? 1 : 0;
      plus += clamp(target - plus, -step, step);
      const r = el.getBoundingClientRect(), vh = innerHeight;
      if (r.top > vh || r.bottom < 0) return;
      const q = clamp((vh - r.top) / (vh * 1.05)), f = ease(seg(q, 0.05, 0.75)), k = easeIO(plus), col = mix("#E4F6F6", "#C4EAEA", k);
      const c = circle.current, ln = line.current, v = vline.current;
      if (c) { c.setAttribute("stroke-dasharray", `${(f * (L_C - GAP_C)).toFixed(2)} ${L_C}`); c.setAttribute("stroke", col); }
      if (ln) ln.setAttribute("stroke", col);
      if (v) {
        const h = 18.77 * k;
        v.setAttribute("y1", (26.38 - h).toFixed(2)); v.setAttribute("y2", (26.38 + h).toFixed(2)); v.setAttribute("stroke", col);
      }
    });
  }, []);

  return (
    <section
      ref={root}
      id="contato"
      data-theme="light"
      style={{ position: "relative", zIndex: 3, background: "#FFFFFF", padding: "clamp(120px,13vw,200px) 0 clamp(100px,10vw,150px)", overflow: "hidden", borderTop: "1px solid #EEF2F1" }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(20,60,60,.08) 1.5px,transparent 1.5px)", backgroundSize: "24px 24px", opacity: 0.5, pointerEvents: "none" }} />
      <svg viewBox="0 0 52.74 52.7" aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", width: "min(92vw,900px)", height: "auto", transform: "translate(-50%,-50%)", pointerEvents: "none", overflow: "visible" }}>
        <circle ref={circle} cx="26.43" cy="26.38" r="24.32" fill="none" stroke="#E4F6F6" strokeWidth="4.2" strokeDasharray="0 200" strokeDashoffset="-2.29" />
        <line ref={line} x1="7.66" y1="26.38" x2="45.2" y2="26.38" stroke="#E4F6F6" strokeWidth="4.2" />
        <line ref={vline} x1="26.43" y1="26.38" x2="26.43" y2="26.38" stroke="#E4F6F6" strokeWidth="4.2" />
      </svg>
      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "clamp(22px,2.6vw,34px)" }}>
        <span data-scramble="" style={{ font: `600 12px ${MONO}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#287777" }}>{"[07] Simplifique hoje"}</span>
        <h2 data-reveal="mask" style={{ margin: 0, fontSize: "clamp(38px,6vw,104px)", fontWeight: 300, letterSpacing: "-.05em", lineHeight: 1, color: "#0C2424", textWrap: "balance" }}>
          O que está tomando <span style={{ fontWeight: 600, color: "#143C3C" }}>mais tempo</span> do que deveria?
        </h2>
        <p data-reveal="" data-delay="120" style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: "#5B6B69", maxWidth: 576, textWrap: "pretty" }}>
          Conte para a MENOS onde existe burocracia, retrabalho, desorganização ou uma ideia que ainda não saiu do papel. Podemos começar pelo problema e descobrir juntos a melhor solução.
        </p>
        <div data-reveal="" data-delay="220" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 6 }}>
          <Link
            href="/contato"
            onMouseEnter={() => { hover.current = true; }}
            onMouseLeave={() => { hover.current = false; }}
            className="inline-flex items-center gap-[10px] text-[16px] font-medium rounded-full bg-[#0C2424] text-white whitespace-nowrap transition-colors duration-300 hover:bg-[#287777]"
            style={{ padding: "18px 32px" }}
          >
            Conte seu problema
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
          <a
            href="https://wa.me/5511952917968"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[16px] font-medium rounded-full border border-[#D6E0DD] bg-white text-[#1F2E2E] whitespace-nowrap transition-colors duration-300 hover:bg-[#F4FBFB]"
            style={{ padding: "18px 32px" }}
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
