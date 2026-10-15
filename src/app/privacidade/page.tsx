import type { Metadata } from "next";
import React from "react";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a MENOS coleta, usa, compartilha e protege dados pessoais, e como você exerce seus direitos pela LGPD."
};

const sections: LegalSection[] = [
  {
    id: "quem-somos",
    title: "Quem somos e a quem isto se aplica",
    body: (
      <>
        <p>
          A <strong>MENOS</strong>, estúdio criativo de tecnologia, é a responsável (controladora) pelo tratamento dos dados pessoais descritos nesta política, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).
        </p>
        <p>
          Esta política vale para quem visita este site, preenche o formulário de contato ou conversa conosco pelo WhatsApp e por e-mail.
        </p>
      </>
    )
  },
  {
    id: "dados-coletados",
    title: "Quais dados coletamos",
    body: (
      <>
        <p>Coletamos apenas o que é necessário para entender e responder ao seu contato.</p>
        <p><strong>Dados que você nos informa</strong> no formulário de diagnóstico:</p>
        <ul>
          <li>nome, empresa ou organização;</li>
          <li>e-mail e telefone ou WhatsApp;</li>
          <li>cidade e estado;</li>
          <li>tipo de solução procurada, prazo, faixa de investimento e como conheceu a MENOS;</li>
          <li>a descrição do problema ou da ideia, no texto que você escrever.</li>
        </ul>
        <p>
          <strong>Dados de navegação:</strong> como em qualquer site, o servidor que hospeda esta página recebe informações técnicas básicas da visita, como endereço IP, tipo de navegador e data e hora do acesso. Elas servem para o funcionamento e a segurança do site.
        </p>
        <p>
          <strong>Conversas por WhatsApp e e-mail:</strong> se você nos escrever por esses canais, tratamos o que for enviado para dar continuidade ao atendimento.
        </p>
      </>
    )
  },
  {
    id: "finalidades",
    title: "Para que usamos os dados e em que base legal",
    body: (
      <>
        <ul>
          <li><strong>Responder ao seu contato e fazer o diagnóstico</strong> do problema. Base legal: procedimentos preliminares a um possível contrato, a seu pedido (art. 7º, V, da LGPD) e o seu consentimento ao enviar o formulário (art. 7º, I).</li>
          <li><strong>Elaborar propostas e conduzir projetos contratados.</strong> Base legal: execução de contrato (art. 7º, V).</li>
          <li><strong>Cumprir obrigações legais</strong>, como emissão de documentos fiscais. Base legal: obrigação legal ou regulatória (art. 7º, II).</li>
          <li><strong>Manter a segurança e o funcionamento do site</strong> e evitar abusos. Base legal: legítimo interesse (art. 7º, IX).</li>
        </ul>
        <p>Não usamos seus dados para publicidade de terceiros nem tomamos decisões automatizadas sobre você.</p>
      </>
    )
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    body: (
      <>
        <p>
          A MENOS <strong>não vende, não aluga e não compartilha</strong> seus dados pessoais para fins de marketing. O compartilhamento acontece apenas quando é necessário para prestar o serviço:
        </p>
        <ul>
          <li>fornecedores de <strong>hospedagem e infraestrutura</strong> em nuvem, que mantêm o site no ar;</li>
          <li>serviço de <strong>envio de e-mail</strong> (Resend), usado para que a mensagem do formulário chegue à nossa caixa de entrada;</li>
          <li><strong>WhatsApp</strong> (Meta), se você optar por falar conosco por ele;</li>
          <li>autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
        </ul>
        <p>
          Alguns desses fornecedores podem processar dados em servidores fora do Brasil. Nesses casos, buscamos fornecedores que adotem salvaguardas compatíveis com a LGPD.
        </p>
      </>
    )
  },
  {
    id: "cookies",
    title: "Cookies e armazenamento no navegador",
    body: (
      <>
        <p>Este site não usa cookies de publicidade nem ferramentas de análise de audiência. Guardamos no seu navegador apenas:</p>
        <ul>
          <li>a sua escolha no aviso de cookies, para não perguntar de novo a cada visita;</li>
          <li>um marcador de que a animação de abertura já foi exibida, para não repeti-la a cada página.</li>
        </ul>
        <p>Você pode apagar esses itens a qualquer momento nas configurações do navegador.</p>
      </>
    )
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos",
    body: (
      <p>
        Guardamos os dados pelo tempo necessário para atender ao seu contato e, se houver contratação, durante o projeto e pelos prazos que a lei exigir depois dele. Quando deixam de ser necessários, são eliminados ou anonimizados. Você pode pedir a exclusão antes disso, como explicado a seguir.
      </p>
    )
  },
  {
    id: "direitos",
    title: "Seus direitos",
    body: (
      <>
        <p>Pela LGPD (art. 18), você pode pedir, a qualquer momento:</p>
        <ul>
          <li>a confirmação de que tratamos seus dados e o acesso a eles;</li>
          <li>a correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em desacordo com a lei;</li>
          <li>a portabilidade dos dados a outro fornecedor, mediante requisição;</li>
          <li>a eliminação dos dados tratados com o seu consentimento;</li>
          <li>informação sobre com quem compartilhamos seus dados;</li>
          <li>a revogação do consentimento, sem prejuízo do que já foi tratado.</li>
        </ul>
        <p>
          Para exercer qualquer um deles, escreva para <a href="mailto:menos.lab@gmail.com">menos.lab@gmail.com</a>. Podemos pedir informações para confirmar que a solicitação é sua. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </>
    )
  },
  {
    id: "seguranca",
    title: "Segurança",
    body: (
      <p>
        Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda e vazamento, como conexão criptografada (HTTPS), acesso restrito às informações e uso de fornecedores com boas práticas de segurança. Nenhum sistema é totalmente imune a falhas, e por isso, se ocorrer um incidente que possa afetar você, avisaremos nos termos da lei.
      </p>
    )
  },
  {
    id: "criancas",
    title: "Crianças e adolescentes",
    body: (
      <p>
        Este site é voltado a empresas, organizações e profissionais. Não coletamos intencionalmente dados de crianças e adolescentes. Se você acredita que isso aconteceu, avise-nos para que possamos excluir as informações.
      </p>
    )
  },
  {
    id: "alteracoes",
    title: "Alterações desta política",
    body: (
      <p>
        Podemos atualizar esta política para refletir mudanças no site ou na lei. A data no topo da página indica a última revisão. Em mudanças relevantes, destacaremos o aviso no próprio site.
      </p>
    )
  },
  {
    id: "contato",
    title: "Como falar conosco sobre seus dados",
    body: (
      <p>
        Dúvidas, pedidos e reclamações sobre privacidade podem ser enviados para <a href="mailto:menos.lab@gmail.com">menos.lab@gmail.com</a> ou <a href="mailto:robert@menosdev.com">robert@menosdev.com</a>.
      </p>
    )
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Privacidade e LGPD"
      title="Política de Privacidade"
      updatedAt="15 de outubro de 2026"
      summary={[
        "Pedimos só os dados que precisamos para responder ao seu contato e, se houver projeto, para executá-lo.",
        "Não vendemos nem compartilhamos seus dados para marketing.",
        "O site não usa cookies de publicidade nem análise de audiência.",
        "Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento."
      ]}
      sections={sections}
      other={{ label: "Ler os Termos de Uso", href: "/termos" }}
    />
  );
}
