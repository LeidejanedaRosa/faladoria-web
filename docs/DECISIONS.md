# Decisões de Projeto

Registro de decisões de tooling, configuração e arquitetura com contexto, alternativas rejeitadas e raciocínio. Atualizar sempre que uma decisão relevante for tomada.

> Decisões sobre a stack de produto (React, Vite, TypeScript, etc.) estão documentadas no [README.md](../README.md) com o raciocínio de cada escolha.

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
  root: '/comoconseguirpelosus',
  category: (slug: string) => `/comoconseguirpelosus/${slug}`,
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
├── guideArticles.ts     → GuideArticle[] (15 artigos placeholder)
├── guideUtils.ts        → getCategoryBySlug, getArticlesByCategory, getArticleBySlug
└── guideContent.ts      → conteúdo de UI e createArticleStructuredData
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

## 2026-05-25 — `tsconfig.test.json` sem project references

**Contexto**: Ver [TROUBLESHOOTING.md](TROUBLESHOOTING.md#ts6310-referenced-project-may-not-disable-emit) para o histórico completo do erro.

**Decisão**: `tsconfig.test.json` não usa `references`. O campo `include` cobre `["src", "tests"]` diretamente.

**Por que esta abordagem:**

- O `tsconfig.test.json` já usa `extends: ./tsconfig.app.json` — herda todas as `compilerOptions` do app config
- `references` é para builds compostos independentes (compilados separadamente com `tsc -b`). O config de testes não precisa ser compilado separadamente — o Vitest usa o pipeline do Vite
- A combinação `allowImportingTsExtensions: true` + `emitDeclarationOnly: true` + `composite: true` no config referenciado dispara o `TS6310` quando o config de testes declara uma `reference` para ele
