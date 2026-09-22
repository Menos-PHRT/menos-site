"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const values = [
    { title: "Intenção", desc: "Não escrevemos uma linha de código sem entender o porquê. Cada recurso deve servir a um propósito real." },
    { title: "Clareza", desc: "Sem jargões complicados. Nos comunicamos de forma transparente e projetamos sistemas fáceis de compreender." },
    { title: "Respeito ao Tempo", desc: "Bons sistemas reduzem o esforço operacional. Tecnologia deve economizar seu tempo, não consumi-lo." },
    { title: "Artesanato Digital", desc: "Código limpo, design refinado e interfaces de alta performance que parecem feitas sob medida." }
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

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3"
          >
            Sobre nós
          </motion.div>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
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
          <h2 className="text-xl font-bold text-slate-900">A Origem do Nome</h2>
          <p>
            A MENOS nasceu de uma frustração comum: por que a tecnologia corporativa parece estar ficando cada vez mais complexa, lenta e burocrática? Na pressa de adicionar novos recursos, a maioria das empresas de software esquece que o verdadeiro valor de um sistema está em <strong>liberar espaço mental e operacional</strong>.
          </p>
          <p>
            Escolhemos o nome <strong>MENOS</strong> como um lembrete e um compromisso. Menos cliques para completar um cadastro. Menos planilhas soltas para gerenciar estoques. Menos reuniões de alinhamento para entender dados confusos. 
          </p>
          <p className="font-medium text-slate-900">
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
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" /> O que a MENOS é
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600">
              {whatWeAre.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5"></span>
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
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
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

        {/* 3. Valores e Manifesto */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Nossos Pilares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex flex-col gap-2"
              >
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="text-xs font-mono text-blue-600">0{idx + 1}</span> {val.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
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
          <h2 className="text-xl font-bold text-slate-900 mb-8">Quem Conduz</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Foto Avatar */}
            <div className="md:col-span-4 flex justify-center pt-2">
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full overflow-hidden border-2 border-slate-200 shadow-md bg-slate-900">
                <Image
                  src="/images/robert-alcantara-v3.jpg"
                  alt="Robert Alcântara — Presidente, Fundador e Desenvolvedor da MENOS"
                  fill
                  className="object-cover object-[center_25%]"
                  priority
                />
              </div>
            </div>
            {/* Texto Descritivo */}
            <div className="md:col-span-8 flex flex-col gap-4 text-slate-600 leading-relaxed text-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Robert Alcântara</h3>
                <p className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider mt-0.5">
                  Presidente, Fundador e Desenvolvedor da MENOS
                </p>
              </div>
              <p>
                Formado em Gestão de Políticas Públicas pela Universidade de São Paulo, Robert Alcântara iniciou sua trajetória profissional como estagiário na Fundação Lúcia e Pelerson Penido (FLUPP), cuidando da comunicação midiática e institucional da Fundação. Durante essa experiência, percebeu como processos burocráticos, tarefas repetitivas e informações dispersas podiam consumir tempo e reduzir a eficiência de projetos com grande impacto social.
              </p>
              <p>
                Foi a partir dessas dificuldades concretas que começou a desenvolver sistemas, automações e soluções digitais para simplificar rotinas e tornar o trabalho das equipes mais organizado, ágil e seguro. O que surgiu como uma resposta às necessidades do cotidiano transformou-se em interesse pela programação e, depois, em uma nova direção profissional.
              </p>
              <p>
                Assim nasceu a MENOS: um estúdio voltado à criação de tecnologias simples, funcionais e humanas, desenvolvidas a partir da realidade de cada organização. Robert une sua formação em políticas públicas, sua experiência no terceiro setor e sua sensibilidade criativa para construir soluções que reduzam excessos e devolvam às pessoas tempo para o que realmente importa.
              </p>
            </div>
          </div>

          {/* Paulo Henrique */}
          <div className="pt-12 border-t border-slate-100/80 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Foto / Placeholder Avatar Paulo Henrique */}
              <div className="md:col-span-4 flex justify-center pt-2">
                <div className="h-40 w-40 md:h-48 md:w-48 rounded-full bg-slate-900 text-white font-bold flex flex-col items-center justify-center border-2 border-slate-200 shadow-md">
                  <span className="text-3xl font-mono tracking-widest">P.H.</span>
                  <span className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold mt-1">MENOS</span>
                </div>
              </div>
              {/* Texto Descritivo */}
              <div className="md:col-span-8 flex flex-col gap-4 text-slate-600 leading-relaxed text-sm">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Paulo Henrique</h3>
                  <p className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider mt-0.5">
                    Cofundador e desenvolvedor da MENOS
                  </p>
                </div>
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
          <h3 className="text-2xl font-bold text-slate-900">Pronto para retirar o excesso?</h3>
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
