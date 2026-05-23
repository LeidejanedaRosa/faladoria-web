import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { LegalPageLayout } from '../LegalPageLayout'

vi.mock('@shared/hooks/useDocumentMeta', () => ({
  useDocumentMeta: vi.fn(),
}))
vi.mock('@shared/hooks/useScrollToTop', () => ({
  useScrollToTop: vi.fn(),
}))
vi.mock('@shared/components/layout', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  PageShell: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))
vi.mock('@shared/components/seo', () => ({
  BreadcrumbSchema: () => null,
}))
vi.mock('@shared/data/structuredData', () => ({
  createBreadcrumb: vi.fn(() => []),
}))

const mockSections = [
  {
    id: 'section-1',
    title: 'Primeira Seção',
    paragraphs: ['Parágrafo um.', 'Parágrafo dois.'],
  },
  {
    id: 'section-2',
    title: 'Segunda Seção',
    paragraphs: ['Outro parágrafo.'],
  },
]

function renderLayout() {
  return render(
    <MemoryRouter>
      <LegalPageLayout
        title='Política de Privacidade'
        lastUpdated='Janeiro de 2025'
        sections={mockSections}
      />
    </MemoryRouter>
  )
}

describe('LegalPageLayout', () => {
  it('renders the page title as h1', () => {
    renderLayout()
    expect(
      screen.getByRole('heading', { name: 'Política de Privacidade', level: 1 })
    ).toBeInTheDocument()
  })

  it('renders the last updated date', () => {
    renderLayout()
    expect(screen.getByText(/Janeiro de 2025/)).toBeInTheDocument()
  })

  it('renders each section heading as h2', () => {
    renderLayout()
    expect(
      screen.getByRole('heading', { name: 'Primeira Seção', level: 2 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Segunda Seção', level: 2 })
    ).toBeInTheDocument()
  })

  it('renders all paragraphs within sections', () => {
    renderLayout()
    expect(screen.getByText('Parágrafo um.')).toBeInTheDocument()
    expect(screen.getByText('Parágrafo dois.')).toBeInTheDocument()
    expect(screen.getByText('Outro parágrafo.')).toBeInTheDocument()
  })

  it('renders the back navigation link', () => {
    renderLayout()
    const backLink = screen.getByRole('link', {
      name: /Voltar para a página inicial/,
    })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })
})
