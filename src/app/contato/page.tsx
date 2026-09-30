"use client";

import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { Mail, MessageSquare, Compass, Send, HelpCircle, Linkedin, Instagram } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const contactDetails = [
    {
      icon: <Mail className="h-5 w-5 text-brand-600" />,
      label: "E-mail Direto",
      value: "menos.lab@gmail.com",
      href: "mailto:menos.lab@gmail.com"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-brand-600" />,
      label: "WhatsApp Business",
      value: "+55 (11) 95291-7968",
      href: "https://wa.me/5511952917968"
    },
    {
      icon: <Compass className="h-5 w-5 text-brand-600" />,
      label: "Prazo de Resposta",
      value: "Em até 1 hora",
      href: null
    }
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Coluna 1: Informações e Canais Alternativos */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3 block">
                Fale Conosco
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 leading-tight mb-4">
                Comece pelo problema.
              </h1>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light">
                Você não precisa saber qual tecnologia utilizar nem chegar com uma solução pronta. Conte-nos o que está acontecendo, o que está dando trabalho e o que gostaria que funcionasse melhor.
              </p>
            </div>

            {/* Canais Diretos */}
            <div className="flex flex-col gap-4">
              {contactDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50"
                >
                  <div className="p-2.5 rounded-lg bg-white border border-slate-100 shrink-0">
                    {detail.icon}
                  </div>
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-brand-950">{detail.label}</span>
                    {detail.href ? (
                      <a href={detail.href} className="text-slate-500 hover:text-brand-600 font-medium transition">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-medium">{detail.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Redes Sociais */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-8">
              <h4 className="text-xs font-bold text-brand-950 uppercase tracking-wider">
                Acompanhe o estúdio
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:border-brand-200 transition"
                  aria-label="LinkedIn da MENOS"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:border-brand-200 transition"
                  aria-label="Instagram da MENOS"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2: Formulário interativo */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm shadow-slate-100/50">
            <h3 className="text-sm font-bold text-brand-950 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Send className="h-4.5 w-4.5 text-brand-600" /> Formulário de Diagnóstico
            </h3>
            <Suspense fallback={
              <div className="w-full py-12 flex items-center justify-center text-sm text-slate-400">
                Carregando formulário...
              </div>
            }>
              <ContactForm />
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  );
}
