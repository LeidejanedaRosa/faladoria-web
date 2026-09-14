/**
 * Thresholds derivados empiricamente em 2026-09-14 (ver docs/DECISIONS.md) — nunca chutados.
 * Processo: `pnpm build && pnpm preview`, `lhci collect` 3x contra 4 páginas-arquétipo
 * (Home, índice do Guia, uma categoria, um artigo real), thresholds com margem de segurança
 * abaixo do pior valor medido entre as 4 páginas.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      // SPA (rotas client-side via react-router-dom) — só existe um dist/index.html no disco;
      // isSinglePageApplication faz o servidor estático do LHCI devolver esse index.html pra
      // qualquer path não reconhecido, em vez de 404, para as 3 URLs de rota abaixo.
      isSinglePageApplication: true,
      url: [
        'http://localhost/',
        'http://localhost/como-conseguir-pelo-sus',
        'http://localhost/como-conseguir-pelo-sus/consulta',
        'http://localhost/como-conseguir-pelo-sus/consulta/como-agendar-consulta',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // Categorias — piso abaixo da pior mediana por página, medida via `lhci collect` de
        // verdade (staticDistDir + isSinglePageApplication, o mesmo modo que roda no CI — não
        // o `pnpm preview` isolado, que mediu números mais otimistas por rodar sem a
        // concorrência de CPU do próprio processo do LHCI). Pior mediana observada: performance
        // 0.80 (artigo, com uma rodada isolada caindo a 0.67 — máquina sob carga variável),
        // accessibility/best-practices 0.96, SEO 1.0 nas 12 execuções.
        'categories:performance': [
          'error',
          { minScore: 0.7, aggregationMethod: 'median' },
        ],
        'categories:accessibility': [
          'error',
          { minScore: 0.9, aggregationMethod: 'median' },
        ],
        'categories:best-practices': [
          'error',
          { minScore: 0.9, aggregationMethod: 'median' },
        ],
        'categories:seo': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median' },
        ],
        // Core Web Vitals críticos — LCP com margem sobre a pior mediana (artigo, ~3782ms).
        // Nota: essa página já está acima da meta de 2.5s do CLAUDE.md do projeto — ver
        // pendência em docs/DECISIONS.md; o threshold aqui protege contra regressão adicional,
        // não substitui a otimização futura da página (provavelmente a imagem de hero/capa do
        // artigo não está sendo priorizada/otimizada da mesma forma que nas outras páginas).
        'largest-contentful-paint': [
          'error',
          { maxNumericValue: 4400, aggregationMethod: 'median' },
        ],
        'cumulative-layout-shift': [
          'error',
          { maxNumericValue: 0.1, aggregationMethod: 'median' },
        ],
        // Métricas secundárias — warn até haver mais histórico de execuções em CI real. Medidas
        // com variância alta nesta máquina (TBT chegou a 1596ms numa rodada isolada da Home,
        // Speed Index chegou a 4464ms numa do artigo) — thresholds generosos de propósito,
        // servem pra pegar regressão real, não ruído de uma rodada isolada.
        'total-blocking-time': [
          'warn',
          { maxNumericValue: 600, aggregationMethod: 'median' },
        ],
        'speed-index': [
          'warn',
          { maxNumericValue: 5000, aggregationMethod: 'median' },
        ],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
