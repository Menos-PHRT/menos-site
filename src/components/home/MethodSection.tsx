"use client";
// [04] Como agimos (handoff v8, captura 16): linha do tempo que preenche e
// acende as bolinhas e os cards conforme a seção passa pela tela.
import React, { useEffect, useRef } from "react";
import { subscribe } from "../motion/frame";
import { clamp, lerp } from "../motion/math";

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";

const STEPS = [
  { num: "01", name: "Escutar", desc: "Reunião de entendimento do problema, contexto, fluxo de trabalho e o resultado desejado." },
  { num: "02", name: "Entender", desc: "Mapeamos os gargalos operacionais e onde estão as perdas de tempo ou de dados." },
  { num: "03", name: "Organizar", desc: "Estruturamos as regras de negócio e limpamos os processos antes de codificar." },
  { num: "04", name: "Desenhar", desc: "Criamos as interfaces e fluxos visuais focados em usabilidade e simplicidade." },
  { num: "05", name: "Desenvolver", desc: "Construímos a solução técnica com validações frequentes junto ao cliente." },
  { num: "06", name: "Acompanhar", desc: "Implantamos o sistema, treinamos a equipe e monitoramos a operação para garantir sucesso." }
];

export default function MethodSection() {
  const root = useRef<HTMLElement>(null), fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const dots = Array.from(el.querySelectorAll<HTMLElement & { _on?: boolean }>("[data-step]"));
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-stepcard]"));
    const n = dots.length;
    let mlp = 0;
    return subscribe(() => {
      const r = el.getBoundingClientRect(), vh = innerHeight;
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp((vh * 0.75 - r.top) / (r.height * 0.6));
      mlp = lerp(mlp, p, 0.1);
      fill.current!.style.width = `${(mlp * 100).toFixed(2)}%`;
      dots.forEach((d, i) => {
        const on = mlp >= i / Math.max(1, n - 1) - 0.02;
        if (d._on === on) return;
        d._on = on;
        d.style.background = on ? "#143C3C" : "#C9D6D2";
        d.style.transform = on ? "scale(1.1)" : "scale(1)";
        const c = cards[i];
        if (!c) return;
        c.style.opacity = on ? "1" : ".45";
        c.style.transform = on ? "translateY(-4px)" : "translateY(8px)";
        c.style.background = on ? "#FFFFFF" : "#F6F8F7";
        c.style.borderColor = on ? "#B9C9C5" : "#E3EAE8";
        c.style.boxShadow = on ? "0 16px 32px -20px rgba(12,36,36,.25)" : "none";
      });
    });
  }, []);

  return (
    <section ref={root} id="como-trabalhamos" data-theme="light" style={{ position: "relative", zIndex: 3, padding: "clamp(96px,10vw,140px) 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 640, marginBottom: "clamp(48px,5vw,72px)" }}>
          <span data-scramble="" style={{ font: `600 12px ${MONO}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#287777" }}>{"[04] Como agimos"}</span>
          <h2 data-reveal="mask" style={{ margin: 0, fontSize: "clamp(30px,3.6vw,56px)", fontWeight: 300, letterSpacing: "-.04em", lineHeight: 1.04, color: "#0C2424" }}>
            Simplificar também exige <span style={{ fontWeight: 600, color: "#143C3C" }}>método.</span>
          </h2>
        </div>
        <div style={{ position: "relative", padding: "24px 0" }}>
          <div style={{ position: "absolute", top: 44, left: 0, right: 0, height: 2, background: "#E3EAE8" }} />
          <div ref={fill} style={{ position: "absolute", top: 44, left: 0, width: 0, height: 2, background: "#143C3C" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 24, position: "relative" }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div
                  data-step=""
                  style={{
                    width: 40, height: 40, borderRadius: "50%", background: "#C9D6D2", border: "4px solid #FFFFFF", color: "#FFFFFF",
                    font: `700 12px ${MONO}`, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center",
                    transition: "background .5s, transform .6s cubic-bezier(.16,1,.3,1)"
                  }}
                >
                  {s.num}
                </div>
                <div
                  data-stepcard=""
                  style={{
                    background: "#F6F8F7", border: "1px solid #E3EAE8", padding: 24, borderRadius: 16, textAlign: "center", flexGrow: 1,
                    display: "flex", flexDirection: "column", gap: 8, minHeight: 160, boxSizing: "border-box", opacity: 0.45, transform: "translateY(8px)",
                    transition: "opacity .6s, transform .7s cubic-bezier(.16,1,.3,1), background .5s, border-color .5s, box-shadow .5s"
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0C2424" }}>{s.name}</h4>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "#5B6B69" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
