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
  describe('When the category has articles', () => {
    it('renders the category title and description', async () => {
      await setup(mockArticles)
      expect(
        screen.getByRole('heading', { level: 1, name: 'Seus Direitos' })
      ).toBeInTheDocument()
      expect(screen.getByText(mockCategory.description)).toBeInTheDocument()
    })

    it('renders the article list', async () => {
      await setup(mockArticles)
      expect(
        screen.getByRole('list', { name: 'Artigos de Seus Direitos' })
      ).toBeInTheDocument()
    })

    it('renders one item per article', async () => {
      await setup(mockArticles)
      const list = screen.getByRole('list', {
        name: 'Artigos de Seus Direitos',
      })
      expect(within(list).getAllByRole('listitem')).toHaveLength(
        mockArticles.length
      )
    })

    it('renders the title of each article', async () => {
      await setup(mockArticles)
      expect(screen.getByText('Direito à saúde')).toBeInTheDocument()
      expect(screen.getByText('Como exigir seus direitos')).toBeInTheDocument()
    })

    it('does not render the coming soon placeholder', async () => {
      await setup(mockArticles)
      expect(screen.queryByText('Conteúdo em breve')).not.toBeInTheDocument()
    })
  })

  describe('When the category has no articles', () => {
    it('renders the coming soon placeholder', async () => {
      await setup([])
      expect(screen.getByText('Conteúdo em breve')).toBeInTheDocument()
    })

    it('does not render the article list', async () => {
      await setup([])
      expect(
        screen.queryByRole('list', { name: /artigos/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('Help panel', () => {
    it('renders the help panel title', async () => {
      await setup(mockArticles)
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.help.title)
      ).toBeInTheDocument()
    })

    it('renders the WhatsApp link in the help panel', async () => {
      await setup(mockArticles)
      const helpLink = screen.getByRole('link', {
        name: /Fale com a equipe pelo WhatsApp/,
      })
      expect(helpLink).toHaveAttribute('href', expect.stringContaining('wa.me'))
      expect(helpLink).toHaveAttribute('target', '_blank')
      expect(helpLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Important information panel', () => {
    it('does not render the panel when the category has no infoPoints', async () => {
      await setup(mockArticles)
      expect(
        screen.queryByRole('region', { name: /informações importantes/i })
      ).not.toBeInTheDocument()
    })

    it('renders the panel when the category has infoPoints', async () => {
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
    it('renders breadcrumb navigation', async () => {
      await setup(mockArticles)
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })
  })
})
