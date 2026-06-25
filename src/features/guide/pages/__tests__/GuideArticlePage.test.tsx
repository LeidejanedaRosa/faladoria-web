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
          datePublished: '2026-05-01',
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
  it('renders the article layout when slugs are valid', () => {
    renderWithSlugs('seus-direitos', 'direito-a-saude')
    expect(screen.getByTestId('guide-article-layout')).toBeInTheDocument()
    expect(screen.getByText('Direito à saúde')).toBeInTheDocument()
  })

  it('redirects to /como-conseguir-pelo-sus when article does not exist', () => {
    renderWithSlugs('seus-direitos', 'nao-existe')
    expect(screen.getByTestId('guide-page')).toBeInTheDocument()
    expect(screen.queryByTestId('guide-article-layout')).not.toBeInTheDocument()
  })

  it('redirects to /como-conseguir-pelo-sus when category does not exist', () => {
    renderWithSlugs('categoria-invalida', 'direito-a-saude')
    expect(screen.getByTestId('guide-page')).toBeInTheDocument()
    expect(screen.queryByTestId('guide-article-layout')).not.toBeInTheDocument()
  })

  it('redirects when article does not belong to the URL category', () => {
    // article exists (categorySlug: 'seus-direitos'), category 'consulta' exists,
    // but they don't match → redirect
    renderWithSlugs('consulta', 'direito-a-saude')
    expect(screen.getByTestId('guide-page')).toBeInTheDocument()
    expect(screen.queryByTestId('guide-article-layout')).not.toBeInTheDocument()
  })

  it('calls useDocumentMeta with the article title when slugs are valid', async () => {
    const { useDocumentMeta } = await import('@shared/hooks/useDocumentMeta')
    renderWithSlugs('seus-direitos', 'direito-a-saude')
    expect(useDocumentMeta).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Direito à saúde — Guia do SUS' })
    )
  })

  it('calls useDocumentMeta with a generic title when the article does not exist', async () => {
    const { useDocumentMeta } = await import('@shared/hooks/useDocumentMeta')
    renderWithSlugs('seus-direitos', 'nao-existe')
    expect(useDocumentMeta).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Guia do SUS' })
    )
  })
})
