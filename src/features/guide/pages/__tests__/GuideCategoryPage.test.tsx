import { GUIDE_ROUTES } from '@shared/data'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { GuideCategoryPage } from '../GuideCategoryPage'

vi.mock('@shared/hooks/useDocumentMeta', () => ({
  useDocumentMeta: vi.fn(),
}))
vi.mock('@shared/hooks/useScrollToTop', () => ({
  useScrollToTop: vi.fn(),
}))
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
  GuideCategoryLayout: ({ category }: { category: { label: string } }) => (
    <div data-testid='guide-category-layout'>{category.label}</div>
  ),
}))
vi.mock('../../data', () => ({
  GUIDE_CATEGORIES: [
    {
      slug: 'seus-direitos',
      label: 'Seus Direitos',
      description: 'Descrição de direitos',
      iconName: 'shield',
      color: 'purple',
    },
  ],
}))

function renderWithSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[GUIDE_ROUTES.category(slug)]}>
      <Routes>
        <Route
          path={`${GUIDE_ROUTES.root}/:categorySlug`}
          element={<GuideCategoryPage />}
        />
        <Route
          path={GUIDE_ROUTES.root}
          element={<div data-testid='guide-page' />}
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('GuideCategoryPage', () => {
  it('renders the category content when slug is valid', () => {
    renderWithSlug('seus-direitos')
    expect(screen.getByTestId('guide-category-layout')).toBeInTheDocument()
    expect(screen.getByText('Seus Direitos')).toBeInTheDocument()
  })

  it('redirects to /como-conseguir-pelo-sus when slug is unknown', () => {
    renderWithSlug('categoria-inexistente')
    expect(screen.getByTestId('guide-page')).toBeInTheDocument()
    expect(
      screen.queryByTestId('guide-category-layout')
    ).not.toBeInTheDocument()
  })

  it('calls useDocumentMeta with category label when slug is valid', async () => {
    const { useDocumentMeta } = await import('@shared/hooks/useDocumentMeta')
    renderWithSlug('seus-direitos')
    expect(useDocumentMeta).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Seus Direitos — Guia do SUS' })
    )
  })

  it('calls useDocumentMeta with fallback title when slug is unknown', async () => {
    const { useDocumentMeta } = await import('@shared/hooks/useDocumentMeta')
    renderWithSlug('nao-existe')
    expect(useDocumentMeta).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Guia do SUS' })
    )
  })
})
