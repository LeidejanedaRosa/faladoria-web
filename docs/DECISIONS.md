# Decisões de Projeto

Registro de decisões de tooling, configuração e arquitetura com contexto, alternativas rejeitadas e raciocínio. Atualizar sempre que uma decisão relevante for tomada.

> Decisões sobre a stack de produto (React, Vite, TypeScript, etc.) estão documentadas no [README.md](../README.md) com o raciocínio de cada escolha.

---

## 2026-06-15 — `role='note'` + `aria-label` para callout de emergência estático

**Contexto**: O `EmergencyCallout` usava `role='alert'`, que é uma live region do ARIA projetada para conteúdo que aparece dinamicamente no DOM. Esse callout é conteúdo estático presente na página ao carregar.

**Decisão**: Substituir `role='alert'` por `role='note'` com `aria-label={block.title ?? 'Atenção'}`.

**Por quê**: `role='alert'` em conteúdo estático tem comportamento imprevisível entre leitores de tela — alguns ignoram, outros interrompem a leitura ao carregar a página. `role='note'` é a semântica correta para conteúdo suplementar importante e estático. O `aria-label` garante que o bloco tenha um nome acessível disponível para tecnologias assistivas.

**Alternativa rejeitada**: Manter `role='alert'` — semânticamente incorreto para conteúdo estático segundo a spec WAI-ARIA.

---

## 2026-06-15 — `SimpleCallout` como base compartilhada para callouts

**Contexto**: `TipCallout`, `WarningCallout` e `DefaultCallout` tinham ~85% do código idêntico — mesma estrutura JSX, mesma lógica condicional, mesmas classes base. Apenas ícone e cores variavam.

**Decisão**: Extrair `SimpleCallout` interno que recebe `containerClassName`, `iconClassName` e `icon` como props. As três variantes tornaram-se wrappers de 5 linhas.

**Por quê**: Elimina duplicação concreta (DRY), centraliza qualquer ajuste visual futuro num único lugar e mantém o mapa `CALLOUT_VARIANTS` intacto (OCP — adicionar variante nova não toca no código existente).

**Alternativa rejeitada**: Manter os três componentes separados — mudança visual precisaria ser replicada em três lugares.

---

## 2026-06-15 — Campo `ordered` no tipo `list` de `ArticleBlock`

**Contexto**: Listas de passos numerados ("1. ...", "2. ...") eram renderizadas como `<ul>` com bullet CSS. O resultado era marcador visual + prefixo numérico no texto — semanticamente incorreto (`<ul>` implica itens sem ordem relevante).

**Decisão**: Adicionar `ordered?: boolean` ao tipo `{ type: 'list' }` em `ArticleBlock`. Quando `true`, `StepBlockRenderer` renderiza `<ol>` sem bullet CSS; o prefixo "N." no texto provê a numeração visual. Não usar `list-style` automático do browser para manter controle total de estilo.

**Por quê**: `<ol>` é o elemento HTML semântico correto para sequências ordenadas. Leitores de tela anunciam itens de `<ol>` diferente de `<ul>`, o que importa para instruções passo a passo.

**Alternativa rejeitada**: Auto-detectar listas ordenadas pelo conteúdo (`item.startsWith('1.')`) — frágil e acoplado ao formato do texto.

---

## 2026-01-19 — pnpm como gerenciador de pacotes

**Contexto**: O projeto foi iniciado a partir do `react-vite-template`, que usa `npm`. Na configuração do Faladoria, foi feita a migração.

**Decisão**: `pnpm@9.15.0`, declarado em `package.json` com `"packageManager"` e `"engines"`.

**Por que pnpm e não npm ou yarn:**

