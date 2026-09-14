# 🎯 Guia Rápido: Testes de SEO e Acessibilidade

## Como Executar os Testes

### Todos os testes de SEO e Acessibilidade

```bash
npm run test:seo
```

### Testes individuais

```bash
# Metadados SEO (títulos, descrições, Open Graph, etc)
pnpm exec playwright test tests/seo/metadata.spec.ts

# HTML Semântico (estrutura, landmarks, hierarquia de headings)
pnpm exec playwright test tests/seo/semantic-html.spec.ts

# Acessibilidade (contraste, teclado, ARIA, etc)
pnpm exec playwright test tests/seo/accessibility.spec.ts

# Performance e Palavras-chave (Core Web Vitals, keywords, structured data)
pnpm exec playwright test tests/seo/performance-keywords.spec.ts
```

### Ver relatório de testes

```bash
npx playwright show-report
```

---

## O Que Cada Teste Verifica

### 🏷️ Metadados SEO

- Meta tags (title, description, charset, viewport)
- Open Graph para redes sociais
- Twitter Cards
- Canonical URL
- Palavras-chave (sem keyword stuffing)

### 🏗️ HTML Semântico

- Elementos HTML5 (`<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`)
- Hierarquia de headings (h1-h6)
- ARIA landmarks
- Labels em formulários
- Links descritivos

### ♿ Acessibilidade WCAG 2.1 AA

- **Perceptível**: Alt text, contraste, reflow
- **Operável**: Navegação por teclado, foco visível, skip links
- **Compreensível**: Idioma, labels, mensagens de erro
- **Robusto**: ARIA, nome/função/valor

### ⚡ Performance e Keywords

- Core Web Vitals (LCP, CLS, FCP, TTI)
- Otimização de imagens
- Palavras-chave relevantes
- Structured data (Schema.org)
- Performance mobile

---

## Fontes Oficiais

Todos os testes são baseados em:

- ✅ [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/) (W3C)
- ✅ [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- ✅ [HTML Living Standard](https://html.spec.whatwg.org/)
- ✅ [Core Web Vitals](https://web.dev/articles/vitals) (Google)
- ✅ [Schema.org](https://schema.org/)

---

## Quando os Testes São Executados

- ✅ Em cada push/pull request (job `e2e` do GitHub Actions, `.github/workflows/ci.yml`)
- ✅ Manualmente quando necessário

Não rodam nos hooks do Husky: `pre-commit` só faz lint + type-check, `pre-push` só roda os
testes unitários (`pnpm run test` → `vitest run`) — testes E2E/Playwright (este arquivo) nunca
rodaram localmente em nenhum hook, nem antes desta correção nem depois. Também não rodam no
script de pre-deploy (`scripts/pre-deploy-validation.sh`), que hoje só chama type-check, lint,
`test:coverage` e `build` — sem `test:e2e`.

---

## Leia Mais

Para documentação completa, veja: `tests/seo/README.md`
