# Guia de Edição e Manutenção — MENOS Estúdio Criativo

Este guia explica a estrutura do projeto da **MENOS** e como realizar edições de conteúdos, adicionar novos projetos, parceiros, depoimentos e configurar a integração do formulário de contato.

---

## 🚀 Como Executar o Projeto Localmente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

3. **Gerar versão de produção (compilação):**
   ```bash
   npm run build
   ```

4. **Executar servidor de produção:**
   ```bash
   npm run start
   ```

---

## 📁 Estrutura de Conteúdo Centralizada (TypeScript)

Para facilitar a manutenção, todos os textos e dados dinâmicos do site foram separados das interfaces gráficas e centralizados na pasta `src/data/`. A edição de conteúdos é feita alterando arquivos TypeScript simples.

### 1. Como Editar os Serviços
Arquivo: `src/data/services.ts`
Cada objeto de serviço no array de dados contém:
- `slug`: ID único na URL (ex: `"automacoes"` gera a página `/servicos/automacoes`).
- `name`: Título exibido nos cards e cabeçalhos.
- `tagline`: Frase curta de impacto sobre o serviço.
- `shortDescription`: Resumo de 2 linhas exibido nos cards da homepage e listagens.
- `description`: Descrição detalhada de 1 ou 2 parágrafos.
- `problemsSolved`: Lista de dores resolvidas (exibida em duas colunas).
- `applications`: Casos reais de uso e possibilidades práticas.
- `benefits`: Benefícios e retornos operacionais para o cliente.
- `steps`: Etapas específicas do processo de desenvolvimento desse serviço.
- `faq`: Array de perguntas e respostas frequentes.

### 2. Como Adicionar ou Editar Projetos (Portfólio)
Arquivo: `src/data/projects.ts`
Para adicionar um novo estudo de caso:
1. Abra o arquivo e adicione um novo objeto ao array `projects`.
2. Configure os campos obrigatórios:
   - `slug`: ID único na URL (gera a página `/projetos/[slug]`).
   - `name`: Título do projeto.
   - `client`: Nome da organização ou empresa atendida.
   - `category`: Categoria (ex: "Sistemas", "Automações", "Sites").
   - `challenge`: O desafio enfrentado pelo cliente.
   - `solution`: A solução criada pela MENOS.
   - `impact`: Resultado mensurável ou impacto de ganho de tempo/eficiência.
   - `description`: Texto corrido descrevendo o case.
   - `keyFeatures`: Recursos chaves desenvolvidos no sistema.
   - `process`: Etapas cronológicas do desenvolvimento deste projeto.
   - `techStack`: Tecnologias utilizadas (ex: `["Next.js", "TypeScript", "Tailwind CSS"]`).
   - `relatedServices`: Array contendo slugs de serviços associados (conecta e cria links automáticos entre as páginas).
   - `testimonial` (opcional): Depoimento do cliente relativo ao projeto.

### 3. Como Editar os Parceiros
Arquivo: `src/data/partners.ts`
Os parceiros são divididos por categorias:
- `"client"`: Clientes (aparecem na página de parceiros e no carrossel da home).
- `"institutional"`: Parceiros técnicos (Design, Branding, infraestrutura).
- `"collaborator"`: Profissionais que co-criam soluções (programadores, designers).
- `"vendor"`: Fornecedores recomendados de tecnologia em nuvem.

### 4. Como Editar os Depoimentos
Arquivo: `src/data/testimonials.ts`
Contém os feedbacks textuais dos clientes. Se você associar um `projectSlug` válido que exista em `projects.ts`, a página do respectivo estudo de caso exibirá automaticamente o depoimento no final da tela.

---

## ✉️ Formulário de Contato e Integração de APIs

