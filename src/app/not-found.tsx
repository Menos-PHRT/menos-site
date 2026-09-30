import React from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-[calc(100vh-350px)] flex items-center justify-center py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-md mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-6">
        {/* Ícone sutil */}
        <div className="h-14 w-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-mono text-sm shadow-sm mb-2">
          404
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-950 leading-tight">
          Caminho não encontrado.
        </h1>
        
        <p className="text-sm text-slate-500 leading-relaxed font-light">
          A página que você está procurando não existe ou foi movida. A boa notícia é que simplificar caminhos é a nossa especialidade.
        </p>

        <div className="h-[1px] bg-slate-100 w-full my-2"></div>

        <Button href="/" variant="primary" size="md">
          Voltar para o Início <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
