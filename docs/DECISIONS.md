# Decisões de Projeto

Registro de decisões de tooling, configuração e arquitetura com contexto, alternativas rejeitadas e raciocínio. Atualizar sempre que uma decisão relevante for tomada.

> Decisões sobre a stack de produto (React, Vite, TypeScript, etc.) estão documentadas no [README.md](../README.md) com o raciocínio de cada escolha.

---

## 2026-09-14 — Atualização do react-router-dom: 12 vulnerabilidades reais em produção

**Contexto**: `pnpm audit --prod` reportava 12 advisories, todas em `react-router@7.13.0`
(dependência transitiva de `react-router-dom@7.13.0`, fixada exata no lockfile) — incluindo
achados classificados como RCE ("arbitrary constructor invocation... leading to Unauth RCE") e
DoS. `package.json` já declarava `^7.13.0`, faixa que permite patch/minor.

**Investigação do pin**: `git log` mostra que `react-router-dom` foi adicionado em 2026-02-12
(`feat(routing): add React Router with BrowserRouter setup`) e o lockfile nunca mais foi tocado
especificamente por essa dependência depois disso — não é pin intencional documentado em nenhum
lugar, é lockfile parado há 7 meses.

**Decisão**: `pnpm update react-router-dom` → `7.13.0` para `7.18.3` (dentro do range `^7.13.0`
já declarado, resolveu tanto `react-router-dom` quanto sua dependência transitiva
`react-router`). `pnpm audit --prod` confirmado limpo depois ("No known vulnerabilities found").

**Validação**: `type-check`, `lint`, `build` limpos. `test:coverage` com os 415 testes unitários
passando (a % de cobertura reportada não é confiável neste momento — ver decisão separada sobre o
bug do `thresholds` do Vitest 4, investigado e corrigido em paralelo a esta branch). Suíte E2E
completa (5 browsers/projetos) rodada duas vezes — antes e depois do bump — pra isolar o que era
regressão real do que já existia:

- **1749 passaram, 21 skipped, 33 falharam** — as mesmas 33 falhas ocorrem **de forma idêntica**
  rodando a suíte contra o código original (antes do bump, via `git stash` temporário +
  reinstalação do lockfile antigo). Confirma que nenhuma delas foi causada pelo bump.
- As 33 falhas pré-existentes estão concentradas exclusivamente em `webkit`, `Mobile Chrome` e
  `Mobile Safari` (zero falhas em `chromium`/`firefox` desktop) e cobrem testes sem nenhuma
  relação com roteamento (FAQ, Hero, WCAG/axe, canonical URL) — abrir como investigação própria,
  fora do escopo desta branch (ver pendência abaixo).
- Achado lateral durante a investigação: os browsers Firefox e WebKit do Playwright não estavam
  instalados nesta máquina (`pnpm exec playwright install` resolveu) — a primeira tentativa de
  rodar a suíte completa falhou só por isso, não por causa do código.

**Pendência**: investigar por que 33 testes falham consistentemente em WebKit/viewports mobile,
independente do react-router-dom — provável causa comum (timing de carregamento de imagem,
regra de contraste/touch-target específica de viewport pequeno, ou comportamento de render
específico do motor WebKit). Não é uma regressão desta branch, mas é uma lacuna real de
cross-browser coverage que valeria investigar numa rodada própria.

---

## 2026-09-14 — Lighthouse CI configurado com thresholds derivados empiricamente

**Contexto**: `@lhci/cli` já era devDependency e existia o script `pnpm lighthouse`, mas não
havia `lighthouserc.cjs` nenhum — rodar o script falhava. O padrão global
(`~/.claude/CLAUDE.md`) exige Lighthouse CI rodando a cada push em todo projeto com frontend.

**Processo empírico** (não chutado): `pnpm build`, depois `pnpm exec lhci collect` 3x contra 4
páginas-arquétipo (Home `/`, índice do Guia `/como-conseguir-pelo-sus`, uma categoria
`/como-conseguir-pelo-sus/consulta`, um artigo real
`/como-conseguir-pelo-sus/consulta/como-agendar-consulta`) usando `staticDistDir: './dist'` +
`isSinglePageApplication: true` — **o mesmo modo que vai rodar de verdade no CI**, não um
`pnpm preview` isolado (que mediu números mais otimistas por não competir por CPU com o próprio
processo do LHCI rodando Chrome headless). Medianas observadas por página:

| Página        | Performance | A11y | Best Practices | SEO | LCP (mediana) |
| ------------- | ----------- | ---- | -------------- | --- | ------------- |
| Home          | 0.87        | 0.97 | 0.96           | 1.0 | 2546ms        |
| Guia (índice) | 0.88        | 0.96 | 1.0            | 1.0 | 2788ms        |
| Categoria     | 0.89        | 0.96 | 1.0            | 1.0 | 2955ms        |
| Artigo        | 0.80        | 0.96 | 1.0            | 1.0 | 3782ms        |

