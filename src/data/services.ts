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
      "Assistentes internos que respondem dúvidas com base nos documentos da empresa."
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
      "Credenciamento e gestão de eventos: inscrições, check-in por QR Code, controle de presença e certificados."
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
      "Páginas de lançamento de produtos ou serviços específicos."
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
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    tagline: "Transforme dados dispersos em decisões estratégicas visuais.",
    shortDescription: "Desenvolvimento de painéis dinâmicos para visualização de métricas, indicadores-chave (KPIs) e consolidação de fontes de dados.",
    description: "Ter dados não é o mesmo que ter clareza. Centralizamos informações que hoje estão espalhadas em diferentes planilhas, bancos de dados e APIs, transformando-as em gráficos elegantes, interativos e fáceis de ler. Diga adeus ao trabalho manual de puxar números para montar relatórios de diretoria no final do mês.",
    problemsSolved: [
      "Perda de tempo consolidando planilhas no fechamento do mês.",
      "Dificuldade em acompanhar o desempenho de vendas ou metas em tempo real.",
      "Gráficos confusos ou relatórios estáticos em PDF difíceis de interpretar.",
      "Decisões baseadas no 'achismo' pela falta de visualização clara de métricas."
    ],
    applications: [
      "Painel de controle financeiro com fluxo de caixa, receitas e despesas previstas.",
      "Dashboard de marketing e vendas unificando dados de anúncios e CRM.",
      "Visualizador de progresso de projetos com metas e entregas por equipe.",
      "Relatórios interativos públicos para prestação de contas no terceiro setor."
    ],
    benefits: [
      "Visão clara e instantânea do status atual da sua organização.",
      "Fim do retrabalho manual para a confecção de relatórios periódicos.",
      "Decisões de negócios mais rápidas e fundamentadas em dados reais.",
      "Interface limpa que destaca apenas o que é verdadeiramente estratégico."
    ],
    steps: [
      "Identificação dos principais indicadores de sucesso (KPIs) da organização.",
      "Mapeamento e conexão com as fontes de dados atuais (APIs, bancos, planilhas).",
      "Modelagem de dados e higienização de informações antigas.",
      "Design e desenvolvimento do painel com gráficos responsivos e rápidos.",
      "Ajustes de filtros dinâmicos e acesso seguro para diferentes níveis hierárquicos."
    ],
    faq: [
      {
        question: "Os dados do dashboard atualizam sozinhos?",
        answer: "Sim. Configuramos rotinas automáticas de sincronização que puxam as informações mais recentes das suas planilhas ou sistemas em intervalos definidos (ex: a cada hora, diariamente ou em tempo real)."
      },
      {
        question: "Posso exportar os gráficos para PDF ou imagem?",
        answer: "Sim, os dashboards contam com recursos nativos para exportação de relatórios resumidos e tabelas de dados em formatos amigáveis (como CSV, PDF ou XLS)."
      }
    ]
  },
  {
    slug: "integracao-de-processos",
    name: "Integração de Processos",
    tagline: "Faça seus sistemas conversarem a mesma língua.",
    shortDescription: "Pontes tecnológicas entre planilhas, bancos de dados, APIs de ERPs, impressoras físicas e softwares legados.",
    description: "Muitas empresas operam com ilhas de informação: o estoque não fala com o faturamento, que por sua vez não fala com a impressora da expedição. Nós construímos integrações de processos robustas e silenciosas que fazem com que sistemas diferentes troquem dados em tempo real, automatizando passos operacionais complexos.",
    problemsSolved: [
      "Digitação redundante (digitar o mesmo pedido no site e no faturamento).",
      "Sistemas antigos que parecem 'fechados' e não se integram com novas soluções.",
      "Discrepâncias de dados entre o estoque físico e o catálogo online.",
      "Operações físicas (como impressão térmica ou leitores) desconectadas do software web."
    ],
    applications: [
      "Integração de vendas de e-commerce direto com ERP Coentro ou Bling.",
      "Disparo automático de impressão de etiquetas térmicas no estoque após aprovação do pedido.",
      "Sincronização de dados de RH com o sistema de crachás ou acessos físicos.",
      "Conexão de planilhas locais com sistemas corporativos em nuvem."
    ],
    benefits: [
      "Eliminação completa do retrabalho por digitação redundante.",
      "Sincronização instantânea das informações cruciais do negócio.",
      "Melhoria na velocidade de resposta de entrega e faturamento.",
      "Aproveitamento e modernização de sistemas antigos (legados) sem precisar trocá-los."
    ],
    steps: [
      "Mapeamento técnico das APIs e bancos dos sistemas a serem integrados.",
      "Desenho do fluxo lógico de envio e tradução dos formatos de dados.",
      "Desenvolvimento de middleware seguro para processamento e tratamento de falhas.",
      "Testes de resiliência (garantir que se um sistema cair, o outro não perca o dado).",
      "Implantação e monitoramento preventivo de sincronização."
    ],
    faq: [
      {
        question: "O que acontece se a internet cair ou um dos sistemas apresentar erro?",
        answer: "Desenvolvemos nossas integrações com mecanismos de 'Fila de Espera' e retentativa automática. Se um sistema de destino estiver offline, os dados ficam salvos in segurança e são reprocessados assim que a conexão se reestabelecer."
      },
      {
        question: "Vocês conseguem integrar sistemas muito antigos ou sem API?",
        answer: "Em muitos casos sim. Avaliamos a viabilidade de conexões via banco de dados direto, exportação automática de arquivos (como XML/CSV) ou automação por robôs (RPA) caso o sistema seja totalmente fechado."
      }
    ]
  },
  {
    slug: "solucoes-com-ia",
    name: "Soluções com IA",
    tagline: "Inteligência artificial aplicada ao seu fluxo de trabalho real.",
    shortDescription: "Aplicações práticas de IA para apoiar atendimento ao cliente, análise automatizada de documentos, triagem e organização interna.",
    description: "IA não precisa ser ficção científica ou uma conversa genérica com um robô. Criamos aplicações práticas que usam inteligência artificial para resolver problemas específicos da sua rotina de trabalho: ler e extrair dados de notas fiscais digitalizadas, realizar pré-análise de petições judiciais, ou construir assistentes de atendimento treinados com as políticas específicas do seu negócio.",
    problemsSolved: [
      "Análise exaustiva e leitura manual de centenas de PDFs e contratos.",
      "Atendimento ao cliente lento por falta de respostas rápidas sobre políticas internas.",
      "Dificuldade em categorizar ou extrair informações úteis de mensagens recebidas.",
      "Processamento demorado de reclamações ou feedbacks textuais."
    ],
    applications: [
      "Assistentes de atendimento integrados no WhatsApp com base de conhecimento própria da empresa.",
      "Extrator automático de dados em lote para PDFs, contratos e relatórios digitalizados.",
      "Análise de sentimentos e triagem de tíquetes de suporte com encaminhamento inteligente.",
      "Ferramentas internas de redação técnica orientada por diretrizes de marca."
    ],
    benefits: [
      "Redução drástica no tempo de resposta para triagem de informações complexas.",
      "Atendimento 24/7 preciso e alinhado aos padrões da empresa.",
      "Automação de tarefas cognitivas repetitivas com alta taxa de acerto.",
      "Uso de inteligência artificial de forma segura, privada e controlada."
    ],
    steps: [
      "Diagnóstico e modelagem do caso de uso ideal de inteligência artificial.",
      "Estruturação da base de dados e conhecimento (vetorização de documentos).",
      "Criação de prompts e lógica de validação de saídas (evitando 'alucinações').",
      "Desenvolvimento de interface simples para a interação humana com a IA.",
      "Monitoramento, curadoria humana de respostas e ajustes de performance."
    ],
    faq: [
      {
        question: "A inteligência artificial pode mentir ou inventar respostas?",
        answer: "Aplicações de IA podem 'alucinar' se não forem bem calibradas. Para evitar isso, desenvolvemos sistemas baseados em RAG (Retrieval-Augmented Generation), limitando a IA a responder estritamente com base nos documentos e regras fornecidas pela sua empresa."
      },
      {
        question: "Nossos dados de clientes serão usados para treinar modelos públicos?",
        answer: "Não. Utilizamos APIs comerciais com termos estritos de privacidade empresarial, garantindo por contrato que nenhum dado de interação ou documento enviado por sua empresa seja usado para treinar modelos externos de terceiros."
      }
    ]
  },
  {
    slug: "design-e-melhoria-de-interfaces",
    name: "Design e Melhoria de Interfaces",
    tagline: "Simplifique a usabilidade para encantar quem utiliza.",
    shortDescription: "Reestruturação e refatoração visual de interfaces antigas para torná-las limpas, bonitas, rápidas e fáceis de usar.",
    description: "Sistemas excelentes por dentro podem falhar se forem confusos por fora. Analisamos sistemas legados, portais ou fluxos digitais que frustram usuários devido ao excesso de informação visual. Nós redesenhamos e reconstruímos essas telas com foco na simplicidade, alinhando estética moderna, contraste adequado e acessibilidade completa.",
    problemsSolved: [
      "Clientes reclamando que o sistema atual é 'feio' ou 'difícil de mexer'.",
      "Erros recorrentes cometidos por usuários devido a botões mal sinalizados.",
      "Sistemas que não seguem a identidade visual atualizada da marca.",
      "Falta de acessibilidade que impede pessoas com deficiências de utilizarem o serviço."
    ],
    applications: [
      "Redesenho de painéis administrativos corporativos legados.",
      "Otimização do fluxo de checkout ou carrinho em sistemas de venda.",
      "Reformulação de fluxos complexos de onboarding de novos usuários.",
      "Melhoria de contraste, legibilidade e navegabilidade de portais públicos."
    ],
    benefits: [
      "Redução no volume de chamados de suporte por dúvidas de usabilidade.",
      "Aumento na taxa de conversão e finalização de tarefas nos sistemas.",
      "Satisfação e retenção aprimorada de clientes e colaboradores.",
      "Interface moderna que valoriza a marca institucionalmente."
    ],
    steps: [
      "Auditoria de usabilidade (heurística) do sistema existente.",
      "Mapeamento das telas críticas e pontos frequentes de desistência.",
      "Desenho de protótipos focados no minimalismo e na redução de passos.",
      "Validação das melhorias de acessibilidade digital.",
      "Codificação da nova interface integrada ao sistema existente."
    ],
    faq: [
      {
        question: "Precisamos refazer todo o sistema por trás para mudar o design?",
        answer: "Não necessariamente. Muitas vezes conseguimos atuar apenas na camada visual e na experiência de front-end, mantendo o banco de dados e as regras de negócio existentes intactos."
      },
      {
        question: "Como vocês medem se o novo design é melhor que o antigo?",
        answer: "Realizamos testes de tarefas com usuários reais medindo taxas de sucesso (se conseguem completar uma ação), tempos de conclusão de tarefas e feedbacks qualitativos de facilidade de uso antes e após o redesenho."
      }
    ]
  }
];
