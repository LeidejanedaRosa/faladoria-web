# Estratégia de Testes

O projeto usa **duas camadas de teste** independentes e complementares, com responsabilidades distintas.

---

## Resumo

| Camada    | Ferramenta | Ambiente     | Quando executa                            |
| --------- | ---------- | ------------ | ----------------------------------------- |
| Unitários | Vitest     | jsdom (Node) | `git push` (obrigatório) + manualmente    |
| E2E       | Playwright | Browser real | Manualmente + obrigatório antes do deploy |

---

## Camada 1 — Testes Unitários (Vitest)

### O que testamos

Os testes unitários cobrem **hooks, utilitários e componentes com lógica**. Componentes puramente visuais sem lógica interna não têm testes unitários — esses são cobertos pelos testes E2E de renderização.

| Arquivo de teste             | O que cobre                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| `useDocumentMeta.test.ts`    | Atualização dinâmica de título e meta description por página          |
| `useFocusTrap.test.ts`       | Armadilha de foco para modais e menus (Tab, Shift+Tab, Escape)        |
| `useScrollToTop.test.ts`     | Scroll ao topo na troca de rota                                       |
| `useSidebar.test.ts`         | Estado aberto/fechado do menu mobile e controle de foco               |
| `formatPercentage.test.ts`   | Cálculo e formatação de percentuais com guard para divisão por zero   |
| `slugify.test.ts`            | Geração de slug (diacríticos, espaços, caracteres especiais, números) |
| `Accessibility.test.tsx`     | Componentes SkipLink, MainContent, ScreenReaderOnly                   |
| `AccessibleLink.test.tsx`    | Renderização e atributos de acessibilidade do AccessibleLink          |
| `Header.test.tsx`            | Navegação, menu mobile, acessibilidade do cabeçalho                   |
| `FooterMission.test.tsx`     | Texto de missão no rodapé                                             |
| `JsonLdScript.test.tsx`      | Injeção correta de dados estruturados JSON-LD no DOM                  |
| `GuideCategoryCard.test.tsx` | Renderização e navegação do card de categoria do Guia do SUS          |
| `GuideCategoryPage.test.tsx` | Renderização da página de categoria com conteúdo correto              |
| `HomePage.test.tsx`          | Renderização da homepage sem erros                                    |
| `LegalPageLayout.test.tsx`   | Layout compartilhado das páginas legais                               |

### Como executar

```bash
# Executar uma vez e sair
pnpm test

# Modo watch (re-executa ao salvar)
pnpm test:watch

# Interface visual no browser
pnpm test:ui

# Relatório de cobertura
pnpm test:coverage
```

### Regras de decisão

| Cenário                                                                | Teste unitário?   |
| ---------------------------------------------------------------------- | ----------------- |
| Custom hooks com estado ou efeitos                                     | Sim               |
| Funções utilitárias com lógica                                         | Sim               |
| Componentes com renderização condicional, interação ou estado derivado | Sim               |
| Componentes puramente visuais sem lógica, hooks ou interações          | Não — prefira E2E |
| Constantes e objetos de configuração estáticos                         | Não               |

---

## Camada 2 — Testes End-to-End (Playwright)

Rodam em browsers reais (Chromium, WebKit, Firefox) e testam o comportamento do site como um usuário real experimenta. Cada teste carrega a aplicação em um browser, interage com ela e faz assertions contra o DOM renderizado.

### Estrutura das suites

#### `tests/sections/` — Seções da landing page

Um arquivo por seção da homepage. Cada arquivo cobre estas categorias de teste:

1. **Rendering & Structure** — elementos existem, hierarquia correta, conteúdo esperado
2. **Accessibility** — atributos ARIA, alt text, HTML semântico, focus management
3. **Image Performance** — `width`/`height`, `loading`, `fetchPriority`
4. **Responsive Layout** — layout em viewports mobile e desktop via `boundingBox()`

