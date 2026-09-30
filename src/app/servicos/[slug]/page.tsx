import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle2, ChevronRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.name} | Soluções`,
    description: service.shortDescription
  };
}

export default async function ServiceSlugPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Projetos que utilizam este serviço
  const relatedProjects = projects.filter((proj) =>
    proj.relatedServices.includes(service.slug)
  );

  return (
    <div className="w-full py-12 md:py-20 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/servicos"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-950 uppercase tracking-wider mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para serviços
        </Link>

        {/* Hero Area */}
        <div className="mb-16">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3 block">
            Solução Especializada
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 leading-tight mb-4">
            {service.name}
          </h1>
          <p className="text-lg md:text-xl text-brand-600 font-light italic leading-relaxed mb-6">
            &ldquo;{service.tagline}&rdquo;
          </p>
          <div className="h-[1px] bg-slate-100 w-full mb-8"></div>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Problemas vs Benefícios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Problemas */}
          <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col gap-6">
            <h3 className="text-sm font-bold text-brand-950 uppercase tracking-wider">
              O Problema (Como está hoje)
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600">
              {service.problemsSolved.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5"></span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefícios */}
          <div className="p-8 rounded-2xl bg-brand-50/20 border border-brand-100/50 flex flex-col gap-6">
            <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider">
              Com a MENOS (O Resultado)
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-700">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Possibilidades / Aplicações */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-brand-950 mb-6">Aplicações Práticas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.applications.map((app, idx) => (
              <div
                key={idx}
                className="p-5 border border-slate-100 rounded-xl bg-white shadow-sm flex items-start gap-3"
              >
                <div className="h-2 w-2 rounded-full bg-brand-600 mt-1.5 shrink-0"></div>
                <p className="text-sm text-slate-600 leading-relaxed">{app}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Processo específico do serviço */}
        <div className="mb-16 border-t border-slate-100 pt-12">
          <h2 className="text-xl font-bold text-brand-950 mb-6">Como Desenvolvemos</h2>
          <div className="flex flex-col gap-4">
            {service.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                  0{idx + 1}.
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Projects Case Studies */}
        {relatedProjects.length > 0 && (
          <div className="mb-16 border-t border-slate-100 pt-12">
            <h2 className="text-xl font-bold text-brand-950 mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-brand-600" /> Estudos de Caso Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projetos/${project.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:border-brand-200 hover:shadow-lg hover:shadow-slate-100"
                >
                  {project.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-between flex-grow p-6">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                        {project.client}
                      </span>
                      <h4 className="text-base font-bold text-brand-950 mb-2">
                        {project.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                        {project.challenge}
                      </p>
                      {project.keyMetrics && project.keyMetrics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.keyMetrics.map((metric, mi) => (
                            <span key={mi} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                              {metric.value} {metric.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 group-hover:text-brand-950 transition self-start">
                      Ver estudo de caso <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Area */}
        <div className="mb-16 border-t border-slate-100 pt-12">
          <h2 className="text-xl font-bold text-brand-950 mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Dúvidas Frequentes
          </h2>
          <div className="flex flex-col gap-6">
            {service.faq.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <h4 className="text-sm font-bold text-brand-950 leading-snug">
                  {item.question}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-100">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-12 rounded-3xl bg-brand-950 text-white text-center flex flex-col items-center gap-6">
          <h3 className="text-2xl font-bold">Simplificar {service.name}</h3>
          <p className="text-slate-300 max-w-md text-sm leading-relaxed">
            Se sua empresa enfrenta os problemas listados acima, podemos planejar e construir a solução ideal.
          </p>
          <Button href={`/contato?solucao=${service.slug}`} variant="secondary">
            Iniciar conversa <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
