"use client";
// [05] Ecossistema (handoff v8, captura 17): grade separada por 1px com um
// brilho radial de 360px que segue o cursor (variáveis --mx/--my, direto no DOM).
import Link from "next/link";
import React, { useRef } from "react";
import { partners, type Partner } from "@/data/partners";

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";

const kindOf = (p: Partner) =>
  p.kindLabel ??
  (p.category === "client" ? "Cliente" : p.category === "institutional" ? "Parceiro institucional" : p.category === "collaborator" ? "Apoiador" : "Fornecedor");

export default function PartnersSection() {
  const grid = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = grid.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const leave = () => {
    const el = grid.current;
    if (!el) return;
    el.style.setProperty("--mx", "-1000px");
    el.style.setProperty("--my", "-1000px");
  };

  return (
    <section id="parceiros" data-theme="light" style={{ position: "relative", zIndex: 3, background: "#F6F8F7", color: "#0C2424", padding: "clamp(96px,10vw,150px) 0 clamp(48px,5vw,80px)", borderTop: "1px solid #EEF2F1" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <span data-scramble="" style={{ font: `600 12px ${MONO}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#287777" }}>{"[05] Ecossistema"}</span>
            <h2 data-reveal="mask" style={{ margin: 0, fontSize: "clamp(30px,3.6vw,56px)", fontWeight: 300, letterSpacing: "-.04em", lineHeight: 1.04 }}>
              Tecnologia é construção <span style={{ fontWeight: 600, color: "#143C3C" }}>conjunta.</span>
            </h2>
          </div>
          <Link
            href="/a-menos#parceiros"
            className="inline-flex text-[14px] font-medium rounded-full border border-[#D6E0DD] text-[#1F2E2E] whitespace-nowrap transition-colors duration-300 hover:bg-white"
            style={{ padding: "12px 24px" }}
          >
            Conheça nossos parceiros
          </Link>
        </div>
        <div
          ref={grid}
          onPointerMove={move}
          onPointerLeave={leave}
          className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4"
          style={{ marginTop: "clamp(40px,5vw,64px)", gap: 1, padding: 1, borderRadius: 20, overflow: "hidden", background: "radial-gradient(360px circle at var(--mx,-1000px) var(--my,-1000px),#287777,#DCE5E2 70%)" }}
        >
          {partners.map((p, i) => (
            <div
              key={p.id}
              data-reveal=""
              data-delay={(i % 4) * 70}
              className="bg-[#F6F8F7] hover:bg-white"
              style={{ padding: "26px 24px 28px", minHeight: 140, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24, transition: "background .4s" }}
            >
              <span style={{ font: `600 11px ${MONO}`, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A9A97" }}>{kindOf(p)}</span>
              <span style={{ fontSize: "clamp(15px,1.25vw,18px)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", lineHeight: 1.35, color: "#1F2E2E" }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
