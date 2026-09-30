"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import AINetworkVisual from "@/components/AINetworkVisual";
import CaseCarousel from "@/components/CaseCarousel";
import ScrollMark from "@/components/ScrollMark";
import ScrollRevealText from "@/components/ScrollRevealText";
import { Button } from "@/components/ui/Button";
import { partners } from "@/data/partners";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

const MANIFESTO_TEXT = "A MENOS nasce da ideia de que bons sistemas não são aqueles que exibem mais recursos, mas aqueles que tornam a vida mais simples. Antes de desenvolver, buscamos entender. Antes de automatizar, organizamos. Antes de acrescentar, perguntamos o que pode ser retirado. Unimos IA ao desenvolvimento com curadoria técnica especializada, decidindo arquitetura, segurança e adequação ao problema em times pequenos e próximos do cliente, para que pessoas e organizações dediquem menos tempo ao processo e mais tempo ao que realmente importa.";

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const methodRef = useRef<HTMLDivElement>(null);
  const methodLineRef = useRef<HTMLDivElement>(null);

  // Entrada padrão do handoff de design: opacidade + leve subida, 0.9s,
  // cubic-bezier(.16,1,.3,1). Com prefers-reduced-motion, aparece direto.
  const fadeUp = (delay = 0): Variants =>
    shouldReduceMotion
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }
          }
        };

  // Linha do tempo do método: preenche e acende as bolinhas conforme o scroll
  // passa pela seção (mesma lógica de progresso do handoff de design).
  useEffect(() => {
    if (shouldReduceMotion) return;
    const onScroll = () => {
      const el = methodRef.current;
      const line = methodLineRef.current;
      if (!el || !line) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.7 - rect.top) / (rect.height * 0.6)));
      line.style.width = `${p * 100}%`;
      const dots = el.querySelectorAll<HTMLElement>("[data-step]");
      const cards = el.querySelectorAll<HTMLElement>("[data-stepcard]");
      dots.forEach((d, i) => {
        const on = p >= i / (dots.length - 1) - 0.02;
        d.style.background = on ? "#143C3C" : "#C9D6D2";
        d.style.transform = on ? "scale(1.08)" : "scale(1)";
        if (cards[i]) {
          cards[i].style.opacity = on ? "1" : "0.5";
          cards[i].style.transform = on ? "none" : "translateY(8px)";
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [shouldReduceMotion]);

  // 6 Serviços em Destaque
  const featuredServices = services.slice(0, 6);

  // 3 Projetos em Destaque

  // Métodos de Trabalho
  const methodSteps = [
    { num: "01", name: "Escutar", desc: "Reunião de entendimento do problema, contexto, fluxo de trabalho e o resultado desejado." },
    { num: "02", name: "Entender", desc: "Mapeamos os gargalos operacionais e onde estão as perdas de tempo ou de dados." },
    { num: "03", name: "Organizar", desc: "Estruturamos as regras de negócio e limpamos os processos antes de codificar." },
    { num: "04", name: "Desenhar", desc: "Criamos as interfaces e fluxos visuais focados em usabilidade e simplicidade." },
    { num: "05", name: "Desenvolver", desc: "Construímos a solução técnica com validações frequentes junto ao cliente." },
    { num: "06", name: "Acompanhar", desc: "Implantamos o sistema, treinamos a equipe e monitoramos a operação para garantir sucesso." }
  ];

  // Troca automática a cada 7s (para de vez ao usar as setas manualmente).
  const testimonialTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  useEffect(() => {
    testimonialTimer.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(testimonialTimer.current);
  }, []);

  const nextTestimonial = () => {
    clearInterval(testimonialTimer.current);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    clearInterval(testimonialTimer.current);
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* 1. HERO SECTION — a rede cobre o hero inteiro; aproximar-se dos botões
          aproxima o cursor daquela região da rede, que se organiza ao redor.
          -mt cancela o pt-24/pt-28 do <main> do layout (o hero já tem seu
          próprio respiro de 128px no padding-top; sem isso, os dois somavam
          e sobrava espaço extra no topo da página). */}
      <section className="relative -mt-24 md:-mt-28 pt-32 pb-[72px] min-h-[78vh] flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60"></div>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
        >
          <AINetworkVisual fullBleed />
        </motion.div>
        {/* Véu para garantir legibilidade do texto sobre a rede */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl flex flex-col gap-8">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.05)}
              className="text-[clamp(38px,5.2vw,62px)] font-bold tracking-[-0.025em] text-brand-950 leading-[1.08]"
            >
              Menos complexidade.<br />
              <span className="text-brand-600 font-light">Mais espaço e tempo para o que realmente importa.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.15)}
              className="text-[18px] leading-[1.65] text-slate-600 max-w-xl"
            >
              Desenvolvemos sistemas, automações e experiências digitais unindo IA e curadoria técnica especializada, para transformar processos manuais e dispersos em operações simples, rápidas de construir e fáceis de manter.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.25)}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <Button href="/contato" variant="primary" size="lg" className="w-full sm:w-auto">
                Conte seu problema
              </Button>
              <Button href="/projetos" variant="outline" size="lg" className="w-full sm:w-auto">
                Conheça nossos projetos
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SERVIÇOS EM DESTAQUE */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Nossas Soluções</h2>
              <h3 className="text-[clamp(28px,3.2vw,36px)] font-bold tracking-[-0.025em] text-brand-950 leading-[1.2]">
                Soluções criadas a partir do problema, não da tecnologia.
              </h3>
            </div>
            <Button href="/servicos" variant="outline" className="self-start md:self-auto">
              Ver todos os serviços
            </Button>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {featuredServices.map((service, i) => (
              <motion.div
                key={service.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp(i * 0.06)}
              >
                <Link
                  href={`/servicos/${service.slug}`}
                  className="flex flex-col justify-between gap-6 h-full transition-all duration-300"
                  style={{ padding: 32, borderRadius: 16, border: "1px solid #EEF2F1", background: "#fff" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#BEE9E9";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(20,60,60,.08)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#EEF2F1";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div>
                    <h4 className="text-lg font-bold mb-3" style={{ color: "#0C2424" }}>
                      {service.name}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#5B6B69" }}>
                      {service.shortDescription}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#0C2424" }}>
                    Entenda a solução <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NOSSOS CASES */}
      <section id="projetos-destaque" className="py-20 md:py-28 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Nossos cases</h2>
              <h3 className="text-[clamp(28px,3.2vw,36px)] font-bold tracking-[-0.025em] text-brand-950 leading-[1.2]">
                Soluções que já tiraram ideias do improviso.
              </h3>
            </div>
            <Button href="/projetos" variant="outline">
              Ver todos os cases
            </Button>
          </div>
        </div>

        <CaseCarousel projects={projects} />
      </section>

      {/* 6. MANIFESTO RESUMIDO */}
      <section className="py-20 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dense opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-6">Nosso Posicionamento</h2>
          <h3 className="text-[clamp(30px,4.2vw,48px)] font-bold tracking-[-0.025em] text-brand-950 mb-8 leading-[1.15]">
            Tecnologia não precisa aumentar a complexidade.
          </h3>
          <ScrollRevealText
            text={MANIFESTO_TEXT}
            className="mx-auto mb-10 max-w-3xl font-light flex flex-wrap justify-center text-[clamp(18px,1.6vw,20px)] text-[#143C3C] leading-[1.7] gap-x-[0.28em] gap-y-1"
          />
          <Button href="/a-menos" variant="outline" size="lg">
            Conheça nossa história
          </Button>
        </div>
      </section>

      {/* 7. MÉTODO DE TRABALHO — a linha e as bolinhas acendem conforme o scroll */}
      <section className="py-20 md:py-28 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Como agimos</h2>
            <h3 className="text-[clamp(28px,3.2vw,36px)] font-bold tracking-[-0.025em] text-brand-950 leading-[1.2]">
              Simplificar também exige método.
            </h3>
          </div>

          <div ref={methodRef} className="relative py-6">
            <div className="absolute top-11 left-0 right-0 h-[2px]" style={{ background: "#D6E0DD" }}></div>
            <div ref={methodLineRef} className="absolute top-11 left-0 h-[2px]" style={{ width: 0, background: "#143C3C", transition: shouldReduceMotion ? "none" : "width .1s linear" }}></div>

            <div className="grid gap-6 relative z-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
              {methodSteps.map((step) => (
                <div key={step.num} className="flex flex-col gap-6">
                  <div
                    data-step=""
                    className="h-10 w-10 rounded-full border-4 text-white font-mono text-xs font-bold flex items-center justify-center self-center shadow-md"
                    style={{ background: shouldReduceMotion ? "#143C3C" : "#C9D6D2", borderColor: "#F6F8F7", transition: "background .4s, transform .4s" }}
                  >
                    {step.num}
                  </div>
                  <div
                    data-stepcard=""
                    className="bg-white p-6 rounded-2xl text-center flex-grow flex flex-col gap-2 min-h-[160px]"
                    style={{ border: "1px solid #E3EAE8", opacity: shouldReduceMotion ? 1 : 0.5, transition: "opacity .4s, transform .4s" }}
                  >
                    <h4 className="font-bold text-sm" style={{ color: "#0C2424" }}>{step.name}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#5B6B69" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARCEIROS E CLIENTES — grade estática, sem carrossel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Ecossistema</h2>
              <h3 className="text-[clamp(24px,2.6vw,30px)] font-bold tracking-[-0.025em] text-brand-950 leading-[1.2]">
                Tecnologia é construção conjunta.
              </h3>
            </div>
            <Button href="/parceiros" variant="outline">
              Conheça nossos parceiros
            </Button>
          </div>
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", borderTop: "1px solid #EEF2F1", borderLeft: "1px solid #EEF2F1" }}
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col gap-2 transition-colors duration-300"
                style={{ padding: 24, borderRight: "1px solid #EEF2F1", borderBottom: "1px solid #EEF2F1" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F4FBFB"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: "ui-monospace, monospace", color: "#8A9A97" }}>
                  {partner.category === "client" ? "Cliente" : partner.category === "institutional" ? "Parceiro institucional" : partner.category === "collaborator" ? "Colaborador(a)" : "Fornecedor"}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#1F2E2E" }}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DEPOIMENTOS */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Feedback</h2>
            <h3 className="text-3xl font-bold text-brand-950">
              O que dizem sobre trabalhar com a MENOS.
            </h3>
          </div>

          <div className="relative bg-white border border-slate-100 p-8 md:p-12 rounded-3xl shadow-sm">
            <MessageSquare className="h-10 w-10 text-brand-100 absolute top-6 left-6 md:top-8 md:left-8" />

            <div className="min-h-[160px] flex flex-col justify-center text-center relative z-10 pt-4">
              <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed font-light mb-8">
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>

              <div className="flex flex-col items-center">
                <span className="font-bold text-brand-950 text-sm">
                  {testimonials[activeTestimonial].author}
                </span>
                <span className="text-xs text-slate-400">
                  {testimonials[activeTestimonial].role} &bull; {testimonials[activeTestimonial].company}
                </span>
                {testimonials[activeTestimonial].projectSlug && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold font-mono text-brand-600 mt-2">
                    Projeto relacionado: {projects.find(p => p.slug === testimonials[activeTestimonial].projectSlug)?.name}
                  </span>
                )}
              </div>
            </div>

            {/* Navegadores do Depoimento */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                {activeTestimonial + 1} de {testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CHAMADA FINAL (CTA) */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-50"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-8">
          <ScrollMark />
          <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest">Simplifique hoje</h2>
          <h3 className="text-[clamp(30px,4.2vw,48px)] font-bold tracking-[-0.025em] text-brand-950 leading-[1.15]">
            O que está tomando mais tempo do que deveria?
          </h3>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl">
            Conte para a MENOS onde existe burocracia, retrabalho, desorganização ou uma ideia que ainda não saiu do papel. Podemos começar pelo problema e descobrir juntos a melhor solução.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Button href="/contato" variant="primary" size="lg" className="w-full sm:w-auto">
              Conte seu problema
            </Button>
            <Button
              href="https://wa.me/5511952917968"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Falar pelo WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
