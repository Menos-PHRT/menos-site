"use client";

import { motion } from "framer-motion";
import React from "react";
import { HelpCircle, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HowWeWorkPage() {
  const steps = [
    {
      num: "01",
      title: "Conversa Inicial",
      desc: "Conversamos para entender qual é a sua dor operacional, quem são as pessoas envolvidas e o que você espera que funcione melhor na sua rotina."
    },
    {
      num: "02",
      title: "Diagnóstico",
      desc: "Mapeamos os processos atuais, as planilhas utilizadas, os sistemas legados e desenhamos onde a tecnologia pode remover atritos e perdas de tempo."
    },
    {
      num: "03",
      title: "Proposta de Simplificação",
      desc: "Apresentamos uma proposta clara definindo o escopo exato, o investimento necessário, as prioridades e o cronograma de entregas."
    },
    {
      num: "04",
      title: "Desenho da Solução",
      desc: "Projetamos a arquitetura do banco de dados, desenhamos as interfaces visuais simplificadas e criamos os protótipos de navegação rápida."
    },
    {
      num: "05",
      title: "Desenvolvimento Incremental",
      desc: "Construímos o código-fonte em etapas modulares, realizando demonstrações frequentes para que você possa acompanhar e validar o andamento real."
    },
    {
      num: "06",
      title: "Implementação & Onboarding",
      desc: "Realizamos testes de estresse, implantamos a solução nos servidores em nuvem e orientamos sua equipe para que comecem a usar o sistema sem atrito."
    },
    {
      num: "07",
      title: "Evolução Contínua",
      desc: "Fornecemos suporte técnico ativo, realizamos correções rápidas e analisamos novas melhorias conforme sua operação se expande no dia a dia."
    }
  ];

  const faqs = [
    {
      q: "Como são definidos os orçamentos e prazos?",
      a: "Nossos orçamentos são baseados na complexidade e escopo técnico acordado. Não cobramos licenças de usuário. O prazo médio de desenvolvimento varia entre 3 a 8 semanas, a depender do tamanho do projeto."
    },
    {
      q: "De quem é a propriedade do código-fonte e dos dados?",
      a: "Tudo o que construímos sob medida é seu. O código-fonte, o banco de dados e as chaves de acesso são transferidos integralmente para sua propriedade após o encerramento do desenvolvimento. Seus dados permanecem privados."
    },
    {
      q: "Como funciona a segurança e hospedagem?",
      a: "Seguimos as melhores práticas da LGPD. Os dados críticos são criptografados em trânsito e em repouso. Hospedamos em nuvens globais (como AWS, Vercel ou Supabase) estruturadas para ter custo mínimo e alta estabilidade."
    },
    {
      q: "Como funciona o suporte e a manutenção?",
      a: "Todo projeto possui uma garantia técnica de 90 dias após a entrega para correção de qualquer falha de código sem custos. Caso deseje um suporte ativo para novos recursos, oferecemos contratos de manutenção preventiva mensal."
    },
    {
      q: "Posso começar com uma versão menor e expandir depois?",
      a: "Sim, e nós incentivamos isso! Criar uma versão menor (MVP) que resolve a dor mais urgente permite que sua equipe valide o sistema na prática rapidamente, economizando tempo e investimento financeiro antes de adicionar recursos extras."
    }
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 block">
            Método MENOS
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Clareza antes, durante e depois do desenvolvimento.
          </h1>
          <p className="text-slate-500 mt-4 text-sm md:text-base font-light leading-relaxed">
            Não gostamos de surpresas ou cronogramas confusos. Criamos um processo transparente que coloca você no controle de cada etapa da simplificação digital.
          </p>
        </div>

        {/* Steps Journey */}
        <section className="relative pl-8 mb-24 border-l border-slate-100">
          <div className="flex flex-col gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative flex flex-col gap-2"
              >
                {/* Indicador no eixo */}
                <div className="absolute -left-[45px] top-1 h-8 w-8 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center border-4 border-white shadow-sm z-10">
                  {step.num}
                </div>
                
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs de Contratação */}
        <section className="border-t border-slate-100 pt-16 mb-20">
          <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" /> Perguntas Comuns sobre Contratação
          </h2>

          <div className="flex flex-col gap-8">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-2"
              >
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {faq.q}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-100">
                  {faq.a}
                </p>
              </motion.div>
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
          <h3 className="text-2xl font-bold text-slate-900">Vamos simplificar seu processo?</h3>
          <p className="text-slate-500 max-w-md text-sm leading-relaxed">
            Podemos começar por um diagnóstico gratuito. Agende uma conversa com nosso estúdio e traga seu problema.
          </p>
          <Button href="/contato" variant="primary">
            Conte seu problema <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
