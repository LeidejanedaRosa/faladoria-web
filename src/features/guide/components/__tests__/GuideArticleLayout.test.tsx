import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type { ArticleBlock, GuideArticle } from '../../data'
import { GuideArticleLayout } from '../GuideArticleLayout'

const breadcrumbItems = [
  { name: 'Início', url: '/' },
  { name: 'Guia do SUS', url: '/como-conseguir-pelo-sus' },
  { name: 'Seus Direitos', url: '/como-conseguir-pelo-sus/seus-direitos' },
  { name: 'Direito à saúde' },
]

function makeArticle(overrides: Partial<GuideArticle> = {}): GuideArticle {
  return {
    slug: 'direito-a-saude',
    categorySlug: 'seus-direitos',
    title: 'Direito à saúde',
    summary: 'A saúde é um direito de todos.',
    datePublished: '2026-05-01',
    content: [],
    ...overrides,
  }
}

function renderLayout(article: GuideArticle) {
  return render(
    <MemoryRouter>
      <GuideArticleLayout article={article} breadcrumbItems={breadcrumbItems} />
    </MemoryRouter>
  )
}

describe('GuideArticleLayout', () => {
  describe('Estrutura e semântica', () => {
    it('renderiza o título do artigo como h1', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('heading', { level: 1, name: 'Direito à saúde' })
      ).toBeInTheDocument()
    })

    it('renderiza o landmark article com nome acessível derivado do h1', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('article', { name: 'Direito à saúde' })
      ).toBeInTheDocument()
    })

    it('renderiza o resumo do artigo', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByText('A saúde é um direito de todos.')
      ).toBeInTheDocument()
    })

    it('renderiza a navegação de breadcrumb', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })
  })

  describe('Conteúdo em breve', () => {
    it('exibe placeholder quando o artigo não tem conteúdo', () => {
      renderLayout(makeArticle({ content: [] }))
      expect(screen.getByText('Conteúdo em breve')).toBeInTheDocument()
    })

    it('não exibe placeholder quando o artigo tem conteúdo', () => {
      const content: ArticleBlock[] = [{ type: 'paragraph', text: 'Texto.' }]
      renderLayout(makeArticle({ content }))
      expect(screen.queryByText('Conteúdo em breve')).not.toBeInTheDocument()
    })
  })

  describe('Bloco: paragraph', () => {
    it('renderiza o texto como parágrafo', () => {
      const content: ArticleBlock[] = [
        { type: 'paragraph', text: 'Parágrafo de teste.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Parágrafo de teste.')).toBeInTheDocument()
    })
  })

  describe('Bloco: heading', () => {
    it('renderiza nível 2 como h2', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Seção principal' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: 'Seção principal' })
      ).toBeInTheDocument()
    })

    it('renderiza nível 3 como h3', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 3, text: 'Subseção' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 3, name: 'Subseção' })
      ).toBeInTheDocument()
    })
  })

  describe('Bloco: list', () => {
    it('renderiza cada item da lista', () => {
      const content: ArticleBlock[] = [
        { type: 'list', items: ['Item A', 'Item B', 'Item C'] },
      ]
      renderLayout(makeArticle({ content }))
      const article = screen.getByRole('article')
      const list = within(article).getByRole('list')
      expect(within(list).getAllByRole('listitem')).toHaveLength(3)
      expect(within(list).getByText('Item A')).toBeInTheDocument()
    })
  })

  describe('Bloco: callout', () => {
    it('renderiza o texto do callout', () => {
      const content: ArticleBlock[] = [
        { type: 'callout', text: 'Atenção: leia com cuidado.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Atenção: leia com cuidado.')).toBeInTheDocument()
    })
  })
})