**Decisão**: `lighthouserc.cjs` com thresholds `error` para as 4 categorias e para
LCP/CLS, `warn` para TBT/Speed Index (métricas secundárias, mais ruidosas — TBT chegou a 1596ms
numa rodada isolada da Home, Speed Index a 4464ms numa do artigo, ambos outliers de uma única
execução). Threshold de cada categoria fica com margem abaixo da pior mediana observada entre as
4 páginas (ex.: performance pior mediana 0.80 → threshold 0.70), usando
`aggregationMethod: 'median'` em cada assertion — o CI sempre calcula a mediana real das 3
execuções daquele run, o número no config é só o piso de aprovação, não um valor fixo copiado.
Validado rodando `pnpm exec lhci autorun` de ponta a ponta contra o config final antes de
commitar — passou limpo.

**Pendência conhecida, não escondida**: a página de artigo (LCP mediana 3782ms) já está acima da
meta de 2.5s do próprio `CLAUDE.md` deste projeto ("Core Web Vitals: LCP < 2.5s"). O threshold do
Lighthouse CI (4400ms) protege contra regressão _adicional_ a partir de hoje, não substitui a
otimização real da página — suspeita inicial é a imagem de capa/hero do artigo não estar
recebendo o mesmo tratamento de prioridade/otimização das outras páginas. Investigar quando o
Lighthouse CI já estiver rodando em CI real por um tempo (mais dados, menos ruído de máquina
única).

**Alternativa rejeitada**: usar `assertMatrix` para thresholds distintos por página (LCP da Home
mais apertado que o do artigo, por exemplo) em vez de um único threshold uniforme calibrado pela
pior página. Seria mais preciso, mas adicionaria complexidade de configuração desproporcional ao
estágio atual do projeto (4 páginas, ainda sem dashboard) — considerar `assertMatrix` se o
número de páginas/arquétipos crescer o suficiente pra um único piso ficar frouxo demais pras
páginas mais leves.

---

## 2026-09-14 — Remoção de 7 documentos genéricos de template

**Contexto**: Auditoria de padronização (mesma rodada aplicada antes ao `portfolio` e ao
`faladoria-backend`) encontrou 7 arquivos de documentação que descreviam uma stack diferente da
real deste projeto: `docs/ARCHITECTURE.md` (mencionava TanStack Query como "API Client" — o
projeto não tem nenhum cliente de API ainda), `docs/BETTER-AUTH-GUIDE.md` (guia de integração
Better Auth com um backend genérico Hono + Drizzle + Postgres — a integração real será com o
`faladoria-backend`, que é Fastify + MongoDB), `docs/FOLDER-STRUCTURE.md` (estrutura de pastas
genérica, divergente da real já documentada em `CLAUDE.md`), `docs/SETUP-GUIDE.md` (lido por
completo: `.eslintrc.cjs` no formato legado quando o projeto usa flat config, `tailwind.config.js`
quando a v4 real usa `@theme` em `src/index.css`, aliases `@components`/`@utils`/`@hooks` que não
existem — os reais são `@shared`/`@features`/`@assets`, API antiga do Sentry
`Sentry.BrowserTracing()`/`Sentry.Replay()`), `docs/CONTRIBUTING.md` (lido por completo: 100%
genérico, nada que não esteja já e melhor coberto pelo `CLAUDE.md` real), `docs/CHANGELOG.md`
(lido por completo: abre com "mudanças notáveis **neste template**" e lista TanStack Router/Vite
5 no "Core Stack") e `QUICKSTART.md` na raiz (achado durante a implementação desta branch, não
listado na auditoria original — é um checklist de "como iniciar um novo projeto a partir deste
template", com `gh repo create ... --template seu-usuario/react-vite-template` e links pros 6
arquivos acima).

**Decisão**: Deletar os 7 arquivos. Mantidos: `docs/DECISIONS.md`, `docs/TROUBLESHOOTING.md`,
`docs/TESTES.md`, `docs/TESTES-SEO.md` — confirmados como documentação genuína e específica do
projeto real.

**Por quê**: Documentação errada é pior que nenhuma documentação — um guia de auth descrevendo um
backend que não existe (Hono/Drizzle/Postgres) enganaria quem for implementar a integração real
com o `faladoria-backend` quando a feature `auth/` for construída. `README.md` não referenciava
nenhum dos 7 arquivos (confirmado via grep antes de apagar), então a remoção não quebra nenhum
link existente.

**Alternativa rejeitada**: Reescrever os 6 documentos (menos `QUICKSTART.md`, achado depois) para
refletir a stack real, em vez de apagar. Rejeitada porque nenhum descreve nada específico do
projeto que não esteja já coberto, com mais precisão, no `CLAUDE.md` real — manter os arquivos só
para reescrevê-los criaria duas fontes de verdade para a mesma informação.

