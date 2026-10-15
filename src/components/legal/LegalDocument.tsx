"use client";
// Estrutura padrão de documento legal (política, termos): cabeçalho com data,
// resumo em destaque, índice lateral fixo no desktop (recolhível no celular)
// que acompanha a seção lida, seções numeradas com âncora e caixa de contato.
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface Props {
  eyebrow: string;
  title: string;
  updatedAt: string; // texto já formatado, ex.: "15 de outubro de 2026"
  summary: string[];
  sections: LegalSection[];
  other: { label: string; href: string };
}

export default function LegalDocument({ eyebrow, title, updatedAt, summary, sections, other }: Props) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const toc = (
    <ol className="flex flex-col gap-1 text-sm">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={`flex items-baseline gap-3 min-h-9 py-1.5 pl-3 border-l-2 transition-colors ${
              active === s.id ? "border-brand-600 text-brand-950 font-semibold" : "border-slate-100 text-slate-500 hover:text-brand-950"
            }`}
          >
            <span className="font-mono text-[11px] text-slate-400">{String(i + 1).padStart(2, "0")}</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="w-full py-12 md:py-20 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40 print:hidden"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Cabeçalho */}
        <header className="max-w-3xl mb-10 md:mb-14">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3 block">{eyebrow}</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-950 leading-tight">{title}</h1>
          <p className="mt-4 text-xs font-mono text-slate-500">Última atualização: {updatedAt}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          {/* Índice */}
          <aside className="lg:sticky lg:top-28 print:hidden">
            <details className="lg:hidden rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-2 group">
              <summary className="cursor-pointer min-h-11 flex items-center justify-between text-sm font-semibold text-brand-950 list-none">
                Neste documento
                <span className="text-slate-400 text-xs group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="pb-3">{toc}</div>
            </details>
            <nav aria-label="Neste documento" className="hidden lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Neste documento</p>
              {toc}
            </nav>
          </aside>

          {/* Conteúdo */}
          <article className="min-w-0 max-w-3xl">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 md:p-6 mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">Em resumo</p>
              <ul className="flex flex-col gap-2 text-sm text-brand-950 leading-relaxed">
                {summary.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-600 shrink-0"></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-12 text-slate-600 text-[15px] leading-[1.75]">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 text-xl md:text-2xl font-bold text-brand-950 tracking-tight mb-4">
                    <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="flex flex-col gap-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_strong]:text-brand-950 [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-2">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>

            {/* Contato e navegação */}
            <div className="mt-14 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 md:p-8 flex flex-col gap-4">
              <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-600" /> Dúvidas sobre este documento
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Escreva para{" "}
                <a href="mailto:menos.lab@gmail.com" className="text-brand-600 underline underline-offset-2">menos.lab@gmail.com</a>{" "}
                ou{" "}
                <a href="mailto:robert@menosdev.com" className="text-brand-600 underline underline-offset-2">robert@menosdev.com</a>.
                Respondemos, em média, em até 15 minutos.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm print:hidden">
                <Link href={other.href} className="inline-flex items-center min-h-11 font-semibold text-brand-950 hover:text-brand-600 transition">
                  {other.label} &rarr;
                </Link>
                <a href="#top" className="inline-flex items-center gap-1 min-h-11 font-semibold text-slate-500 hover:text-brand-950 transition">
                  <ArrowUp className="h-4 w-4" /> Voltar ao topo
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
