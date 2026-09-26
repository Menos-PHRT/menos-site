"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "Todos" },
    { id: "sistemas", name: "Sistemas" },
    { id: "automacoes", name: "Automações" },
    { id: "sites", name: "Sites" },
    { id: "eventos", name: "Eventos" },
    { id: "terceiro-setor", name: "Terceiro Setor" },
    { id: "pequenos-negocios", name: "Pequenos Negócios" },
    { id: "integracoes", name: "Integrações" }
  ];

  // Helper de associação de tags para filtros adicionais
  const projectTags: Record<string, string[]> = {
    "plataforma-melhores-cabecas": ["sistemas", "terceiro-setor"],
    "sistema-de-credenciamento": ["sistemas", "eventos"],
    "plataforma-de-certificacao": ["sistemas", "terceiro-setor"],
    "integracao-coentro-erp": ["automacoes", "integracoes", "pequenos-negocios"],
    "reformulacao-paginas-institucionais": ["sites", "terceiro-setor"]
  };

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    const tags = projectTags[project.slug] || [];
    return tags.includes(activeFilter);
  });

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 block">
            Nosso Portfólio
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Cada projeto começa com algo que poderia funcionar melhor.
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-light leading-relaxed">
            Navegue pelos estudos de caso de soluções reais e projetos autorais que simplificaram processos e removeram a burocracia do dia a dia.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-100 pb-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="group flex flex-col gap-6"
            >
              {/* Graphic Mockup Area */}
              {project.image ? (
                <Link
                  href={`/projetos/${project.slug}`}
                  className="block relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-sm group-hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
                      <span className="text-[10px] font-mono text-slate-400 ml-2">
                        Ambiente Protegido
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-blue-400 uppercase px-2 py-0.5 bg-blue-950/60 border border-blue-800/40 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              ) : (
                <div className="bg-slate-50 border border-slate-100/60 rounded-3xl p-8 flex flex-col justify-between h-[250px] relative overflow-hidden bg-dot-grid group-hover:border-slate-200 transition duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                      CASE_0{i + 1}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 uppercase px-2 py-0.5 bg-blue-50 border border-blue-100/30 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <div className="my-auto">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition tracking-tight">
                      {project.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      {project.client}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Info Details */}
              <div className="flex flex-col gap-4 px-2">
                <p className="text-sm text-slate-500 leading-relaxed font-light line-clamp-3">
                  <strong>O Desafio:</strong> {project.challenge}
                </p>
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900 uppercase block mb-0.5 tracking-wider text-[10px]">Resultado</span>
                  {project.impact}
                </div>
                <Link
                  href={`/projetos/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-600 transition self-start"
                >
                  Entender estudo de caso <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