---

## 2026-06-24 — Headings de seção sem prefixo numérico em `InformationalStepCard`

**Contexto**: `GuideArticleLayout` divide os blocos de conteúdo em dois tipos de seção:

- `ProceduralStepSection` — renderiza quando há `action-step` no grupo. Exibe o título do H2 sem prefixo numérico.
- `InformationalStepCard` — renderiza quando não há `action-step`. Exibia `{stepNumber}. {heading}` no H2.

A primeira seção de qualquer artigo é sempre `ProceduralStepSection` (passo a passo). As seguintes, sendo `InformationalStepCard`, apareciam numeradas a partir de **2**, criando uma sequência visualmente quebrada: passos 1, 2, 3 → "2. Cronograma" → "3. O que é avaliado".

**Decisão**: Remover o prefixo `{stepNumber}.` do `<h2>` em `InformationalStepCard`. Remover também o badge numérico de fallback na caixa de ícone — a caixa só é renderizada quando um ícone for explicitamente definido no heading (`icon: 'syringe'` etc.). O `stepNumber` continua sendo usado exclusivamente no `id` do heading (para `aria-labelledby`).

**Por quê**: A numeração de seções só faz sentido quando todas as seções a exibem. Como `ProceduralStepSection` não exibe — e é sempre a primeira — as seções seguintes aparecem numeradas a partir de 2, o que confunde o leitor. Headings de artigo não são passos de um fluxo sequencial a ser seguido: são âncoras de navegação dentro do conteúdo.

**Alternativas rejeitadas**:

- Adicionar o número também em `ProceduralStepSection` — criaria conflito com a numeração dos `action-steps` internos (que já são numerados 1, 2, 3 dentro da seção).
- Manter o badge mas com um ícone genérico de fallback — um ícone genérico sem significado semântico é ruído visual. Sem ícone explícito, a seção fica mais limpa sem a caixa.

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

---

## 2026-06-17 — TODOs em `companyInfo.ts`, `privacyPolicyContent.ts` e `termsOfUseContent.ts` são intencionais

**Contexto**: Auditoria de código de junho de 2026 identificou comentários `// TODO` em dados de empresa (CNPJ, endereço, URL real, cor de marca) e conteúdo legal (Política de Privacidade, Termos de Uso).

**Decisão**: Manter todos os TODOs. Não são dívida técnica — são marcações de dados pendentes que dependem do cliente, não do desenvolvedor.

**Por quê**: O projeto está em fase de desenvolvimento sem os dados reais do cliente ainda disponíveis. Remover os TODOs antes de ter os dados preenchidos geraria conteúdo falso em produção (pior que um placeholder visível). Os campos marcados incluem: `legalName`, `url`, `address`, `themeColor`, `cnpj`, e todas as seções da documentação legal.

**Ação futura**: substituir cada TODO pelos dados reais do cliente quando disponíveis. A URL de produção real deve substituir `'https://faladoria-web.vercel.app'` em `COMPANY_INFO.url`. A cor da marca deve substituir `'#3b82f6'` em `COMPANY_INFO.seo.themeColor`.

---

## 2026-06-17 — Repetição estrutural em `guideCategoryTheme.ts` é esperada

**Contexto**: Auditoria identificou que `guideCategoryTheme.ts` repete o mesmo padrão de 7 propriedades por cor (~16 entradas). Foi questionado se isso é uma violação do DRY.

**Decisão**: Não aplicar abstração. O arquivo é um data file — mapeamento de 16 tokens de cor para 7 valores CSS cada. Repetição em dados é estruturalmente diferente de repetição em lógica.

**Por quê**: Uma factory function (ex: `createTheme(base, accent, ...)`) economizaria linhas mas tornaria o arquivo ilegível para quem precisa ajustar uma cor específica — o leitor precisaria entender a factory para saber qual argumento corresponde ao `iconBgLight` de `purple`. O formato atual é autoexplicativo: ver a cor de uma linha, alterar a linha. DRY se aplica à lógica duplicada; dados tabulares são uma exceção deliberada.

---

## 2026-06-17 — Filtragem de blocos no `StepCard` é responsabilidade de view, não violação do SRP

**Contexto**: Auditoria questionou se `StepCard` viola o Princípio de Responsabilidade Única ao filtrar blocos internamente além de renderizar.

**Decisão**: Manter a filtragem dentro do componente. Não é uma violação de SRP.

**Por quê**: A decisão de "quais blocos vão para qual sub-componente" é indissociável do `StepCard` — é uma decisão de layout visual. Extrair isso para um hook `useArticleBlocks()` criaria uma abstração sem propósito: a função de transformação tem uma única chamada, é usada uma única vez, e não tem lógica reutilizável. A separação seria burocracia sem ganho de manutenibilidade.

