"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

interface CaseCarouselProps {
  projects: Project[];
}

// Carrossel horizontal dos cases, com profundidade (cards ao lado encolhem e
// perdem opacidade — sensação de espaço, sem exigir WebGL). Navegação por
// arraste/toque nativo (scroll-snap), setas, indicadores e clique no card
// lateral para centralizar. Mostra TODOS os cases, não só os destaques.
export const CaseCarousel: React.FC<CaseCarouselProps> = ({ projects }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const updateDepth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = cardCenter - trackCenter;

      // Profundidade (perspectiva/rotação presa ao scroll) é um gatilho vestibular —
      // com "reduzir movimento" ativado, os cards ficam parados no tamanho normal.
      if (!shouldReduceMotion) {
        const normalized = Math.min(Math.abs(dist) / trackRect.width, 1);
        const scale = 1 - normalized * 0.16;
        const opacity = 1 - normalized * 0.55;
        const rotateY = Math.max(-14, Math.min(14, (dist / trackRect.width) * -22));
        card.style.transform = `perspective(1200px) scale(${scale}) rotateY(${rotateY}deg)`;
        card.style.opacity = String(opacity);
      }

      if (Math.abs(dist) < closestDist) {
        closestDist = Math.abs(dist);
        closestIdx = i;
      }
    });

    setActiveIndex(closestIdx);
  }, [shouldReduceMotion]);

  useEffect(() => {
    updateDepth();
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateDepth);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateDepth]);

  const scrollToIndex = (i: number) => {
    const card = cardRefs.current[i];
    card?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
  };

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNext = () => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1));

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 md:scroll-px-[calc((100%-min(100%,56rem))/2)] px-6 md:px-[calc((100%-min(100%,56rem))/2)] pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: shouldReduceMotion ? "auto" : "smooth" }}
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="snap-center shrink-0 w-[85vw] sm:w-[65vw] md:w-[46rem] transition-transform duration-300 ease-out will-change-transform"
          >
            <Link
              href={`/projetos/${project.slug}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6 items-center rounded-3xl border border-slate-100 bg-white p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-slate-200 transition-shadow duration-300"
            >
              <div className="md:col-span-5">
                {project.image && (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-brand-950 aspect-[16/10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-7 flex flex-col gap-3 pt-4 md:pt-0">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-600 self-start">
                  {project.category}
                </span>
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                  {project.name}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {project.impact}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition mt-1">
                  Ler estudo de caso <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Setas */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-6">
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Case anterior"
          className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Indicadores */}
        <div className="flex items-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir para o case ${project.name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-brand-600" : "w-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={activeIndex === projects.length - 1}
          aria-label="Próximo case"
          className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicadores (mobile) */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-4">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir para o case ${project.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-brand-600" : "w-1.5 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CaseCarousel;
