"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "automacoes-integracoes", name: "Automações & Integrações" },
    { id: "sistemas-dados", name: "Sistemas & Dados" },
    { id: "sites-formularios", name: "Sites & Formulários" },
    { id: "design-ia", name: "Design & IA" }
  ];

  // Mapeamento de categoria por slug de serviço
  const serviceCategories: Record<string, string> = {
    "automacoes": "automacoes-integracoes",
    "integracao-de-processos": "automacoes-integracoes",
    "sistemas-internos": "sistemas-dados",
    "dashboards": "sistemas-dados",
    "plataformas-digitais": "sites-formularios",
    "sites-institucionais": "sites-formularios",
    "formularios-inteligentes": "sites-formularios",
    "credenciamento-e-eventos": "sites-formularios",
    "solucoes-com-ia": "design-ia",
    "design-e-melhoria-de-interfaces": "design-ia"
  };

  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") return true;
    return serviceCategories[service.slug] === activeCategory;
  });

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 block">
            Nossas soluções
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Tecnologia pensada para resolver, organizar e simplificar.
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-light leading-relaxed">
            Selecione uma categoria para descobrir como atuamos na redução de atrito e aumento da performance operacional da sua empresa.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-100 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.slug}
              layout
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col justify-between hover:shadow-lg hover:shadow-slate-100 hover:border-slate-200 transition duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    SOLUÇÃO_0{i + 1}
                  </span>
                  <span className="text-xs text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full font-medium">
                    {categories.find((c) => c.id === serviceCategories[service.slug])?.name}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm font-semibold text-blue-600 italic mb-4 leading-relaxed">
                  {service.tagline}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Problems Resolved Preview */}
                <div className="mb-8">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-3">
                    Dores que eliminamos:
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {service.problemsSolved.slice(0, 2).map((prob, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-6 mt-4">
                <Link
                  href={`/servicos/${service.slug}`}
                  className="text-xs font-bold text-slate-900 hover:text-blue-600 transition flex items-center gap-1"
                >
                  Entenda a solução <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contato?solucao=${service.slug}`}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-800 transition"
                >
                  Solicitar orçamento &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