**Distinção relevante**: SRP no contexto de componentes React significa que um componente não deve misturar responsabilidades de _domínio_ distintas (ex.: buscar dados + renderizar + autenticar). Filtrar dados de layout para decidir onde renderizá-los é parte da responsabilidade de view do componente.

**Nota (2026-06-22)**: após o redesign do Guide, `StepCard` tornou-se um dispatcher de dois caminhos: se o step tem blocos `action-step` → renderiza `ProceduralStepSection`; caso contrário → `InformationalStepCard`. A filtragem `rightBlocks` / `contentBlocks` agora ocorre dentro de `InformationalStepCard` (callouts para a coluna direita, demais para o corpo). O princípio se mantém — filtragem de layout é responsabilidade do componente de view.

---

## 2026-06-17 — Type assertions em `CONTENT_BLOCK_RENDERERS` são limitação do TypeScript, não má prática

**Contexto**: Auditoria identificou 3 type assertions `as Extract<ArticleBlock, { type: 'X' }>` no mapa `CONTENT_BLOCK_RENDERERS` em `GuideArticleLayout.tsx`.

**Decisão**: Manter as assertions. São a solução correta para a limitação conhecida do TypeScript com `Partial<Record>` e discriminated unions.

**Por quê**: O tipo `Partial<Record<ArticleBlock['type'], BlockRenderer>>` declara que cada key do mapa aceita qualquer `ArticleBlock`, mas dentro de cada renderer o bloco é garantidamente do tipo correspondente à key. O TypeScript não consegue estreitar o tipo automaticamente neste padrão. As assertions são localizadas, documentam a invariante (o renderer de `'paragraph'` sempre recebe um bloco do tipo `paragraph`) e não escondem bugs — o mapa garante que apenas o renderer correto é chamado para cada tipo. Alternativa com `if`/`switch` explícito removeria o mapa e o benefício do OCP.

---

## 2026-06-17 — Type assertion em `Object.entries(STATUS_CONFIG)` é limitação conhecida do TypeScript

**Contexto**: Auditoria identificou `as [InteractionStatus, ...][]` em `StatusLegend.tsx` para narrowing de `Object.entries`.

**Decisão**: Manter a assertion. É a solução canônica para o comportamento deliberado do TypeScript com `Object.entries`.

**Por quê**: O TypeScript infere o retorno de `Object.entries(obj)` como `[string, ValueType][]` mesmo quando as keys do objeto são um union type literal. Isso é intencional — o TypeScript não pode garantir em tempo de compilação que o objeto em runtime não tem keys extras. A assertion `as [InteractionStatus, Config][]` é segura porque `STATUS_CONFIG` é `as const` e o tipo de key é controlado. Alternativas como `Object.keys(STATUS_CONFIG).map(key => [key as InteractionStatus, STATUS_CONFIG[key as InteractionStatus]])` são mais verbosas e não mais seguras.

---

## 2026-06-17 — `cn.ts` e `reportWebVitals.ts` não precisam de testes unitários

**Contexto**: Auditoria sugeriu adicionar testes unitários a `cn.ts` (wrapper de `clsx` + `tailwind-merge`) e `reportWebVitals.ts` (integração com `web-vitals`).

**Decisão**: Não adicionar testes. Ambos estão fora do escopo de cobertura justificável.

**Por quê**:

- **`cn.ts`** tem uma linha de lógica: `return twMerge(clsx(inputs))`. Testar essa função é testar se `clsx` e `tailwind-merge` funcionam — e ambas as libs já têm suítes de testes próprias extensas. O único cenário de bug real seria a dependência quebrar, o que seria detectado instantaneamente ao usar qualquer componente.
- **`reportWebVitals.ts`** é um adaptador de integração pura: chama callbacks de `web-vitals` sem lógica condicional, transformação de dados ou estado. Testar integrações com libs externas exige mockear a lib inteira — o teste verificaria apenas que o mock foi chamado, não que a integração funciona em produção.

**Regra**: testar wrappers de uma linha e adaptadores de integração pura é sobrecarga de manutenção sem ganho de confiança. Focar cobertura em lógica própria do projeto.

---

## 2026-06-22 — Redesign do conteúdo do Guide: modelo "Mostrar primeiro. Explicar depois."

**Contexto**: Os artigos do Guide usavam um modelo expositivo — parágrafos de texto seguidos de callouts e listas. Usuários em situação de stress (aguardando cirurgia, precisando de medicamento) precisam de ação imediata, não de explicação. O modelo anterior priorizava completude sobre utilidade.

**Decisão**: Adotar o modelo "Mostrar primeiro. Explicar depois." — cada seção processual começa com os passos de ação (`action-step`) e depois oferece contexto (callouts, listas) para quem quiser se aprofundar.

