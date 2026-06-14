import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { GUIDE_ARTICLE_HEADING_ID } from '../../data'
import type { GuideArticle } from '../../data'
import { GuideArticleHeader } from '../GuideArticleHeader'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: { 'artigo-com-imagem': '/fake-article.png' },
  GUIDE_CATEGORY_IMAGES: { consulta: '/fake-category.png' },
  GUIDE_STEP_IMAGES: {},
}))

function makeArticle(overrides: Partial<GuideArticle> = {}): GuideArticle {
  return {
    slug: 'test-artigo',
    categorySlug: 'consulta',
    title: 'Como agendar uma consulta',
    summary: 'Veja como agendar consultas pelo SUS.',
    datePublished: '2026-01-01',
    content: [],
    ...overrides,
  }
}

function renderHeader(article: GuideArticle) {
  return render(<GuideArticleHeader article={article} />)
}

describe('GuideArticleHeader', () => {
  describe('Conteúdo', () => {
    it('renderiza o título do artigo como h1', () => {
      renderHeader(makeArticle())
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Como agendar uma consulta',
        })
      ).toBeInTheDocument()
    })

    it('o h1 tem o id correto para aria-labelledby', () => {
      renderHeader(makeArticle())
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', GUIDE_ARTICLE_HEADING_ID)
    })

    it('renderiza o resumo do artigo', () => {
      renderHeader(makeArticle())
      expect(
        screen.getByText('Veja como agendar consultas pelo SUS.')
      ).toBeInTheDocument()
    })
  })

  describe('Imagem condicional', () => {
    it('renderiza a imagem do artigo quando disponível', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        '/fake-article.png'
      )
    })

    it('usa a imagem da categoria como fallback quando o artigo não tem imagem própria', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'sem-imagem', categorySlug: 'consulta' })
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        '/fake-category.png'
      )
    })

    it('não renderiza imagem quando nem o artigo nem a categoria têm uma', () => {
      const { container } = renderHeader(
        makeArticle({
          slug: 'sem-imagem',
          categorySlug: 'categoria-sem-imagem',
        })
      )
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })

    it('a imagem é carregada com eager para evitar LCP tardio', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute('loading', 'eager')
    })

    it('a imagem tem fetchPriority high para prioridade de carregamento LCP', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'fetchpriority',
        'high'
      )
    })
  })

  describe('Ícone de categoria', () => {
    it('não renderiza imagem quando a categoria não existe', () => {
      const { container } = renderHeader(
        makeArticle({ categorySlug: 'categoria-inexistente' })
      )
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('a imagem é decorativa e oculta de leitores de tela', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('a imagem tem atributos de dimensão para prevenir CLS', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })
  })
})
