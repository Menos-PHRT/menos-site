"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import AINetworkVisual from "@/components/AINetworkVisual";
import CaseCarousel from "@/components/CaseCarousel";
import PartnerCarousel from "@/components/PartnerCarousel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { partners } from "@/data/partners";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Entrada padrão (Jakub Krehel): opacidade + leve subida, spring sem bounce.
  // Com prefers-reduced-motion, o elemento aparece direto no estado final.
  const fadeUp = (delay = 0): Variants =>
    shouldReduceMotion
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", duration: 0.5, bounce: 0, delay }
          }
        };

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

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* 1. HERO SECTION — a rede cobre o hero inteiro; aproximar-se dos botões
          aproxima o cursor daquela região da rede, que se organiza ao redor. */}
      <section className="relative min-h-[calc(100vh-120px)] flex items-center py-16 md:py-24 bg-white overflow-hidden">
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-950 leading-[1.1]"
            >
              Menos complexidade.<br />
              <span className="text-brand-600 font-light">Mais espaço e tempo para o que realmente importa.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.15)}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Desenvolvemos sistemas, automações e experiências digitais unindo IA e curadoria técnica especializada — para transformar processos manuais e dispersos em operações simples, rápidas de construir e fáceis de manter.
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
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-950 leading-tight">
                Soluções criadas a partir do problema, não da tecnologia.
              </h3>
            </div>
            <Button href="/servicos" variant="outline" className="self-start md:self-auto">
              Ver todos os serviços
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, i) => (
              <motion.div
                key={service.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp(i * 0.05)}
              >
                <Card className="h-full flex flex-col justify-between group p-8">
                  <div>
                    <div className="mb-6">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Solução #{i + 1}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-brand-950 mb-2 group-hover:text-brand-600 transition">
                      {service.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium italic mb-4">
                      Resolve: {service.problemsSolved[0]}
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-950 group-hover:text-brand-600 transition"
                  >
                    Entenda a solução <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Card>
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
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-950 leading-tight">
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
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 mb-8 leading-tight">
            Tecnologia não precisa aumentar a complexidade.
          </h3>
          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            A MENOS nasce da ideia de que bons sistemas não são aqueles que exibem mais recursos, mas aqueles que tornam a vida mais simples. Antes de desenvolver, buscamos entender. Antes de automatizar, organizamos. Antes de acrescentar, perguntamos o que pode ser retirado. Unimos IA ao desenvolvimento com curadoria técnica especializada — decidindo arquitetura, segurança e adequação ao problema em times pequenos e próximos do cliente — para que pessoas e organizações dediquem menos tempo ao processo e mais tempo ao que realmente importa.
          </p>
          <Button href="/a-menos" variant="outline" size="lg">
            Conheça nossa história
          </Button>
        </div>
      </section>

      {/* 7. MÉTODO DE TRABALHO */}
      <section className="py-20 md:py-28 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Como agimos</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-950 leading-tight">
              Simplificar também exige método.
            </h3>
          </div>

          {/* Versão Desktop (Linha Horizontal conectando cards) */}
          <div className="relative hidden lg:block py-6">
            {/* Linha Horizontal de Fundo */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-6 gap-6 relative z-10">
              {methodSteps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp(idx * 0.08)}
                  className="flex flex-col gap-6"
                >
                  {/* Círculo do Conector */}
                  <div className="h-10 w-10 rounded-full bg-brand-950 border-4 border-[#FAF9F6] text-white font-mono text-xs font-bold flex items-center justify-center self-center shadow-md">
                    {step.num}
                  </div>
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl text-center flex-grow flex flex-col gap-2 min-h-[160px] shadow-sm">
                    <h4 className="font-bold text-brand-950 text-sm">{step.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Versão Mobile (Linha Vertical) */}
          <div className="relative lg:hidden pl-8">
            <div className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-slate-200 z-0"></div>

            <div className="flex flex-col gap-8">
              {methodSteps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp(idx * 0.06)}
                  className="relative flex flex-col gap-2"
                >
                  <div className="absolute -left-[33px] top-1.5 h-6 w-6 rounded-full bg-brand-950 border-2 border-[#FAF9F6] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-brand-950 text-base">{step.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARCEIROS E CLIENTES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Ecossistema</h2>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-950 leading-tight">
                Tecnologia é construção conjunta.
              </h3>
            </div>
            <Button href="/parceiros" variant="outline">
              Conheça nossos parceiros
            </Button>
          </div>
        </div>

        {/* Carrossel Deslizante Contínuo */}
        <PartnerCarousel />
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
          <h2 className="text-xs font-semibold text-brand-600 uppercase tracking-widest">Simplifique hoje</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 leading-tight">
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
