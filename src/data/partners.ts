export interface Partner {
  id: string;
  name: string;
  logo: string; // nome do logo ou texto estilizado
  category: "client" | "institutional" | "collaborator" | "vendor";
  description: string;
  relation: string;
  externalLink: string;
  period: string;
  image?: string;
}

export const partners: Partner[] = [
  {
    id: "flupp",
    name: "Fundação Lucia e Pelerson Penido (FLUPP)",
    logo: "FLUPP",
    category: "client",
    description: "Uma fundação familiar cuja missão é colaborar na construção de uma sociedade mais justa, apoiando projetos de educação no Vale do Paraíba.",
    relation: "Desenvolvimento da Plataforma ERP Melhores Cabeças, do Sistema de Credenciamento por QR Code, da Plataforma de Certificados e da reformulação da página do Prêmio FLUPP de Educação.",
    externalLink: "https://flupp.org.br/",
    period: "Desde 2025"
  },
  {
    id: "coentro",
    name: "Coentro Restaurante",
    logo: "Coentro",
    category: "client",
    description: "Restaurante de comida caseira focado em acolhimento, sabor autêntico e eficiência no atendimento.",
    relation: "Desenvolvimento de plataforma de gestão para o restaurante, centralizando controle de comandas, frente de caixa, fluxo operacional e impressão integrada.",
    externalLink: "https://example.com/coentro",
    period: "Desde 2026"
  },

  {
    id: "design-coletivo",
    name: "Design Coletivo",
    logo: "Design Coletivo",
    category: "institutional",
    description: "Estúdio parceiro de design de marca e identidade corporativa com o qual co-criamos soluções visuais para clientes em comum.",
    relation: "Parceiro de Estrutura Visual e Branding.",
    externalLink: "https://example.com/design-coletivo",
    period: "Desde 2023"
  },
  {
    id: "nuvem-segura",
    name: "Nuvem Segura",
    logo: "Nuvem Segura",
    category: "institutional",
    description: "Provedora de infraestrutura em nuvem e segurança que apoia a MENOS na hospedagem e conformidade de dados de alta sensibilidade.",
    relation: "Parceiro de Infraestrutura e LGPD.",
    externalLink: "https://example.com/nuvem-segura",
    period: "Desde 2024"
  },
  {
    id: "andre-sobrinho",
    name: "André Sobrinho",
    logo: "André Sobrinho",
    category: "collaborator",
    description: "Consultor técnico na Oracle com foco em Oracle Retail Merchandising, projetos internacionais LATAM e soluções Oracle Cloud, formado pela FIAP.",
    relation: "Technical Consultant na Oracle",
    externalLink: "https://www.linkedin.com/in/andr%C3%A9-sobrinho-321312235/",
    period: "Apoiador do projeto",
    image: "/images/apoiadores/André Sobrinho.png"
  },
  {
    id: "john-wesley",
    name: "John Wesley",
    logo: "John Wesley",
    category: "collaborator",
    description: "Consultor associado na Oracle com atuação em Oracle Fusion Apps e formação em desenvolvimento web full stack moderno (React, C#, JavaScript).",
    relation: "Associate Consultant na Oracle",
    externalLink: "https://www.linkedin.com/in/john-wesley-a82636288/",
    period: "Apoiador do projeto",
    image: "/images/apoiadores/John Weslay.jpeg"
  },
  {
    id: "lucas-derico",
    name: "Lucas Derico Pomerancblum",
    logo: "Lucas Derico Pomerancblum",
    category: "collaborator",
    description: "Especialista em Sistemas de Informação pela ESPM com atuação em infraestrutura em nuvem, consultoria e soluções Oracle e Cloud na IT Convergence.",
    relation: "Consultor Cloud & Sistemas de Informação",
    externalLink: "https://www.linkedin.com/in/lucas-derico/",
    period: "Apoiador do projeto",
    image: "/images/apoiadores/Lucas Derico.jpeg"
  },
  {
    id: "stefani-vasconcellos",
    name: "Stefani Vasconcellos",
    logo: "Stefani Vasconcellos",
    category: "collaborator",
    description: "Engenheira de software na Oracle especialista em Cloud, Inteligência Artificial Generativa e ERP Fusion Cloud, com certificações OCI e AWS e atuação em Java e Python.",
    relation: "Applications Software Engineer na Oracle",
    externalLink: "https://www.linkedin.com/in/stefani-beatriz-carvalho-vasconcellos/",
    period: "Apoiadora do projeto",
    image: "/images/apoiadores/Stefani Vasconcellos.png"
  }
];