**Implementação**:

- Novo tipo `action-step` na union `ArticleBlock` com campos `action` (obrigatório), `detail` (opcional) e `imageKey` (opcional, referência a `SharedStepImageKey`)
- `groupIntoSteps()` segmenta o conteúdo em `preamble` (blocos antes do primeiro `<h2>`) e `steps` (grupos iniciados por `<h2>`)
- `StepCard` é um dispatcher: detecta se o step tem blocos `action-step` → rota para `ProceduralStepSection`; caso contrário → `InformationalStepCard`
- `ProceduralStepSection`: `<section aria-labelledby>` + `<h2>` sem prefixo numérico + `GuideActionStepList` + blocos complementares
- `InformationalStepCard`: `<section aria-labelledby>` + `<h2>` com prefixo `{N}. ` + conteúdo + callouts na coluna direita

**Regra de numeração**: apenas `InformationalStepCard` exibe prefixo numérico. `ProceduralStepSection` não usa número — é auto-explicativa pelo heading e pela lista de passos.

**Alternativa rejeitada**: manter o modelo expositivo com listas ordenadas de ação. O problema não era a ausência de listas — era a hierarquia de informação: contexto antes de ação. O `action-step` força a inversão estrutural.

---

## 2026-06-22 — `ActionStepBlock` exportado pela camada de dados

**Contexto**: Três componentes (`GuideActionStepCard`, `GuideActionStepList`, `GuideArticleLayout`) precisavam do tipo `ActionStepBlock = Extract<ArticleBlock, { type: 'action-step' }>`. Antes da decisão, o tipo estava duplicado nesses três arquivos.

**Decisão**: Exportar `ActionStepBlock` de `data/guideArticles.ts` e re-exportar pelo barrel `data/index.ts`. Os componentes importam de `'../data'`.

**Por quê**: `ActionStepBlock` é uma restrição sobre um campo de dado — pertence ao contrato de dados, não à implementação visual. Além disso, duplicar um tipo derivado por `Extract` é um code smell: qualquer mudança na union `ArticleBlock` precisaria ser propagada manualmente para todos os lugares que repetem o `Extract`.

**Regra**: tipos derivados de `ArticleBlock` por `Extract` devem ser exportados pelo barrel de dados e importados pelos componentes. Não definir o mesmo `Extract` em mais de um arquivo.

---

## 2026-06-22 — Fallback em dois níveis para imagens de artigo

**Contexto**: `GuideArticleCard` e `GuideArticleHeader` precisavam exibir uma imagem para cada artigo. Nem todo artigo tem uma imagem própria — mas toda categoria tem. A ausência de imagem causava um layout vazio para artigos sem imagem específica.

**Decisão**: Lookup em dois níveis: `GUIDE_ARTICLE_IMAGES[slug] ?? GUIDE_CATEGORY_IMAGES[categorySlug]`. Se nenhum dos dois existir, o componente não renderiza a tag `<img>`.

**Por quê**: A imagem de categoria já cumpre a função visual para artigos que não a têm. Adicionar imagem ao `GUIDE_ARTICLE_IMAGES` por artigo seria necessário apenas quando a imagem for semanticamente distinta da categoria — não por ausência de alternativa.

**Alternativa rejeitada**: adicionar manualmente a imagem de categoria ao `GUIDE_ARTICLE_IMAGES` para cada artigo que não tem imagem própria. Além de redundante, cria manutenção duplicada: trocar a imagem da categoria exigiria trocar em dois lugares.

---

## 2026-06-22 — Remoção de tipos mortos da union `ArticleBlock`

**Contexto**: Revisão pós-redesign identificou três tipos na union `ArticleBlock` com zero usos em todos os arquivos de dados de artigos: `image`, `info-panel`, `heading level: 3`. Os componentes correspondentes (`StepImage`, `InfoPanel`) e os renderers no mapa `CONTENT_BLOCK_RENDERERS` também eram código morto.

**Decisão**: Remover `image`, `info-panel` e `heading level: 3` da union `ArticleBlock`. Remover os componentes `StepImage` e `InfoPanel` e seus renderers. Remover a constante `GUIDE_STEP_IMAGES` (usada apenas por `StepImage`, com 2 entradas que duplicavam `SHARED_STEP_IMAGES`).

**Como foi verificado**: `grep -r "type: 'image'" src/features/guide/data/` e equivalentes para `info-panel` e `heading.*level.*3` retornaram zero resultados em todos os arquivos de artigos.

**Alternativa rejeitada**: manter os tipos como "reserva para uso futuro". Código não utilizado tem custo de manutenção real: qualquer desenvolvedor que ler o código vai tentar entender para que serve. Se necessário no futuro, o tipo pode ser reintroduzido — o git preserva o histórico.

---

## 2026-06-22 — Separação de CPAP/BiPAP e aparelho auditivo da categoria Equipamentos

