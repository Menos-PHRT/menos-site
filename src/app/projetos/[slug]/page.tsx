import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Cpu, User, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} | Projetos`,
    description: project.challenge
  };
}

export default async function ProjectSlugPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Resolver os serviços relacionados no banco
  const relatedServicesList = services.filter((s) =>
    project.relatedServices.includes(s.slug)
  );

  return (
    <div className="w-full py-12 md:py-20 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-900 uppercase tracking-wider mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para projetos
        </Link>

        {/* Hero Case */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
              {project.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Cliente: {project.client}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            {project.name}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Mockup Esquemático e Tecnologias */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-start">
          {/* Mockup / Image */}
          {project.image ? (
            <div className="md:col-span-8 bg-slate-900 border border-slate-200/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">coentro-erp.app</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Painel do Sistema</span>
              </div>
              <div className="w-full bg-slate-950 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
          ) : (
            <div className="md:col-span-8 bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 h-[220px] flex flex-col justify-between bg-dot-grid relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <span>{project.category}</span>
                <span className="text-blue-600 font-semibold">● EM OPERAÇÃO</span>
              </div>
              
              <div className="my-auto flex flex-col items-center justify-center text-center gap-1.5">
                <div className="font-mono font-bold text-xl md:text-2xl text-slate-900 tracking-wider">
                  [ {project.slug === "integracao-coentro-erp" ? "COENTRO ERP" : project.name.toUpperCase()} ]
                </div>
                <p className="text-xs font-mono text-slate-500 tracking-widest uppercase font-medium">
                  {project.slug === "integracao-coentro-erp" 
                    ? "GESTÃO, COMANDAS E IMPRESSÃO INTEGRADAS" 
                    : project.category}
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-wider border-t border-slate-100/60 pt-3">
                <span>STATUS: EM OPERAÇÃO</span>
                <span>REF: {project.slug === "integracao-coentro-erp" ? "COENTRO-ERP" : project.slug.toUpperCase()}</span>
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="h-4 w-4 text-blue-600" /> Tecnologias
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-slate-600 bg-white border border-slate-100 px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnóstico e Processo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider border-l-2 border-blue-600 pl-3">
              O Desafio e Contexto
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              {project.challenge}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider border-l-2 border-blue-600 pl-3">
              A Solução Projetada
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Funcionalidades principais */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Funcionalidades do Sistema</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Processo de Desenvolvimento */}
        <div className="mb-16 border-t border-slate-100 pt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Processo de Criação</h2>
          <div className="flex flex-col gap-4">
            {project.process.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                  Fase 0{idx + 1}.
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resultados e Aprendizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-t border-slate-100 pt-12">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Resultados Alcançados
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-light bg-blue-50/20 border border-blue-100/50 p-5 rounded-2xl">
              {project.impact}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Aprendizados e Evolução
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-light bg-slate-50/50 border border-slate-100 p-5 rounded-2xl">
              A arquitetura foi planejada para ser modular. A simplificação do código nos permitiu implementar novas melhorias sem quebrar fluxos antigos, e o suporte contínuo foca em refinar e otimizar processos conforme a operação do cliente expande.
            </p>
          </div>
        </div>

        {/* Depoimento do Cliente */}
        {project.testimonial && (
          <div className="mb-16 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 relative">
            <MessageSquare className="h-8 w-8 text-blue-100 absolute top-4 left-4" />
            <p className="text-base text-slate-700 italic leading-relaxed font-light mb-6 relative z-10 pl-2">
              &ldquo;{project.testimonial.text}&rdquo;
            </p>
            <div className="flex flex-col pl-2">
              <span className="font-bold text-slate-900 text-sm">
                {project.testimonial.author}
              </span>
              <span className="text-xs text-slate-400">
                {project.testimonial.role} &bull; {project.testimonial.company}
              </span>
            </div>
          </div>
        )}

        {/* Serviços Relacionados */}
        {relatedServicesList.length > 0 && (
          <div className="mb-16 border-t border-slate-100 pt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Serviços Utilizados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedServicesList.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicos/${service.slug}`}
                  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition bg-white"
                >
                  <span className="text-sm font-bold text-slate-800">{service.name}</span>
                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white text-center flex flex-col items-center gap-6">
          <h3 className="text-2xl font-bold">Tem um desafio parecido?</h3>
          <p className="text-slate-300 max-w-md text-sm leading-relaxed">
            Seja um sistema para integrar ou uma operação manual para simplificar, podemos ajudar sua organização.
          </p>
          <Button href="/contato" variant="secondary">
            Fale com o estúdio <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
