import { GUIDE_ROUTES } from '@shared/data'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { GuideArticlePage } from '../GuideArticlePage'

vi.mock('@shared/hooks/useDocumentMeta', () => ({ useDocumentMeta: vi.fn() }))
vi.mock('@shared/hooks/useScrollToTop', () => ({ useScrollToTop: vi.fn() }))
vi.mock('@shared/components/layout', () => ({
  PageShell: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))
vi.mock('@shared/components/seo', () => ({
  BreadcrumbSchema: () => null,
  JsonLdScript: () => null,
}))
vi.mock('@shared/data', async () => {
  const actual =
    await vi.importActual<typeof import('@shared/data')>('@shared/data')
  return {
    ...actual,
    createBreadcrumb: vi.fn(() => []),
    ORGANIZATION_STRUCTURED_DATA: {},
  }
})
vi.mock('../../components', () => ({
  GuideArticleLayout: ({ article }: { article: { title: string } }) => (
    <div data-testid='guide-article-layout'>{article.title}</div>
  ),
}))
vi.mock('../../data', () => ({
  getArticleBySlug: vi.fn((slug: string) =>
    slug === 'direito-a-saude'
      ? {
          slug: 'direito-a-saude',
          categorySlug: 'seus-direitos',
          title: 'Direito à saúde',
          summary: 'A saúde é um direito de todos.',
          content: [],
        }
      : undefined
  ),
  getCategoryBySlug: vi.fn((slug: string) => {
    const categories: Record<string, object> = {
      'seus-direitos': {
        slug: 'seus-direitos',
        label: 'Seus Direitos',
        description: 'Descrição',
        iconName: 'shield',
        color: 'purple',
      },
      consulta: {
        slug: 'consulta',
        label: 'Consulta',
        description: 'Descrição consulta',
        iconName: 'clipboard',
        color: 'blue',
      },
    }
    return categories[slug]
  }),
  createArticleStructuredData: vi.fn(() => ({})),
}))

function renderWithSlugs(categorySlug: string, articleSlug: string) {
  const path = GUIDE_ROUTES.article(categorySlug, articleSlug)
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path={`${GUIDE_ROUTES.root}/:categorySlug/:articleSlug`}
          element={<GuideArticlePage />}
        />
        <Route
          path={GUIDE_ROUTES.root}
          element={<div data-testid='guide-page' />}
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('GuideArticlePage', () => {
  it('renderiza o layout do artigo quando slugs são válidos', () => {
    renderWithSlugs('seus-direitos', 'direito-a-saude')
    expect(screen.getByTestId('guide-article-layout')).toBeInTheDocument()
    expect(screen.getByText('Direito à saúde')).toBeInTheDocument()
  })

  it('redireciona para /como-conseguir-pelo-sus quando artigo não existe', () => {
    renderWithSlugs('seus-direitos', 'nao-existe')
    expect(screen.getByTestId('guide-page')).toBeInTheDocument()
    expect(screen.queryByTestId('guide-article-layout')).not.toBeInTheDocument()
  })

  it('redireciona para /como-conseguir-pelo-sus quando categoria não existe', () => {
    renderWithSlugs('categoria-invalida', 'direito-a-saude')
    expect(screen.getByTestId('guide-page')).toBeInTheDocument()
    expect(screen.queryByTestId('guide-article-layout')).not.toBeInTheDocument()
  })

  it('redireciona quando artigo não pertence à categoria da URL', () => {
    // article exists (categorySlug: 'seus-direitos'), category 'consulta' exists,
    // but they don't match → redirect
    renderWithSlugs('consulta', 'direito-a-saude')
    expect(screen.getByTestId('guide-page')).toBeInTheDocument()
    expect(screen.queryByTestId('guide-article-layout')).not.toBeInTheDocument()
  })

  it('chama useDocumentMeta com título do artigo quando slugs são válidos', async () => {
    const { useDocumentMeta } = await import('@shared/hooks/useDocumentMeta')
    renderWithSlugs('seus-direitos', 'direito-a-saude')
    expect(useDocumentMeta).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Direito à saúde — Guia do SUS' })
    )
  })

  it('chama useDocumentMeta com título genérico quando artigo não existe', async () => {
    const { useDocumentMeta } = await import('@shared/hooks/useDocumentMeta')
    renderWithSlugs('seus-direitos', 'nao-existe')
    expect(useDocumentMeta).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Guia do SUS' })
    )
  })
})
