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
    slug: "automacoes",
    name: "Automações",
    tagline: "Reduza tarefas repetitivas e libere tempo para o que importa.",
    shortDescription: "Soluções inteligentes para integrar suas ferramentas favoritas e eliminar o trabalho manual repetitivo de uma vez por todas.",
    description: "Tarefas repetitivas drenam a energia criativa e produtiva de qualquer equipe. Desenvolvemos automações que conectam suas ferramentas do dia a dia (como e-mail, planilhas, Slack, CRMs e bancos de dados), realizando fluxos de trabalho inteiros sem que ninguém precise mover um dedo. O resultado é menos esforço manual e zero erro humano.",
    problemsSolved: [
      "Copiar e colar dados manualmente entre sistemas.",
      "Esquecimento de envio de e-mails ou alertas importantes.",
      "Demora no processamento de leads ou cadastros.",
      "Falha de sincronização de informações entre equipes."
    ],
    applications: [
      "Envio automatizado de relatórios semanais por e-mail ou WhatsApp.",
      "Sincronização instantânea de dados de vendas para o financeiro.",
      "Geração automática de contratos em PDF a partir de um formulário preenchido.",
      "Alertas inteligentes no Slack ou WhatsApp quando um evento crítico ocorre."
    ],
    benefits: [
      "Economia de horas semanais de trabalho manual.",
      "Redução drástica de falhas operacionais e erros de digitação.",
      "Respostas mais rápidas para clientes e parceiros.",
      "Processos padronizados e documentados em código."
    ],
    steps: [
      "Mapeamento do fluxo de trabalho manual atual.",
      "Identificação dos pontos de atrito e definição dos gatilhos e ações.",
      "Desenvolvimento e conexão segura via APIs.",
      "Fase de testes assistidos e ajustes finos.",
      "Entrega com monitoramento ativo de falhas."
    ],
    faq: [
      {
        question: "Preciso de um programador na minha equipe para gerenciar a automação?",
        answer: "Não. Entregamos a automação completamente configurada, testada e rodando em nuvem. Se precisar de ajustes futuros, nossa equipe de suporte cuida disso para você."
      },
      {
        question: "Quais ferramentas vocês conseguem integrar?",
        answer: "Qualquer ferramenta que possua uma API (Interface de Programação) aberta ou estruturada, como Planilhas Google, Airtable, Notion, Slack, WhatsApp Business, Trello, Asana, CRMs (RD Station, Hubspot), gateways de pagamento, ERPs, entre outras."
      }
    ]
  },
  {
    slug: "sistemas-internos",
    name: "Sistemas Internos",
    tagline: "Organize sua operação em um único painel feito sob medida.",
    shortDescription: "Sistemas personalizados projetados especificamente para organizar equipes, informações, rotinas e processos administrativos da sua empresa.",
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
      "Ferramentas de controle financeiro simplificado para o fluxo de caixa."
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
    slug: "formularios-inteligentes",
    name: "Formulários Inteligentes",
    tagline: "Colete dados sem atrito e crie fluxos lógicos agradáveis.",
    shortDescription: "Formulários interativos estruturados com fluxos dinâmicos de perguntas, validações avançadas e automação de respostas.",
    description: "Ninguém gosta de preencher formulários longos e confusos. Desenvolvemos formulários focados na experiência do usuário (UX), que exibem perguntas condicionalmente com base nas respostas anteriores. Após o preenchimento, os dados são limpos, salvos no local correto e já engatilham ações como e-mails de confirmação ou alertas para a equipe.",
    problemsSolved: [
      "Altas taxas de abandono em cadastros complexos.",
      "Recebimento de dados incompletos ou formatos incorretos (como e-mails inválidos).",
      "Trabalho manual de ler cada resposta e enviar retornos individualmente.",
      "Formulários que parecem feios ou que não funcionam direito no celular."
    ],
    applications: [
      "Formulários de briefing ou triagem de clientes qualificados.",
      "Fichas de inscrição para prêmios, editais e submissões com uploads de arquivos.",
      "Pesquisas de satisfação interativas (NPS) com ramificação de perguntas.",
      "Sistemas de onboarding de clientes com fluxos de assinatura ou termos."
    ],
    benefits: [
      "Redução expressiva no abandono de formulários.",
      "Qualidade e precisão dos dados recebidos através de validações rígidas.",
      "Automação instantânea de e-mails de boas-vindas ou PDFs anexados.",
      "Visual moderno que complementa a estética de marcas sofisticadas."
    ],
    steps: [
      "Modelagem lógica do fluxo de perguntas (árvore de decisão).",
      "Design de interface focado na redução da carga cognitiva.",
      "Desenvolvimento com validações de dados no lado do cliente e servidor.",
      "Integração com bancos de dados, planilhas ou plataformas de marketing.",
      "Ajustes de acessibilidade (leitores de tela e navegação por teclado)."
    ],
    faq: [
      {
        question: "Posso limitar o número de respostas ou o prazo do formulário?",
        answer: "Sim. É possível configurar regras automatizadas para encerrar o recebimento em uma data específica ou quando atingir um limite predefinido de preenchimentos."
      },
      {
        question: "Os uploads de arquivos são seguros?",
        answer: "Sim. Todos os uploads passam por verificação de tipo de arquivo e tamanho limite, sendo salvos em servidores de nuvem seguros com links protegidos."
      }
    ]
  },
  {
    slug: "credenciamento-e-eventos",
    name: "Credenciamento e Eventos",
    tagline: "Do convite à certificação, uma jornada sem filas.",
    shortDescription: "Sistemas completos para gestão de eventos: inscrições online, controle de acesso por QR Code, certificados automatizados e gestão de presença.",
    description: "Evite a burocracia e a desorganização em eventos de qualquer porte. Criamos sistemas que gerenciam toda a jornada do participante: a inscrição em múltiplos lotes, a seleção de oficinas, a leitura rápida de QR Code na entrada via celular dos organizadores, e o disparo automático de certificados personalizados em PDF após o término.",
    problemsSolved: [
      "Filas gigantescas na recepção de eventos e checagem manual em papel.",
      "Trabalho manual insustentável para gerar e enviar centenas de certificados.",
      "Dificuldade de controlar a lotação de salas de oficinas simultâneas.",
      "Falta de relatórios de presença em tempo real."
    ],
    applications: [
      "Sistemas de credenciamento para congressos, conferências e festivais.",
      "Plataforma de gestão de presença para aulas, palestras e cursos.",
      "Gerador automatizado de crachás e certificados em lote.",
      "Controle de acesso por check-in rápido via câmera do smartphone."
    ],
    benefits: [
      "Experiência premium para o participante, sem esperas ou atritos.",
      "Eliminação total do trabalho manual pós-evento (certificados disparados por e-mail).",
      "Dados precisos sobre quem compareceu e quais atividades foram mais populares.",
      "Redução da necessidade de equipes numerosas na recepção."
    ],
    steps: [
      "Mapeamento do fluxo de credenciamento e limites físicos do local.",
      "Desenvolvimento do sistema de inscrições e emissão de ingressos com QR Code.",
      "Interface web para credenciadores lerem os códigos sem app adicional.",
      "Desenho do template do certificado e lógica de emissão automática.",
      "Acompanhamento técnico e monitoramento no dia do evento."
    ],
    faq: [
      {
        question: "Os credenciadores precisam instalar algum aplicativo no celular?",
        answer: "Não. Fornecemos um painel web seguro otimizado para celular. Basta abrir a URL no navegador do smartphone, fazer login e usar a própria câmera para ler os QR Codes dos participantes."
      },
      {
        question: "Como funciona a emissão dos certificados?",
        answer: "O sistema valida quem compareceu ao evento (ou obteve a presença mínima nas oficinas) e envia por e-mail um link personalizado onde o participante pode baixar seu certificado com autenticação de autenticidade."
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
