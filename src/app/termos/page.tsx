import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import LegalDocument, { type LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Regras para uso do site da MENOS, propriedade intelectual, limites de responsabilidade e foro."
};

const sections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "Aceitação dos termos",
    body: (
      <p>
        Ao acessar e usar este site, você concorda com estes Termos de Uso. Se não concordar com algum ponto, pedimos que não utilize o site. O site é mantido pela <strong>MENOS</strong>, estúdio criativo de tecnologia.
      </p>
    )
  },
  {
    id: "o-site",
    title: "O que é este site",
    body: (
      <p>
        Este site apresenta a MENOS, seus serviços, projetos realizados e parceiros, e oferece um formulário e canais para você falar conosco. As informações têm caráter institucional e informativo.
      </p>
    )
  },
  {
    id: "uso-permitido",
    title: "Uso permitido",
    body: (
      <>
        <p>Você pode navegar, ler e entrar em contato livremente. Não é permitido:</p>
        <ul>
          <li>usar o site para fins ilegais ou que violem direitos de terceiros;</li>
          <li>tentar acessar áreas, sistemas ou dados que não são públicos, ou interferir no funcionamento do site;</li>
          <li>enviar mensagens automatizadas em massa, vírus ou qualquer código malicioso;</li>
          <li>copiar o site ou partes dele para se passar pela MENOS.</li>
        </ul>
      </>
    )
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade intelectual",
    body: (
      <>
        <p>
          Textos, identidade visual, logotipo, animações, imagens e código deste site pertencem à MENOS ou são usados com autorização, e são protegidos pela legislação de direitos autorais e de propriedade industrial. Não podem ser copiados, modificados ou redistribuídos sem autorização por escrito.
        </p>
        <p>
          Nomes, logotipos e marcas de clientes e parceiros pertencem aos seus titulares e aparecem aqui apenas para indicar os trabalhos realizados e a nossa rede.
        </p>
      </>
    )
  },
  {
    id: "informacoes-enviadas",
    title: "Informações que você envia",
    body: (
      <p>
        Ao preencher o formulário ou nos escrever, você declara que as informações são verdadeiras e que tem o direito de compartilhá-las. Não envie dados pessoais sensíveis nem informações confidenciais de terceiros nessa primeira conversa. O tratamento desses dados segue a nossa <Link href="/privacidade">Política de Privacidade</Link>.
      </p>
    )
  },
  {
    id: "links-terceiros",
    title: "Links e serviços de terceiros",
    body: (
      <p>
        O site pode apontar para páginas de terceiros, como redes sociais, o WhatsApp e sites de clientes. Não controlamos esses ambientes e não somos responsáveis pelo conteúdo ou pelas práticas de privacidade deles.
      </p>
    )
  },
  {
    id: "propostas",
    title: "Propostas e contratação",
    body: (
      <p>
        As informações do site, incluindo descrições de serviços, exemplos de projetos e resultados, não constituem oferta nem promessa de resultado. Prazos, escopo e valores de qualquer trabalho são definidos em proposta ou contrato específico entre as partes.
      </p>
    )
  },
  {
    id: "responsabilidade",
    title: "Disponibilidade e limites de responsabilidade",
    body: (
      <p>
        Empenhamo-nos para manter o site atualizado e funcionando, mas não garantimos que ele estará sempre disponível, livre de erros ou de interrupções. Na extensão permitida pela lei, a MENOS não responde por danos decorrentes do uso do site ou da impossibilidade de usá-lo, nem por conteúdos de terceiros acessados por links.
      </p>
    )
  },
  {
    id: "alteracoes",
    title: "Alterações nestes termos",
    body: (
      <p>
        Podemos alterar estes termos a qualquer momento. A versão em vigor é sempre a publicada nesta página, com a data da última atualização no topo. Continuar usando o site depois da alteração significa que você concorda com a nova versão.
      </p>
    )
  },
  {
    id: "lei-e-foro",
    title: "Lei aplicável e foro",
    body: (
      <p>
        Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca da capital do Estado de São Paulo para resolver qualquer controvérsia decorrente do uso do site, salvo disposição legal em sentido diferente, como os direitos do consumidor.
      </p>
    )
  }
];

export default function TermsOfUsePage() {
  return (
    <LegalDocument
      eyebrow="Condições de uso"
      title="Termos de Uso"
      updatedAt="15 de outubro de 2026"
      summary={[
        "O site é institucional: apresenta a MENOS, seus serviços e projetos.",
        "O conteúdo, a marca e o código são da MENOS e não podem ser copiados sem autorização.",
        "Valores, prazos e escopo de um trabalho só valem em proposta ou contrato próprio.",
        "O tratamento dos seus dados segue a Política de Privacidade."
      ]}
      sections={sections}
      other={{ label: "Ler a Política de Privacidade", href: "/privacidade" }}
    />
  );
}