**Contexto**: O artigo inicial `como-solicitar-equipamentos` listava CPAP, BiPAP e aparelhos auditivos junto com cadeiras de rodas, muletas, órteses e próteses em um único callout "O que o SUS fornece". Durante a construção do conteúdo, identificou-se que esses equipamentos têm fluxos de solicitação completamente diferentes.

**Decisão**: Criar artigos próprios para `cpap-bipap-sus` e `aparelho-auditivo-sus`, e removê-los do artigo geral. O artigo `como-solicitar-equipamentos` passou a cobrir exclusivamente OPM (Órteses, Próteses e Meios Auxiliares de Locomoção) via RCPD/CER.

**Por quê**: CPAP/BiPAP exige polissonografia e segue o PCDT de SAOS (Portaria SAS nº 1.274/2013), com dispensação via Central de Regulação. Aparelhos auditivos seguem a Política Nacional de Atenção à Saúde Auditiva (Portaria GM/MS nº 2.073/2004), com atendimento obrigatório via SASA ou CEA. Misturar os três fluxos em um único artigo induziria o usuário ao erro — é o tipo de conteúdo que, se errado, gera dano real para a pessoa.

**Alternativa rejeitada**: manter todos os equipamentos em um único artigo com seções diferenciadas. Rejeitada porque dificulta a leitura e o usuário que precisa de CPAP não precisa ler sobre cadeira de rodas — e vice-versa.

---

## 2026-06-22 — Correção do fluxo de OPM: Secretaria de Saúde → CER

**Contexto**: O artigo original orientava o usuário a "ir à Secretaria de Saúde com o laudo". Esse é o fluxo informal, mas não o fluxo oficial estabelecido pela Portaria GM/MS nº 793/2012 (RCPD).

**Decisão**: Corrigir para o fluxo oficial: UBS/especialista → laudo + encaminhamento → CER (Centro Especializado em Reabilitação) ou serviço de reabilitação física vinculado à RCPD. Também adicionado "encaminhamento" à lista de documentos necessários — era obrigatório mas estava ausente.

**Fonte**: Portaria GM/MS nº 793/2012, Art. 5º — as Oficinas Ortopédicas que realizam dispensação, confecção e adaptação de OPM são "necessariamente vinculadas a serviços de reabilitação física".

---

## 2026-06-23 — `slate` como 17ª cor no sistema de cores do Guide

**Contexto**: Com 17 categorias e apenas 16 cores na union `GuideCategory['color']`, a cor `blue` estava atribuída a duas categorias: `transporte-sanitario` e `como-funciona-o-sus`. Isso não causava erro de compilação, mas significava que as duas categorias seriam indistinguíveis visualmente na grade.

**Decisão**: Adicionar `'slate'` à union de cores em `guideCategories.ts` e ao mapa `CATEGORY_THEME` em `guideCategoryTheme.ts`. Atribuir `color: 'slate'` à categoria `como-funciona-o-sus`.

**Por quê `slate` e não outra cor**: slate é visualmente neutro e adequado para uma categoria informativa/institucional ("como funciona o SUS") — não carrega a carga semântica de urgência (vermelho), cautela (amarelo) ou saúde (verde). A escolha foi deliberada pela natureza do conteúdo.

**Regra de prevenção**: um teste de unicidade de cores (`all category colors are unique`) foi adicionado em `guideUtils.test.ts`. Qualquer adição de categoria que reutilize uma cor existente falhará no pre-push.

---

## 2026-06-23 — `getArticleBySlug` aceita `categorySlug` opcional para validação de rota

**Contexto**: `getArticleBySlug(slug)` buscava apenas pelo `slug`, sem considerar `categorySlug`. Em rotas como `/como-conseguir-pelo-sus/:categorySlug/:articleSlug`, a função poderia retornar um artigo de outra categoria se dois artigos tivessem o mesmo slug (possível futuramente). A `GuideArticlePage` já validava `article.categorySlug !== category.slug` separadamente, mas a validação na própria função é mais segura.

**Decisão**: Adicionar parâmetro opcional `categorySlug?: string` a `getArticleBySlug`. Quando fornecido, a busca exige que `a.categorySlug === categorySlug`. Sem o parâmetro, comportamento idêntico ao anterior (compatibilidade retroativa).

**Por que opcional e não obrigatório**: `getArticleBySlug` também é usado em testes de dados sem contexto de categoria. Tornar obrigatório quebraria esses usos sem ganho real.

**Uso em `GuideArticlePage`**: `getArticleBySlug(articleSlug ?? '', categorySlug)` — o `categorySlug` da URL é passado, eliminando a necessidade de validar `article.categorySlug !== category.slug` após o lookup.

---

## 2026-06-23 — Sentry para tipos de bloco desconhecidos no `GuideArticleLayout`