| Critério                  | npm                                                   | yarn        | pnpm                                                       |
| ------------------------- | ----------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| Velocidade de install     | Lento                                                 | Médio       | Rápido — reutiliza o store global                          |
| Espaço em disco           | Alto — copia tudo por projeto                         | Alto        | Baixo — content-addressable store compartilhado            |
| Segurança de dependências | Permissivo — acessa qualquer pacote no `node_modules` | Permissivo  | Estrito — só acessa o que está declarado em `package.json` |
| Lockfile                  | `package-lock.json`                                   | `yarn.lock` | `pnpm-lock.yaml` — mais determinístico                     |
| Workspaces (monorepo)     | Funcional                                             | Bom         | Melhor suporte nativo                                      |

O ponto mais crítico é a **segurança de dependências**: o pnpm usa links simbólicos e impede que um pacote acesse dependências de outros pacotes que não declarou explicitamente. Isso previne bugs sutis por phantom dependencies — quando o código funciona localmente mas quebra em CI por depender de um pacote não declarado.

**Alternativas rejeitadas**: `npm` (permissivo, lento, sem as garantias de isolamento) e `yarn` (sem vantagem clara sobre pnpm para este tipo de projeto).

---

## 2026-01-21 — Estrutura feature-based com shared/

**Contexto**: O projeto parte de uma landing page mas está previsto para crescer com auth e dashboard. Era necessário escolher uma estrutura que funcionasse tanto agora quanto na fase seguinte.

**Decisão**: Estrutura `features/` + `shared/` com regra de separação explícita.

**Regra central**: se apenas uma feature usa o código → vai para `features/<nome>/`. Se duas ou mais usam → vai para `shared/`. Sem exceções.

**Por que não uma estrutura por tipo** (`components/`, `hooks/`, `utils/` na raiz):

- A estrutura por tipo escala mal: quando o projeto cresce, `components/` vira um arquivo de 30+ itens sem relação entre si.
- Features grandes (dashboard) se tornam impossíveis de rastrear — tudo está misturado.
- Deletar uma feature exige caçar arquivos espalhados em vários diretórios.

**Pela estrutura feature-based**:

- Cada feature é um módulo autocontido. Deletar a feature `guide/` é deletar uma pasta.
- A API pública de cada feature é exposta exclusivamente via `index.ts` — nenhum módulo externo importa de caminhos internos.
- O `shared/` só cresce quando de fato existe reuso real (regra dos dois usos), não por antecipação.

**Decisão conexa**: a estrutura `features/` foi consolidada antes de iniciar o desenvolvimento de auth/dashboard (conforme CLAUDE.md), para que a base seja consistente desde o início.

---

## 2026-01-21 — Tailwind CSS v4 (novo pipeline)

**Contexto**: A v4 do Tailwind mudou radicalmente a configuração — não usa mais `tailwind.config.js` como arquivo central e o plugin de Vite substitui o PostCSS.

**Decisão**: Tailwind v4 com `@tailwindcss/vite` plugin e configuração em `src/index.css` via diretivas `@theme`.

**Diferenças críticas em relação à v3:**

| Aspecto             | v3                   | v4                                |
| ------------------- | -------------------- | --------------------------------- |
| Configuração        | `tailwind.config.js` | `@theme {}` no CSS                |
| Integração com Vite | PostCSS plugin       | Plugin nativo `@tailwindcss/vite` |
| Gradientes          | `bg-gradient-to-br`  | `bg-linear-to-br`                 |
| Performance         | Boa                  | Melhor — engine em Rust (Oxide)   |

