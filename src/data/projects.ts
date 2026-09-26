export interface ProjectGalleryItem {
  title: string;
  category?: string;
  caption: string;
  image: string;
}

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
  gallery?: ProjectGalleryItem[];
  learnings?: string;
  relatedServices: string[]; // slugs de serviços relacionados
  roles?: {
    title: string;
    roleTag?: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "plataforma-melhores-cabecas",
    name: "Plataforma Melhores Cabeças",
    client: "Fundação Lucia e Pelerson Penido — FLUPP",
    category: "Plataformas Digitais",
    challenge: "O programa era gerenciado por planilhas e registros descentralizados, o que dificultava o fluxo de informações e o acompanhamento de bolsistas, mentorias e tutorias.",
    solution: "Criamos uma plataforma para centralizar toda a gestão do programa, com ambientes e acessos específicos para bolsistas, mentores, tutores e administração.",
    impact: "As informações passaram a ficar organizadas em um único lugar, facilitando o acompanhamento dos bolsistas, dos encontros e do histórico de cada participante.",
    description: "A Plataforma Melhores Cabeças foi desenvolvida para apoiar a gestão do programa de bolsas de estudo da Fundação Lucia e Pelerson Penido — FLUPP. A Fundação oferece bolsas de estudo para estudantes do ensino superior e, além do apoio financeiro para a formação universitária, mantém uma estrutura de acompanhamento e desenvolvimento dos bolsistas ao longo de sua trajetória acadêmica.\n\nComo um sistema integrado de gestão e acompanhamento do programa, a plataforma conecta administração, mentores, tutores e bolsistas dentro de uma mesma estrutura digital. Ela centraliza informações que antes poderiam ficar dispersas entre planilhas, formulários, documentos e diferentes controles internos, criando um histórico organizado da trajetória de cada bolsista.",
    roles: [
      {
        title: "Bolsistas",
        roleTag: "Estudantes Apoiados",
        description: "São os estudantes apoiados financeiramente pela Fundação. Cada bolsista possui seu próprio acompanhamento dentro do programa, com histórico de participação, mentorias, tutorias, avaliações e demais informações relacionadas à sua trajetória acadêmica."
      },
      {
        title: "Mentores",
        roleTag: "Mentorias Individuais",
        description: "Cada bolsista participa de mentorias individuais mensais, realizadas com um mentor. Esses encontros permitem um acompanhamento próximo do estudante, abordando desenvolvimento acadêmico, profissional e pessoal. A plataforma organiza os vínculos e permite registrar e acompanhar esses encontros."
      },
      {
        title: "Tutores",
        roleTag: "Tutorias Coletivas",
        description: "Além das mentorias individuais, os bolsistas participam de tutorias coletivas conduzidas por tutores. Esses encontros trabalham questões de desenvolvimento, formação, troca de experiências e acompanhamento coletivo dos estudantes."
      },
      {
        title: "Administração (FLUPP)",
        roleTag: "Gestão Integrada",
        description: "A equipe administrativa precisa acompanhar toda a operação do programa: bolsistas, mentores, tutores, encontros, avaliações, relatórios e evolução dos participantes, reunindo essas informações em um ambiente centralizado."
      }
    ],
    keyFeatures: [
      "Ambiente digital integrado para os quatro perfis (Bolsistas, Mentores, Tutores e Administração).",
      "Organização de vínculos e agenda de mentorias individuais mensais entre mentores e bolsistas.",
      "Acompanhamento e registro de presença em encontros de tutorias coletivas.",
      "Módulo para envio de avaliações, relatórios periódicos de acompanhamento e feedback.",
      "Histórico centralizado e organizado da trajetória de cada bolsista ao longo do programa.",
      "Painel administrativo para a equipe da FLUPP com visão consolidada da operação."
    ],
    process: [
      "Imersão nos processos e fluxos de acompanhamento do programa de bolsas com a equipe da FLUPP.",
      "Mapeamento das necessidades e interações entre os 4 perfis: bolsistas, mentores, tutores e administração.",
      "Desenho de fluxos intuitivos para registro de mentorias, avaliações e relatórios sem atrito.",
      "Desenvolvimento de arquitetura de permissões específicas para cada tipo de participante.",
      "Centralização de dados históricos, eliminando a dispersão em planilhas e formulários avulsos."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    testimonial: {
      text: "A plataforma transformou uma rotina antes dispersa em planilhas e e-mails em uma estrutura organizada. Hoje temos clareza sobre cada bolsista e o histórico de cada mentoria e tutoria.",
      author: "Lorrane de Paula",
      role: "Coordenadora do Programa Melhores Cabeças",
      company: "Fundação Lucia e Pelerson Penido — FLUPP"
    },
    image: "/images/plataforma-melhores-cabecas.png",
    gallery: [
      {
        title: "Tela de Acesso à Plataforma",
        category: "Portal de Entrada",
        caption: "Interface de autenticação com identidade visual personalizada para o programa Melhores Cabeças.",
        image: "/images/plataforma-melhores-cabecas.png"
      },
      {
        title: "Dashboard Administrativo",
        category: "Visão Geral & Indicadores",
        caption: "Acompanhamento em tempo real da operação, contagem de educadores e bolsistas por status de contrato, aniversariantes da semana e ações rápidas.",
        image: "/images/melhores-cabecas/dashboard-admin.png"
      },
      {
        title: "Painel de Encontros de Mentoria",
        category: "Gestão de Mentorias",
        caption: "Central de monitoramento das mentorias individuais com taxas de realização (99.6%), filtros avançados por mentor/mentorando, controle de faltas e pendências de relatórios.",
        image: "/images/melhores-cabecas/painel-encontros.png"
      },
      {
        title: "Gestão de Turmas da Tutoria Coletiva",
        category: "Tutorias Coletivas",
        caption: "Organização estruturada dos públicos-alvo por ano de graduação (1º ao 4º ano e Formados), vinculação de tutoras responsáveis e acompanhamento de sessões.",
        image: "/images/melhores-cabecas/gestao-turmas.png"
      },
      {
        title: "Planejamento e Pautas da Tutoria",
        category: "Acompanhamento Pedagógico",
        caption: "Histórico centralizado de temas, pautas pré-encontro e relatórios pós-encontro com status de finalização e exportação para planilhas.",
        image: "/images/melhores-cabecas/planejamento-tutoria.png"
      },
      {
        title: "Controle de Presenças e Assiduidade",
        category: "Frequência e Faltas",
        caption: "Registro nominal e consolidado de estudantes presentes, ausentes e justificativas de ausência por turma e data de encontro.",
        image: "/images/melhores-cabecas/presencas-tutoria.png"
      },
      {
        title: "Painel de Estatísticas e Cruzamentos",
        category: "Inteligência de Dados",
        caption: "Análises desagregadas e gráficos interativos de idade, gênero, raça/cor, município de origem e cursos universitários atendidos pelo programa.",
        image: "/images/melhores-cabecas/estatisticas-graficos.png"
      }
    ],
    relatedServices: ["plataformas-digitais"]
  },
  {
    slug: "sistema-de-credenciamento",
    name: "Sistema de Credenciamento",
    client: "Fundação Lucia e Pelerson Penido — FLUPP",
    category: "Credenciamento e Eventos",
    challenge: "Gerenciar a entrada e presença de 570 participantes espalhados por 11 oficinas simultâneas sem gerar filas na recepção.",
    solution: "Desenvolvimento de um sistema de check-in web ultra-rápido por QR Code, integrado à emissão automatizada de certificados baseada na contagem de presença real.",
    impact: "Tempo médio de credenciamento reduzido de 1 minuto para menos de 5 segundos por pessoa, com zero filas na recepção do evento físico.",
    description: "Eventos criativos de grande porte, como o Seminário de Educação Infantil do Vale do Paraíba realizado pela FLUPP com apoio da prefeitura de Jacareí, costumam sofrer na recepção. A FLUPP operava com checagem de listas de papel que poderiam ser modernizadas com processos de automação e informatização. A MENOS desenhou um sistema web leve no qual cada participante recebia um passe digital com QR Code. Os credenciadores puderam utilizar a própria câmera do celular para ler o código instantaneamente, alimentando um painel de lotação de salas em tempo real e permitindo o disparo de certificados personalizados no encerramento.",
    keyFeatures: [
      "Leitor de QR Code integrado no navegador do celular (sem necessidade de instalar aplicativo).",
      "Disparo automático de ingressos e passes digitais por e-mail com QR Code individual.",
      "Controle de presença automático em 11 oficinas simultâneas com limites de lotação em tempo real.",
      "Emissão automatizada de certificados personalizados com base na contagem de presença real.",
      "Painel administrativo em tempo real para a coordenação acompanhar fluxo de entrada e salas."
    ],
    process: [
      "Mapeamento do fluxo de recepção do Seminário de Educação Infantil e da dinâmica das 11 oficinas simultâneas.",
      "Desenho de arquitetura web leve e rápida, permitindo leitura veloz mesmo com oscilações de sinal.",
      "Integração do motor de validação instantânea de QR Code com prevenção contra duplicidade.",
      "Desenvolvimento do gerador automático de PDF para crachás e disparador de certificados em lote.",
      "Acompanhamento presencial no evento em Jacareí para garantir operação fluida e sem filas."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "SendGrid"],
    testimonial: {
      text: "Foi o primeiro ano em que não tivemos fila na porta e nem reclamações de certificados que não chegaram no e-mail. A solução funcionou de forma impecável.",
      author: "Natalia Vieira",
      role: "Coordenadora Geral de Eventos da FLUPP",
      company: "Fundação Lucia e Pelerson Penido — FLUPP"
    },
    image: "/images/sistema-de-credenciamento/dashboard-metricas.png",
    gallery: [
      {
        title: "Dashboard de Métricas & Analytics",
        category: "Inteligência & Presença",
        caption: "Controle em tempo real de inscritos (574), autoridades presentes, perfil por gênero e taxa de presença na plenária.",
        image: "/images/sistema-de-credenciamento/dashboard-metricas.png"
      },
      {
        title: "Portal de Inscrições do Evento",
        category: "Inscrição Online",
        caption: "Interface pública do 15º Seminário de Educação Infantil, com informações de data, local e integração com mapa e agenda.",
        image: "/images/sistema-de-credenciamento/portal-inscricoes.png"
      },
      {
        title: "Formulário Inteligente de Dados",
        category: "Cadastro Individual",
        caption: "Coleta organizada de dados pessoais, validação de CPF, cargo e município de atuação sem fricção.",
        image: "/images/sistema-de-credenciamento/formulario-dados.png"
      },
      {
        title: "Confirmação e Passe Digital",
        category: "Comprovante & QR Code",
        caption: "Tela de confirmação imediata da inscrição com resumo do evento e detalhes da oficina reservada.",
        image: "/images/sistema-de-credenciamento/confirmacao-passe.png"
      },
      {
        title: "Painel de Alocação de Oficinas",
        category: "Gestão Operacional",
        caption: "Busca instantânea por nome ou CPF para remanejamento de participantes e controle de vagas por sala em tempo real.",
        image: "/images/sistema-de-credenciamento/alocacao-oficinas.png"
      },
      {
        title: "Frequência por Município e Oficina",
        category: "Relatórios & Fechamento",
        caption: "Tabela analítica detalhada com presença na plenária da manhã e oficinas da tarde, subsidiando a emissão precisa de certificados.",
        image: "/images/sistema-de-credenciamento/frequencia-oficinas.png"
      }
    ],
    relatedServices: ["credenciamento-e-eventos"]
  },
  {
    slug: "plataforma-de-certificacao",
    name: "Plataforma de Certificados FLUPP",
    client: "Fundação Lucia e Pelerson Penido — FLUPP",
    category: "Plataformas Digitais",
    challenge: "A geração e o envio de certificados eram feitos manualmente, um a um, consumindo muito tempo da equipe e tornando o processo pouco escalável.",
    solution: "Uma plataforma que gera certificados em lote a partir de planilhas vinculadas aos eventos e permite que cada participante consulte seus documentos usando o CPF.",
    impact: "Um processo que antes exigia geração e envio individual passou a ser praticamente automático, reduzindo drasticamente o trabalho operacional da equipe.",
    description: "A emissão de certificados da FLUPP antes era feita manualmente pelo Canva, com mala direta e envio individual por e-mail e WhatsApp. Criamos uma plataforma que automatiza esse processo: a equipe vincula uma planilha ao evento, gera os certificados em lote e disponibiliza tudo em um único link. Cada participante informa seu CPF e acessa automaticamente os certificados disponíveis em seu nome.",
    keyFeatures: [
      "Criação e gerenciamento de eventos.",
      "Importação de planilhas com dados dos participantes.",
      "Geração automática de certificados a partir de uma arte-base.",
      "Campos dinâmicos como nome, cargo, horário e CPF.",
      "Consulta individual dos certificados por CPF.",
      "Um único link de acesso para todos os participantes.",
      "Histórico de certificados emitidos por pessoa e por evento.",
      "Validação e autenticação de certificado."
    ],
    process: [
      "Mapeamento do fluxo manual de criação e envio dos certificados.",
      "Desenvolvimento da geração automática a partir de uma planilha vinculada ao evento.",
      "Criação do sistema de identificação por CPF para localizar os certificados de cada participante.",
      "Centralização do acesso em um único link, eliminando o envio individual de arquivos."
    ],
    learnings: "A solução foi construída para permitir novos eventos, modelos de certificados e campos personalizados sem a necessidade de recriar todo o processo.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma"],
    image: "/images/certificacao-flupp/editor-visual.png",
    gallery: [
      {
        title: "Editor Visual de Certificados",
        category: "Personalização & Layout",
        caption: "Interface interativa para posicionar campos dinâmicos (Nome, CPF, Carga Horária e Código de Validação) sobre a arte-base com prévia em tempo real.",
        image: "/images/certificacao-flupp/editor-visual.png"
      },
      {
        title: "Portal de Acesso Administrativo",
        category: "Autenticação & Gestão",
        caption: "Painel exclusivo para a equipe da FLUPP gerenciar eventos, modelos visuais e certificados em um único ambiente.",
        image: "/images/certificacao-flupp/login-portal.png"
      },
      {
        title: "Dashboard de Visão Geral",
        category: "Indicadores em Tempo Real",
        caption: "Métricas consolidadas de eventos ativos, certificados gerados, participantes cadastrados e monitoramento de downloads.",
        image: "/images/certificacao-flupp/dashboard-visao-geral.png"
      },
      {
        title: "Cadastro de Eventos e Modelos",
        category: "Configuração do Evento",
        caption: "Configuração de parâmetros como carga horária, data do evento e upload de arquivos base em alta resolução.",
        image: "/images/certificacao-flupp/cadastro-eventos.png"
      },
      {
        title: "Importação e Geração em Lote",
        category: "Automação por Planilha",
        caption: "Upload de planilhas CSV ou XLSX com reconhecimento inteligente de colunas e processamento de centenas de certificados em instantes.",
        image: "/images/certificacao-flupp/importacao-planilhas.png"
      }
    ],
    relatedServices: ["plataformas-digitais"]
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
      author: "Andresa Alcântara",
      role: "Proprietária",
      company: "Coentro"
    },
    image: "/images/coentro-erp.png",
    relatedServices: ["sistemas-internos", "automacoes"]
  },
  {
    slug: "reformulacao-paginas-institucionais",
    name: "Reformulação da Página: Prêmio FLUPP de Educação",
    client: "Fundação Lucia e Pelerson Penido — FLUPP",
    category: "Sites Institucionais",
    challenge: "A página anterior do prêmio precisava de uma renovação visual e estrutural para organizar melhor as regras, categorias e cronograma do edital, além de oferecer um fluxo de inscrição mais atrativo e com confirmação visual clara para os educadores.",
    solution: "Reformulação completa da página com novo layout, blocos visuais e cards explicativos (Quem Pode Participar, Como Participar e Etapas de Avaliação), integração com as playlists das edições anteriores e uma experiência de inscrição enriquecida com animação de confetes coloridos para celebrar o sucesso da submissão.",
    impact: "Maior clareza para os professores e estudantes sobre os critérios de participação, navegação mais fluida pelo regulamento e feedback imediato e engajador na confirmação da inscrição.",
    description: "O Prêmio FLUPP de Educação é a principal iniciativa de reconhecimento e valorização dos educadores e coordenadores da rede pública de Educação Básica do Vale do Paraíba, contando também com categoria para estudantes de licenciatura.\n\nA página do prêmio passou por uma reformulação completa de design e usabilidade conduzida pela MENOS. Reestruturamos toda a hierarquia de conteúdo: criamos seções claras para o público-alvo, detalhes do regulamento, premiações, etapas de avaliação e uma galeria integrada com as playlists das edições passadas.\n\nNo fluxo de submissão, aprimoramos o formulário tornando-o mais ágil e adicionamos uma celebração visual com confetes coloridos ao concluir a inscrição, garantindo que o educador tenha clareza imediata e entusiasmo ao enviar seu relato de prática pedagógica.",
    keyFeatures: [
      "Novo layout institucional com tipografia editorial elegante e contrastes acolhedores.",
      "Cards visuais informativos: Quem Pode Participar, Como Participar e Nova Categoria (Estudantes de Licenciatura).",
      "Seção explicativa das 3 etapas de avaliação (Adequação ao edital, Revisão por Especialista e Revisão de Vídeo).",
      "Seção integrada com playlists em vídeo das edições anteriores do prêmio (2023, 2024 e 2025).",
      "Formulário de inscrição otimizado com validações e animação comemorativa de confetes coloridos ao submeter.",
      "Destaque claro para o regulamento oficial e prazos do edital."
    ],
    process: [
      "Alinhamento das diretrizes da nova edição do Prêmio FLUPP de Educação com a coordenação.",
      "Revisão e síntese dos textos, eliminando ambiguidades no regulamento e critérios de elegibilidade.",
      "Criação de novos componentes visuais (cards com selos, grids de etapas e embeds das edições passadas).",
      "Desenvolvimento da experiência do formulário de submissão com validações dinâmicas.",
      "Implementação de microinteração com confetes coloridos na confirmação de envio para reforçar o sucesso da inscrição."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas Confetti"],
    testimonial: {
      text: "A reformulação da página do Prêmio trouxe uma apresentação muito mais convidativa e clara para os professores e estudantes. O fluxo de inscrição ficou simples, visualmente acolhedor e com feedback imediato.",
      author: "Natália Vieira",
      role: "Coordenadora do Projeto",
      company: "Fundação Lucia e Pelerson Penido — FLUPP"
    },
    image: "/images/site-premio-flupp/Captura de tela 2026-09-25 233007.png",
    gallery: [
      {
        title: "Página Principal do Prêmio",
        category: "Hero & Apresentação",
        caption: "Capa de abertura com tipografia refinada e apresentação do propósito de valorização dos educadores do Vale do Paraíba.",
        image: "/images/site-premio-flupp/Captura de tela 2026-09-25 233007.png"
      },
      {
        title: "Elegibilidade e Categorias",
        category: "Quem Pode Participar",
        caption: "Destaque para educadores da rede pública e inclusão da nova categoria para estudantes de licenciatura.",
        image: "/images/site-premio-flupp/Captura de tela 2026-09-25 232509.png"
      },
      {
        title: "Etapas de Avaliação e Regulamento",
        category: "Critérios & Formulário",
        caption: "Cards das 3 etapas avaliativas (Adequação, Especialista e Vídeo) e chamada para o formulário de inscrição.",
        image: "/images/site-premio-flupp/Captura de tela 2026-09-25 232516.png"
      },
      {
        title: "Histórico e Premiados Anteriores",
        category: "Edições Anteriores",
        caption: "Seção com playlists de vídeos dos projetos vencedores das edições de 2023, 2024 e 2025.",
        image: "/images/site-premio-flupp/Captura de tela 2026-09-25 232534.png"
      }
    ],
    relatedServices: ["design-e-melhoria-de-interfaces"]
  }
];
