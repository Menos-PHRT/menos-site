import React from "react";

export default function PrivacyPolicyPage() {
  const currentDate = "20/07/2026";

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-slate-600 leading-relaxed text-sm">
        <h1 className="text-3xl font-bold tracking-tight text-brand-950 mb-2">
          Política de Privacidade
        </h1>
        <p className="text-xs text-slate-400 mb-8">Última atualização: {currentDate}</p>

        <div className="flex flex-col gap-6">
          <p>
            A <strong>MENOS</strong>, estúdio criativo de tecnologia, está comprometida com a proteção de sua privacidade e dos seus dados pessoais. Esta política descreve como tratamos as informações coletadas através do nosso site e canais de contato, de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">1. Informações que Coletamos</h2>
          <p>
            Coletamos apenas as informações voluntariamente fornecidas por você através do nosso formulário de contato ou conversas diretas de diagnóstico. Isso inclui:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Nome completo;</li>
            <li>Endereço de e-mail;</li>
            <li>Número de WhatsApp ou telefone;</li>
            <li>Nome da sua empresa, projeto ou organização;</li>
            <li>Cidade e estado de atuação;</li>
            <li>Descrição do problema operacional ou ideia de sistema digital.</li>
          </ul>

          <h2 className="text-lg font-bold text-brand-950 mt-4">2. Finalidade da Coleta</h2>
          <p>
            Os dados fornecidos são utilizados estritamente para:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Responder às suas solicitações de contato e diagnósticos de software;</li>
            <li>Elaborar propostas comerciais customizadas;</li>
            <li>Enviar comunicações sobre o andamento de projetos iniciados;</li>
            <li>Cumprir obrigações legais de faturamento e contratação.</li>
          </ul>

          <h2 className="text-lg font-bold text-brand-950 mt-4">3. Compartilhamento de Dados</h2>
          <p>
            A MENOS <strong>não vende, aluga ou compartilha</strong> seus dados pessoais com terceiros para fins de marketing. Seus dados só serão compartilhados com fornecedores de infraestrutura e hospedagem (como servidores em nuvem AWS, Vercel ou Supabase) estritamente necessários para manter a aplicação no ar, em regime de total confidencialidade.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">4. Armazenamento e Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra perda, acesso não autorizado ou vazamentos. Os dados coletados são mantidos em servidores seguros e criptografados. Nós conservamos seus dados apenas pelo período necessário para cumprir as finalidades descritas nesta política.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">5. Seus Direitos (LGPD)</h2>
          <p>
            De acordo com a LGPD, você possui direito de:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Confirmar a existência do tratamento de dados pessoais;</li>
            <li>Acessar seus dados coletados;</li>
            <li>Corrigir dados incompletos ou inexatos;</li>
            <li>Solicitar a eliminação (exclusão) dos seus dados pessoais de nossa base ativa.</li>
          </ul>
          <p>
            Para exercer qualquer um destes direitos, basta nos enviar um e-mail em <a href="mailto:menos.lab@gmail.com" className="text-brand-600 underline">menos.lab@gmail.com</a>.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">6. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade de tempos em tempos. Recomendamos a leitura periódica desta página para acompanhar eventuais modificações.
          </p>
        </div>
      </div>
    </div>
  );
}
