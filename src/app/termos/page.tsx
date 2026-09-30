import React from "react";

export default function TermsOfUsePage() {
  const currentDate = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="w-full py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-slate-600 leading-relaxed text-sm">
        <h1 className="text-3xl font-bold tracking-tight text-brand-950 mb-2">
          Termos de Uso
        </h1>
        <p className="text-xs text-slate-400 mb-8">Última atualização: {currentDate}</p>

        <div className="flex flex-col gap-6">
          <p>
            Bem-vindo ao site da <strong>MENOS</strong>. Ao acessar e utilizar este website, você concorda em cumprir e estar vinculado aos seguintes termos de uso. Por favor, leia com atenção.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">1. Uso do Site</h2>
          <p>
            Este site tem como objetivo apresentar o estúdio criativo MENOS, suas soluções em tecnologia, portfólio de projetos, parceiros e possibilitar a realização de contatos comerciais para diagnóstico de software. Você concorda em utilizar este espaço de forma ética, lícita e de acordo com as leis vigentes.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">2. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo deste site (textos, design visual, logotipos, ilustrações, códigos e animações) é de propriedade exclusiva da MENOS ou de seus licenciadores, estando protegido pelas leis brasileiras de direitos autorais e propriedade intelectual. É proibida a cópia, reprodução ou distribuição não autorizada deste conteúdo sem autorização prévia por escrito.
          </p>
          <p>
            Os nomes, logotipos e marcas de parceiros e clientes expostos neste site pertencem a seus respectivos titulares e são exibidos para ilustrar nossa rede de atuação conjunta de forma estritamente referencial.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">3. Limitação de Responsabilidade</h2>
          <p>
            A MENOS envida esforços contínuos para manter o conteúdo do site atualizado e livre de erros técnicos. No entanto, não garantimos que o site estará disponível de forma ininterrupta, livre de vírus ou instabilidades de rede. O site é fornecido no estado em que se encontra, sem garantias implícitas adicionais.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">4. Envio de Informações</h2>
          <p>
            Ao enviar informações pelo formulário de diagnóstico ou WhatsApp, você garante que os dados fornecidos são verdadeiros, precisos e não violam direitos de terceiros. Você é responsável por manter a confidencialidade de eventuais segredos comerciais de sua própria empresa ao nos detalhar um problema na etapa inicial de triagem.
          </p>

          <h2 className="text-lg font-bold text-brand-950 mt-4">5. Legislação e Foro</h2>
          <p>
            Estes termos de uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca da capital do estado de São Paulo, sede do estúdio MENOS, para dirimir eventuais controvérsias decorrentes da utilização deste site.
          </p>
        </div>
      </div>
    </div>
  );
}
