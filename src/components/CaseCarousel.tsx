"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

interface CaseCarouselProps {
  projects: Project[];
}

// Carrossel de cases em profundidade (3D via perspective + rotateY), circular.
// Todos os cases ocupam a mesma área da grade, empilhados; só o ativo fica
// nítido (transform:none, sem escala — é por isso que a imagem não perde
// qualidade). Navegação só por clique no card vizinho, abas numeradas, setas
// e teclado (setas esquerda/direita) — sem arraste e sem girar sozinho.
export const CaseCarousel: React.FC<CaseCarouselProps> = ({ projects }) => {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const n = projects.length;

  const go = (i: number) => setActive(((i % n) + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, n]);

  const transitionStyle = shouldReduceMotion
    ? "opacity .3s ease, transform .3s ease"
    : "transform .9s cubic-bezier(.65,0,.35,1), opacity .9s cubic-bezier(.65,0,.35,1), box-shadow .9s";

  return (
    <div>
      <div className="grid justify-items-center px-2 pt-2 pb-4" style={{ perspective: shouldReduceMotion ? "none" : "2200px" }}>
        {projects.map((project, i) => {
          let d = i - active;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const a = Math.abs(d);
          const s = Math.sign(d);
          const isActive = a === 0;
          const isNeighbor = a === 1;

          let transform = "none";
          let opacity = 1;
          if (!shouldReduceMotion) {
            if (isNeighbor) transform = `translateX(${s * 64}%) scale(.78) rotateY(${-s * 14}deg)`;
            else if (a >= 2) transform = `translateX(${s * 100}%) scale(.6) rotateY(${-s * 20}deg)`;
            opacity = isActive ? 1 : isNeighbor ? 0.45 : 0;
          } else {
            // Sem rotação/escala em 3D com "reduzir movimento" (a navegação continua por clique/aba/seta).
            transform = isActive ? "none" : `translateX(${s * 30}%)`;
            opacity = isActive ? 1 : isNeighbor ? 0.35 : 0;
          }

          return (
            <article
              key={project.slug}
              onClick={() => { if (!isActive) go(i); }}
              aria-hidden={!isActive}
              style={{
                gridArea: "1 / 1",
                width: "min(1080px, calc(100vw - 48px))",
                boxSizing: "border-box",
                background: "#FFFFFF",
                border: "1px solid #E3EAE8",
                borderRadius: 28,
                padding: 20,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: 32,
                alignItems: "stretch",
                transform,
                opacity,
                zIndex: 10 - a,
                pointerEvents: a > 1 ? "none" : "auto",
                cursor: isActive ? "default" : "pointer",
                boxShadow: isActive ? "0 40px 80px -40px rgba(12,36,36,.35)" : "none",
                transition: transitionStyle,
                transformOrigin: "50% 50%"
              }}
            >
              {/* Janela do sistema */}
              <div style={{ borderRadius: 18, overflow: "hidden", background: "#0C2424", border: "1px solid #143C3C", display: "flex", flexDirection: "column", alignSelf: "start" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #1F3F3F", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", flexShrink: 0 }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", flexShrink: 0 }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", flexShrink: 0 }} />
                    <span style={{ font: "11px ui-monospace, monospace", color: "#8FA9A3", marginLeft: 10, whiteSpace: "nowrap" }}>Ambiente Protegido</span>
                  </div>
                  <span style={{ font: "10px ui-monospace, monospace", color: "#8FA9A3", textTransform: "uppercase", letterSpacing: ".1em", whiteSpace: "nowrap" }}>
                    {project.gallery ? `${project.gallery.length} telas` : "Sistema"}
                  </span>
                </div>
                <div style={{ aspectRatio: "16/10", background: "#071A1A", overflow: "hidden" }}>
                  {project.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.name}
                      draggable={false}
                      loading={isActive ? "eager" : "lazy"}
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                    />
                  )}
                </div>
              </div>

              {/* Conteúdo */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "8px 8px 8px 0", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ font: "12px ui-monospace, monospace", color: "#8A9A97" }}>{`0${i + 1} / 0${n}`}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 999, background: "#E4F6F6", color: "#1F5C5C" }}>{project.category}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <h4 style={{ margin: 0, fontSize: "clamp(22px,2.2vw,28px)", fontWeight: 700, lineHeight: 1.2, color: "#0C2424" }}>{project.name}</h4>
                  <span style={{ fontSize: 12, color: "#8A9A97", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>{project.client}</span>
                </div>

                {project.keyMetrics && project.keyMetrics.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.keyMetrics.map((metric, mi) => (
                      <div key={mi} style={{ display: "flex", flexDirection: "column", gap: 1, padding: "8px 12px", borderRadius: 10, background: "#F6F8F7", border: "1px solid #E3EAE8", minWidth: 108 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#143C3C", lineHeight: 1.1 }}>{metric.value}</span>
                        <span style={{ fontSize: 10, color: "#8A9A97", lineHeight: 1.3 }}>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, fontSize: 13, lineHeight: 1.6, color: "#4E5F5D" }}>
                  <div>
                    <h5 style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#287777" }}>O Desafio</h5>
                    <p style={{ margin: 0 }}>{project.challenge}</p>
                  </div>
                  <div>
                    <h5 style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#287777" }}>A Solução</h5>
                    <p style={{ margin: 0 }}>{project.solution}</p>
                  </div>
                </div>

                <div style={{ padding: "14px 16px", borderRadius: 12, background: "#F4FBFB", border: "1px solid #E4F6F6", fontSize: 13, lineHeight: 1.6, color: "#1F2E2E" }}>
                  <span style={{ display: "block", marginBottom: 2, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#0C2424" }}>Impacto</span>
                  {project.impact}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.techStack.slice(0, 6).map((tech) => (
                    <span key={tech} style={{ font: "10px ui-monospace, monospace", color: "#4E5F5D", background: "#F6F8F7", border: "1px solid #E3EAE8", padding: "3px 8px", borderRadius: 999 }}>{tech}</span>
                  ))}
                </div>

                <Link
                  href={`/projetos/${project.slug}`}
                  style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#0C2424", alignSelf: "flex-start" }}
                >
                  Ler estudo de caso completo <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Abas + setas */}
      <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-between gap-6 flex-wrap mt-2">
        <div className="flex flex-wrap gap-1.5">
          {projects.map((project, i) => {
            const on = i === active;
            return (
              <button
                key={project.slug}
                onClick={() => go(i)}
                style={{
                  border: `1px solid ${on ? "#0C2424" : "#E3EAE8"}`,
                  background: on ? "#0C2424" : "#FFFFFF",
                  color: on ? "#FFFFFF" : "#4E5F5D",
                  borderRadius: 10, padding: "8px 12px", font: "500 12px Outfit, sans-serif",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                  transition: "all .3s"
                }}
              >
                <span style={{ font: "10px ui-monospace, monospace", color: on ? "#8CD9D9" : "#A7B9B5" }}>{`0${i + 1}`}</span>
                {project.shortName ?? project.name}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(active - 1)}
            aria-label="Case anterior"
            className="h-11 w-11 rounded-full flex items-center justify-center"
            style={{ border: "1px solid #D6E0DD", background: "#fff" }}
          >
            <ChevronLeft className="h-5 w-5" style={{ color: "#143C3C" }} />
          </button>
          <button
            onClick={() => go(active + 1)}
            aria-label="Próximo case"
            className="h-11 w-11 rounded-full flex items-center justify-center"
            style={{ background: "#0C2424" }}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseCarousel;