| Arquivo                           | Seção testada                                  |
| --------------------------------- | ---------------------------------------------- |
| `hero-section.spec.ts`            | HeroSection — headline, CTA, imagem            |
| `problem-section.spec.ts`         | ProblemSection — cards de problema             |
| `solution-section.spec.ts`        | SolutionSection — benefícios                   |
| `how-it-works-section.spec.ts`    | HowItWorksSection — passos do fluxo            |
| `transparency-section.spec.ts`    | TransparencySection — painel de stats e status |
| `about-section.spec.ts`           | AboutSection — perfil da fundadora             |
| `guide-highlight-section.spec.ts` | GuideHighlightSection — prévia do Guia do SUS  |
| `faq-section.spec.ts`             | FaqSection — acordeão de perguntas             |

#### `tests/guide/` — Feature Guia do SUS

| Arquivo                       | O que testa                                                   |
| ----------------------------- | ------------------------------------------------------------- |
| `guide-page.spec.ts`          | Página índice — listagem de categorias, links, acessibilidade |
| `guide-category-page.spec.ts` | Página de categoria — conteúdo, navegação, breadcrumb         |

#### `tests/layout/` — Componentes de layout global

| Arquivo                  | O que testa                                            |
| ------------------------ | ------------------------------------------------------ |
| `footer-section.spec.ts` | Rodapé — links, informações de contato, acessibilidade |

#### `tests/legal/` — Páginas legais

| Arquivo                       | O que testa                                     |
| ----------------------------- | ----------------------------------------------- |
| `privacy-policy-page.spec.ts` | Estrutura e conteúdo da Política de Privacidade |
| `terms-of-use-page.spec.ts`   | Estrutura e conteúdo dos Termos de Uso          |

#### `tests/seo/` — SEO, Acessibilidade e Performance

Suite especializada para garantir conformidade com padrões web. Cada arquivo verifica um padrão específico:

| Arquivo                        | Padrão verificado                                       |
| ------------------------------ | ------------------------------------------------------- |
| `metadata.spec.ts`             | Meta tags, Open Graph, canonical URL, robots            |
| `semantic-html.spec.ts`        | HTML5 semântico, landmarks ARIA, hierarquia de headings |
| `accessibility.spec.ts`        | WCAG 2.1 AA completo via axe-core                       |
| `performance-keywords.spec.ts` | Core Web Vitals, otimização de imagens, structured data |

Consulte [tests/seo/README.md](../tests/seo/README.md) para a documentação detalhada de cada critério verificado, incluindo referências às diretrizes oficiais (WCAG, Google, Schema.org).

### Como executar

```bash
# Todos os testes E2E
pnpm test:e2e

# Com interface visual do Playwright
pnpm test:e2e:ui

# Com browser visível (útil para depurar visualmente)
pnpm test:e2e:headed

# Modo debug com Playwright Inspector
pnpm test:e2e:debug

# Somente suite SEO (gera relatório HTML)
pnpm test:seo

# Somente um arquivo específico
pnpm exec playwright test tests/sections/hero-section.spec.ts

# Ver relatório após execução
pnpm exec playwright show-report
```

---

## Quando cada camada executa

| Evento          | O que roda                                                                   |
| --------------- | ---------------------------------------------------------------------------- |
| `git commit`    | ESLint + Prettier (via Husky `pre-commit` + lint-staged) + `pnpm type-check` |
| `git push`      | Testes unitários Vitest (via Husky `pre-push`)                               |
| Antes do deploy | `pnpm pre-deploy` + `pnpm test:e2e` (manual)                                 |
| Manualmente     | Qualquer suite, a qualquer momento                                           |

> Os testes E2E **não rodam automaticamente no push** — são lentos e exigem o servidor ativo. Execute manualmente antes de fazer deploy.

---

## Utilitários de Teste

### `src/test/setup.ts` — Setup do ambiente Vitest

Configurações globais aplicadas antes de cada arquivo de teste:

- Importa `@testing-library/jest-dom` para os matchers customizados
- Mock de `window.matchMedia` — não implementado no jsdom
- Mock de `IntersectionObserver` — não implementado no jsdom

### `src/test/test-utils.ts` — Render customizado

Exporta um `render` com `MemoryRouter` pré-configurado para testes de componentes que dependem do React Router (como `Link`, `NavLink`, hooks de roteamento).

### `tests/helpers/jsonLd.ts` — Validação de JSON-LD

Função utilitária para extrair e parsear dados estruturados JSON-LD da página nos testes E2E, usada pelas suites de SEO para validar schemas schema.org.
