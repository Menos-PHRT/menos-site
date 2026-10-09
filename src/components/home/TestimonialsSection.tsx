"use client";
// [06] Feedback (handoff v8, captura 18): a citação entra palavra a palavra
// (blur 10px → 0), o autor entra depois. Troca sozinha a cada 9s com a seção
// na tela, pausa no hover. Barra de progresso de 96px.
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { subscribe } from "../motion/frame";
import { clock } from "../motion/clock";
import { clamp, expo, seg } from "../motion/math";

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";
const SECONDS = 9;
const arrow = (d: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const root = useRef<HTMLElement>(null), bar = useRef<HTMLSpanElement>(null);
  const s = useRef({ t0: -1e9, prog: 0, paused: false, idx: 0 });
  const n = testimonials.length;

  const applyT = (t: number) => {
    const el = root.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-qw]").forEach((w, i) => {
      const k = expo(seg(t, i * 0.018, 0.9 + i * 0.018));
      w.style.opacity = String(k);
      w.style.filter = k >= 1 ? "none" : `blur(${((1 - k) * 10).toFixed(2)}px)`;
      w.style.transform = k >= 1 ? "none" : `translateY(${((1 - k) * 0.4).toFixed(3)}em)`;
    });
    el.querySelectorAll<HTMLElement>("[data-qa]").forEach((a, i) => {
      const k = expo(seg(t, 0.3 + i * 0.08, 1.1 + i * 0.08));
      a.style.opacity = String(k);
      a.style.transform = k >= 1 ? "none" : `translateY(${((1 - k) * 14).toFixed(2)}px)`;
    });
  };

  const goT = (d: number) => {
    const next = ((s.current.idx + d) % n + n) % n;
    s.current.prog = 0;
    s.current.idx = next;
    setIdx(next);
  };

  // Ao trocar de depoimento (e não na primeira renderização), reinicia a entrada.
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    s.current.t0 = performance.now();
    applyT(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    return subscribe((now, dt) => {
      const el = root.current;
      if (!el) return;
      const st = s.current, t = (now - st.t0) / 1000;
      if (t >= 0 && t < 2.6) applyT(t);
      const r = el.getBoundingClientRect(), inView = r.top < innerHeight * 0.8 && r.bottom > innerHeight * 0.2;
      if (inView && !st.paused && !document.hidden && clock.introDone) {
        st.prog += dt / SECONDS;
        if (st.prog >= 1) goT(1);
      }
      if (bar.current) bar.current.style.transform = `scaleX(${clamp(st.prog).toFixed(4)})`;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = testimonials[idx];
  const project = projects.find((p) => p.slug === t.projectSlug)?.name;
  const tokens = `“${t.text}”`.split(" ");

  return (
    <section
      ref={root}
      data-theme="light"
      onMouseEnter={() => { s.current.paused = true; }}
      onMouseLeave={() => { s.current.paused = false; }}
      style={{ position: "relative", zIndex: 3, background: "#F6F8F7", color: "#0C2424", padding: "clamp(48px,5vw,80px) 0 clamp(120px,12vw,180px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span data-scramble="" style={{ font: `600 12px ${MONO}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#287777" }}>{"[06] Feedback"}</span>
          <h2 data-reveal="mask" style={{ margin: 0, fontSize: "clamp(30px,3.6vw,56px)", fontWeight: 300, letterSpacing: "-.04em", lineHeight: 1.04 }}>
            O que dizem sobre trabalhar com a MENOS.
          </h2>
        </div>
        <blockquote style={{ margin: "clamp(36px,4.5vw,64px) 0 0", padding: 0, display: "flex", flexWrap: "wrap", columnGap: ".26em", fontSize: "clamp(24px,2.8vw,46px)", fontWeight: 300, lineHeight: 1.24, letterSpacing: "-.02em", color: "#0C2424", maxWidth: 1150, minHeight: "3.8em" }}>
          {tokens.map((w, i) => <span key={`${idx}-${i}`} data-qw="" style={{ display: "inline-block" }}>{w}</span>)}
        </blockquote>
        <div style={{ marginTop: "clamp(32px,4vw,52px)", paddingTop: 26, borderTop: "1px solid #D6E0DD", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span data-qa="" style={{ fontSize: 16, fontWeight: 700, color: "#0C2424" }}>{t.author}</span>
            <span data-qa="" style={{ fontSize: 13, color: "#5B6B69" }}>{t.role} &bull; {t.company}</span>
            {project && (
              <span data-qa="" style={{ marginTop: 6, font: `600 10px ${MONO}`, letterSpacing: ".08em", textTransform: "uppercase", color: "#287777" }}>Projeto relacionado: {project}</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ font: `600 12px ${MONO}`, color: "#8A9A97" }}>{`0${idx + 1} / 0${n}`}</span>
            <span style={{ display: "block", width: 96, height: 2, background: "#D6E0DD", overflow: "hidden" }}>
              <span ref={bar} style={{ display: "block", height: "100%", background: "#143C3C", transformOrigin: "0 50%", transform: "scaleX(0)" }} />
            </span>
            <button
              onClick={() => goT(-1)}
              aria-label="Depoimento anterior"
              className="flex items-center justify-center rounded-full border border-[#D6E0DD] bg-white text-[#143C3C] cursor-pointer transition-colors duration-300 hover:border-[#143C3C]"
              style={{ width: 48, height: 48 }}
            >
              {arrow("m15 18-6-6 6-6")}
            </button>
            <button
              onClick={() => goT(1)}
              aria-label="Próximo depoimento"
              className="flex items-center justify-center rounded-full bg-[#0C2424] text-white cursor-pointer transition-colors duration-300 hover:bg-[#287777]"
              style={{ width: 48, height: 48, border: "none" }}
            >
              {arrow("m9 18 6-6-6-6")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