**Atenção**: ao copiar classes de exemplos, snippets ou IA treinados na v3, `bg-gradient-to-*` não funciona. Usar `bg-linear-to-*`. Ver [TROUBLESHOOTING.md](TROUBLESHOOTING.md#classe-bg-gradient-to-br-não-aplica-gradiente).

---

## 2026-01-21 — Sentry como serviço de monitoramento de erros

**Decisão**: `@sentry/react` para monitoramento de erros e `@sentry/vite-plugin` para upload de source maps.

**O que o Sentry monitora neste projeto:**

- Exceções JavaScript não tratadas em produção
- Core Web Vitals (LCP, INP, CLS) via `web-vitals`
- Stack traces legíveis via source maps (arquivos `.map` são removidos do `dist/` após upload)

**Configuração de segurança**: o `sentryVitePlugin` só é ativado quando as três variáveis de ambiente de CI estão presentes (`SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`). Em builds locais o plugin não é carregado — evita erros de configuração no ambiente de desenvolvimento.

**Fallback seguro**: `src/shared/lib/sentry.ts` emite `console.warn` se o DSN não estiver configurado, sem quebrar a aplicação.

---

## 2026-01-24 — Estrutura do tsconfig em quatro arquivos

**Contexto**: Um único `tsconfig.json` para toda a aplicação gera conflitos entre os tipos do código de produção (sem `vitest/globals`, sem `@testing-library/jest-dom`) e o código de teste.

**Decisão**: Separação em quatro arquivos com responsabilidades distintas.

| Arquivo              | Responsabilidade                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `tsconfig.json`      | Arquivo raiz — apenas declara as referências. Usado por editores e pelo `tsc -b`.        |
| `tsconfig.app.json`  | Código de produção (`src/`). `composite: true`, exclui arquivos de teste.                |
| `tsconfig.node.json` | Arquivos de configuração (`vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`). |
| `tsconfig.test.json` | Testes unitários — adiciona tipos `vitest/globals` e `@testing-library/jest-dom`.        |

**Importante**: o `tsconfig.test.json` usa `extends: ./tsconfig.app.json` e `include: ["src", "tests"]` — não usa `references`. Ver [TROUBLESHOOTING.md](TROUBLESHOOTING.md#ts6310-referenced-project-may-not-disable-emit) para o histórico do erro que levou a essa decisão.

---

## 2026-05-22 — TypeScript target ES2022

**Contexto**: O projeto partiu com target `ES2020`. A migração foi feita junto com o reforço da configuração de build.

**Decisão**: `"target": "ES2022"` no `tsconfig.app.json`.

**Por que ES2022 e não ES2020:**

- Suporte nativo a `Array.at()`, `Object.hasOwn()`, top-level `await` e class fields — sem necessidade de polyfill
- O `build.target` no `vite.config.ts` também está em `es2022`, garantindo consistência entre TypeScript e Rollup
- Todos os browsers modernos suportam ES2022. O suporte a browsers legados (IE11, pre-Chromium Edge) não é um requisito deste projeto

---

## 2026-05-22 — Husky: testes unitários no pre-push, não no pre-commit

**Contexto**: Precisávamos definir em qual hook os testes seriam executados automaticamente.

**Decisão**: Testes unitários (`pnpm test`) rodam no `pre-push`. No `pre-commit`, apenas lint-staged (ESLint + Prettier) e `type-check`.

**Raciocínio**:

- O `pre-commit` é executado com muita frequência (a cada `git commit`). Adicionar os testes ali tornaria o fluxo de trabalho lento — um commit de ajuste de texto não precisa rodar 144 testes.
- O `pre-push` é o gate correto: antes de o código ir para o repositório remoto, os testes garantem que nada está quebrado.
- Os testes E2E (Playwright) **não estão em nenhum hook** — são lentos demais e exigem servidor ativo. São executados manualmente antes do deploy.

---

## 2026-05-22 — Code splitting manual no Vite

**Contexto**: Por padrão, o Rollup tenta dividir a bundle automaticamente, mas vendor chunks grandes ficam misturados.

**Decisão**: `manualChunks` no `vite.config.ts` com três chunks nomeados.

```
vendor-react   → react + react-dom
vendor-router  → react-router-dom
vendor-sentry  → @sentry/react
```

**Por que separar esses três:**

- `vendor-react` raramente muda entre deploys — o browser cacheia por muito tempo, evitando re-download desnecessário
- `vendor-sentry` é pesado (~200 KB gzip). Separado, não impacta o cache do bundle principal da aplicação quando o Sentry é atualizado
- `vendor-router` é separado de React para cache granular

---

## 2026-05-23 — `slugify` como utilitário compartilhado

**Contexto**: A função `slugify` foi implementada inline em `structuredData.ts` (2026-01-21) e depois duplicada em `BreadcrumbSchema.tsx` com uma implementação levemente diferente. Um commit de refatoração (09c10fb) declarou ter extraído a função mas não criou o arquivo utilitário — a duplicação persistiu.

**Decisão**: `src/shared/utils/slugify.ts` como única fonte da verdade, com implementação unificada.

**Implementação escolhida:**

```ts
export const slugify = (text: string): string =>
  text
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/^-+|-+$/g, '')
```

`\p{Diacritic}/gu` (Unicode property escapes, ES2018+) é mais robusto que o range `[̀-ͯ]` para remoção de diacríticos — cobre mais scripts além do Latin.

---

## 2026-05-25 — Constante `GUIDE_ROUTES` em `shared/data/routes.ts`

**Contexto**: A string `/comoconseguirpelosus` estava duplicada como literal em 9+ arquivos (`App.tsx`, `navigation.ts`, `GuideCategoryCard`, `GuideCategoryLayout`, `GuideCategoryPage`, `guideContent.ts`, `guideHighlightContent.ts` e os respectivos testes). Uma mudança de rota exigiu atualização manual em todos eles — o que já ocorreu uma vez neste projeto.

**Decisão**: `src/shared/data/routes.ts` exporta `GUIDE_ROUTES` com `root` e `category(slug)`. Exportado pelo barrel `shared/data/index.ts`.

```ts
export const GUIDE_ROUTES = {
  root: '/como-conseguir-pelo-sus',
  category: (slug: string) => `/como-conseguir-pelo-sus/${slug}`,
} as const
```

**Por que em `shared/data/` e não em `features/guide/`**:

A rota é consumida por duas features distintas (`guide/` e `landing/`) além de código de nível de aplicação (`App.tsx`, `navigation.ts`). A regra do projeto é clara: se dois ou mais módulos usam → vai para `shared/`. Colocar em `features/guide/` criaria uma dependência `landing → guide` e `shared → guide`, violando o isolamento de features.

**Alternativas rejeitadas**: manter as strings literais (já demonstrou ser um problema de manutenção); colocar em `features/guide/routes.ts` (causaria dependência `shared/ → features/`, proibida pela arquitetura em camadas).

**Padrão para novas features**: ao criar uma feature com rotas próprias, definir as constantes de rota em `shared/data/routes.ts` se a rota for referenciada por mais de uma feature ou por código compartilhado.

---

## 2026-05-27 — Dados estáticos (TypeScript) para o conteúdo do Guide

**Contexto**: O milestone Guide Content exige alimentar a `GuidePage` com categorias e artigos. Três estratégias foram consideradas para armazenar e servir esse conteúdo.

**Decisão**: Dados estáticos em arquivos TypeScript (`guideArticles.ts`, `guideCategories.ts`), sem CMS nem backend.

**Alternativas avaliadas:**

| Opção                                 | Descrição                              | Rejeitada porque                                                  |
| ------------------------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| A — Dados estáticos (escolhida)       | Arrays TypeScript com tipos explícitos | —                                                                 |
| B — CMS headless (Contentful, Sanity) | Conteúdo editável sem deploy           | Custo e dependência externa desnecessários nesta fase             |
| C — Backend próprio                   | API REST com banco de dados            | O backend ainda não existe; bloquearia a entrega do Guide Content |

**Raciocínio**: O Guide Content é conteúdo informativo sobre o SUS — atualizado raramente e sem necessidade de edição por não-desenvolvedores nesta fase. Dados estáticos permitem entregar valor ao usuário público imediatamente, enquanto Auth, Dashboard e Chatbot (que exigem backend) são construídos em paralelo. A migração para backend próprio ou CMS, quando necessária, é direta: os tipos TypeScript já existentes definem o contrato de dados.

**Estrutura adotada:**

```
features/guide/data/
├── guideCategories.ts   → GuideCategory[] (6 categorias)
├── categoryGroups.ts    → CategoryGroup interface e CATEGORY_GROUPS (metadados de grupos de categoria por camada)
├── guideArticles.ts     → tipos ArticleBlock e GuideArticle; re-exporta GUIDE_ARTICLES de articles/
├── articles/            → 17 módulos de artigos individuais + articles/index.ts (barrel export)
├── guideUtils.ts        → getCategoryBySlug, getArticlesByCategory, getArticleBySlug, getCategoriesByGroup
├── guideContent.ts      → GUIDE_CONTENT (conteúdo de UI), createCategoryStructuredData, createArticleStructuredData, GUIDE_COLLECTION_PAGE_STRUCTURED_DATA
└── index.ts             → barrel export da feature
```

**Padrão para slugs repetidos em dados estáticos**: quando um `categorySlug` aparece 4+ vezes no mesmo arquivo, extrair para uma constante interna (`const C = { ... } as const`) para satisfazer a regra `sonarjs/no-duplicate-string` sem exportar a constante (é detalhe de implementação do arquivo).

---

## 2026-05-27 — Rota de artigo individual no Guide

**Contexto**: Extensão da decisão `GUIDE_ROUTES` (2026-05-25). Com artigos individuais, a rota de categoria precisava de um nível adicional.

**Decisão**: `article(categorySlug, articleSlug)` adicionado ao objeto `GUIDE_ROUTES` em `shared/data/routes.ts`.

```ts
article: (categorySlug: string, articleSlug: string) =>
  `/como-conseguir-pelo-sus/${categorySlug}/${articleSlug}`
```

**Por que manter no mesmo objeto**: a rota de artigo é semanticamente parte do namespace do Guide, consumida tanto em `GuideArticleCard` (link) quanto em `App.tsx` (rota) e `GuideArticlePage` (SEO). Manter as três rotas (`root`, `category`, `article`) no mesmo objeto garante que uma mudança de prefixo (`/como-conseguir-pelo-sus`) seja feita em um único lugar.

---

## 2026-05-28 — Breadcrumb passado como prop da page para o layout no Guide

**Contexto**: `GuideCategoryLayout` e `GuideArticleLayout` construíam seus próprios arrays de breadcrumb internamente. As pages (`GuideCategoryPage`, `GuideArticlePage`) também construíam o mesmo array para alimentar o `BreadcrumbSchema` (Schema.org). Os dados eram idênticos, mas produzidos em dois lugares.

**Decisão**: Os layouts recebem `breadcrumbItems: BreadcrumbItem[]` como prop. A page computa o array uma vez e o passa tanto para o `BreadcrumbSchema` (SEO) quanto para o componente visual `GuideBreadcrumb`.

**Por que não manter a construção interna nos layouts:**

- O array é construído com dados da URL (category slug, article slug) que a page já tem. Repassar para o layout via prop é mais barato e explícito do que fazer o layout redescobrir as mesmas informações.
- Qualquer mudança nos itens de breadcrumb (nome, URL, ordem) precisaria ser feita em dois lugares. Com a prop, há uma única fonte da verdade por página.
- O `BreadcrumbItem` de `@shared/data` é o mesmo tipo aceito por `GuideBreadcrumb` — sem conversão necessária.

**Alternativa rejeitada**: extrair um hook `useGuideBreadcrumb(category, article?)` que centralizasse a construção. Descartado porque a lógica é trivial (3–4 linhas) e o hook criaria uma abstração sem ganho real de clareza.

---

## 2026-05-28 — Constantes nomeadas para todos os IDs do Guide

**Contexto**: `GuideArticleLayout` e `GuideCategoryLayout` usavam strings literais `'article-heading'` e `'category-heading'` tanto no atributo `id` quanto em `aria-labelledby`. O projeto já exportava `GUIDE_HEADING_ID`, `GUIDE_CATEGORIES_HEADING_ID` e `GUIDE_CATEGORIES_SECTION_ID` de `guideContent.ts` — mas as novas constantes não foram adicionadas ao arquivo ao ser criado.

**Decisão**: Todos os IDs de DOM do Guide vivem como constantes nomeadas em `guideContent.ts` e são exportados pelo barrel `data/index.ts`.

```ts
export const GUIDE_CATEGORY_HEADING_ID = 'category-heading'
export const GUIDE_ARTICLE_HEADING_ID = 'article-heading'
```

**Por que constantes e não strings literais:**

- Um typo em uma string literal (`'artcle-heading'`) quebra silenciosamente o vínculo `aria-labelledby` sem erro de compilação. Uma constante com typo quebra no build.
- Mudanças de ID — raras mas possíveis — são feitas em um lugar, não em todos os componentes que usam o ID.

**Regra para o Guide**: qualquer `id` referenciado em mais de um atributo (ou mais de um componente) deve ser uma constante em `guideContent.ts`.

---

## 2026-05-28 — `useScrollToTop` move foco para `#main-content` em mudança de rota

**Contexto**: Em SPAs com React Router, a mudança de rota não move o foco do browser automaticamente. O `useScrollToTop` resetava o scroll para o topo, mas o foco permanecia no último elemento interativo da página anterior — invisível e sem feedback para usuários de teclado ou leitor de tela.

**Decisão**: `useScrollToTop` chama `document.getElementById('main-content')?.focus({ preventScroll: true })` imediatamente após o scroll.

**Por que `#main-content` e não `<h1>`:**

- O `MainContent` (`<main id="main-content" tabIndex={-1}>`) já estava preparado para receber foco: tem `tabIndex={-1}` e `id` estáveis em todas as páginas.
- Focar o `<h1>` exigiria adicionar `tabIndex={-1}` em cada layout individualmente, e o ID do `<h1>` varia entre páginas.
- `preventScroll: true` evita que o browser tente rolar o elemento para a área visível — o scroll já foi feito manualmente para `(0, 0)`.

**Comportamento para usuários de tecnologia assistiva**: ao navegar entre páginas, o leitor de tela anuncia o label do `<main>` (`mainContentLabel` passado pelo `PageShell`) em vez de continuar lendo o conteúdo da página anterior.

---

## 2026-05-28 — Schema Article com `datePublished` e `author` estáticos

**Contexto**: O `createArticleStructuredData` gerava um schema `Article` válido mas inelegível para rich results no Google: faltavam `datePublished` e `author`, que o Google exige para o tipo `Article`.

**Decisão**: `datePublished: '2026-05-01'` (data de lançamento da feature Guide Content) e `author: { '@id': '.../#organization' }` (referência ao nó de organização já no grafo) são adicionados ao schema. O campo `image` foi omitido intencionalmente — não há imagens por artigo; inventar uma URL quebraria a semântica.

**Por que data estática em vez de campo por artigo:**

- Os artigos são conteúdo informativo sobre o SUS com baixíssima taxa de atualização. Uma data de publicação por artigo traria overhead de manutenção desproporcionalmente alto para o valor.
- Quando artigos individuais passarem a ter datas de criação/atualização relevantes (ex.: conteúdo com vigência legal), o campo `datePublished` deve ser adicionado à interface `GuideArticle` e passado como parâmetro para `createArticleStructuredData`.

---

## 2026-05-25 — `tsconfig.test.json` sem project references

**Contexto**: Ver [TROUBLESHOOTING.md](TROUBLESHOOTING.md#ts6310-referenced-project-may-not-disable-emit) para o histórico completo do erro.

**Decisão**: `tsconfig.test.json` não usa `references`. O campo `include` cobre `["src", "tests"]` diretamente.

**Por que esta abordagem:**

- O `tsconfig.test.json` já usa `extends: ./tsconfig.app.json` — herda todas as `compilerOptions` do app config
- `references` é para builds compostos independentes (compilados separadamente com `tsc -b`). O config de testes não precisa ser compilado separadamente — o Vitest usa o pipeline do Vite
- A combinação `allowImportingTsExtensions: true` + `emitDeclarationOnly: true` + `composite: true` no config referenciado dispara o `TS6310` quando o config de testes declara uma `reference` para ele

---

## 2026-06-14 — `ArticleStepIconName` na camada de dados, não na camada de componentes

**Contexto**: O tipo `ArticleStepIconName` vivia em `components/guideIconMap.ts` (camada de componentes). A interface `GuideArticle` no arquivo `data/guideArticles.ts` usava `iconName?: string` em vez de `ArticleStepIconName` porque a camada de dados não pode importar da camada de componentes — isso violaria a direção de dependências.

**Decisão**: `ArticleStepIconName` foi movido para `data/guideArticles.ts`. O `guideIconMap.ts` passa a importar e re-exportar o tipo de lá.

**Por que na camada de dados:**

- O tipo é uma restrição sobre um campo de dado (`GuideArticle.iconName`, `ArticleBlock.heading.icon`) — pertence ao contrato de dados, não à implementação visual.
- Com o tipo em `guideIconMap.ts`, o mapa de ícones (componente) definia o que era válido no dado — inversão de dependência errada.
- Agora a camada de dados define o contrato; a camada de componentes consome. Qualquer adição de ícone começa no tipo em `guideArticles.ts` — sem precisar tocar no componente para saber o que é permitido.

**Efeito colateral resolvido**: `GuideArticle.iconName` e `StepGroup.icon` passam a usar `ArticleStepIconName` em vez de `string`, eliminando o `TS7053` que aparecia no `GuideArticleLayout`. Ver [TROUBLESHOOTING.md](#ts7053-stepgroupicon-tipado-como-string-em-vez-de-articlestepiconname).

---

## 2026-06-14 — `fetchPriority='high'` nas imagens hero do Guide

**Contexto**: As imagens de cabeçalho de categoria (`GuideCategoryHeader`) e de artigo (`GuideArticleHeader`) são o maior elemento visual acima da dobra — candidatas diretas ao LCP (Largest Contentful Paint). Já tinham `loading='eager'` para evitar carregamento lazy desnecessário.

**Decisão**: Adicionar `fetchPriority='high'` em ambas as imagens hero.

**Por que `fetchPriority='high'` além de `loading='eager'`:**

- `loading='eager'` desativa o lazy loading, mas não eleva a prioridade de rede da requisição — o browser ainda pode enfileirar a imagem atrás de scripts, stylesheets e outras imagens.
- `fetchPriority='high'` sinaliza ao browser que esta imagem é crítica para a renderização e deve ser carregada com prioridade máxima.
- A combinação dos dois é o padrão recomendado para imagens LCP: `loading='eager' fetchPriority='high'`.

**Regra para o Guide**: toda imagem que é o maior elemento visual acima da dobra em qualquer página deve ter `loading='eager' fetchPriority='high'`.

---

## 2026-06-14 — Tokens de cor `red` e `yellow` no `guideCategoryTheme.ts`

**Contexto**: O `guideCategoryTheme.ts` tinha 14 tokens de cor para 17 categorias — três pares de categorias com cor idêntica. Duas das três colisões eram problemáticas: `judicializacao` (âmbar) e `denuncias` (rose) compartilhavam cores próximas com outras categorias da mesma grade.

**Decisão**: Adicionados dois novos tokens: `red` (para `judicializacao`) e `yellow` (para `denuncias`).

**Por que essas cores:**

- `judicializacao` — vermelho comunica urgência e seriedade legal. A cor âmbar anterior era ambígua (usada também em `saude-mental`).
- `denuncias` — amarelo comunica alertas e avisos. Rose era próximo demais de vermelho, gerando contraste visual fraco entre as duas categorias.

**Colisão restante**: `como-funciona-o-sus` e `transporte-sanitario` mantêm a mesma cor base (`blue`) mas são distinguíveis pelo ícone (`building` vs `location`). Aceito por enquanto — resolver exigiria adicionar um terceiro token azul que seria visualmente redundante.

**Padrão de adição de tokens**: cada novo token deve ter os 7 campos obrigatórios (`iconBg`, `iconBgLight`, `softBg`, `border`, `borderHover`, `text`, `textAccent`) para manter consistência de aplicação nos componentes.
