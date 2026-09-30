# Por que essas mudanças de estrutura e visual

Este documento explica o raciocínio por trás do redesign da home aplicado na branch `redesign-visual-verde-ia`. Não é um changelog técnico (isso está em `DOCUMENTACAO.md`) — é o "porquê" de cada decisão, baseado nas conversas com o Paulo.

## O problema de fundo: a home estava poluída

A crítica inicial foi simples: de cima para baixo, a página tinha conteúdo demais, muitas seções competindo por atenção, e vários sinais visuais que faziam o site parecer "mais um site de software house genérico" em vez de ter identidade própria.

## Navegação

**Antes:** Início, A MENOS, Serviços, Projetos, Parceiros, Como trabalhamos, Contato.

**Depois:** Serviços, Cases, Parceiros, Como trabalhamos, Contato, A MENOS.

- **"Início" saiu do menu.** Não faz sentido uma página dedicada só para voltar ao topo — essa função já é do logotipo no cabeçalho. Ter um item de menu que leva para "aqui mesmo" é redundante.
- **"A MENOS" foi para o final**, depois de Contato inclusive. A lógica: é conteúdo institucional, de interesse de quem já quer saber mais sobre a empresa, não a primeira coisa que um visitante novo precisa ver. Serviços (o que fazemos) vem primeiro.
- **Serviços e Projetos são redundantes** como estão hoje: um mostra "o que fazemos" e o outro "o que já fizemos", mas são a mesma pergunta do ponto de vista do visitante. A decisão tomada foi transformar isso em **uma página só por solução**, com o serviço e os cases reais que o usam juntos. Essa fusão de conteúdo ainda não foi implementada (é maior, fica para uma rodada dedicada) — por enquanto, os dois continuam como itens separados de menu, e "Projetos" foi renomeado para "Cases" para já aproximar a linguagem.

## Cor: por que sair do azul

O azul usado antes (`#2563EB`) é o mesmo tom que aparece em uma quantidade enorme de sites de software house, agências e SaaS genéricos — não é uma escolha errada tecnicamente, mas não diferencia a marca de ninguém. A nova paleta parte do verde-petróleo escuro que o Paulo definiu (`#143C3C`), uma cor bem menos comum nesse tipo de site, com uma leitura de solidez e "dinheiro sério" sem cair no verde-startup batido.

## Elementos removidos por serem genéricos

- **A faixa de texto passando** ("menos é mais, menos burocracia...") foi identificada como um padrão visual comum demais em sites institucionais — um "letreiro" que qualquer gerador de site também produziria. Removida.
- **O gráfico estático do hero** ("menos.flow_optimizer", com rótulos como "INPUT_CHAOS" e "LATÊNCIA: 1.2ms") tinha a mesma cara de "enfeite técnico genérico", números fictícios inclusive. Foi substituído por uma rede de pontos que reage de verdade ao cursor: quanto mais perto de "contar seu problema", mais a rede se organiza — uma metáfora com propósito, não decoração.
- **A seção "Problemas reais"** (8 cards de planilhas/tarefas/etc.) foi identificada como redundante com a seção "Soluções criadas a partir do problema": as duas diziam essencialmente a mesma coisa, dobrando o conteúdo que o visitante precisa processar antes de chegar às soluções de verdade. Removida.

## Reorganização da home

**Antes:** Hero → Faixa animada → Problemas reais → Serviços → Posicionamento → Cases → Método → Parceiros → Depoimentos → CTA.

**Depois:** Hero → Serviços → Cases → Posicionamento → Método → Parceiros → Depoimentos → CTA.

A ideia: depois do hero, o visitante já vê o que a MENOS faz (Serviços) e logo em seguida a prova de que funciona (Cases) — sem precisar passar por uma seção de "problemas" redundante no meio do caminho. O Posicionamento (o manifesto, "por que existimos") vem depois da prova concreta, não antes.

## Hero: por que o espaçamento mudou

O hero antigo tinha "muito espaço para cima, muito espaço para baixo" ao redor do texto principal — a crítica foi de que o texto parecia "jogado" na página, sem uma composição que desse jeito ao layout. A versão nova reduz o respiro vertical excessivo e integra o texto com a rede de fundo, que ocupa o hero inteiro (inclusive atrás dos botões), em vez de ficar isolado como um bloco central flutuando sozinho.

