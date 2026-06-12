import type { BreadcrumbItem } from '@shared/data'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import type { GuideArticle, GuideCategory } from '../../data'
import { GUIDE_CONTENT } from '../../data'
import { GuideCategoryLayout } from '../GuideCategoryLayout'

vi.mock('../../data', async () => {
  const actual =
    await vi.importActual<typeof import('../../data')>('../../data')
  return { ...actual, getArticlesByCategory: vi.fn() }
})

const mockCategory: GuideCategory = {
  slug: 'seus-direitos',
  label: 'Seus Direitos',
  description: 'Conheça seus direitos como usuário do SUS.',
  iconName: 'shield',
  color: 'purple',
}

const mockArticles: GuideArticle[] = [
  {
    slug: 'direito-a-saude',
    categorySlug: 'seus-direitos',
    title: 'Direito à saúde',
    summary: 'A saúde é um direito de todos.',
    datePublished: '2026-05-01',
    content: [],
  },
  {
    slug: 'como-exigir',
    categorySlug: 'seus-direitos',
    title: 'Como exigir seus direitos',
    summary: 'Saiba como acionar os canais corretos.',
    datePublished: '2026-05-01',
    content: [],
  },
]

const mockBreadcrumbItems: BreadcrumbItem[] = [
  { name: 'Início', url: '/' },
  { name: 'Guia do SUS', url: '/como-conseguir-pelo-sus' },
  { name: mockCategory.label },
]

async function setup(articles: GuideArticle[], category = mockCategory) {
  const { getArticlesByCategory } = await import('../../data')
  vi.mocked(getArticlesByCategory).mockReturnValue(articles)

  return render(
    <MemoryRouter>
      <GuideCategoryLayout
        category={category}
        breadcrumbItems={mockBreadcrumbItems}
      />
    </MemoryRouter>
  )
}

describe('GuideCategoryLayout', () => {
  describe('Quando há artigos na categoria', () => {
    it('renderiza o título e a descrição da categoria', async () => {
      await setup(mockArticles)
      expect(
        screen.getByRole('heading', { level: 1, name: 'Seus Direitos' })
      ).toBeInTheDocument()
      expect(screen.getByText(mockCategory.description)).toBeInTheDocument()
    })

    it('renderiza a lista de artigos', async () => {
      await setup(mockArticles)
      expect(
        screen.getByRole('list', { name: 'Artigos de Seus Direitos' })
      ).toBeInTheDocument()
    })

    it('renderiza um item por artigo', async () => {
      await setup(mockArticles)
      const list = screen.getByRole('list', {
        name: 'Artigos de Seus Direitos',
      })
      expect(within(list).getAllByRole('listitem')).toHaveLength(
        mockArticles.length
      )
    })

    it('renderiza o título de cada artigo', async () => {
      await setup(mockArticles)
      expect(screen.getByText('Direito à saúde')).toBeInTheDocument()
      expect(screen.getByText('Como exigir seus direitos')).toBeInTheDocument()
    })

    it('não renderiza o placeholder "em breve"', async () => {
      await setup(mockArticles)
      expect(screen.queryByText('Conteúdo em breve')).not.toBeInTheDocument()
    })
  })

  describe('Quando não há artigos na categoria', () => {
    it('renderiza o placeholder "em breve"', async () => {
      await setup([])
      expect(screen.getByText('Conteúdo em breve')).toBeInTheDocument()
    })

    it('não renderiza a lista de artigos', async () => {
      await setup([])
      expect(
        screen.queryByRole('list', { name: /artigos/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('Painel de ajuda', () => {
    it('renderiza o título do painel de ajuda', async () => {
      await setup(mockArticles)
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.help.title)
      ).toBeInTheDocument()
    })

    it('renderiza o link do WhatsApp no painel de ajuda', async () => {
      await setup(mockArticles)
      const helpLink = screen.getByRole('link', {
        name: new RegExp(GUIDE_CONTENT.categoryPage.help.title),
      })
      expect(helpLink).toHaveAttribute('href', expect.stringContaining('wa.me'))
      expect(helpLink).toHaveAttribute('target', '_blank')
      expect(helpLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Painel de informações importantes', () => {
    it('não renderiza o painel quando a categoria não tem infoPoints', async () => {
      await setup(mockArticles)
      expect(
        screen.queryByRole('region', { name: /informações importantes/i })
      ).not.toBeInTheDocument()
    })

    it('renderiza o painel quando a categoria tem infoPoints', async () => {
      const categoryWithInfoPoints: GuideCategory = {
        ...mockCategory,
        infoPoints: [
          'O SUS é gratuito para todos.',
          'Sem pedido médico não há exame.',
        ],
      }
      await setup(mockArticles, categoryWithInfoPoints)
      expect(
        screen.getByRole('region', { name: /informações importantes/i })
      ).toBeInTheDocument()
      expect(
        screen.getByText('O SUS é gratuito para todos.')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Sem pedido médico não há exame.')
      ).toBeInTheDocument()
    })
  })

  describe('Breadcrumb', () => {
    it('renderiza navegação de breadcrumb', async () => {
      await setup(mockArticles)
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })
  })
})
