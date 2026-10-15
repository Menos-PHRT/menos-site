"use client";
// [02] Nossos cases (handoff v8, capturas 11 a 14): folha escura com o case
// ativo à esquerda e a janela do navegador à direita. Navegação só por clique
// (abas, setas, clique na imagem, teclado ←/→). Sem giro automático e sem arraste.
// A troca dura 1,8s e é calculada por applyCase(t) a cada frame, direto no DOM.
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { subscribe } from "./motion/frame";
import { easeIO, expo, seg } from "./motion/math";

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";
const STRIPS = 8;

// Quantas telas/imagens cada case mostra na etiqueta da janela do navegador.
const SCREENS: Record<string, string> = {
  "plataforma-melhores-cabecas": "7 telas",
  "sistema-de-credenciamento": "6 telas",
  "plataforma-de-certificacao": "5 telas",
  "integracao-coentro-erp": "Sistema",
  "reformulacao-paginas-institucionais": "4 telas"
};

const imgUrl = (p?: string) => encodeURI(p || "");
const words = (s: string) => s.split(" ").map((w) => [...w]);

export default function CaseCarousel({ projects }: { projects: Project[] }) {
  const cases = projects.filter((p) => p.image).slice(0, 5);
  const n = cases.length;

  const [st, setSt] = useState({ active: 0, prev: -1, shown: 0, tick: 0 });
  const stRef = useRef(st);
  const anim = useRef({ animating: false, t0: -1e9, inView: false });
  const sizes = useRef<Record<number, { w: number; h: number }>>({});
  const root = useRef<HTMLElement>(null), stage = useRef<HTMLDivElement>(null), base = useRef<HTMLDivElement>(null);

  const go = (i: number) => {
    const next = ((i % n) + n) % n, cur = stRef.current;
    if (next === cur.active) return;
    const shown = anim.current.animating ? cur.active : cur.shown;
    anim.current.animating = true;
    const ns = { active: next, prev: cur.active, shown, tick: cur.tick + 1 };
    stRef.current = ns;
    setSt(ns);
  };

  const resetBase = () => {
    if (base.current) { base.current.style.transform = "none"; base.current.style.filter = "none"; }
    stage.current?.querySelectorAll<HTMLElement>("[data-strip]").forEach((s) => { s.style.transform = "translateY(101%)"; });
  };

  const layoutStrips = () => {
    const el = stage.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight, sz = sizes.current[stRef.current.active] || { w: 1600, h: 1000 };
    const s = Math.max(W / sz.w, H / sz.h), bw = sz.w * s, bh = sz.h * s, bx = (W - bw) / 2;
    el.querySelectorAll<HTMLElement>("[data-strip]").forEach((e, i) => {
      const a = Math.floor((i * W) / STRIPS), b = Math.floor(((i + 1) * W) / STRIPS);
      e.style.left = `${a}px`; e.style.width = `${b - a + 1}px`;
      e.style.backgroundSize = `${bw}px ${bh}px`; e.style.backgroundPosition = `${bx - a}px 0px`;
    });
  };

  const applyCase = (t: number) => {
    const el = root.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-tp]").forEach((s, i) => {
      const k = easeIO(seg(t, i * 0.008, 0.45 + i * 0.008));
      s.style.opacity = String(1 - k); s.style.transform = `translateY(${(-k * 110).toFixed(2)}%)`;
    });
    el.querySelectorAll<HTMLElement>("[data-tc]").forEach((s, i) => {
      const k = expo(seg(t, 0.25 + i * 0.014, 1.05 + i * 0.014));
      s.style.opacity = String(k); s.style.transform = k >= 1 ? "none" : `translateY(${((1 - k) * 110).toFixed(2)}%)`;
    });
    el.querySelectorAll<HTMLElement>("[data-strip]").forEach((s, i) => {
      const k = easeIO(seg(t, 0.05 + i * 0.055, 0.85 + i * 0.055));
      s.style.transform = `translateY(${((1 - k) * 101).toFixed(2)}%)`;
    });
    const b = base.current, kb = easeIO(seg(t, 0.05, 1.3));
    if (b) {
      b.style.transform = kb >= 1 ? "none" : `translateY(${(-kb * 16).toFixed(2)}%) scale(${(1 + kb * 0.06).toFixed(4)})`;
      b.style.filter = kb > 0 && kb < 1 ? `brightness(${(1 - kb * 0.5).toFixed(3)})` : "none";
    }
    el.querySelectorAll<HTMLElement>("[data-cf]").forEach((d) => {
      const i = +d.getAttribute("data-cf")!, k = expo(seg(t, 0.35 + i * 0.07, 1.25 + i * 0.07));
      d.style.opacity = String(k); d.style.transform = k >= 1 ? "none" : `translateY(${((1 - k) * 22).toFixed(2)}px)`;
    });
    if (t >= 1.8 && anim.current.animating) {
      anim.current.animating = false;
      const cur = stRef.current, ns = { ...cur, shown: cur.active };
      stRef.current = ns;
      setSt(ns);
      setTimeout(resetBase, 120);
    }
  };

  // Troca de case: reposiciona as faixas e dispara a transição antes de pintar.
  useLayoutEffect(() => {
    if (!st.tick) return;
    resetBase(); layoutStrips();
    anim.current.t0 = performance.now();
    applyCase(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.tick]);

  useEffect(() => {
    // Pré-carrega as imagens para saber o tamanho natural (cover exato nas faixas).
    cases.forEach((c, i) => {
      const im = new Image();
      im.onload = () => { sizes.current[i] = { w: im.naturalWidth, h: im.naturalHeight }; };
      im.src = imgUrl(c.image);
    });
    const onKey = (e: KeyboardEvent) => {
      if (!anim.current.inView) return;
      const a = stRef.current.active;
      if (e.key === "ArrowRight") go(a + 1);
      if (e.key === "ArrowLeft") go(a - 1);
    };
    window.addEventListener("keydown", onKey);
    const unsub = subscribe((now) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect(), vh = innerHeight;
      anim.current.inView = r.top < vh * 0.65 && r.bottom > vh * 0.35;
      if (anim.current.animating) applyCase((now - anim.current.t0) / 1000);
    });
    return () => { unsub(); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!n) return null;
  const cur = cases[st.active], prev = st.prev >= 0 ? cases[st.prev] : null, shown = cases[st.shown];
  const digits = cases.map((_, i) => String(i + 1));

  return (
    <section
      ref={root}
      id="cases"
      data-theme="dark"
      data-sheet=""
      style={{ position: "relative", zIndex: 2, marginTop: -32, borderRadius: "32px 32px 0 0", background: "#0C2424", color: "#FFFFFF", padding: "clamp(88px,9vw,128px) 0", overflow: "hidden", transformOrigin: "50% 0" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900 }}>
            <span data-scramble="" style={{ font: `600 12px ${MONO}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#8CD9D9" }}>{"[02] Nossos cases"}</span>
            <h2 data-reveal="mask" style={{ margin: 0, fontSize: "clamp(34px,4.8vw,76px)", fontWeight: 300, letterSpacing: "-.04em", lineHeight: 1.02, color: "#FFFFFF", textWrap: "balance" }}>
              Soluções que já tiraram ideias do <span style={{ fontWeight: 600, color: "#8CD9D9" }}>improviso.</span>
            </h2>
          </div>
          <Link
            href="/projetos"
            className="inline-flex text-[14px] font-medium rounded-full border border-white/25 text-white whitespace-nowrap transition-[background,color] duration-300 hover:bg-white hover:text-[#0C2424]"
            style={{ padding: "12px 24px" }}
          >
            Ver todos os cases
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" style={{ marginTop: "clamp(48px,5vw,80px)", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, minWidth: 0 }}>
            <div aria-hidden="true" style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ display: "flex", fontSize: "clamp(80px,9vw,150px)", fontWeight: 200, lineHeight: 1, letterSpacing: "-.05em", color: "transparent", WebkitTextStroke: "1.5px #8CD9D9" }}>
                <span>0</span>
                <span style={{ display: "block", height: "1em", overflow: "hidden" }}>
                  <span style={{ display: "flex", flexDirection: "column", transform: `translateY(${-st.active}em)`, transition: "transform 1.1s cubic-bezier(.7,0,.2,1)" }}>
                    {digits.map((d) => <span key={d} style={{ display: "block", height: "1em" }}>{d}</span>)}
                  </span>
                </span>
              </div>
              <span style={{ marginTop: ".9em", font: `600 12px ${MONO}`, letterSpacing: ".12em", color: "#8FA9A3" }}>{`/ 0${n}`}</span>
            </div>
            <span data-cf="0" style={{ alignSelf: "flex-start", fontSize: 12, fontWeight: 600, letterSpacing: ".02em", padding: "5px 14px", borderRadius: 999, background: "rgba(140,217,217,.14)", color: "#E4F6F6" }}>{cur.category}</span>
            <h3 aria-label={cur.name} style={{ margin: 0, display: "grid", fontSize: "clamp(28px,3vw,46px)", fontWeight: 500, letterSpacing: "-.03em", lineHeight: 1.08 }}>
              <span aria-hidden="true" style={{ gridArea: "1/1", display: "flex", flexWrap: "wrap", columnGap: ".26em", pointerEvents: "none" }}>
                {(prev ? words(prev.name) : []).map((w, wi) => (
                  <span key={wi} style={{ display: "inline-flex", overflow: "hidden", paddingBottom: ".1em" }}>
                    {w.map((c, ci) => <span key={ci} data-tp="" style={{ display: "inline-block", opacity: 0 }}>{c}</span>)}
                  </span>
                ))}
              </span>
              <span aria-hidden="true" style={{ gridArea: "1/1", display: "flex", flexWrap: "wrap", columnGap: ".26em" }}>
                {words(cur.name).map((w, wi) => (
                  <span key={wi} style={{ display: "inline-flex", overflow: "hidden", paddingBottom: ".1em" }}>
                    {w.map((c, ci) => <span key={ci} data-tc="" style={{ display: "inline-block" }}>{c}</span>)}
                  </span>
                ))}
              </span>
            </h3>
            <span data-cf="1" style={{ font: `600 12px ${MONO}`, letterSpacing: ".08em", textTransform: "uppercase", color: "#8FA9A3", lineHeight: 1.6 }}>{cur.client}</span>
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #1F3F3F", background: "#071A1A", boxShadow: "0 40px 100px -40px rgba(0,0,0,.6)" }}>
              <div style={{ padding: "11px 16px", borderBottom: "1px solid #1F3F3F", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", flexShrink: 0 }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", flexShrink: 0 }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", flexShrink: 0 }} />
                  <span style={{ font: `11px ${MONO}`, color: "#8FA9A3", marginLeft: 10, whiteSpace: "nowrap" }}>Ambiente Protegido</span>
                </div>
                <span style={{ font: `11px ${MONO}`, color: "#8FA9A3", textTransform: "uppercase", letterSpacing: ".1em", whiteSpace: "nowrap" }}>{SCREENS[cur.slug] ?? ""}</span>
              </div>
              <div
                ref={stage}
                data-cursor="Próximo"
                onClick={() => go(st.active + 1)}
                style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "#071A1A", cursor: "pointer" }}
              >
                <div
                  ref={base}
                  role="img"
                  aria-label={shown.name}
                  style={{ position: "absolute", inset: 0, backgroundImage: `url('${imgUrl(shown.image)}')`, backgroundSize: "cover", backgroundPosition: "top center", backgroundRepeat: "no-repeat", transformOrigin: "50% 0" }}
                />
                {Array.from({ length: STRIPS }, (_, i) => (
                  <span key={i} data-strip="" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 0, backgroundImage: `url('${imgUrl(cur.image)}')`, backgroundRepeat: "no-repeat", transform: "translateY(101%)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "clamp(36px,4vw,52px)", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,.1)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", gap: "28px 36px" }}>
          <div data-cf="2" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "#8CD9D9" }}>O Desafio</span>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#B8CCC6" }}>{cur.challenge}</p>
          </div>
          <div data-cf="3" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "#8CD9D9" }}>A Solução</span>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#B8CCC6" }}>{cur.solution}</p>
          </div>
          <div data-cf="4" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 20px", borderRadius: 14, background: "rgba(140,217,217,.08)", border: "1px solid rgba(140,217,217,.16)" }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#FFFFFF" }}>Impacto</span>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#E4F6F6" }}>{cur.impact}</p>
          </div>
        </div>
        <div data-cf="5" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {cur.techStack.map((tk) => (
              <span key={tk} style={{ font: `11px ${MONO}`, color: "#B8CCC6", border: "1px solid rgba(255,255,255,.14)", padding: "4px 10px", borderRadius: 999 }}>{tk}</span>
            ))}
          </div>
          <Link href={`/projetos/${cur.slug}`} className="inline-flex items-center gap-2 min-h-11 text-[14px] font-semibold text-white hover:text-[#8CD9D9] transition-colors">
            Ler estudo de caso completo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
          </Link>
        </div>

        <div style={{ marginTop: "clamp(40px,4vw,60px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {cases.map((c, i) => {
              const on = i === st.active;
              return (
                <button
                  key={c.slug}
                  onClick={() => go(i)}
                  style={{
                    position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "11px 14px 13px", minHeight: 44, border: "none", borderRadius: 10,
                    background: on ? "rgba(140,217,217,.12)" : "transparent", color: on ? "#FFFFFF" : "#8FA9A3",
                    font: "500 13px var(--font-outfit), Outfit, sans-serif", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", transition: "background .4s, color .4s"
                  }}
                >
                  <span style={{ font: `600 11px ${MONO}`, color: on ? "#8CD9D9" : "#5F7F7A" }}>{`0${i + 1}`}</span>
                  {c.shortName ?? c.name}
                  <span style={{ position: "absolute", left: 14, right: 14, bottom: 6, height: 2, background: "#8CD9D9", transformOrigin: "0 50%", transform: on ? "scaleX(1)" : "scaleX(0)", transition: "transform .9s cubic-bezier(.7,0,.2,1)" }} />
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => go(st.active - 1)}
              aria-label="Case anterior"
              className="flex items-center justify-center rounded-full border border-white/25 bg-transparent text-white cursor-pointer transition-[background,color] duration-300 hover:bg-white hover:text-[#0C2424]"
              style={{ width: 56, height: 56 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => go(st.active + 1)}
              aria-label="Próximo case"
              className="flex items-center justify-center rounded-full bg-[#8CD9D9] text-[#0C2424] cursor-pointer transition-colors duration-300 hover:bg-[#E4F6F6]"
              style={{ width: 56, height: 56, border: "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
