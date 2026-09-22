"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Table,
  Repeat,
  Share2,
  ClipboardList,
  LayoutGrid,
  Users,
  FileCheck,
  Lightbulb
} from "lucide-react";
import PartnerCarousel from "@/components/PartnerCarousel";
import SimplificationVisual from "@/components/SimplificationVisual";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { partners } from "@/data/partners";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null);

  // Problemas catalogados
  const problems = [
    {
      title: "Planilhas desorganizadas"
      act: "Estruturamos seus dados em bancos de dados relacionais seguros com interfaces intuitivas.",
      icon: Table
    },
    {
      title: "Tarefas repetitivas",
      act: "Conectamos suas ferramentas via API e automatizamos tarefas manuais de ponta a ponta.",
      icon: Repeat
    },
    {
      title: "Informações espalhadas",
      act: "Centralizamos tudo em um único painel de controle ou sistema integrado.",
      icon: Share2
    },
    {
      title: "Processos manuais",
      act: "Substituímos papéis e digitação redundante por formulários e fluxos automáticos.",
      icon: ClipboardList
    },
    {
      title: "Sistemas difíceis de usar",
      act: "Redesenhamos a experiência com foco absoluto na clareza e usabilidade humana.",
      icon: LayoutGrid
    },
    {
      title: "Retrabalho entre equipes",
      act: "Sincronizamos dados em tempo real entre diferentes departamentos de forma automática.",
      icon: Users
    },
    {
      title: "Inscrições e cadastros confusos",
      act: "Criamos formulários inteligentes que validam dados e guiam o usuário sem atrito.",
      icon: FileCheck
    },
    {
      title: "Ideias sem forma de existir",
      act: "Traduzimos ideias abstratas em escopos técnicos viáveis e protótipos funcionais.",
      icon: Lightbulb
    }
  ];

  // 6 Serviços em Destaque
  const featuredServices = services.slice(0, 6);

  // 3 Projetos em Destaque
  const featuredProjects = projects.slice(0, 3);

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
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-120px)] flex items-center py-16 md:py-24 bg-white">
        {/* Fundo decorativo sutil */}
        <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-80"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]"
            >
              Menos complexidade.<br />
              <span className="text-blue-600 font-light">Mais espaço e tempo para o que realmente importa.</span>
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Criamos sistemas, automações e experiências digitais que organizam processos, reduzem retrabalho e tornam a tecnologia mais simples para pessoas e organizações.
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
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

          {/* Interactive Visual Graphic */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <SimplificationVisual />
          </motion.div>
        </div>
      </section>

      {/* 2. FAIXA CONCEITUAL (MARQUEE) */}
      <section className="bg-slate-900 py-6 overflow-hidden select-none">
        <div className="flex whitespace-nowrap items-center w-full">
          <div className="flex gap-16 text-sm font-semibold tracking-widest text-slate-400 uppercase animate-marquee">
            <span>Menos burocracia</span>
            <span>Menos retrabalho</span>
            <span>Menos atrito</span>
            <span>Menos improviso</span>
            <span>Menos barreiras entre ideia e execução</span>
            <span className="text-blue-400 font-bold">Menos é mais</span>

            {/* Duplicar para loop contínuo */}
            <span>Menos burocracia</span>
            <span>Menos retrabalho</span>
            <span>Menos atrito</span>
            <span>Menos improviso</span>
            <span>Menos barreiras entre ideia e execução</span>
            <span className="text-blue-400 font-bold">Menos é mais</span>
          </div>
        </div>
      </section>

      {/* 3. PROBLEMAS QUE RESOLVEMOS */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Problemas reais</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              A tecnologia deveria facilitar. Nem sempre é o que acontece.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((prob, i) => {
              const IconComponent = prob.icon;
              return (
                <motion.div
                  key={i}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div
                    onMouseEnter={() => setHoveredProblem(i)}
                    onMouseLeave={() => setHoveredProblem(null)}
                    className={`h-48 p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-between select-none ${hoveredProblem === i
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10"
                        : "bg-white border-slate-100 text-slate-800"
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-mono tracking-wider ${hoveredProblem === i ? "text-blue-400" : "text-slate-400"
                        }`}>
                        DETECÇÃO_0{i + 1}
                      </span>
                      <IconComponent className={`h-4 w-4 ${hoveredProblem === i ? "text-blue-400" : "text-slate-400"
                        }`} />
                    </div>
                    <div>
                      {hoveredProblem === i ? (
                        <p className="text-xs leading-relaxed text-slate-300 animate-fade-in">
                          {prob.act}
                        </p>
                      ) : (
                        <h4 className="text-base font-semibold tracking-tight leading-snug">
                          {prob.title}
                        </h4>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SERVIÇOS EM DESTAQUE */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Nossas Soluções</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
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
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col justify-between group p-8">
                  <div>
                    <div className="mb-6">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Solução #{i + 1}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
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
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition"
                  >
                    Entenda a solução <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MANIFESTO RESUMIDO */}
      <section className="py-20 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dense opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-6">Nosso Posicionamento</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            Tecnologia não precisa aumentar a complexidade.
          </h3>
          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            A MENOS nasce da ideia de que bons sistemas não são aqueles que exibem mais recursos, mas aqueles que tornam a vida mais simples. Antes de desenvolver, buscamos entender. Antes de automatizar, organizamos. Antes de acrescentar, perguntamos o que pode ser retirado. Criamos tecnologia com intenção, clareza e sensibilidade para que pessoas e organizações possam dedicar menos tempo ao processo e mais tempo ao que realmente importa.
          </p>
          <Button href="/a-menos" variant="outline" size="lg">
            Conheça nossa história
          </Button>
        </div>
      </section>

      {/* 6. PROJETOS EM DESTAQUE */}
      <section id="projetos-destaque" className="py-20 md:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Estudos de caso</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Soluções que já tiraram ideias do improviso.
              </h3>
            </div>
            <Button href="/projetos" variant="outline">
              Ver todos os projetos
            </Button>
          </div>

          <div className="flex flex-col gap-16">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Mockup visual estilizado */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="bg-slate-50 border border-slate-100/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-[300px] md:h-[350px] relative overflow-hidden bg-dot-grid">
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                      PROJETO_CASE_0{i + 1}
                    </span>

                    {/* Elementos geométricos representando simplificação do projeto */}
                    <div className="my-auto flex flex-col gap-3">
                      <div className="font-bold text-2xl text-slate-800 tracking-tight">
                        {project.name}
                      </div>
                      <div className="text-sm text-slate-400 uppercase font-semibold tracking-wider">
                        {project.client}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] font-mono text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold uppercase tracking-wider">
                      <span>Resultado Mensurável</span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo do Projeto */}
                <div className={`lg:col-span-7 flex flex-col gap-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {project.name}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2 text-sm text-slate-600 leading-relaxed">
                    <div>
                      <h5 className="font-semibold text-slate-900 uppercase text-xs tracking-wider mb-1.5 text-blue-600">O Desafio</h5>
                      <p>{project.challenge}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-900 uppercase text-xs tracking-wider mb-1.5 text-blue-600">A Solução</h5>
                      <p>{project.solution}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100/60 text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-0.5 uppercase text-xs tracking-wider">Impacto</span>
                    {project.impact}
                  </div>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition mt-2 self-start"
                  >
                    Ler estudo de caso completo <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MÉTODO DE TRABALHO */}
      <section className="py-20 md:py-28 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Como agimos</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
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
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col gap-6"
                >
                  {/* Círculo do Conector */}
                  <div className="h-10 w-10 rounded-full bg-slate-900 border-4 border-[#FAF9F6] text-white font-mono text-xs font-bold flex items-center justify-center self-center shadow-md">
                    {step.num}
                  </div>
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl text-center flex-grow flex flex-col gap-2 min-h-[160px] shadow-sm">
                    <h4 className="font-bold text-slate-900 text-sm">{step.name}</h4>
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
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative flex flex-col gap-2"
                >
                  <div className="absolute -left-[33px] top-1.5 h-6 w-6 rounded-full bg-slate-900 border-2 border-[#FAF9F6] text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{step.name}</h4>
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
              <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Ecossistema</h2>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
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
            <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Feedback</h2>
            <h3 className="text-3xl font-bold text-slate-900">
              O que dizem sobre trabalhar com a MENOS.
            </h3>
          </div>

          <div className="relative bg-white border border-slate-100 p-8 md:p-12 rounded-3xl shadow-sm">
            <MessageSquare className="h-10 w-10 text-blue-100 absolute top-6 left-6 md:top-8 md:left-8" />

            <div className="min-h-[160px] flex flex-col justify-center text-center relative z-10 pt-4">
              <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed font-light mb-8">
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>

              <div className="flex flex-col items-center">
                <span className="font-bold text-slate-900 text-sm">
                  {testimonials[activeTestimonial].author}
                </span>
                <span className="text-xs text-slate-400">
                  {testimonials[activeTestimonial].role} &bull; {testimonials[activeTestimonial].company}
                </span>
                {testimonials[activeTestimonial].projectSlug && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold font-mono text-blue-600 mt-2">
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
          <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Simplifique hoje</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
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
              href="https://wa.me/5511999999999"
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
