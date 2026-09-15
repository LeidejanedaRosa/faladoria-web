import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'],
    coverage: {
      provider: 'v8',
      // 'lcov' adicionado ao default do provider v8 — SonarCloud lê a cobertura JS/TS via
      // coverage/lcov.info (sonar.javascript.lcov.reportPaths, ver sonar-project.properties).
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/vite-env.d.ts',
        'src/types/**',
        'src/main.tsx',
        'src/App.tsx',
        'dist/',
        'coverage/',
        // CLAUDE.md: "Data constants / static config objects → No" — conteúdo estático puro,
        // sem lógica condicional. guideUtils.ts/guideContent.ts/routes.ts ficam de fora desta
        // lista porque têm lógica real e já têm teste próprio.
        'src/features/landing/data/*Content.ts',
        'src/features/guide/data/articles/**',
        'src/features/guide/data/guideCategories.ts',
        // CLAUDE.md: "Pure presentational components (no logic, no hooks, no interactions) →
        // No — prefer E2E" — cobertos por tests/sections/*.spec.ts e tests/layout/*.spec.ts.
        'src/features/landing/components/sections/**',
        'src/features/guide/pages/GuidePage.tsx',
        'src/shared/components/layout/footer/FooterBottom.tsx',
        'src/shared/components/layout/footer/FooterBrand.tsx',
        'src/shared/components/layout/footer/FooterSection.tsx',
        'src/shared/components/ui/icons/**',
        'src/features/landing/pages/NotFoundPage.tsx',
        'src/features/landing/pages/PrivacyPolicyPage.tsx',
        'src/features/landing/pages/TermsOfUsePage.tsx',
      ],
      // Vitest 4's Threshold type é plano (branches/functions/lines/statements direto), sem
      // wrapper "global" — a versão anterior desta config usava a API antiga (Vitest 2/3), que
      // silenciosamente nunca aplicava nenhum threshold real (chave desconhecida ignorada, exit
      // code sempre 0 independente da cobertura real).
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})
