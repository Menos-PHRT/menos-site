"use client";
// Hero da home (handoff v8, capturas 05 e 06). A rede de pontos fica atrás; o
// título entra letra a letra (easeOutExpo) começando junto com o fim da intro.
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import AINetworkVisual from "../AINetworkVisual";
import { clock } from "../motion/clock";
import { subscribe } from "../motion/frame";
import { expo, seg } from "../motion/math";

const words = (s: string) => s.split(" ").map((w) => [...w]);

function Line({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span aria-hidden="true" style={{ display: "flex", flexWrap: "wrap", columnGap: ".25em", ...style }}>
      {words(text).map((w, wi) => (
        <span key={wi} style={{ display: "inline-flex", overflow: "hidden", paddingBottom: ".08em" }}>
          {w.map((c, ci) => (
            <span key={ci} data-hl="" style={{ display: "inline-block", opacity: 0, transform: "translateY(115%)" }}>{c}</span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-hl]"));
    const fades = Array.from(el.querySelectorAll<HTMLElement>("[data-hfade]"));
    // Se a intro já terminou (navegação interna), o hero entra agora.
    const mountedAfterIntro = clock.introDone, mountT = performance.now();
    let done = false;
    return subscribe((now) => {
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= innerHeight) return;
      const t0 = mountedAfterIntro ? mountT : clock.heroT0, tH = (now - t0) / 1000;
      for (let i = 0; i < letters.length; i++) {
        const e = expo(seg(tH, 0.05 + i * 0.022, 1.2 + i * 0.022));
        letters[i].style.opacity = String(e);
        letters[i].style.transform = e >= 1 ? "none" : `translateY(${((1 - e) * 115).toFixed(2)}%) rotate(${((1 - e) * 8).toFixed(2)}deg)`;
      }
      fades.forEach((f, i) => {
        const k = expo(seg(tH, 0.9 + i * 0.15, 2 + i * 0.15));
        f.style.opacity = String(k);
        f.style.transform = k >= 1 ? "none" : `translateY(${((1 - k) * 28).toFixed(2)}px)`;
      });
      if (tH > 4.5) done = true;
    });
  }, []);

  return (
    <section
      ref={root}
      id="top"
      data-theme="light"
      className="-mt-24 md:-mt-28"
      style={{ position: "relative", minHeight: "78vh", display: "flex", alignItems: "center", padding: "128px 0 72px", background: "#FFFFFF", overflow: "hidden", boxSizing: "border-box" }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(20,60,60,.08) 1.5px,transparent 1.5px)", backgroundSize: "24px 24px", opacity: 0.6, pointerEvents: "none" }} />
      <AINetworkVisual />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,#FFFFFF 0%,rgba(255,255,255,.9) 45%,rgba(255,255,255,.35) 100%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%", boxSizing: "border-box", position: "relative" }}>
        <div style={{ maxWidth: 672, display: "flex", flexDirection: "column", gap: 28 }}>
          <h1
            aria-label="Menos complexidade. Mais espaço e tempo para o que realmente importa."
            style={{ margin: 0, fontSize: "clamp(38px,5.2vw,62px)", fontWeight: 700, letterSpacing: "-.025em", lineHeight: 1.08, color: "#0C2424" }}
          >
            <Line text="Menos complexidade." />
            <Line text="Mais espaço e tempo para o que realmente importa." style={{ fontWeight: 300, color: "#287777" }} />
          </h1>
          <p data-hfade="" style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: "#4E5F5D", maxWidth: 576, textWrap: "pretty", opacity: 0 }}>
            Desenvolvemos sistemas, automações e experiências digitais unindo IA e curadoria técnica especializada, para transformar processos manuais e dispersos em operações simples, rápidas de construir e fáceis de manter.
          </p>
          <div data-hfade="" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 4, opacity: 0 }}>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center text-[16px] font-medium rounded-full whitespace-nowrap bg-[#0C2424] text-white transition-all duration-300 hover:bg-[#287777] hover:shadow-[0_8px_24px_rgba(12,36,36,.18)]"
              style={{ padding: "16px 32px", boxShadow: "0 1px 2px rgba(12,36,36,.2)" }}
            >
              Conte seu problema
            </Link>
            <a
              href="#cases"
              className="inline-flex items-center justify-center text-[16px] font-medium rounded-full whitespace-nowrap border border-[#D6E0DD] bg-white/70 text-[#1F2E2E] transition-all duration-300 hover:bg-[#F4FBFB] hover:border-[#B9C9C5]"
              style={{ padding: "16px 32px" }}
            >
              Conheça nossos projetos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
