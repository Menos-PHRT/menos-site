export interface Project {
  slug: string;
  name: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  impact: string;
  description: string;
  keyFeatures: string[];
  process: string[];
  techStack: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
  image?: string;
  relatedServices: string[]; // slugs de serviços relacionados
}

export const projects: Project[] = [
  {
    slug: "plataforma-melhores-cabecas",
    name: "Plataforma Melhores Cabeças",
    client: "Instituto Melhores Cabeças",
    category: "Plataformas Digitais",
    challenge: "Conectar e gerenciar uma rede nacional de pesquisadores e mentores que operava de forma fragmentada por e-mails e planilhas.",
    solution: "Criação de um portal unificado com perfis dinâmicos, repositório de pesquisas categorizado, e sistema interno para agendamento de mentorias sem atrito.",
    impact: "Centralização completa da comunicação da rede, reduzindo em 70% o tempo administrativo necessário para conectar mentores e pesquisadores.",
    description: "O Instituto Melhores Cabeças precisava consolidar sua rede de alto impacto de mentores e pesquisadores. A operação dependia de fluxos manuais pesados no WhatsApp e planilhas instáveis. Desenvolvemos uma plataforma digital sob medida que serve como área de colaboração, permitindo busca filtrada de especialistas, agendamento direto de mentorias com envio de alertas automáticos e um repositório centralizado para compartilhamento de publicações científicas.",
    keyFeatures: [
      "Área de membros restrita com autenticação segura.",
      "Busca avançada de especialistas por áreas de atuação e tags de pesquisa.",
      "Agenda integrada para solicitação e aprovação de horários de mentoria.",
      "Painel administrativo para moderação de conteúdos e relatórios de uso."
    ],
    process: [
      "Alinhamento estratégico com a diretoria do Instituto para desenhar a taxonomia da rede.",
      "Protótipos interativos para teste de usabilidade com pesquisadores seniores.",
      "Desenvolvimento em blocos com Next.js e banco de dados relacional.",
      "Importação segura de mais de 500 perfis cadastrados anteriormente."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    testimonial: {
      text: "A MENOS conseguiu transformar nossa operação confusa em uma interface limpa e intuitiva. O que antes levava dias de troca de e-mails agora acontece em poucos cliques.",
      author: "Ana Souza",
      role: "Diretora de Operações",
      company: "Instituto Melhores Cabeças"
    },
    relatedServices: ["plataformas-digitais", "design-e-melhoria-de-interfaces"]
  },
  {
    slug: "sistema-de-credenciamento",
    name: "Sistema de Credenciamento",
    client: "Festival Conexão Criativa",
    category: "Credenciamento e Eventos",
    challenge: "Gerenciar a entrada e presença de 2.500 participantes espalhados por 12 oficinas simultâneas sem gerar filas na recepção.",
    solution: "Desenvolvimento de um sistema de check-in web ultra-rápido por QR Code, integrado à emissão automatizada de certificados baseada em presença real.",
    impact: "Tempo médio de credenciamento reduzido para menos de 4 segundos por pessoa, com zero filas na recepção do evento físico.",
    description: "Eventos criativos de grande porte costumam sofrer na recepção. O Festival Conexão Criativa operava com checagem de listas de papel que atrasavam a abertura. A MENOS desenhou um sistema web leve no qual cada participante recebia um passe digital com QR Code. Os credenciadores puderam utilizar a própria câmera do celular para ler o código instantaneamente, alimentando um painel de lotação de salas em tempo real e permitindo o disparo de certificados personalizados no encerramento.",
    keyFeatures: [
      "Leitor de QR Code integrado no navegador (sem necessidade de app).",
      "Disparo automático de ingressos por e-mail e integração com Apple Wallet.",
      "Controle de presença automático por oficina com limites de lotação em tempo real.",
      "Painel de fechamento estatístico de presença com relatórios para patrocinadores."
    ],
    process: [
      "Desenho da arquitetura de dados e otimização do leitor de QR Code para funcionar em ambientes com baixa conectividade.",
      "Desenvolvimento do gerador automático de PDF para crachás e certificados em lote.",
      "Simulação de estresse simulando 100 leituras simultâneas.",
      "Acompanhamento presencial no primeiro dia de evento para garantir estabilidade."
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "SendGrid"],
    testimonial: {
      text: "Foi o primeiro ano em que não tivemos fila na porta e nem reclamações de certificados que não chegaram no e-mail. A solução funcionou de forma impecável.",
      author: "Rodrigo Mota",
      role: "Coordenador Geral",
      company: "Conexão Criativa"
    },
    relatedServices: ["credenciamento-e-eventos", "formularios-inteligentes"]
  },
  {
    slug: "plataforma-de-certificacao",
    name: "Plataforma de Certificação",
    client: "Certificadora Verde",
    category: "Plataformas Digitais",
    challenge: "Processar o envio de evidências ambientais complexas e automatizar a auditoria de conformidade de empresas parceiras.",
    solution: "Uma plataforma de submissão documental lógica que orienta o usuário no envio de arquivos e gera relatórios consolidados para os auditores.",
    impact: "Redução de 45% no tempo de tramitação dos processos de certificação socioambiental e melhora na qualidade dos documentos enviados.",
    description: "A Certificadora Verde gerenciava o processo de auditoria de selos ecológicos através do envio de anexos pesados por e-mail e formulários estáticos sem validação. Criamos uma plataforma digital moderna que guia os clientes passo a passo, aceitando uploads apenas nos formatos e tamanhos corretos, organizando as evidências por critérios técnicos e notificando os auditores quando um processo está pronto para revisão.",
    keyFeatures: [
      "Upload inteligente de arquivos grandes em nuvem com validação de tipo de documento.",
      "Fluxo passo a passo (stepper) com salvamento automático de progresso.",
      "Painel de controle para auditores avaliarem, comentarem e aprovarem requisitos.",
      "Geração automatizada do selo digital e certificado de conformidade autenticado."
    ],
    process: [
      "Mapeamento do fluxo de auditoria para traduzi-lo em etapas visuais intuitivas.",
      "Criação de um sistema de upload de arquivos direto para o storage da nuvem para evitar sobrecarga no servidor.",
      "Desenvolvimento da lógica de notificações por e-mail baseada em mudanças de status do processo.",
      "Ajustes de segurança para garantir a confidencialidade dos arquivos confidenciais das empresas."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AWS S3", "PostgreSQL", "Prisma"],
    testimonial: {
      text: "A plataforma removeu o atrito das submissões. Nossos clientes agora entendem exatamente o que precisam enviar, e nosso time ganha horas que antes eram gastas cobrando arquivos certos.",
      author: "Carlos Pimentel",
      role: "CEO",
      company: "Certificadora Verde"
    },
    relatedServices: ["plataformas-digitais", "formularios-inteligentes", "dashboards"]
  },
  {
    slug: "integracao-coentro-erp",
    name: "Coentro ERP: gestão e automação para restaurantes",
    client: "Coentro",
    category: "Sistema de Gestão e Automação",
    challenge: "A operação de um restaurante envolve múltiplos pilares ao mesmo tempo: controle de estoque de insumos, abertura e fechamento de comandas, análise de vendas diárias e comunicação com a cozinha/caixa. Quando essas informações são registradas de forma manual ou isolada, ocorrem perdas de estoque, divergências financeiras e atrasos no atendimento.",
    solution: "Desenvolvemos o Coentro ERP como uma plataforma de gestão completa que centraliza desde o controle de comandas e estoque até dashboards analíticos de vendas e relatórios de pratos mais vendidos. Para integrar a gestão em nuvem à rotina física, criamos o Coentro Print Agent para impressão térmica automática na Epson TM-T20X.",
    impact: "O Coentro ERP transformou a gestão do estabelecimento ao unificar comandas, controle de estoque, balanço financeiro e indicadores de vendas em uma única interface. A automação da impressão reduziu erros operacionais e os relatórios gerenciais trouxeram clareza total sobre o faturamento e o desempenho do cardápio.",
    description: "O Coentro ERP é uma plataforma de gestão completa desenvolvida para organizar e acelerar a operação de restaurantes. Em um único ambiente intuitivo, o sistema reúne controle de estoque, gestão de comandas, dashboards de vendas em tempo real, relatórios de pratos mais vendidos e fluxo financeiro.\n\nCom o painel gerencial, o restaurante obtém visibilidade completa sobre o negócio: sabe exatamente quais itens estão saindo mais, como está o faturamento diário e quando é hora de repor insumos do estoque. Cada pedido registrado reduz falhas manuais e gera dados valiosos para a tomada de decisões.\n\nPara integrar perfeitamente a gestão digital à rotina física da equipe, o sistema conta com conexão direta à impressora térmica Epson TM-T20X. As comandas registradas no ERP são enviadas instantaneamente para impressão na cozinha ou no caixa, garantindo agilidade e precisão do atendimento ao fechamento.",
    keyFeatures: [
      "Dashboard de Vendas: painel visual em tempo real para monitorar faturamento diário, volume de pedidos e ticket médio.",
      "Produtos Mais Vendidos: relatórios inteligentes dos pratos mais populares, horários de pico e desempenho do cardápio.",
      "Controle de Estoque e Insumos: acompanhamento de entradas, baixas automáticas a cada venda e alertas de reposição.",
      "Gestão de Comandas e Mesas: abertura rápida, lançamento de itens, acompanhamento do atendimento e fechamento ágil.",
      "Impressão Térmica Integrada: envio automático e direto dos pedidos para a impressora Epson TM-T20X sem etapas manuais.",
      "Fechamento Financeiro: controle preciso de entradas por forma de pagamento, conferência de caixa e balanço diário.",
      "Gerenciamento de Acessos: níveis de permissão configuráveis para garçons, caixa, estoque e administração.",
      "Histórico e Rastreabilidade: registro detalhado de todas as operações realizadas para consultas posteriores e auditoria."
    ],
    process: [
      "Compreensão da operação: Mapeamento da rotina do restaurante, do fluxo de comandas, controle de insumos e necessidades financeiras.",
      "Desenvolvimento do ERP: Criação do sistema centralizado com gestão de comandas, controle de estoque e dashboards de vendas.",
      "Organização e segurança dos dados: Implementação da autenticação dos usuários, estrutura no Firestore e relatórios gerenciais.",
      "Integração com a impressão: Desenvolvimento da fila de impressão no Firestore e do Coentro Print Agent local para conectar à impressora Epson TM-T20X.",
      "Instalação e testes: Configuração no computador da operação, testes de baixa no estoque, emissão de comandas físicas e fechamento de caixa.",
      "Aprimoramento contínuo: Evolução constante do painel a partir do uso real pela equipe e acompanhamento das métricas de vendas."
    ],
    techStack: ["HTML/CSS/JS", "Firebase Auth", "Firebase Firestore", "Node.js", "Coentro Print Agent", "Epson TM-T20X"],
    testimonial: {
      text: "O Coentro ERP transforma processos dispersos em uma operação integrada: o pedido é registrado, o estoque é atualizado, o faturamento é monitorado no dashboard e a impressão acontece no mesmo fluxo.",
      author: "Proprietária",
      role: "Gestão Operacional",
      company: "Coentro"
    },
    image: "/images/coentro-erp.png",
    relatedServices: ["sistemas-internos", "automacoes", "dashboards"]
  },
  {
    slug: "reformulacao-paginas-institucionais",
    name: "Reformulação de Páginas Institucionais",
    client: "Consultoria Estratégica Apex",
    category: "Sites Institucionais",
    challenge: "Transformar um site corporativo lento e poluído em uma experiência moderna de alta velocidade que converta visitantes em reuniões agendadas.",
    solution: "Desenvolvimento de um site institucional minimalista com foco em copywriting estratégico, tipografia contemporânea e carregamento instantâneo.",
    impact: "Aumento de 110% no número de formulários de contato recebidos nas primeiras 4 semanas após o lançamento.",
    description: "A Apex possuía um site institucional baseado em templates pesados, que demorava mais de 6 segundos para abrir no celular e afastava possíveis clientes de alto padrão. Redesenhamos a experiência completa, adotando uma abordagem leve, limpa e sofisticada. O novo site foi desenvolvido focando na pontuação máxima do Google Lighthouse, carregando de forma instantânea e integrando-se a um fluxo limpo de agendamento de reuniões.",
    keyFeatures: [
      "Design baseado em respiro visual (white space) e tipografia Outfit sofisticada.",
      "Carregamento de imagens otimizado e código Next.js estático de alta velocidade.",
      "Formulário de conversão minimalista e integrado a ferramentas de agendamento online.",
      "Otimização avançada de SEO on-page (metatags, headings e sitemap)."
    ],
    process: [
      "Revisão completa da arquitetura do site antigo e eliminação de 60% dos textos redundantes.",
      "Redação estratégica (copywriting) com foco em clareza e autoridade.",
      "Protótipos focados no minimalismo e na hierarquia de informações.",
      "Desenvolvimento e deploy em CDN global de alta performance."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel CDN"],
    testimonial: {
      text: "Nosso novo site agora reflete a qualidade dos serviços que entregamos. A velocidade e a elegância visual do projeto impressionaram nossos clientes.",
      author: "Renato Ramos",
      role: "Sócio-Diretor",
      company: "Apex Consultoria"
    },
    relatedServices: ["sites-institucionais", "design-e-melhoria-de-interfaces"]
  },
  {
    slug: "simples-foco-no-que-importa",
    name: "Simples: Foco no que importa",
    client: "Projeto Autoral MENOS",
    category: "Projetos Autorais",
    challenge: "Provar que gerenciadores de tarefas comuns são excessivamente burocráticos, criando estresse com prazos e tags desnecessárias.",
    solution: "Criação de um aplicativo minimalista de notas e afazeres que organiza o dia com base em foco único, limitando as tarefas ativas diárias.",
    impact: "Projeto de código aberto adotado por mais de 1.200 profissionais como ferramenta diária de organização pessoal.",
    description: "O Simples é um projeto autoral concebido e desenvolvido pela MENOS para materializar nosso manifesto de simplificação. Trata-se de uma ferramenta digital de produtividade humana que recusa a estética de sobrecarga de softwares corporativos. Em vez de centenas de prioridades, cores e tags, o Simples incentiva o usuário a selecionar no máximo 3 metas por dia e focar nelas até a conclusão. Sem lembretes estridentes, sem ansiedade digital.",
    keyFeatures: [
      "Interface baseada puramente em texto com excelente tipografia e contraste.",
      "Limitação nativa de tarefas diárias ativas (regra de 3 tarefas).",
      "Banco de dados local (privacidade total para o usuário, sem rastreadores).",
      "Animações sutis e interações suaves por teclado."
    ],
    process: [
      "Discussão interna sobre os principais vilões da ansiedade na produtividade moderna.",
      "Desenho de uma interface baseada em linhas finas e tipografia limpa.",
      "Desenvolvimento de uma aplicação web offline-first usando localStorage e criptografia básica local.",
      "Publicação do código-fonte livre como forma de apoiar a comunidade de tecnologia minimalista."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "PWA (Progressive Web App)"],
    testimonial: {
      text: "O Simples faz jus ao nome. É o único organizador de tarefas que realmente me acalma em vez de me dar ansiedade pelo que sobrou para amanhã.",
      author: "Lucas Ferreira",
      role: "Designer Independente",
      company: "Usuário do Simples"
    },
    relatedServices: ["design-e-melhoria-de-interfaces", "plataformas-digitais"]
  }
];
