import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ThankYouPage() {
  return (
    <div className="w-full min-h-[calc(100vh-400px)] flex items-center justify-center py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-md mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-6">
        {/* Ícone de Sucesso Animado */}
        <div className="h-16 w-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm mb-2">
          <Check className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
          Obrigado pelo contato!
        </h1>
        
        <p className="text-sm text-slate-500 leading-relaxed font-light">
          Recebemos o diagnóstico do seu problema com sucesso. Nossa equipe analisará os detalhes do seu fluxo operacional e entrará em contato em até <strong>24 horas úteis</strong>.
        </p>

        <div className="h-[1px] bg-slate-100 w-full my-2"></div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
            Voltar ao Início
          </Button>
          <Button href="/projetos" variant="outline" size="md" className="w-full sm:w-auto">
            Ver Projetos <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