**Contexto**: O mapa `CONTENT_BLOCK_RENDERERS` em `GuideArticleLayout.tsx` retorna `undefined` para tipos de bloco não registrados. O comportamento silencioso (retornar `null` e não renderizar) é correto para produção, mas mascarava erros de dados — um bloco com `type` inválido passaria despercebido.

**Decisão**: Em desenvolvimento (`import.meta.env.DEV`): `console.warn` com o tipo desconhecido. Em produção: `Sentry.captureMessage(...)` com nível `'warning'`.

**Por que `import.meta.env.DEV` e não `process.env.NODE_ENV`**: este é um projeto Vite. As variáveis de ambiente do Vite são acessadas via `import.meta.env`. `process.env.NODE_ENV` não existe no contexto do browser sem configuração adicional de polyfill.

**Alternativa rejeitada**: lançar exceção. Bloco desconhecido não deve crashar a página — o resto do artigo deve continuar renderizando normalmente.

---

## 2026-06-23 — `aria-label` em `<li>` de action steps para WCAG 1.3.1

**Contexto**: `GuideActionStepCard` renderizava `<li>` para cada passo sem nome acessível. O número do passo era visível apenas visualmente (indicador circular com número). Leitores de tela anunciavam o conteúdo do item sem contexto de sequência.

**Decisão**: Adicionar `aria-label={`Passo ${stepIndex}`}` ao elemento `<li>` em `GuideActionStepCard`.

**Por que no `<li>` e não no indicador visual**: o indicador circular (`<span aria-hidden>`) é decorativo — seu conteúdo já está sendo suprimido de leitores de tela com `aria-hidden`. O `aria-label` no `<li>` fornece o contexto de sequência para todo o item, não apenas para o número.

**Referência WCAG**: 1.3.1 Info and Relationships — informação transmitida visualmente deve ser disponível programaticamente.

---

## 2026-06-23 — Remoção de exports mortos: `GuideActionStepCard`, `GuideActionStepList` e re-export de `ArticleStepIconName`

**Contexto**: O barrel `src/features/guide/components/index.ts` exportava `GuideActionStepCard` e `GuideActionStepList` — componentes internos de implementação do `GuideArticleLayout`, sem uso externo à feature. O arquivo `guideIconMap.ts` re-exportava `ArticleStepIconName`, que já é exportado pelo barrel canônico `data/index.ts`.

**Decisão**: Remover os dois exports do barrel de componentes. Remover o `export type { ArticleStepIconName }` de `guideIconMap.ts`.

**Por que não exportar componentes internos**: a API pública de uma feature é definida pelo barrel `index.ts`. Exportar componentes de implementação cria acoplamento implícito — código externo pode começar a importá-los e qualquer refatoração interna se torna um breaking change. `GuideActionStepCard` e `GuideActionStepList` são detalhes de implementação de `GuideArticleLayout`.

**Por que remover a re-exportação de tipo**: `ArticleStepIconName` tem uma fonte canônica (`data/index.ts`). Uma re-exportação em `guideIconMap.ts` cria dois caminhos de import para o mesmo tipo — confunde sobre qual é o caminho correto e pode gerar inconsistência se a re-exportação ficar desatualizada.

---

## 2026-06-24 — `AccessibleLink` com filhos React complexos exige `aria-label` explícito

**Contexto**: `GuideCategoryFooter` e `GuideArticleFooter` usavam `<a>` nativo para o link do WhatsApp com múltiplos filhos (ícone SVG + texto + chevron). Ao migrar para `AccessibleLink`, o accessible name calculado automaticamente produzia `[object Object] Falar com a equipe (abre em nova aba)` em vez do texto esperado.

**Decisão**: Passar `aria-label` explícito em qualquer `AccessibleLink` cujos filhos incluam nós React não-texto (ícones, elementos aninhados, fragmentos).

**Por quê**: A função `computeAriaLabel` em `AccessibleLink` constrói o nome acessível via interpolação de string sobre `children`. Quando `children` é um React element (ex.: `<PhoneIcon />` + texto), a serialização produz `"[object Object]"`. O `aria-label` explícito contorna isso e é semanticamente mais preciso. Para links externos, incluir `"(abre em nova aba)"` no `aria-label` garante que leitores de tela anunciem o comportamento da nova aba mesmo quando `showExternalIcon={false}`.

**Quando aplicar**:

- Filhos contêm ícones SVG → `aria-label` explícito obrigatório
- Filhos são texto puro → `computeAriaLabel` funciona corretamente; `aria-label` desnecessário
- Links externos com `showExternalIcon={false}` → incluir `"(abre em nova aba)"` no `aria-label`

**Alternativa rejeitada**: Reescrever `computeAriaLabel` para extrair text nodes dos filhos React via `React.Children`. A complexidade adicionada ao componente compartilhado não justifica o ganho — o `aria-label` explícito é mais legível e previsível para quem mantém o código.

