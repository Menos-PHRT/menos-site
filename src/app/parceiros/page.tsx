"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowUpRight, CheckCircle2, User, Globe, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { partners } from "@/data/partners";
import { projects } from "@/data/projects";

export default function PartnersPage() {
  // Separar por categorias
  const clients = partners.filter((p) => p.category === "client");
  const institutionals = partners.filter((p) => p.category === "institutional");
  const collaborators = partners.filter((p) => p.category === "collaborator");

  // Fornecedores e Integrações recomendados (adicionados estaticamente para enriquecer a página de fornecedores/integrações)
  const vendors = [
    { name: "Next.js & Vercel", desc: "Hospedagem em nuvem global de altíssima performance para sites estáticos e dinâmicos." },
    { name: "Supabase & PostgreSQL", desc: "Banco de dados e autenticação rápida em conformidade com segurança moderna." },
    { name: "Stripe & ASAAS", desc: "Gateway de pagamentos para cobranças recorrentes, doações e transações financeiras." },
    { name: "SendGrid & Resend", desc: "Serviços de entrega de e-mail transacional automatizado com alta confiabilidade." }
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3 block">
            Rede de Trabalho
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 leading-tight">
            Boas soluções são construídas em conjunto.
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-light leading-relaxed">
            Acreditamos que a tecnologia de impacto é fruto de parcerias sólidas. Trabalhamos ao lado de organizações e profissionais incríveis.
          </p>
        </div>

        {/* 1. Clientes Atendidos */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-brand-950 mb-8 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-600"></span> Organizações Atendidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, idx) => {
              // Buscar projeto relacionado
              const relatedProject = projects.find(
                (proj) => proj.client === client.name || client.name.includes(proj.client) || proj.client.includes(client.name)
              );

              return (
                <motion.div
                  key={client.id}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="h-full flex flex-col justify-between p-6">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {client.period}
                        </span>
                        <a
                          href={client.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-brand-600 transition"
                          aria-label={`Visitar site de ${client.name}`}
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      </div>

                      <h3 className="font-bold text-base text-brand-950 mb-2">
                        {client.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {client.description}
                      </p>

                      <div className="h-[1px] bg-slate-50 my-4"></div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        <strong>Atuação:</strong> {client.relation}
                      </p>
                    </div>

                    {relatedProject && (
                      <Link
                        href={`/projetos/${relatedProject.slug}`}
                        className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-brand-600 hover:text-brand-950 transition mt-2"
                      >
                        <Briefcase className="h-3 w-3 mr-1" /> Ver estudo de caso &rarr;
                      </Link>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 2. Parceiros Institucionais */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-brand-950 mb-8 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-600"></span> Parceiros Institucionais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {institutionals.map((inst, idx) => (
              <motion.div
                key={inst.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-base text-brand-950">{inst.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400">{inst.period}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{inst.description}</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  <strong>Colaboração:</strong> {inst.relation}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Colaboradores */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-brand-950 mb-8 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-600"></span> Apoiadores do Projeto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collaborators.map((collab, idx) => (
              <motion.div
                key={collab.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 border border-slate-100 rounded-2xl flex items-start gap-4"
              >
                <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 relative">
                  {collab.image ? (
                    <Image
                      src={collab.image}
                      alt={collab.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-500" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-sm text-brand-950">{collab.name}</span>
                    <a
                      href={collab.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:underline font-mono text-[10px]"
                    >
                      perfil &rarr;
                    </a>
                  </div>
                  <span className="text-slate-400 italic font-medium">{collab.relation}</span>
                  <p className="text-slate-500 mt-2 leading-relaxed">{collab.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Fornecedores e Integrações */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-brand-950 mb-8 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-600"></span> Infraestrutura & Integrações recomendadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendors.map((vendor, idx) => (
              <div
                key={vendor.name}
                className="p-5 border border-slate-100 rounded-xl bg-white flex flex-col gap-2"
              >
                <h4 className="text-sm font-bold text-brand-950">{vendor.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{vendor.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center gap-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-brand-950">
            Pronto para simplificar a operação da sua empresa?
          </h3>
          <p className="text-slate-500 max-w-xl text-sm md:text-base leading-relaxed">
            Elimine tarefas manuais e planilhas confusas. Desenvolvemos sistemas sob medida para a sua operação rodar com máxima eficiência e clareza.
          </p>
          <Button href="/contato" variant="primary">
            Solicitar diagnóstico gratuito <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
