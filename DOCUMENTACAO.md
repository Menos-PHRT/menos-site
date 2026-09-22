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
  to: 'contato@menos.studio',
  subject: `Novo diagnóstico de: ${name} (${company})`,
  html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Problema:</strong> ${problemDescription}</p>`
});
```

### Como integrar com CRM ou webhooks de WhatsApp
Você pode adicionar requisições HTTP do tipo `fetch` dentro da rota `POST` para despachar os dados em formato JSON para plataformas como Hubspot, RD Station, ou integradores como Zapier e Make.