---

## 2026-06-24 — Remoção de `GuideCategoryCard`, `GuideArticleCard` e `GuideBreadcrumb` do barrel de componentes

**Contexto**: O barrel `src/features/guide/components/index.ts` exportava `GuideCategoryCard`, `GuideArticleCard` e `GuideBreadcrumb`. Auditoria identificou que os três são componentes internos de implementação — usados exclusivamente dentro de `GuideCategoryLayout` e `GuideArticleLayout`, sem nenhum consumidor externo à feature.

**Decisão**: Remover os três do barrel. A API pública da feature permanece: `GuideCategoryLayout`, `GuideArticleLayout` e as três sections (`GuideCategoriesSection`, `GuideHeroSection`, `GuideWhySection`).

**Por quê**: Exportar componentes de implementação pelo barrel cria acoplamento implícito — qualquer código externo pode começar a importá-los diretamente, tornando refatorações internas breaking changes. Se um componente não tem consumidor externo, não deve estar no barrel.

**Conexão**: segue a mesma decisão de 2026-06-23 que removeu `GuideActionStepCard` e `GuideActionStepList` do barrel pelos mesmos motivos.

---

## 2026-06-24 — `CalloutBlock` como discriminated union com dispatch via `switch`

**Contexto**: O tipo `ArticleBlock` definia callouts com um único membro genérico (`{ type: 'callout'; variant?: string; title?: string; text?: string; highlight?: string; items?: string[] }`). Isso permitia combinações inválidas em tempo de autoria — como `text` em um checklist ou `highlight` em um tip — sem nenhum erro do TypeScript. Ao introduzir o artigo de crise de saúde mental (que usa a variante `emergency` com `highlight`), ficou claro que o tipo precisava ser refinado.

**Decisão**: Extrair `CalloutBlock` como uma discriminated union separada, com cada variante declarando apenas seus campos válidos. No componente `GuideArticleCallouts.tsx`, substituir o lookup table `CALLOUT_VARIANTS` por um `switch` statement.

**Por quê**:

O lookup table `CALLOUT_VARIANTS[variant]` não funcionava com a discriminated union porque TypeScript não conseguia narrar o `block` ao tipo específico da variante dentro de cada entrada da map — cada componente esperava um tipo narrowed (ex.: `TipCalloutData`), mas o lookup passava `CalloutData` completo. O `switch` resolve isso nativamente: TypeScript auto-narro `block` em cada `case` branch via control flow analysis.

Para os type aliases locais (`TipCalloutData`, `DefaultCalloutData`, etc.), foram usados `Extract` e `Exclude` sobre `CalloutData`:

- `Extract<CalloutData, { variant: 'tip' }>` → isola a variante tip
- `Exclude<CalloutData, { variant: string }>` → isola o default (`variant?: never`), porque `Extract<CalloutData, { variant?: never }>` é não confiável: `{ variant?: never }` é satisfeito por qualquer tipo (structural typing), enquanto `Exclude` com `{ variant: string }` remove corretamente os membros com literal string em `variant`

**Benefício**: erros de autoria de conteúdo (campo inválido para a variante) viram erros de TypeScript em `mental-health.ts` em vez de data loss silencioso em runtime.

**Alternativa rejeitada**: Manter o lookup table e adicionar type assertions (`as TipCalloutData`). Rejeitado porque suprime a garantia de tipo — o TypeScript passa a acreditar sem verificar, e erros no mapeamento de componentes ficam invisíveis.

---

## 2026-06-22 — Constantes compartilhadas para strings repetidas em equipment.ts

**Contexto**: Com três artigos no mesmo arquivo (`equipment.ts`), seis strings de conteúdo passaram a aparecer três vezes cada: `'Como solicitar'`, `'Documentos necessários'`, `'Cartão do SUS'`, `'Documento com foto (RG ou CNH)'`, `'CPF'`, `'Comprovante de residência'` e `'doctor-patient'`. A regra `sonarjs/no-duplicate-string` (threshold: 3) bloqueou o pre-commit.

**Decisão**: Extrair as sete strings como constantes no topo do arquivo (`HOW_TO_SECTION`, `REQUIRED_DOCS_TITLE`, `DOC_SUS_CARD`, `DOC_PHOTO_ID`, `DOC_CPF`, `DOC_PROOF_OF_ADDRESS`, `IMG_DOCTOR_PATIENT`), seguindo o mesmo padrão já usado para `CATEGORY_SLUG` e `DATE_PUBLISHED`.

**Regra**: arquivos com múltiplos artigos na mesma categoria devem extrair strings compartilhadas entre artigos como constantes no topo do arquivo. Isso evita retrabalho no pre-commit e mantém o conteúdo de checklist sincronizado entre artigos da mesma família.