Quando um usuário preenche o formulário na página `/contato`, o site realiza uma chamada interna tipo POST na rota do servidor Next.js:
[API Route: src/app/api/contact/route.ts](file:///c:/Users/laris/menos-site/src/app/api/contact/route.ts)

Atualmente, essa rota valida as informações recebidas e registra os dados de lead no console (`stdout`).

### Como conectar a serviços de e-mail (Resend, SendGrid, etc.)
Abra [src/app/api/contact/route.ts](file:///c:/Users/laris/menos-site/src/app/api/contact/route.ts) e insira sua lógica de serviço. Exemplo com a API do **Resend**:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ... dentro da função POST:
await resend.emails.send({
  from: 'MENOS Leads <leads@menos.studio>',
  to: 'menos.lab@gmail.com',
  subject: `Novo diagnóstico de: ${name} (${company})`,
  html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Problema:</strong> ${problemDescription}</p>`
});
```

### Como integrar com CRM ou webhooks de WhatsApp
Você pode adicionar requisições HTTP do tipo `fetch` dentro da rota `POST` para despachar os dados em formato JSON para plataformas como Hubspot, RD Station, ou integradores como Zapier e Make.

---

## 🧭 Decisões de posicionamento e de números (atualizado em 28/09/2026)

Registro do que foi decidido com o Paulo antes da revitalização visual do site. Vale mais que qualquer texto antigo do site que contradiga isto.

### Posicionamento
- A MENOS passa a se apresentar como **AI-driven**: desenvolvimento focado em IA, com curadoria humana especializada, times pequenos e próximos do cliente.
- **Não usar a expressão "software house"** em nenhum texto do site. O modelo de trabalho é esse, mas a palavra não entra.
- Frase institucional de referência: "Menos complexidade operacional. Mais resultado com software e IA."
- O tom antigo ("estúdio criativo", "terceiro setor") deixa de ser o eixo. Afeta hero, marquee, `metadata` do `layout.tsx` e a página `/a-menos`.
- Cuidado de identidade: "IA" não pode virar visual genérico de IA. A identidade deve transmitir critério humano e contenção (combina com o nome MENOS).

### Números comerciais (resultados medidos)
| Número | Regra de uso |
|---|---|
| 50% menos necessidade de **pessoas** em atividades operacionais | É sobre pessoas. Nunca escrever como redução de custo, de folha ou de horas. |
| Processo de até 3 semanas → menos de 1 hora | Vem do Melhores Cabeças. Ainda falta identificar qual processo é, para a legenda. |
| 11 de 13 atividades automatizadas ou simplificadas (~85%) | "Atividades de um fluxo mapeado", não "85% do trabalho". |
| Credenciamento de 1 min → menos de 5 s por pessoa (570 participantes, 11 oficinas) | Confirmado como medido. |
| 99,6% de realização das mentorias | Confirmado como medido. |

### Regras de apresentação (revisadas)
- **Regra anterior:** número sempre acoplado ao case.
- **Regra atual:** número pode aparecer **como dado geral** da MENOS (fora do case) e também dentro do case. Isso porque virão mais cases e o site precisa de uma leitura agregada.
- Continua valendo: dado geral deve ser apresentado como **resultado alcançado em projetos realizados**, nunca como garantia ("sempre", "garantimos"). Todo número geral deve ser rastreável até pelo menos um case listado.
- Com poucos cases, não chamar de "média". Preferir "em projetos como…" ou "até…".
- Afirmações sem número medido ficam como texto qualitativo até haver uma medida (ex.: % de etapas automatizadas).
- **Capacidade ≠ resultado.** "Podemos automatizar até 90% do fluxo de credenciamento, conforme o nível do projeto" é uma **capacidade/estimativa** informada pelo Paulo (28/09/2026), não um resultado medido. Deve aparecer com essa formulação ("até", "conforme o projeto") e **separada visualmente** dos resultados alcançados. Só vira resultado quando houver um case em que isso foi medido.
- Quando faltar um número real para uma afirmação, o Paulo busca nos outros cases e informa; não estimar nem arredondar por conta própria.
- Os números aparecem em **duas camadas**: uma seção de dados gerais na home e o detalhe dentro de cada case.

### Pendências
- Número do WhatsApp do botão final da home (`5511999999999`) é **provisório**; trocar depois.
- Identificar o processo das "3 semanas" do Melhores Cabeças.
- Mapear e medir a automação de credenciamento em geral (novo eixo de dados gerais).
- Paulo vai revisar o site, indicar onde os dados devem entrar e mandar referências visuais.

### Ferramentas de design
- Skill **design-motion-principles** (Kyle Zantos, MIT), instalada em `~/.claude/skills/`, só arquivos de texto, sem scripts. Usar para criar e auditar animações.
- **Impeccable** (Paul Bakaus): decidido **não instalar** (o plugin roda um binário e um hook a cada edição). Usar apenas as regras/anti-padrões dele como checklist manual.

### Alterações aplicadas em 28/09/2026 (certas, para revisão local)
- **Bug de animação corrigido:** as animações de entrada (`whileInView`/`animate`) usavam `initial={false}`, então os elementos já nasciam no estado final e nada se movia. Trocado por `variants` (hidden/visible) com spring `duration: 0.5, bounce: 0` (padrão Jakub Krehel, ver skill `design-motion-principles`), respeitando `prefers-reduced-motion` via `useReducedMotion()` do framer-motion. Afeta hero, grid de problemas, grid de serviços, cases em destaque e timeline de método, todos em [src/app/page.tsx](src/app/page.tsx).
- **Copy do hero e do manifesto** ([src/app/page.tsx](src/app/page.tsx)) e **metadados** ([src/app/layout.tsx](src/app/layout.tsx)) atualizados para o posicionamento AI-driven decidido (sem a palavra "software house", sem o antigo tom "estúdio criativo/terceiro setor" no título e na descrição do site).
- **Verificado:** `npx tsc --noEmit` sem erros; `npm run build` sem erros; build de produção testado no browser (`next start`), sem erros de console; conteúdo renderiza visível (não preso em opacidade 0).
- **Nota técnica:** durante `npm run dev`, o console mostra um aviso de "hydration mismatch" nos elementos animados — é ruído conhecido do React 19 + Framer Motion em modo dev (Framer aplica estilo via ref logo após montar, e o novo detector de hidratação do React sinaliza isso mesmo sendo o comportamento esperado). Não aparece em produção (`next start`), testado e confirmado limpo.
- **Ainda não alterado (fora do escopo de hoje):** página `/a-menos` (bio, "o que não somos"), `Footer.tsx` ("MENOS Estúdio Criativo de Tecnologia"), `termos`/`privacidade` (mencionam "estúdio criativo"), `services.ts`/filtro de projetos (menções a "terceiro setor" como categoria, essas podem ficar — são segmento de cliente, não posicionamento), número de WhatsApp de exemplo, seção de dados/números comerciais, labels fictícios do `SimplificationVisual.tsx` (ex.: "Latência: 1.2ms").
- Criado `.claude/launch.json` para rodar o preview local (`npm run dev`, porta 3000) e testado também com `npm run start`.

### Alterações aplicadas em 28/09/2026 (rodada 2 — feedback visual do Paulo)
- **Bug real corrigido:** em `/contato`, o número de WhatsApp exibido (+55 11 95291-7968, real) linkava para o número de exemplo `5511999999999`. Corrigido. Esse mesmo número real agora é usado em todos os links de WhatsApp do site (CTA final da home, rodapé, botão flutuante) — o número de exemplo não existe mais em lugar nenhum.
- **Removida a faixa em movimento** ("menos é mais / menos burocracia...") da home — julgada símbolo genérico. CSS morto (`@keyframes marquee`, `.animate-marquee`) removido junto.
- **Removido o link do GitHub** do rodapé e da página de contato (ícone + link).
- **Adicionado botão flutuante de WhatsApp** ([src/components/WhatsAppButton.tsx](src/components/WhatsAppButton.tsx)), fixo no canto inferior direito em todas as páginas, com entrada única (spring, sem loop) e respeito a `prefers-reduced-motion`. Sobe temporariamente enquanto o banner de cookies (mesmo canto) ainda não foi respondido.
- **Removidos rótulos "estilo terminal" genéricos:** `DETECÇÃO_0X` nos cards de problema (home) e `[ CARREGANDO_FORMULARIO ]` no formulário de contato (virou "Carregando formulário..."). Removido também o card de fallback `PROJETO_CASE_0X` da seção de projetos em destaque — era código morto (nenhum projeto está sem imagem hoje).
- **Pulso em loop removido** do selo "X telas" nos cards de projeto (contraria a regra da skill `design-motion-principles` contra motion decorativo em loop).
- **Ainda pendente (rótulos "estilo terminal"):** `projetos/[slug]/page.tsx` (ex.: `[ COENTRO ERP ]`) e outras páginas de detalhe/serviço ainda têm o mesmo padrão de rótulo tipo-código; não mexido ainda porque exige revisão própria dessas páginas.
- **Decisões grandes de identidade visual, aguardando definição antes de construir:** paleta verde (tom exato), substituição do visual "flow_optimizer" por uma animação de IA/rede, símbolo da marca (círculo com traço de menos) + animação, e carrossel "3D" para os cases. Ver conversa com o Paulo de 28/09/2026.
- **Bug relatado, não reproduzido:** Paulo relatou que as páginas aparecem "na topbar, não abaixo dela". Testado em `/`, `/a-menos`, `/servicos`, `/projetos`, `/contato` (desktop, ~800px de largura) sem overlap — conteúdo sempre renderiza com espaçamento correto abaixo do header fixo. Precisa de página + dispositivo específicos para reproduzir.

### Alterações aplicadas em 28/09/2026 (rodada 3 — paleta verde + conceitos visuais)
- **Paleta trocada para verde-petróleo escuro**, a partir do tom exato dado pelo Paulo (`#143c3c`). Escala completa gerada em HSL (mesma matiz/saturação, 11 tons de `brand-50` a `brand-950`) em [src/app/globals.css](src/app/globals.css), com contraste WCAG checado (branco sobre `brand-900` = 12.06:1, `brand-600` sobre branco = 5.26:1). `#143c3c` é exatamente `brand-900`.
  - Todo uso de `blue-*` (Tailwind, ~140 ocorrências em ~20 arquivos) virou `brand-*` — era literalmente a cor de destaque do site inteiro.
  - `slate-900` (o token `--primary` do design system — botões, logo, títulos) virou `brand-950`. Cinzas neutros (`slate-50` a `slate-800`, usados em texto de corpo, bordas, fundos) **não foram alterados** — ficam neutros de propósito.
  - Script de geração da escala: `/tmp/palette2.js` (não versionado, só para referência de como os valores foram calculados).
- **Símbolo da marca construído**: [src/components/MenosMark.tsx](src/components/MenosMark.tsx) — círculo + traço (SVG), a partir das referências que o Paulo enviou (mesmo símbolo que funciona como "menos" e como a letra E de "MENOS"). Usado no Header e no Footer no lugar do tracinho antigo. No Header, tem animação de **formação** ao carregar: o traço aparece primeiro, depois o círculo se desenha ao redor — a ideia de "evolução do processo de simplificar" que o Paulo descreveu. Respeita `prefers-reduced-motion`.
  - **Não implementado ainda**: o lockup tipográfico completo (o "E" de "MENOS" virando o símbolo, como no print enviado) — o Paulo disse que o logo ainda não está fechado ("não temos ele estruturado definitivamente"), então por ora o símbolo fica como ícone ao lado da palavra "menos", não substituindo uma letra.
- **Carrossel de cases**: [src/components/CaseCarousel.tsx](src/components/CaseCarousel.tsx) substitui a lista vertical "de cima para baixo" da home por um carrossel horizontal com profundidade (cards laterais encolhem/apagam/giram levemente — efeito "coverflow" via CSS transform, sem WebGL). Mostra **todos** os cases (5), não só 3 destaques. Navegação por arraste/toque nativo (scroll-snap), setas, indicadores clicáveis. O efeito de profundidade (que usa rotação/escala presos ao scroll) é um gatilho vestibular — desligado com `prefers-reduced-motion`, mantendo só a navegação funcional.
- **Visual do hero trocado**: `SimplificationVisual.tsx` (removido, tinha rótulos falsos tipo "INPUT_CHAOS"/"LATÊNCIA: 1.2ms") virou [src/components/AINetworkVisual.tsx](src/components/AINetworkVisual.tsx) — uma rede de pontos dispersos que se conecta e escurece perto do cursor (mouse ou toque), como se estivesse se organizando. Testado ao vivo: funciona. Posições dos nós são fixas/determinísticas (não `Math.random()`, evita erro de hidratação SSR). Movimento só acontece em resposta à interação, sem loop ambiente.
- **Verificado:** `npx tsc --noEmit` e `npm run build` sem erros a cada etapa; testado ao vivo no navegador (paleta, logo, carrossel — clique em "próximo" funcionando, rede neural — hover testado e conectando corretamente).
- **Perguntas em aberto para o Paulo:**
  - O visual da rede neural é a direção certa, ou ele imaginava algo diferente (ex.: mais deliberadamente "IA", com forma de rosto/rede maior, cores/estilo diferentes)?
  - Testar o carrossel e a rede no celular (toque) — implementado mas não testado em viewport mobile real.
  - Quando o logo estiver fechado, revisitar o Header para o lockup completo com o símbolo substituindo o "E".

### Alterações aplicadas em 28/09/2026 (rodada 4 — logotipo, navegação, reestruturação da home)
- **Logotipo "MENOS" com o símbolo no lugar do E**: [src/components/MenosMark.tsx](src/components/MenosMark.tsx) ganhou uma variante `"e"` — círculo com uma quebra de ~50° do lado direito, desenhada com um arco SVG calculado por ângulo exato (`M 87.16 67.33 A 41 41 0 1 1 87.16 32.67`, r=41, cx=cy=50). **Importante:** a primeira tentativa usou `stroke-dasharray` num `<circle>` assumindo que o ponto de início do path fica no lado direito (3h) — isso se mostrou **errado** na prática (a quebra saía no canto superior); por isso o arco manual por ângulo, que é determinístico e não depende de suposição sobre o navegador.
- [src/components/MenosWordmark.tsx](src/components/MenosWordmark.tsx): lockup completo "M[símbolo]NOS", dimensionado em `em` (0.72em, top 0.02em) para acompanhar o tamanho do texto ao redor. Usado no Header e no Footer no lugar do ícone + texto separados.
- **Navegação**: removido "Início" (não faz sentido página própria pra home — é o logo). Nova ordem: Serviços, Cases, Parceiros, Como trabalhamos, Contato, A MENOS (por último, de propósito).
- **"Projetos" renomeado para "Cases"** na navegação e no título da seção da home ("Nossos cases" / "Ver todos os cases"). A URL continua `/projetos` por enquanto (evita quebrar links); revisitar quando a fusão com Serviços acontecer (ver pendência abaixo).
- **Seção "Problemas reais" removida** da home (redundante com "Soluções criadas a partir do problema"). Código morto removido junto: array `problems`, estado `hoveredProblem`, ícones não usados.
- **Home reordenada**: Hero → Soluções (serviços) → Nossos Cases (carrossel) → Nosso Posicionamento (manifesto) → Método → Parceiros → Depoimentos → CTA final. Antes o Posicionamento vinha antes dos Cases; agora vem depois.
- **Zoom genérico removido** da imagem dos cards no carrossel de cases (`group-hover:scale-105`) — mantida só a elevação/sombra do card como interação. **Pendente:** o mesmo efeito de zoom ainda existe em outros lugares (grid de `/projetos`, páginas de detalhe) — não mexido nesta rodada.
- **Rede do hero (`AINetworkVisual`) virou fundo do hero inteiro** (`fullBleed`), atrás do texto e dos botões, em vez de um cartão separado ao lado. O rastreamento do cursor passou a ser feito via `window` (com checagem de limites do container), então passar o mouse perto dos botões "Conte seu problema" / "Conheça nossos projetos" já aproxima o cursor daquela região da rede — que se organiza ali, como o Paulo descreveu (a ideia de "se aproximar do problema = a rede se organiza"). Não há mais um elo direto botão→nó específico; é a proximidade espacial natural que gera o efeito.

### Pendências e decisões em aberto
- **Fusão Serviços + Projetos**: decidido com o Paulo (28/09/2026) que vira **uma página só por solução** — cada serviço (Automações, Sistemas Internos...) mostra sua descrição e, embutidos, os cases reais que o usam (usar o campo `relatedServices` que já existe em `projects.ts` para casar case↔serviço). Nav vira um item só ("Soluções"). **Ainda não implementado** — é uma reestruturação de conteúdo maior, fica para uma rodada dedicada. Até lá, Serviços e Cases continuam como dois itens de nav separados.
- **Carrossel de cases "3D" de verdade**: o carrossel atual (coverflow simples, CSS transform) não é o que o Paulo pediu. Ele quer algo mais elaborado/interativo, tipo "cards se aproximando de cima da tela", navegação por clique lateral. Pesquisa feita (28/09/2026), três direções identificadas:
  1. **Sticky stack com scroll** (GSAP ScrollTrigger): cards empilhados, cada um inclina/avança em 3D e desliza pra fora ao rolar, revelando o próximo. É o que mais parece com "aproximar de cima da tela".
  2. **Carrossel em espaço 3D de verdade** (`transform-style: preserve-3d`, `translateZ`/`rotateX` escalados pelo scroll): cards literalmente arranjados em 3D, como um tambor giratório.
  3. **Slider com tilt de física** reagindo ao mouse (sensação de peso/profundidade), navegação por clique.
  - **Atenção a uma dependência nova**: os padrões mais usados na prática usam GSAP + ScrollTrigger, que não está instalado no projeto (só `framer-motion`). Antes de instalar, vale tentar com o que já existe (framer-motion tem `useScroll`/`useTransform`, dá pra fazer efeito parecido). Só recorrer ao GSAP se o resultado com framer-motion não ficar bom.
  - Falta o Paulo escolher a direção antes de eu construir de novo.
- **Animação futura do logo** (mencionada pelo Paulo, não para agora): o símbolo "menos" padrão (círculo fechado) aparece primeiro, depois se transforma no símbolo "E" (quebra à direita) enquanto as letras M-NOS aparecem ao lado, de forma interativa. Só rascunho por enquanto — o `MenosMark` já tem as duas variantes (`"minus"` e `"e"`) prontas como base técnica para essa transição no futuro.

### Alterações aplicadas em 28/09/2026 (rodada 5 — logo maior + animação de formação)
- **Símbolo aumentado** no lockup "MENOS": de `0.72em` para `0.85em` (testado ao vivo em 4 tamanhos antes de escolher).
- **Animação de formação implementada** em [src/components/MenosWordmark.tsx](src/components/MenosWordmark.tsx), via a nova prop `animateIntro` (ligada só no [Header.tsx](src/components/Header.tsx), não no rodapé — é um momento de marca, não pra repetir toda hora): o símbolo "menos" original (círculo fechado, preto) aparece sozinho, depois se dissolve/gira dando lugar ao símbolo "E" (a variante com a quebra, na cor herdada do texto), enquanto "M" e "NOS" deslizam e aparecem dos lados. Sequência: 0 – 0.35s símbolo fechado sozinho · 0.35 – 0.95s transição (crossfade + leve rotação/escala) · 0.75 – 1.25s letras entrando. Respeita `prefers-reduced-motion` (pula direto pro estado final).
- **Verificado:** `tsc`/`build` limpos. O navegador de teste desta sessão está com "reduzir movimento" ativado no sistema, então a animação real não pôde ser vista rodando ao vivo aqui — simulei a mesma coreografia (tempos/ângulos idênticos) com CSS puro fora do React pra validar visualmente as duas pontas (estado inicial: só o símbolo fechado; estado final: "MENOS" completo). A lógica e os valores são os mesmos do componente real. **Pedir para o Paulo confirmar visualmente com "reduzir movimento" desligado**, já que não consegui testar o componente de produção rodando de verdade nesta sessão.

### Bug crítico corrigido em 30/09/2026 — quebra de hidratação para quem usa "reduzir movimento"
- **Sintoma:** `Uncaught Error: Hydration failed` no console, reproduzido rodando a build de produção (`npm run start`) numa aba nova.
- **Causa raiz:** `useReducedMotion()` (framer-motion) pode retornar o valor real (`true`/`false`) já no primeiro render do **cliente**, diferente do que o **servidor** renderizou (o servidor nunca sabe a preferência do sistema operacional do visitante). Isso é inofensivo quando só muda VALORES de estilo no mesmo elemento (React só corrige silenciosamente — é o aviso "won't be patched up" que já tínhamos visto e é sabidamente benigno). Mas em [MenosWordmark.tsx](src/components/MenosWordmark.tsx), a diferença trocava a **estrutura inteira do HTML** (fragmento com dois `<div>`+SVG vs. um único `<svg>`) — isso o React não consegue corrigir e quebra a hidratação de verdade pra qualquer visitante real com "reduzir movimento" ativado no sistema (comum em modo economia de bateria, configuração de acessibilidade, etc.).
- **Correção:** a versão animada só é ativada depois de montado no cliente (`useState(false)` + `useEffect` para virar `true`), então servidor e primeiro paint do cliente **sempre** renderizam a versão estática (idênticos, sem risco de mismatch) — a troca para a versão animada acontece só depois, como uma atualização normal do lado do cliente, que não conflita com hidratação.
- **Auditoria:** conferido todo o resto do código que usa `shouldReduceMotion` ([page.tsx](src/app/page.tsx), [CaseCarousel.tsx](src/components/CaseCarousel.tsx), [AINetworkVisual.tsx](src/components/AINetworkVisual.tsx), [WhatsAppButton.tsx](src/components/WhatsAppButton.tsx)) — todos só trocam valores de estilo no mesmo elemento, nenhum troca a estrutura do HTML. Não têm esse risco.
- **Verificado:** `tsc`/`build` limpos; testado a build de produção numa aba nova — **zero erros e zero avisos no console**.

### Rodada 6 (30/09/2026) — recriação da home a partir do handoff de design ("Redesign com animações e símbolo da marca.zip")
Paulo enviou um pacote de design completo (protótipo HTML funcional + screenshots + SVGs originais da marca), produzido fora desta sessão. Recriei a home pixel a pixel a partir dele. Ver [REDESIGN.md](REDESIGN.md) para a razão de cada mudança estrutural.

- **Geometria exata da marca**: [src/components/MenosWordmark.tsx](src/components/MenosWordmark.tsx) e [src/components/MenosSymbol.tsx](src/components/MenosSymbol.tsx) reescritos com as coordenadas reais extraídas de `assets/*-original.svg` (polígonos do M/N, círculos do "e"/O, path do S). O círculo do "e" usa um `<path>` de arco calculado por ângulo exato (não `stroke-dasharray` num `<circle>` — ver nota de bug abaixo).
- **Logo do cabeçalho**: em repouso mostra só o símbolo fechado; no hover/foco, um progresso 0→1 animado via `requestAnimationFrame` (não framer-motion) expande para "MENOS" completo, ~1.2s, recolhendo na mesma velocidade ao tirar o mouse. Removido o botão "Vamos simplificar" do cabeçalho desktop (por desenho).
- **`BrandIntro.tsx`** (novo): intro de tela cheia ao carregar (~5.9s), replicando a timeline exata do protótipo (círculo se desenha, muda de cor, abre o "e", encolhe e desliza pra formar "MENOS", tag "menos vira mais", fade out). Botão "Pular intro". Pulada inteiramente com `prefers-reduced-motion` (decisão nossa, o handoff não cobre esse caso).
- **`MenosMark.tsx` removido** (obsoleto, substituído por Wordmark + Symbol).
- **`AINetworkVisual.tsx`**: reescrito para suavização por interpolação (lerp 0.12/quadro) tanto do ponteiro quanto da força de cada nó, igual ao protótipo — evita que os nós "pulem" de estado.
- **`CaseCarousel.tsx`**: reescrito do zero. Antes era scroll-snap com arraste (rejeitado pelo Paulo: arraste ruim, imagem perdia qualidade, card simples demais). Agora: todos os 5 cases empilhados na mesma área da grade (`grid-area:1/1`), com profundidade via `perspective`+`rotateY`+`scale`, card ativo sempre em `transform:none` (por isso a imagem não perde nitidez), navegação **só** por clique no card vizinho, abas numeradas, setas e teclado (←/→) — sem arraste, sem girar sozinho. `prefers-reduced-motion` desliga a rotação 3D (mantém só fade, a navegação continua funcionando).
- **Campo novo `shortName`** em `Project` (`src/data/projects.ts`) para os rótulos curtos das abas do carrossel (ex.: "Certificados" em vez do nome completo do projeto).
- **Campo novo `keyMetrics`** em `Project`, renderizado como chips no card do carrossel. Preenchido para os dois cases que o Paulo detalhou:
  - **Plataforma de Certificados FLUPP**: 50% menos pessoas no credenciamento, <1h na certificação/envio (antes 3 semanas), 85% das atividades automatizadas/simplificadas.
  - **Plataforma Melhores Cabeças**: só o número de contexto (~200 estudantes atendidos) — sem percentual, porque nenhum foi medido para esse case.
  - **Pendência levantada para o Paulo**: os números de "credenciamento"/"controle de oficinas" foram aplicados no case Certificados por instrução explícita, mas parecem pertencer ao case "Sistema de Credenciamento" (já existe separado no site). Confirmar mapeamento.
- **`ScrollRevealText.tsx`** (novo): manifesto revelado palavra a palavra conforme o scroll (via `useScroll`/`useTransform` do framer-motion, não a réplica literal do polinômio do protótipo — mesmo efeito visual, idiomático ao resto do código).
- **`ScrollMark.tsx`** (novo): símbolo da chamada final ligado ao scroll (cor muda na primeira metade, abre o "e" na segunda).
- **Método**: linha do tempo e bolinhas acendem conforme o scroll passa pela seção (antes era reveal por `whileInView` de cada item).
- **Parceiros**: virou grade estática na home (antes era o `PartnerCarousel`). O componente `PartnerCarousel` continua existindo (pode estar em uso em `/parceiros`, não mexido).
- **Depoimentos**: troca automática a cada 7s, pausando ao usar as setas manualmente.
- **Serviços**: removido o rótulo "Solução #N" e a linha "Resolve:" dos cards, conforme o handoff.
- **Regra de texto sem travessão**: aplicada em `src/data/projects.ts`, `testimonials.ts`, `partners.ts`, `a-menos/page.tsx`, no hero e no manifesto de `page.tsx`, e no título/metadados (`layout.tsx`, "MENOS — ..." virou "MENOS | ..."). Travessões que sobraram no código são só comentários internos, conferido um por um.
- **Bug real encontrado e corrigido**: a primeira tentativa da quebra do "e" usava `stroke-dasharray`/`stroke-dashoffset` num `<circle>` assumindo que o ponto de início do path é o lado direito (3h) — errado na prática, a quebra saía no canto superior. Corrigido com um `<path>` de arco calculado por ângulo exato (coordenadas fixas, sem depender de convenção de navegador).
- **Verificado**: `tsc`/`build` limpos. Testado ao vivo: hover do logo expandindo (bate com a screenshot de referência 05), navegação das 5 abas do carrossel confirmada via DOM (clique muda o card ativo corretamente), métricas do case Certificados conferidas via DOM. **Não foi possível tirar screenshot do carrossel nesta sessão** porque o painel do navegador ficou oculto durante o teste (a captura de tela para de repintar conteúdo novo nesse estado) — verificação feita por inspeção de DOM/JS em vez de imagem, que é confiável para essas checagens (estado, classes, texto), mas não substitui o Paulo dar uma olhada visual real.
- **Fora do escopo desta rodada**: fusão de Serviços+Projetos em uma página só (decisão já tomada, ver `REDESIGN.md`, implementação fica para rodada dedicada); páginas `/a-menos`, `/parceiros`, `/servicos`, `/projetos` e as páginas de detalhe não foram tocadas (o handoff de design era só da home).
