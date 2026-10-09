import React from "react";
import CaseCarousel from "@/components/CaseCarousel";
import CtaSection from "@/components/home/CtaSection";
import HomeHero from "@/components/home/HomeHero";
import MethodSection from "@/components/home/MethodSection";
import PartnersSection from "@/components/home/PartnersSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ScrollRevealText from "@/components/ScrollRevealText";
import { projects } from "@/data/projects";

// Home (handoff de design v8). Ordem: Hero → Serviços → Cases → Posicionamento
// → Método → Parceiros → Depoimentos → Chamada final → Rodapé (no layout).
// Cada seção cuida da própria animação (loop único em components/motion).
export default function HomePage() {
  return (
    <div className="w-full flex flex-col overflow-x-clip">
      <HomeHero />
      <ServicesSection />
      <CaseCarousel projects={projects} />
      <ScrollRevealText />
      <MethodSection />
      <PartnersSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
