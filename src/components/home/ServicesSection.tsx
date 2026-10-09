"use client";
// [01] Nossas Soluções (handoff v8, capturas 08 a 10): lista em linhas com
// painel escuro que sobe no hover, título que engrossa e ⊖ que vira ⊕.
import Link from "next/link";
import React, { useState } from "react";
import { services } from "@/data/services";

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";
const ease = "cubic-bezier(.7,0,.2,1)";

export default function ServicesSection() {
  const [hover, setHover] = useState(-1);
  const list = services.slice(0, 5);

  return (
    <section id="servicos" data-theme="light" style={{ position: "relative", zIndex: 2, borderTop: "1px solid #EEF2F1", background: "#FFFFFF", padding: "clamp(80px,9vw,128px) 0 clamp(112px,12vw,170px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
            <span data-scramble="" style={{ font: `600 12px ${MONO}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#287777" }}>{"[01] Nossas Soluções"}</span>
            <h2 data-reveal="mask" style={{ margin: 0, fontSize: "clamp(34px,4.8vw,76px)", fontWeight: 300, letterSpacing: "-.04em", lineHeight: 1.02, color: "#0C2424", textWrap: "balance" }}>
              Soluções criadas com menos dor de cabeça e <span style={{ fontWeight: 600, color: "#143C3C" }}>mais eficiência.</span>
            </h2>
          </div>
          <Link
            href="/servicos"
            className="inline-flex text-[14px] font-medium rounded-full border border-[#D6E0DD] text-[#1F2E2E] whitespace-nowrap transition-[background,border-color] duration-300 hover:bg-[#F4FBFB] hover:border-[#B9C9C5]"
            style={{ padding: "12px 24px" }}
          >
            Ver todos os serviços
          </Link>
        </div>

        <div style={{ marginTop: "clamp(48px,6vw,80px)", borderTop: "1px solid #D6E0DD" }} onMouseLeave={() => setHover(-1)}>
          {list.map((s, i) => {
            const h = hover === i;
            return (
              <Link
                key={s.slug}
                href={`/servicos/${s.slug}`}
                data-cursor="Ver"
                data-reveal=""
                data-delay={i * 70}
                onMouseEnter={() => setHover(i)}
                className="grid grid-cols-[36px_minmax(0,1fr)_44px] lg:grid-cols-[64px_minmax(0,1fr)_minmax(0,380px)_44px]"
                style={{
                  position: "relative", alignItems: "center", gap: "10px 32px", padding: "clamp(20px,2.2vw,32px) 0",
                  borderBottom: "1px solid #D6E0DD", color: h ? "#FFFFFF" : "#0C2424", transition: `color .5s ${ease}`
                }}
              >
                <span aria-hidden="true" style={{ position: "absolute", top: -1, bottom: -1, left: -24, right: -24, background: "#0C2424", borderRadius: 4, clipPath: h ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", transition: `clip-path .7s ${ease}` }} />
                <span style={{ position: "relative", font: `600 12px ${MONO}`, letterSpacing: ".1em", color: h ? "#8CD9D9" : "#287777", transition: "color .5s" }}>{`0${i + 1}`}</span>
                <span style={{ position: "relative", fontSize: "clamp(26px,4vw,60px)", fontWeight: h ? 500 : 300, letterSpacing: "-.035em", lineHeight: 1.02, transform: h ? "translateX(18px)" : "none", transition: "transform .7s cubic-bezier(.16,1,.3,1), font-weight .7s" }}>{s.name}</span>
                <span className="col-[2/4] lg:col-auto" style={{ position: "relative", fontSize: 15, lineHeight: 1.55, color: h ? "#B8CCC6" : "#5B6B69", maxWidth: 380, transition: "color .5s" }}>{s.shortDescription}</span>
                <svg
                  viewBox="-1.5 -1.5 55.74 55.7"
                  aria-hidden="true"
                  className="col-3 row-1 lg:col-auto lg:row-auto"
                  style={{ position: "relative", width: 44, height: 44, overflow: "visible", justifySelf: "end", transform: h ? "rotate(180deg)" : "none", transition: `transform .7s ${ease}` }}
                >
                  <circle cx="26.43" cy="26.38" r="24.32" fill="none" stroke="currentColor" strokeWidth="2.4" />
                  <line x1="12" y1="26.38" x2="40.86" y2="26.38" stroke="currentColor" strokeWidth="2.4" />
                  <line x1="26.43" y1="11.95" x2="26.43" y2="40.81" stroke="currentColor" strokeWidth="2.4" style={{ transformOrigin: "26.43px 26.38px", transform: h ? "scaleY(1)" : "scaleY(0)", transition: `transform .6s ${ease}` }} />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
