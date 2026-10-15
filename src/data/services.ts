export interface Service {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  problemsSolved: string[];
  applications: string[];
  benefits: string[];
  steps: string[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "camadas-agenticas",
    name: "Camadas Agênticas",
    tagline: "Agentes de IA trabalhando sobre as ferramentas que você já usa.",
    shortDescription: "Uma camada de agentes de IA sobre as aplicações e serviços que sua empresa já usa. Começamos por um diagnóstico dos seus processos para definir onde e como a IA entra.",
    description: "Sua empresa já tem e-mail, planilhas, CRM, ERP e outras ferramentas funcionando. Em vez de trocar tudo, criamos uma camada de agentes de IA por cima delas: agentes que leem, decidem dentro de regras claras e executam tarefas entre os sistemas, sempre com supervisão humana nos pontos que importam. Tudo começa por um diagnóstico dos seus processos, para definir onde e como a IA entra.",
    problemsSolved: [
      "Equipes copiando e colando dados entre sistemas todos os dias.",
      "Tarefas que dependem de alguém ler, interpretar e encaminhar mensagens e documentos.",
      "Processos que travam quando a pessoa responsável não está disponível.",
      "Falta de clareza sobre onde a IA realmente ajudaria na operação."
    ],
    applications: [
      "Agentes que triam e encaminham solicitações recebidas por e-mail ou WhatsApp.",
      "Agentes que extraem dados de documentos e preenchem seus sistemas.",
      "Rotinas que acompanham prazos e avisam a pessoa certa na hora certa.",
      "Assistentes internos que respondem dúvidas com base nos documentos da empresa.",
      "Integração entre planilhas, bancos de dados, APIs de ERPs e sistemas antigos, sem digitação duplicada."
    ],
    benefits: [
      "Menos trabalho manual e repetitivo para a equipe.",
      "Processos que seguem regras claras e ficam registrados.",
      "Aproveitamento das ferramentas que a empresa já usa, sem migração forçada.",
      "Supervisão humana definida onde o risco é maior."
    ],
    steps: [
      "Diagnóstico dos processos e definição de onde a IA entra.",
      "Desenho dos agentes, regras de decisão e pontos de aprovação humana.",
      "Conexão segura com as aplicações e serviços existentes.",
      "Fase de testes assistidos e ajustes finos.",
      "Entrega com monitoramento e curadoria contínua."
    ],
    faq: [
      {
        question: "Preciso trocar os sistemas que minha empresa já usa?",
        answer: "Não. A camada de agentes se conecta ao que você já tem, por APIs e integrações. A ideia é aproveitar as ferramentas atuais, não substituí-las."
      },
      {
        question: "A IA toma decisões sozinha?",
        answer: "Apenas dentro das regras definidas em conjunto com você. Em ações sensíveis, o agente prepara a decisão e uma pessoa aprova antes de executar."
      }
    ]
  },
  {
    slug: "sistemas-internos",
    name: "Sistemas Internos",
    tagline: "Organize sua operação em um único painel feito sob medida.",
    shortDescription: "Sistemas personalizados projetados especificamente para organizar equipes, informações, rotinas e processos administrativos da sua empresa, incluindo credenciamento e gestão de eventos.",
    description: "Sistemas prontos costumam vir com excesso de botões que você nunca usa ou com a falta de recursos que você precisa de verdade. Criamos sistemas internos desenhados especificamente para a realidade e dinâmica operacional da sua empresa. Sem excessos, sem complexidades desnecessárias: apenas o que sua equipe precisa para trabalhar com clareza e fluidez.",
    problemsSolved: [
      "Operações inteiras rodando em planilhas que travam ou são editadas erroneamente.",
      "Falta de controle de permissões sobre quem pode ver ou editar dados.",
      "Dificuldade de rastrear o andamento de processos internos.",
      "Dificuldade de treinar novos colaboradores devido à complexidade de softwares genéricos."
    ],
    applications: [
      "Painel de gestão de ordens de serviço personalizados.",
      "Sistema de gerenciamento de estoque integrado com expedição.",
      "Intranet para centralizar documentos, manuais de treinamento e comunicados.",
      "Ferramentas de controle financeiro simplificado para o fluxo de caixa.",
      "Credenciamento e gestão de eventos: inscrições, check-in por QR Code, controle de presença e certificados.",
      "Painéis e dashboards com os indicadores da operação, atualizados sem montar relatório à mão."
    ],
    benefits: [
      "Aumento na produtividade operacional da equipe.",
      "Redução do tempo gasto no treinamento de novos colaboradores.",
      "Total controle sobre a segurança e acesso às informações.",
      "Sistema que cresce e evolui junto com a empresa."
    ],
    steps: [
      "Entrevistas com a equipe que usará o sistema no dia a dia.",
      "Esboço de telas (wireframes) e fluxos de navegação simplificados.",
      "Desenvolvimento ágil com entregas incrementais.",
      "Importação e higienização de dados antigos.",
      "Treinamento, implantação assistida e suporte contínuo."
    ],
    faq: [
      {
        question: "O sistema será nosso ou pagaremos mensalidade vitalícia?",
        answer: "O código-fonte e o banco de dados são seus. Não cobramos licenças de usuário. Os custos contínuos limitam-se apenas à hospedagem em nuvem (servidores), que estruturamos para ser o mais econômica possível."
      },
      {
        question: "Os credenciadores de um evento precisam instalar algum aplicativo?",
        answer: "Não. Fornecemos um painel web seguro otimizado para celular. Basta abrir o endereço no navegador, fazer login e usar a câmera para ler os QR Codes dos participantes."
      },
      {
        question: "Consigo importar dados de planilhas antigas?",
        answer: "Sim, realizamos o processo de limpeza e migração de dados de suas planilhas antigas ou sistemas anteriores diretamente para o novo banco de dados."
      }
    ]
  },
  {
    slug: "plataformas-digitais",
    name: "Plataformas Digitais",
    tagline: "Espaços completos para aproximar pessoas e impulsionar comunidades.",
    shortDescription: "Ambientes web completos e interativos voltados para projetos sociais, programas institucionais, equipes descentralizadas e comunidades.",
    description: "Seja um portal de membros, uma plataforma de aprendizado ou um ambiente colaborativo para o terceiro setor, nós construímos plataformas digitais robustas, seguras e com excelente usabilidade. Combinamos interfaces elegantes com lógicas de banco de dados modernas para criar espaços que engajam e aproximam pessoas.",
    problemsSolved: [
      "Comunidades dispersas em várias redes sociais ou aplicativos de mensagem.",
      "Falta de um espaço unificado para disponibilizar materiais, cursos ou discussões.",
      "Dificuldade em gerenciar cadastros de membros de forma segura e organizada.",
      "Dificuldade em medir o engajamento e a participação dos usuários."
    ],
    applications: [
      "Portais de membros com área logada exclusiva e conteúdos restritos.",
      "Plataformas de capacitação e ensino online simplificado (EAD).",
      "Espaços de co-criação e fóruns dedicados para redes de impacto.",
      "Sistemas de votação ou orçamento participativo para organizações comunitárias."
    ],
    benefits: [
      "Fortalecimento da marca e do senso de pertencimento do público.",
      "Centralização de dados cadastrais e históricos em um único local seguro.",
      "Autonomia para publicação de novos conteúdos e moderação simples.",
      "Interface responsiva que funciona perfeitamente em celulares e computadores."
    ],
    steps: [
      "Definição das personas e jornada ideal do usuário dentro da plataforma.",
      "Prototipagem de alta fidelidade e design visual alinhado à sua marca.",
      "Desenvolvimento de banco de dados escalável e mecanismos de autenticação seguros.",
      "Testes de segurança e carga para garantir estabilidade.",
      "Lançamento planejado e treinamento de administradores."
    ],
    faq: [
      {
        question: "A plataforma aceita pagamentos recorrentes ou doações?",
        answer: "Sim, podemos integrar gateways de pagamento nacionais e internacionais (como Stripe, ASAAS, Pagar.me) para cobranças de assinaturas, vendas pontuais ou captação de doações."
      },
      {
        question: "Os dados dos usuários estarão protegidos?",
        answer: "Sim, desenvolvemos seguindo as melhores práticas de segurança da informação e em total conformidade com a LGPD (Lei Geral de Proteção de Dados), com criptografia de senhas e canais seguros HTTPS."
      }
    ]
  },
  {
    slug: "sites-institucionais",
    name: "Sites Institucionais",
    tagline: "Sua identidade digital traduzida com clareza e elegância.",
    shortDescription: "Desenvolvimento de sites claros, rápidos, focados em conversão e completamente alinhados com o posicionamento da sua marca.",
    description: "Um bom site institucional não é um folheto digital estático. Ele é a porta de entrada dos seus clientes, a validação de sua credibilidade e uma ferramenta ativa de vendas. Criamos sites focados em performance, SEO e usabilidade, garantindo que a mensagem da sua marca seja transmitida sem ruídos, de forma leve e marcante.",
    problemsSolved: [
      "Sites lentos que demoram para carregar no celular.",
      "Layouts ultrapassados que não passam credibilidade comercial.",
      "Dificuldade de encontrar informações básicas sobre os serviços da empresa.",
      "Sites que não aparecem no Google ou que possuem formulários de contato quebrados."
    ],
    applications: [
      "Sites institucionais para estúdios criativos, consultorias e startups.",
      "Landing pages focadas em conversão de campanhas de tráfego pago.",
      "Portfólios profissionais com foco em conversão e agendamento.",
      "Páginas de lançamento de produtos ou serviços específicos.",
      "Reformulação de sites e interfaces existentes, com foco em clareza, contraste e acessibilidade."
    ],
    benefits: [
      "Carregamento ultrarrápido (pontuação máxima nos testes de performance).",
      "Otimização nativa de SEO para melhorar o posicionamento orgânico no Google.",
      "Design responsivo otimizado para celulares.",
      "Fácil atualização de textos e imagens através de arquivos de dados ou CMS."
    ],
    steps: [
      "Estudo do posicionamento da marca, tom de voz e concorrência.",
      "Arquitetura de informação e redação estratégica dos conteúdos.",
      "Design de interface personalizado (UI) focado em usabilidade (UX).",
      "Desenvolvimento de código limpo com Next.js.",
      "Otimização técnica para velocidade, sitemap e indexação."
    ],
    faq: [
      {
        question: "Vou conseguir alterar os textos do site no futuro?",
        answer: "Sim. Nossos sites são estruturados de forma modular, permitindo que você altere textos, imagens e dados facilmente através de arquivos simples de configuração ou pela integração com um painel de gerenciamento (CMS) amigável."
      },
      {
        question: "O site já vem adaptado para celular?",
        answer: "Com certeza. Aplicamos o conceito de 'Mobile-First' ou design responsivo completo. O layout se adapta perfeitamente a telas de celulares, tablets, notebooks e monitores ultra-wide."
      }
    ]
  },
  {
    slug: "aplicativos-mobile",
    name: "Aplicativos Mobile",
    tagline: "O que sua equipe e seus clientes precisam, no bolso.",
    shortDescription: "Aplicativos para iOS e Android pensados para o dia a dia de quem usa, integrados aos sistemas e dados que sua empresa já tem.",
    description: "Muita coisa acontece fora do computador: na rua, no balcão, no campo, na porta de um evento. Criamos aplicativos para iOS e Android desenhados para o uso real de quem está com o celular na mão, com poucas telas, fluxos curtos e integração direta com os sistemas e dados que sua empresa já tem.",
    problemsSolved: [
      "Equipes em campo anotando em papel ou mensagens soltas e digitando depois.",
      "Sistemas que só funcionam bem no computador e são difíceis de usar no celular.",
      "Clientes sem um canal simples para acompanhar pedidos, solicitações ou serviços.",
      "Dados da rua que chegam atrasados ou incompletos ao escritório."
    ],
    applications: [
      "Aplicativos de registro em campo, com fotos, formulários e localização.",
      "Aplicativos para clientes acompanharem pedidos, agendamentos ou solicitações.",
      "Leitura de QR Code e check-in para eventos e controle de acesso.",
      "Versão mobile de sistemas internos já existentes."
    ],
    benefits: [
      "Informação registrada no momento em que acontece.",
      "Telas simples, pensadas para quem usa todos os dias.",
      "Integração com os sistemas e dados que a empresa já tem.",
      "Uma base única para iOS e Android, com manutenção mais simples."
    ],
    steps: [
      "Conversa com quem vai usar o aplicativo no dia a dia.",
      "Desenho dos fluxos e telas, com o mínimo de passos possível.",
      "Desenvolvimento e integração com os sistemas existentes.",
      "Testes em aparelhos reais com usuários reais.",
      "Publicação nas lojas e acompanhamento nas primeiras semanas."
    ],
    faq: [
      {
        question: "O aplicativo funciona para iOS e Android?",
        answer: "Sim. Construímos uma base única que atende os dois sistemas, o que também facilita a manutenção ao longo do tempo."
      },
      {
        question: "Ele se conecta aos sistemas que já usamos?",
        answer: "Sim. O aplicativo é integrado aos sistemas e dados que sua empresa já tem, para que a informação circule sem digitação duplicada."
      }
    ]
  }
];
