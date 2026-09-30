"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  solutionType?: string;
  problemDescription?: string;
  privacyConsent?: string;
}

export const ContactForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    solutionType: "",
    referredBy: "",
    referredByOther: "",
    problemDescription: "",
    deadline: "",
    budget: "",
    privacyConsent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher campo de solução se houver query param na URL
  useEffect(() => {
    const solutionParam = searchParams.get("solucao");
    if (solutionParam) {
      setFormData((prev) => ({ ...prev, solutionType: solutionParam }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));
    
    // Limpar erro específico ao digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Por favor, insira seu nome.";
    
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, insira seu e-mail.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Por favor, insira seu WhatsApp ou telefone.";
    }
    
    if (!formData.solutionType) {
      newErrors.solutionType = "Selecione o tipo de solução desejada.";
    }
    
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = "Descreva brevemente o problema ou ideia.";
    } else if (formData.problemDescription.trim().length < 10) {
      newErrors.problemDescription = "Por favor, dê um pouco mais de detalhes (mínimo 10 caracteres).";
    }
    
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "Você precisa aceitar a Política de Privacidade para continuar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const finalReferredBy =
        formData.referredBy === "Outros" && formData.referredByOther.trim()
          ? `Outros: ${formData.referredByOther.trim()}`
          : formData.referredBy;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referredBy: finalReferredBy
        })
      });

      if (response.ok) {
        // Redireciona para página de agradecimento
        router.push("/obrigado");
      } else {
        alert("Ocorreu um erro no servidor. Por favor, tente novamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de rede. Por favor, verifique sua conexão.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-slate-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Seu nome *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Carlos Silva"
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm ${
              errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-brand-600"
            }`}
          />
          {errors.name && <span className="text-[11px] text-red-500">{errors.name}</span>}
        </div>

        {/* Empresa ou Projeto */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Empresa, organização ou projeto
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Ex: Instituto Verde"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 bg-white focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* E-mail */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            E-mail corporativo ou pessoal *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="carlos@empresa.com"
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm ${
              errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-brand-600"
            }`}
          />
          {errors.email && <span className="text-[11px] text-red-500">{errors.email}</span>}
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            WhatsApp ou Telefone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm ${
              errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-brand-600"
            }`}
          />
          {errors.phone && <span className="text-[11px] text-red-500">{errors.phone}</span>}
        </div>

        {/* Cidade */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Cidade / Estado
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ex: São Paulo - SP"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 bg-white focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Tipo de Solução */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="solutionType" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Tipo de Solução *
          </label>
          <select
            id="solutionType"
            name="solutionType"
            value={formData.solutionType}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm appearance-none ${
              errors.solutionType ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-brand-600"
            }`}
          >
            <option value="">Selecione...</option>
            <option value="automacoes">Automação</option>
            <option value="sistemas-internos">Sistema Interno</option>
            <option value="plataformas-digitais">Plataforma</option>
            <option value="sites-institucionais">Site</option>
            <option value="formularios-inteligentes">Formulário Inteligente</option>
            <option value="credenciamento-e-eventos">Credenciamento de Evento</option>
            <option value="dashboards">Dashboard</option>
            <option value="integracao-de-processos">Integração de Sistemas</option>
            <option value="solucoes-com-ia">Solução com IA</option>
            <option value="indefinido">Ainda não sei o que preciso</option>
            <option value="outro">Outro</option>
          </select>
          {errors.solutionType && <span className="text-[11px] text-red-500">{errors.solutionType}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Como conheceu */}
        <div className="flex flex-col gap-1.5 sm:col-span-1">
          <label htmlFor="referredBy" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Como conheceu a MENOS?
          </label>
          <div className="relative">
            <select
              id="referredBy"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 bg-white focus:outline-none transition-colors text-sm appearance-none cursor-pointer"
            >
              <option value="">Selecione uma opção...</option>
              <option value="Redes sociais">Redes sociais</option>
              <option value="Pesquisa na internet">Pesquisa na internet</option>
              <option value="Anúncio online">Anúncio online</option>
              <option value="Amigos">Amigos</option>
              <option value="Outros">Outros</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {formData.referredBy === "Outros" && (
            <div className="mt-2 flex flex-col gap-1">
              <label htmlFor="referredByOther" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Especifique como nos conheceu:
              </label>
              <input
                type="text"
                id="referredByOther"
                name="referredByOther"
                value={formData.referredByOther}
                onChange={handleChange}
                placeholder="Conte-nos como chegou até nós..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 bg-slate-50/50 focus:bg-white focus:outline-none transition-colors text-sm"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Prazo */}
        <div className="flex flex-col gap-1.5 sm:col-span-1">
          <label htmlFor="deadline" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Prazo desejado
          </label>
          <input
            type="text"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            placeholder="Ex: 1 mês, Urgente..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 bg-white focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Orçamento */}
        <div className="flex flex-col gap-1.5 sm:col-span-1">
          <label htmlFor="budget" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Orçamento aproximado
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Opcional"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 bg-white focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Descrição do Problema */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="problemDescription" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          O que está acontecendo e o que você gostaria de melhorar? *
        </label>
        <textarea
          id="problemDescription"
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleChange}
          rows={5}
          placeholder="Conte-nos onde existe burocracia, retrabalho, lentidão operacional ou qual é a ideia de sistema que você deseja construir."
          className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm resize-none ${
            errors.problemDescription ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-brand-600"
          }`}
        />
        {errors.problemDescription && <span className="text-[11px] text-red-500">{errors.problemDescription}</span>}
      </div>

      {/* Consentimento Privacidade */}
      <div className="flex flex-col gap-2 my-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={handleChange}
            className="h-4.5 w-4.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 mt-0.5"
          />
          <span className="text-xs text-slate-500 leading-relaxed select-none">
            Concordo com a coleta de dados deste formulário para fins de contato comercial pelo estúdio MENOS, em total conformidade com a nossa{" "}
            <a href="/privacidade" target="_blank" className="text-brand-600 underline font-medium">Política de Privacidade</a>.
          </span>
        </label>
        {errors.privacyConsent && <span className="text-[11px] text-red-500">{errors.privacyConsent}</span>}
      </div>

      {/* Botão de Envio */}
      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto self-start">
        {isSubmitting ? "Enviando diagnóstico..." : "Enviar diagnóstico do problema"}
      </Button>
    </form>
  );
};
export default ContactForm;
