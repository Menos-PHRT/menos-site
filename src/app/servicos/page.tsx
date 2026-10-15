import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Camadas agênticas, sistemas internos, plataformas digitais, sites institucionais e aplicativos mobile, criados a partir do problema."
};

export default function ServicesPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3 block">
            Nossas soluções
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 leading-tight">
            Tecnologia pensada para resolver, organizar e simplificar.
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-light leading-relaxed">
            Cinco frentes de trabalho, todas começando pelo problema e não pela tecnologia. Escolha a que mais se aproxima do que você precisa ou conte seu caso e indicamos o caminho.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={service.slug}
              className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl flex flex-col justify-between hover:shadow-lg hover:shadow-slate-100 hover:border-slate-200 transition duration-300"
            >
              <div>
                <span className="block text-xs font-mono font-semibold text-brand-600 tracking-widest mb-4">{`0${i + 1}`}</span>
                <h2 className="text-xl font-bold text-brand-950 mb-2">{service.name}</h2>
                <p className="text-sm font-semibold text-brand-600 italic mb-4 leading-relaxed">{service.tagline}</p>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{service.shortDescription}</p>

                <div className="mb-8">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-brand-950 mb-3">Dores que eliminamos:</h3>
                  <ul className="flex flex-col gap-2">
                    {service.problemsSolved.slice(0, 2).map((prob, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-slate-50 pt-4 mt-4">
                <Link
                  href={`/servicos/${service.slug}`}
                  className="inline-flex items-center gap-1 min-h-11 text-xs font-bold text-brand-950 hover:text-brand-600 transition"
                >
                  Entenda a solução <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contato?solucao=${service.slug}`}
                  className="inline-flex items-center min-h-11 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                >
                  Solicitar orçamento &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
