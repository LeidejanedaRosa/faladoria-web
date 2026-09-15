# Faladoria — Web

Landing page institucional e backoffice administrativo da **Faladoria**, plataforma de mediação entre usuários do SUS e gestores de saúde pública. O canal opera via WhatsApp e permite que cidadãos registrem problemas de atendimento diretamente com os responsáveis municipais ou estaduais.

> **Fase atual**: Landing page pública com navegação informativa, Guia do SUS e páginas legais. O backoffice (auth + dashboard) será desenvolvido em seguida, após migração para a estrutura feature-based completa.

---

## Índice

- [Visão Geral](#visão-geral)
- [Stack de Tecnologias](#stack-de-tecnologias)
- [Bibliotecas de Teste](#bibliotecas-de-teste)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
- [Acessibilidade](#acessibilidade)
- [SEO e Dados Estruturados](#seo-e-dados-estruturados)
- [Qualidade de Código](#qualidade-de-código)
- [Deploy e Produção](#deploy-e-produção)
- [Documentação Adicional](#documentação-adicional)

---

## Visão Geral

### Páginas da aplicação

| Página                  | Rota           | Descrição                                               |
| ----------------------- | -------------- | ------------------------------------------------------- |
| Home (Landing)          | `/`            | Página de apresentação com todas as seções de conversão |
| Guia do SUS             | `/guia`        | Índice das categorias de orientação ao cidadão          |
| Guia — Categoria        | `/guia/:slug`  | Conteúdo de uma categoria específica do Guia do SUS     |
| Política de Privacidade | `/privacidade` | Documento legal de política de privacidade              |
| Termos de Uso           | `/termos`      | Documento legal de termos de uso do serviço             |
| Não encontrada          | `*`            | Página 404 customizada                                  |

### Seções da landing page (ordem de renderização)

| Seção            | Componente              | Descrição                                                    |
| ---------------- | ----------------------- | ------------------------------------------------------------ |
| Hero             | `HeroSection`           | Headline principal, proposta de valor e CTA para WhatsApp    |
| Problema         | `ProblemSection`        | Dores do usuário do SUS — filas, falta de medicamentos, etc. |
| Solução          | `SolutionSection`       | Como o Faladoria resolve os problemas apresentados           |
| Como funciona    | `HowItWorksSection`     | Passo a passo do fluxo de uso via WhatsApp                   |
| Transparência    | `TransparencySection`   | Painel de interações, estatísticas e status do canal         |
| Sobre            | `AboutSection`          | Perfil e motivação da fundadora                              |
| Guia em destaque | `GuideHighlightSection` | Prévia do Guia do SUS com link para a feature completa       |
| FAQ              | `FaqSection`            | Perguntas frequentes em formato acordeão                     |

---

## Stack de Tecnologias

### Core

| Tecnologia                                        | Versão | Por que foi escolhida                                                                                                                          |
| ------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **[React](https://react.dev/)**                   | 19.x   | Biblioteca de UI padrão do mercado com suporte nativo a `React.lazy`, `Suspense`, `ErrorBoundary` e o novo compilador de otimização automática |
| **[Vite](https://vitejs.dev/)**                   | 6.x    | Build tool com HMR instantâneo, code splitting automático e build de produção otimizado com Rollup                                             |
| **[TypeScript](https://www.typescriptlang.org/)** | 5.x    | Tipagem estática para prevenir bugs em desenvolvimento, melhorar o DX e servir como documentação viva do código                                |
| **[Tailwind CSS](https://tailwindcss.com/)**      | 4.x    | Framework utility-first que elimina CSS morto na build e garante consistência visual sem folhas de estilo separadas                            |
| **[React Router DOM](https://reactrouter.com/)**  | 7.x    | Roteamento client-side com suporte a loaders, actions e tipagem nativa                                                                         |

### Dependências de Produção

| Biblioteca                                                                                               | Finalidade                                                                                                 |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **[@sentry/react](https://docs.sentry.io/platforms/javascript/guides/react/)**                           | Monitoramento de erros e performance em produção. Captura exceções não tratadas e rastreia Core Web Vitals |
| **[web-vitals](https://web.dev/articles/vitals)**                                                        | Medição dos Core Web Vitals (LCP, INP, CLS) no browser do usuário real                                     |
| **[@fontsource-variable/inter](https://fontsource.org/)**                                                | Fonte Inter com suporte a variable fonts — sem dependência de CDN externo                                  |
| **[clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)** | Composição condicional e segura de classes Tailwind (exportado pelo utilitário `cn`)                       |

### Ferramentas de Build e Dev

| Ferramenta                                                                                        | Finalidade                                                                                |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **[@sentry/vite-plugin](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/)** | Upload de source maps para o Sentry em produção (erros com stack trace legível)           |
| **[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)**                   | Análise visual do bundle (`pnpm run build:analyze`) para identificar dependências pesadas |

---

## Bibliotecas de Teste

O projeto tem **duas camadas de teste** independentes e complementares:

### Camada 1 — Testes Unitários (Vitest)

Executados com `pnpm test`. Rodam em ambiente jsdom sem browser real.

| Biblioteca                                                                                  | O que faz                                                                                                                                                         |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Vitest](https://vitest.dev/)**                                                           | Test runner integrado ao Vite. Usa o mesmo pipeline de transformação do Vite, então TypeScript e aliases de path funcionam sem configuração extra                 |
| **[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)** | Renderiza componentes React em jsdom com queries semânticas (`getByRole`, `getByText`). Filosofia: testar comportamento do usuário, não detalhes de implementação |
| **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)**                | Matchers customizados para DOM: `toBeInTheDocument()`, `toHaveAttribute()`, `toBeVisible()`. Torna os `expect` mais legíveis e os erros mais descritivos          |
| **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)**       | Simula interações reais (clique, Tab, digitação) de forma mais fiel que o `fireEvent` nativo. Essencial para testar fluxos de acessibilidade por teclado          |
| **[@vitest/ui](https://vitest.dev/guide/ui)**                                               | Interface visual no browser para explorar e rodar testes interativamente (`pnpm test:ui`)                                                                         |
| **[@vitest/coverage-v8](https://vitest.dev/guide/coverage)**                                | Relatório de cobertura de código                                                                                                                                  |

**Setup** (`src/test/setup.ts`): Mocks de `matchMedia` e `IntersectionObserver`, que não existem no jsdom.

### Camada 2 — Testes End-to-End (Playwright)

Executados com `pnpm test:e2e`. Rodam em browsers reais (Chromium, WebKit, Firefox).

| Biblioteca                                                                                             | O que faz                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[@playwright/test](https://playwright.dev/)**                                                        | Framework E2E que controla browsers reais. Testa fluxos completos como o usuário experimenta, incluindo carregamento de assets e renderização de CSS |
| **[@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)** | Integração do motor de acessibilidade Axe com Playwright. Valida violações WCAG automaticamente durante os testes E2E                                |
| **[@lhci/cli](https://github.com/GoogleChrome/lighthouse-ci)**                                         | Lighthouse CI para auditorias de performance, acessibilidade e SEO em ambiente automatizado                                                          |

**Suites E2E disponíveis:**

```
tests/
├── guide/
│   ├── guide-page.spec.ts           # Página índice do Guia do SUS
│   └── guide-category-page.spec.ts  # Página de categoria do Guia
├── helpers/
│   └── jsonLd.ts                    # Utilitário de validação de dados estruturados
├── layout/
│   └── footer-section.spec.ts       # Rodapé (layout, links, acessibilidade)
├── legal/
│   ├── privacy-policy-page.spec.ts  # Página de Política de Privacidade
│   └── terms-of-use-page.spec.ts    # Página de Termos de Uso
├── sections/
│   ├── about-section.spec.ts
│   ├── faq-section.spec.ts
│   ├── guide-highlight-section.spec.ts
│   ├── hero-section.spec.ts
│   ├── how-it-works-section.spec.ts
│   ├── problem-section.spec.ts
│   ├── solution-section.spec.ts
│   └── transparency-section.spec.ts
└── seo/
    ├── README.md                    # Documentação detalhada dos testes SEO
    ├── accessibility.spec.ts        # Conformidade WCAG com axe-core
    ├── metadata.spec.ts             # Meta tags, Open Graph, title
    ├── performance-keywords.spec.ts # Core Web Vitals e qualidade de conteúdo
    └── semantic-html.spec.ts        # Estrutura HTML semântica
```

---

## Estrutura de Pastas

A estrutura segue o padrão **feature-based com shared/**, consolidada antes do início do desenvolvimento do dashboard.

```
faladoria-web/
├── public/                        # Assets estáticos servidos diretamente
├── scripts/
│   └── pre-deploy-validation.sh   # Validações obrigatórias antes do deploy
├── docs/                          # Documentação técnica adicional
├── tests/                         # Testes E2E com Playwright
│   ├── guide/
│   ├── helpers/
│   ├── layout/
│   ├── legal/
│   ├── sections/
│   └── seo/
└── src/
    ├── features/
    │   ├── landing/               # Landing page pública
    │   │   ├── components/
    │   │   │   └── sections/      # Seções da landing (Hero, Problem, Solution, etc.)
    │   │   │       └── transparency/  # Subcomponentes da seção Transparência
    │   │   ├── data/              # Conteúdo das seções (heroContent, faqContent, etc.)
    │   │   └── pages/             # HomePage, LegalPageLayout, NotFoundPage
    │   └── guide/                 # Feature Guia do SUS
    │       ├── components/        # GuideCategoryCard, GuideCategoryLayout
    │       ├── data/              # guideCategories, guideContent
    │       └── pages/             # GuidePage, GuideCategoryPage
    └── shared/
        ├── components/
        │   ├── error/             # ErrorBoundary, SectionErrorFallback
        │   ├── layout/            # Header, PageShell, Container, Footer
        │   ├── seo/               # JsonLdScript, BreadcrumbSchema
        │   └── ui/                # WhatsAppCTA, AccessibleLink, SkipLink, icons/
        ├── data/                  # companyInfo, footerContent, navigation, structuredData
        ├── hooks/                 # useDocumentMeta, useFocusTrap, useScrollToTop, useSidebar
        ├── lib/                   # Sentry
        ├── types/
        └── utils/                 # cn, formatPercentage, slugify, reportWebVitals
```

### Regra de separação

- **Somente uma feature usa** → vai para `features/<nome>/`
- **Duas ou mais features usam** → vai para `shared/`

### Aliases de path configurados

| Alias         | Aponta para     |
| ------------- | --------------- |
| `@/*`         | `src/`          |
| `@shared/*`   | `src/shared/`   |
| `@features/*` | `src/features/` |
| `@assets/*`   | `src/assets/`   |

---

## Instalação e Configuração

### Pré-requisitos

- Node.js >= 20
- pnpm >= 9

### Desenvolvimento local

```bash
# Clone o repositório
git clone <url-do-repositório>
cd faladoria-web

# Instale as dependências
pnpm install

# Instale os browsers para os testes E2E (primeira vez)
pnpm exec playwright install

# Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse `http://localhost:5173`.

### Configuração obrigatória antes do primeiro deploy

Defina `VITE_SITE_URL` com a URL de produção (ver [Variáveis de Ambiente](#variáveis-de-ambiente)
abaixo).

Atualize os placeholders em [src/shared/data/companyInfo.ts](src/shared/data/companyInfo.ts):

- `legalName` — razão social real
- `address.street` — endereço completo
- `seo.themeColor` — cor da marca
- `legal.cnpj` — CNPJ real

---

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha conforme necessário.

| Variável                                  | Obrigatória | Descrição                                                                                              |
| ----------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `VITE_SITE_URL`                           | Produção    | URL pública do site — usada em canonical, og:url e JSON-LD. Padrão: `https://faladoria-web.vercel.app` |
| `VITE_SENTRY_DSN`                         | Produção    | DSN do projeto no Sentry para monitoramento de erros                                                   |
| `VITE_SENTRY_ENVIRONMENT`                 | Produção    | Ambiente (`production`, `staging`)                                                                     |
| `VITE_SENTRY_TRACES_SAMPLE_RATE`          | Produção    | Taxa de amostragem de traces de performance (0 a 1)                                                    |
| `VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE` | Produção    | Taxa de amostragem de sessões para Session Replay                                                      |
| `PLAYWRIGHT_BASE_URL`                     | Testes E2E  | URL base para os testes. Padrão: `http://localhost:5173`                                               |

---

## Scripts Disponíveis

### Desenvolvimento

| Comando              | Descrição                                 |
| -------------------- | ----------------------------------------- |
| `pnpm dev`           | Servidor de desenvolvimento com HMR       |
| `pnpm build`         | Build de produção (TypeScript + Vite)     |
| `pnpm build:analyze` | Build + visualizador de bundle no browser |
| `pnpm preview`       | Serve a build de produção localmente      |

### Qualidade de Código

| Comando             | Descrição                                            |
| ------------------- | ---------------------------------------------------- |
| `pnpm type-check`   | Verifica tipos TypeScript sem emitir arquivos        |
| `pnpm lint`         | ESLint — falha em qualquer warning (zero tolerância) |
| `pnpm lint:fix`     | ESLint com correção automática                       |
| `pnpm format`       | Prettier — formata todos os arquivos                 |
| `pnpm format:check` | Prettier — verifica formatação sem alterar arquivos  |

### Testes Unitários (Vitest)

| Comando              | Descrição                               |
| -------------------- | --------------------------------------- |
| `pnpm test`          | Executa todos os testes unitários e sai |
| `pnpm test:watch`    | Modo watch — re-executa ao salvar       |
| `pnpm test:ui`       | Interface visual no browser             |
| `pnpm test:coverage` | Relatório de cobertura de código        |

### Testes E2E (Playwright)

| Comando                | Descrição                                             |
| ---------------------- | ----------------------------------------------------- |
| `pnpm test:e2e`        | Todos os testes E2E (Chromium, WebKit, Firefox)       |
| `pnpm test:e2e:ui`     | Interface visual do Playwright                        |
| `pnpm test:e2e:debug`  | Modo debug com Playwright Inspector                   |
| `pnpm test:e2e:headed` | Browser visível — útil para depurar visualmente       |
| `pnpm test:seo`        | Suite de testes SEO/acessibilidade com relatório HTML |
| `pnpm test:all`        | Unitários + E2E                                       |

### Outros

| Comando           | Descrição                                                                            |
| ----------------- | ------------------------------------------------------------------------------------ |
| `pnpm lighthouse` | Auditoria Lighthouse CI                                                              |
| `pnpm pre-deploy` | **Obrigatório antes do deploy**: valida dados da empresa e configurações de produção |

---

## Arquitetura e Decisões Técnicas

### Roteamento

O React Router DOM v7 gerencia todas as rotas no `App.tsx`. Rotas legais compartilham o `LegalPageLayout`, que recebe o conteúdo como prop — evitando duplicação de estrutura entre as páginas de privacidade e termos.

### Error Boundaries por seção

Cada seção da landing page é envolvida por um `ErrorBoundary`. Se uma seção lançar um erro de JS, somente ela exibe o `SectionErrorFallback` — o restante da página continua funcionando normalmente.

### Monitoramento de Erros (Sentry)

O Sentry é inicializado em `src/shared/lib/sentry.ts` com fallback seguro quando o DSN não está configurado. Em desenvolvimento, um `console.warn` alerta sobre a ausência de configuração sem quebrar a aplicação.

### Utilitário `cn`

Classes Tailwind são compostas com `cn` (`src/shared/utils/cn.ts`), que combina `clsx` + `tailwind-merge`. Isso previne conflitos de classes e permite composição condicional sem efeitos colaterais.

### Mobile-first

Todos os componentes são desenvolvidos com abordagem mobile-first. Classes responsivas são adicionadas para telas maiores (`md:`, `lg:`), nunca o contrário. Touch targets mínimos de 48px em todos os elementos interativos.

---

## Acessibilidade

O projeto segue a **WCAG 2.2 Nível AA** como padrão mínimo.

### Componentes de acessibilidade (`src/shared/components/ui/`)

| Componente         | Finalidade                                                  |
| ------------------ | ----------------------------------------------------------- |
| `SkipLink`         | Link "pular para conteúdo" para usuários de teclado         |
| `MainContent`      | Wrapper `<main>` com `id="main-content"` e `role="main"`    |
| `ScreenReaderOnly` | Texto visível apenas para leitores de tela (`sr-only`)      |
| `AccessibleLink`   | Link com suporte a `aria-current` para indicar página ativa |
| `WhatsAppCTA`      | Botão de CTA com `aria-label` descritivo                    |

### Hooks de acessibilidade (`src/shared/hooks/`)

| Hook           | O que faz                                                        |
| -------------- | ---------------------------------------------------------------- |
| `useFocusTrap` | Mantém foco dentro de modais e menus abertos                     |
| `useSidebar`   | Gerencia estado do menu mobile com controle de foco e Escape key |

### Garantias

- Navegação completa por teclado (Tab, Shift+Tab, Enter, Espaço, Escape)
- HTML semântico (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`)
- ARIA labels em todos os elementos interativos
- Contraste mínimo 4.5:1 em textos normais
- Skip link funcional na primeira posição de foco
- Validação automática com axe-core nos testes E2E

---

## SEO e Dados Estruturados

### Meta tags

Gerenciadas via `useDocumentMeta` (hook customizado), com suporte a título dinâmico e meta description por página.

### JSON-LD (Dados Estruturados)

Componentes em `src/shared/components/seo/` e utilitários em `src/shared/data/structuredData.ts` injetam schema.org via `<script type="application/ld+json">`:

| Schema           | Origem                         | Finalidade                                      |
| ---------------- | ------------------------------ | ----------------------------------------------- |
| `Organization`   | `ORGANIZATION_STRUCTURED_DATA` | Dados da empresa para Knowledge Panel do Google |
| `WebSite`        | `ORGANIZATION_STRUCTURED_DATA` | Metadados do site                               |
| `BreadcrumbList` | `BreadcrumbSchema`             | Navegação estruturada por página                |
| `FAQPage`        | `createFaqStructuredData`      | Perguntas frequentes indexáveis pelo Google     |

---

## Qualidade de Código

### ESLint

Configuração rigorosa com zero warnings tolerados (`--max-warnings 0`). Plugins ativos:

| Plugin                                | Foco                                               |
| ------------------------------------- | -------------------------------------------------- |
| `@typescript-eslint`                  | Regras TypeScript                                  |
| `eslint-plugin-react` + `react-hooks` | Padrões React e regras de hooks                    |
| `eslint-plugin-jsx-a11y`              | Acessibilidade em JSX                              |
| `eslint-plugin-sonarjs`               | Detecção de code smells (duplicação, complexidade) |
| `eslint-plugin-unicorn`               | Boas práticas modernas de JavaScript               |
| `eslint-plugin-security`              | Vulnerabilidades de segurança                      |
| `eslint-plugin-unused-imports`        | Remove imports não utilizados                      |
| `eslint-plugin-playwright`            | Regras específicas para testes E2E                 |

### Prettier

Formatação automática com `@trivago/prettier-plugin-sort-imports` + `prettier-plugin-tailwindcss` para ordenação consistente de imports e classes Tailwind.

### Git Hooks (Husky + lint-staged)

**`git commit`** — lint-staged:

- `.ts`/`.tsx`: ESLint --fix + Prettier
- `.json`/`.md`/`.css`: Prettier

**`git push`** — validações adicionais:

- Testes unitários (`pnpm test`)
- Verificação de tipos TypeScript (`pnpm type-check`)

---

## Deploy e Produção

### Build de produção

```bash
# Validação pré-deploy (verifica dados placeholder)
pnpm pre-deploy

# Build
pnpm build

# Artefatos gerados em dist/
# ├── assets/   CSS e JS otimizados com hash de cache
# └── index.html
```

### Checklist pré-deploy

```bash
pnpm pre-deploy      # Valida dados placeholder da empresa
pnpm lint            # Zero warnings
pnpm format:check    # Formatação consistente
pnpm test            # Todos os testes unitários passando
pnpm test:e2e        # Todos os testes E2E passando
pnpm build           # Build de produção sem erros
```

### Análise de bundle

```bash
pnpm build:analyze
# Abre dist/stats.html com visualização interativa do bundle
```

---

## Documentação Adicional

| Documento                                          | Conteúdo                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [CLAUDE.md](CLAUDE.md)                             | Diretrizes completas para o agente Claude Code — stack, padrões, arquitetura, convenções         |
| [docs/DECISIONS.md](docs/DECISIONS.md)             | Decisões de tooling, configuração e arquitetura — contexto, alternativas rejeitadas e raciocínio |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Log de erros e conflitos encontrados — causa raiz e solução                                      |
| [docs/TESTES.md](docs/TESTES.md)                   | Estratégia de testes, suites cobertas e quando cada camada executa                               |
| [tests/seo/README.md](tests/seo/README.md)         | Documentação detalhada das suites de teste SEO e acessibilidade — critérios e fontes             |

---

## Licença

Este projeto é privado e pertence à **Faladoria**. Todos os direitos reservados.
