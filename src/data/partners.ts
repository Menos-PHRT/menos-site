export interface Partner {
  id: string;
  name: string;
  logo: string; // nome do logo ou texto estilizado
  category: "client" | "institutional" | "collaborator" | "vendor";
  description: string;
  relation: string;
  externalLink: string;
  period: string;
}

export const partners: Partner[] = [
  {
    id: "melhores-cabecas",
    name: "Instituto Melhores Cabeças",
    logo: "Melhores Cabeças",
    category: "client",
    description: "Organização do terceiro setor focada em conectar mentes brilhantes e financiar pesquisas científicas no Brasil.",
    relation: "Desenvolvimento de Plataforma Digital e Área Logada de Pesquisadores.",
    externalLink: "https://example.com/melhores-cabecas",
    period: "Desde 2024"
  },
  {
    id: "conexao-criativa",
    name: "Conexão Criativa",
    logo: "Conexão Criativa",
    category: "client",
    description: "Festival cultural independente de grande impacto nacional focado em economia criativa e novas tecnologias.",
    relation: "Criação de Sistema de Credenciamento rápido por QR Code e portal de inscrições.",
    externalLink: "https://example.com/conexao-criativa",
    period: "2023 - 2024"
  },
  {
    id: "certificadora-verde",
    name: "Certificadora Verde",
    logo: "Certificadora Verde",
    category: "client",
    description: "Instituição independente de fomento à conformidade socioambiental e emissão de selos verdes.",
    relation: "Desenvolvimento de Plataforma de Submissão e Auditoria Ecológica.",
    externalLink: "https://example.com/certificadora-verde",
    period: "Desde 2024"
  },
  {
    id: "coentro",
    name: "Coentro",
    logo: "Coentro",
    category: "client",
    description: "Restaurante focado em gestão integrada e eficiência operacional de comandas.",
    relation: "Desenvolvimento do Coentro ERP e automação de impressão térmica local.",
    externalLink: "https://example.com/coentro",
    period: "Desde 2025"
  },
  {
    id: "apex-consultoria",
    name: "Apex Consultoria",
    logo: "Apex Consultoria",
    category: "client",
    description: "Consultoria de negócios de alto padrão focada em reestruturação corporativa e otimização financeira.",
    relation: "Criação de site institucional moderno focado em conversão de leads qualificados.",
    externalLink: "https://example.com/apex-consultoria",
    period: "2024"
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
    id: "mariana-lima",
    name: "Mariana Lima",
    logo: "Mariana Lima",
    category: "collaborator",
    description: "Desenvolvedora sênior especialista em integrações complexas de hardware e middlewares de comunicação física.",
    relation: "Desenvolvimento Back-End & Conexão de Hardware.",
    externalLink: "https://github.com/mariana-lima-dev",
    period: "Colaboradora recorrente"
  },
  {
    id: "thiago-reis",
    name: "Thiago Reis",
    logo: "Thiago Reis",
    category: "collaborator",
    description: "Designer de produto (UX/UI) com foco em minimalismo digital, especializado no desenho de painéis e sistemas internos.",
    relation: "Pesquisa de Usuário e Desenho de Interfaces Customizadas.",
    externalLink: "https://dribbble.com/thiago-reis-design",
    period: "Colaborador recorrente"
  }
];
