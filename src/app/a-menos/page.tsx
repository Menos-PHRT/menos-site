"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const pillars = [
    {
      title: "Missão",
      desc: "Simplificar a rotina de organizações e empresas através de tecnologia sob medida, eliminando o caos operacional, processos manuais e burocracias para que as equipes foquem no que realmente importa."
    },
    {
      title: "Visão",
      desc: "Ser a principal referência em tecnologia simples e humana, transformando a relação das pessoas com seus sistemas e provando que a verdadeira eficiência nasce da clareza e da eliminação de excessos."
    },
    {
      title: "Valores",
      desc: "Clareza absoluta e comunicação sem jargões; respeito ao tempo das pessoas; foco em utilidade real em cada linha de código; e autonomia completa para o cliente."
    }
  ];

  const whatWeAre = [
    "Ouvintes atentos antes de codificadores",
    "Estúdio criativo focado em simplificação",
    "Desenvolvedores de soluções sob medida",
    "Parceiros estratégicos da sua operação",
    "Tradutores de processos confusos em caminhos lineares"
  ];

  const whatWeAreNot = [
    "Fábrica de software em massa (software house genérica)",
    "Vendedores de jargões técnicos e termos da moda",
    "Empurradores de recursos caros e inúteis",
    "Uma consultoria distante que some após a entrega",
    "Suporte inacessível que fala apenas em códigos de erro"
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3"
          >
            Sobre nós
          </motion.div>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 leading-tight"
          >
            Criamos menos obstáculos entre uma necessidade e sua solução.
          </motion.h1>
        </div>

        {/* 1. Origem e História */}
        <motion.section
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-20 text-slate-600 leading-relaxed text-base"
        >
          <h2 className="text-xl font-bold text-brand-950">A Origem do Nome</h2>
          <p>
            A MENOS nasceu de uma frustração comum: por que a tecnologia corporativa parece estar ficando cada vez mais complexa, lenta e burocrática? Na pressa de adicionar novos recursos, a maioria das empresas de software esquece que o verdadeiro valor de um sistema está em <strong>liberar espaço mental e operacional</strong>.
          </p>
          <p>
            Escolhemos o nome <strong>MENOS</strong> como um lembrete e um compromisso. Menos cliques para completar um cadastro. Menos planilhas soltas para gerenciar estoques. Menos reuniões de alinhamento para entender dados confusos.
          </p>
          <p className="font-medium text-brand-950">
            Acreditamos que, no mundo digital, subtrair o que é desnecessário é a forma mais refinada de multiplicar a produtividade.
          </p>
        </motion.section>

        {/* 2. O que somos e O que não somos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <h3 className="text-sm font-bold text-brand-950 uppercase tracking-wider mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand-600" /> O que a MENOS é
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600">
              {whatWeAre.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-600 mt-1.5"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <h3 className="text-sm font-bold text-brand-950 uppercase tracking-wider mb-6 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" /> O que a MENOS NÃO é
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600">
              {whatWeAreNot.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* 3. Missão, Visão e Valores */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-brand-950 mb-8">Missão, Visão e Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex flex-col gap-2"
              >
                <h4 className="font-bold text-brand-950 text-base">
                  {pillar.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Fundador */}
        <motion.section
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-slate-100 pt-16 mb-20"
        >
          <h2 className="text-xl font-bold text-brand-950 mb-8">Quem Conduz</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">
            {/* Robert Alcântara */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm bg-brand-950 shrink-0">
                  <Image
                    src="/images/robert-alcantara-v3.jpg"
                    alt="Robert Alcântara, Presidente, Fundador e Desenvolvedor da MENOS"
                    fill
                    className="object-cover object-[center_25%]"
                    priority
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brand-950">Robert Alcântara</h3>
                  <p className="text-xs font-mono text-brand-600 font-semibold uppercase tracking-wider mt-0.5">
                    Fundador e Desenvolvedor da MENOS
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-slate-600 leading-relaxed text-sm">
                <p>
                  Formado em Gestão de Políticas Públicas pela Universidade de São Paulo (USP), iniciou sua trajetória na Fundação Lucia e Perlerson Penido (FLUPP), onde identificou como processos manuais, repetitivos e planilhas desorganizadas sobrecarregavam a rotina da Fundação.
                </p>
                <p>
                  Buscando soluções concretas na tecnologia, realizou sua formação em programação no Facebook, em programa desenvolvido em parceria com a MadCode.
                </p>
                <p>
                  Fundou a MENOS para construir sistemas funcionais e descomplicados, combinando sensibilidade institucional e desenvolvimento sob medida para eliminar o caos operacional das organizações.
                </p>
              </div>
            </div>

            {/* Paulo Henrique */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-brand-950 text-white font-bold flex flex-col items-center justify-center border-2 border-slate-200 shadow-sm shrink-0">
                  <span className="text-2xl font-mono tracking-widest">P.H.</span>
                  <span className="text-[9px] text-brand-400 uppercase tracking-widest font-semibold mt-0.5">MENOS</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brand-950">Paulo Henrique</h3>
                  <p className="text-xs font-mono text-brand-600 font-semibold uppercase tracking-wider mt-0.5">
                    Cofundador e desenvolvedor da MENOS
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-slate-600 leading-relaxed text-sm">
                <p>
                  Formado em Sistemas de Informação pela Universidade de São Paulo, Paulo Henrique construiu sua trajetória profissional a partir do desenvolvimento de software e da participação em diferentes projetos de tecnologia. Sua experiência inclui a atuação em software houses, ambientes marcados pela criação de soluções sob medida, integração de sistemas e resolução de desafios técnicos diversos.
                </p>
                <p>
                  Ao longo desse percurso, desenvolveu uma visão prática e estratégica sobre programação, arquitetura de sistemas e construção de produtos digitais. Na MENOS, contribui para transformar necessidades reais em soluções tecnicamente sólidas, escaláveis e eficientes.
                </p>
                <p>
                  Como cofundador, Paulo soma sua experiência em desenvolvimento à proposta da MENOS de criar tecnologias simples, funcionais e bem estruturadas, capazes de reduzir a complexidade dos processos sem comprometer a qualidade da solução.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100/60 text-center flex flex-col items-center gap-6"
        >
          <h3 className="text-2xl font-bold text-brand-950">Pronto para retirar o excesso?</h3>
          <p className="text-slate-500 max-w-md text-sm leading-relaxed">
            Seja qual for seu problema operacional ou ideia digital, podemos criar um caminho mais curto e organizado para resolvê-lo.
          </p>
          <Button href="/contato" variant="primary">
            Agende uma conversa <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
