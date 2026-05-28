import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import type { GuideArticle, GuideCategory } from '../../data'
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
    content: '',
  },
  {
    slug: 'como-exigir',
    categorySlug: 'seus-direitos',
    title: 'Como exigir seus direitos',
    summary: 'Saiba como acionar os canais corretos.',
    content: '',
  },
]

async function setup(articles: GuideArticle[]) {
  const { getArticlesByCategory } = await import('../../data')
  vi.mocked(getArticlesByCategory).mockReturnValue(articles)

  return render(
    <MemoryRouter>
      <GuideCategoryLayout category={mockCategory} />
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

  describe('Breadcrumb', () => {
    it('renderiza navegação de breadcrumb', async () => {
      await setup(mockArticles)
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })
  })
})