## Botão do logo ("Vamos simplificar")

O botão de CTA que existia ao lado do menu foi removido do cabeçalho: a página já tem outros pontos de chamada para ação (os botões do próprio hero, o botão flutuante de WhatsApp, o CTA final), então repetir "Vamos simplificar" no topo era redundância de mais um call-to-action competindo por atenção logo de cara.

## WhatsApp sempre visível

Foi adicionado um botão flutuante de WhatsApp presente em todas as páginas, para que a pessoa possa entrar em contato a qualquer momento da navegação, sem precisar rolar até o rodapé ou a página de contato.

## GitHub removido dos links sociais

O link do GitHub foi tirado do rodapé e da página de contato: a preocupação foi que um visitante que clicasse ali e visse poucos repositórios públicos teria uma impressão ruim, sem necessidade — não é um canal que ajuda a venda.

## "Resposta média": de 1 hora para 15 minutos

Ajuste de expectativa: o tempo de resposta informado no rodapé passou de "em até 1 hora" para "em até 15 minutos", refletindo o tempo real de resposta da equipe.

## O símbolo da marca

O círculo com o traço (o "menos") ganhou uma segunda forma: com uma quebra à direita, ele funciona como a letra "E" de "MENOS". A ideia de origem: o símbolo "fechado" é a forma mais simples e original do símbolo de menos; a versão "aberta" (o "E") é a evolução dele quando vira parte da identidade da marca. Por isso a animação do cabeçalho mostra o símbolo original se transformando no símbolo "E" ao mesmo tempo em que as letras da palavra aparecem — literalmente encenando essa evolução.

## Regra de texto: sem travessão

Todo texto do site (interface e dados) evita travessão (— ou –), preferindo vírgula, ponto ou parênteses. É uma escolha de tom: travessão em excesso costuma ler como texto gerado por IA; vírgulas e frases mais diretas soam mais humanas e menos "de robô".

## Dados comerciais dos cases (Certificados FLUPP e Melhores Cabeças)

Os dois cases citados pelo Paulo ganharam números e resultados reais nos cards do carrossel:

- **Plataforma de Certificados FLUPP:** 50% menos pessoas necessárias no credenciamento, certificação e envio reduzidos de três semanas para menos de uma hora, e cerca de 85% das atividades de um fluxo mapeado automatizadas ou simplificadas.
- **Plataforma Melhores Cabeças:** sem percentual (nenhum foi medido para este case) — o destaque é qualitativo: rotina mais simples, acompanhamento mais personalizado, e o número de contexto de ~200 estudantes atendidos.

**Atualização (confirmado pelo Paulo):** Sistema de Credenciamento e Plataforma de Certificados são o mesmo projeto, dividido em dois cards por complexidade. Redistribuí os números pelo card que cada um descreve de fato:
- **Sistema de Credenciamento**: 50% menos pessoas no credenciamento, 50% menos pessoas no controle das oficinas.
- **Plataforma de Certificados FLUPP**: certificação e envio de 3 semanas para menos de 1 hora, ~85% das atividades automatizadas ou simplificadas.

## Fusão Serviços + Projetos (continuação)

O conteúdo dessa fusão já existia parcialmente: cada página de serviço (`/servicos/[slug]`) já listava os cases reais relacionados (via `relatedServices` em `projects.ts`). Faltava:

1. **Cards de case mais ricos na página de serviço.** Antes eram só texto (cliente, nome, resumo do desafio). Agora mostram a imagem do sistema e, quando existem, as métricas de destaque (os mesmos números que aparecem no carrossel da home) — para o merge parecer de verdade um "aqui está o serviço e a prova de que funciona", não só uma lista de links.

**Sobre o menu (revertido em 30/09/2026):** cheguei a juntar "Serviços" e "Cases" num item só ("Soluções"), mas isso não batia com o material de design que o Paulo enviou depois (que mostra os dois separados nas telas de referência). O Paulo confirmou: **o menu volta a ter Serviços e Cases separados**, igual ao protótipo. A fusão de *conteúdo* (cases reais dentro de cada página de serviço) continua valendo — só o menu não junta os dois num item só.
