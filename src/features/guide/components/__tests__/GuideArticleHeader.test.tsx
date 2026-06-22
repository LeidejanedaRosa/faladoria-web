import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { GUIDE_ARTICLE_HEADING_ID } from '../../data'
import type { GuideArticle } from '../../data'
import { GuideArticleHeader } from '../GuideArticleHeader'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: { 'artigo-com-imagem': '/fake-article.png' },
  GUIDE_CATEGORY_IMAGES: { consulta: '/fake-category.png' },
  SHARED_STEP_IMAGES: {},
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
  describe('Content', () => {
    it('renders the article title as h1', () => {
      renderHeader(makeArticle())
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Como agendar uma consulta',
        })
      ).toBeInTheDocument()
    })

    it('the h1 has the correct id for aria-labelledby', () => {
      renderHeader(makeArticle())
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', GUIDE_ARTICLE_HEADING_ID)
    })

    it('renders the article summary', () => {
      renderHeader(makeArticle())
      expect(
        screen.getByText('Veja como agendar consultas pelo SUS.')
      ).toBeInTheDocument()
    })
  })

  describe('Conditional image', () => {
    it('renders the article image when available', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        '/fake-article.png'
      )
    })

    it('uses the category image as fallback when the article has no specific image', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'sem-imagem', categorySlug: 'consulta' })
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        '/fake-category.png'
      )
    })

    it('renders no image when neither article nor category has one', () => {
      const { container } = renderHeader(
        makeArticle({
          slug: 'sem-imagem',
          categorySlug: 'categoria-sem-imagem',
        })
      )
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })

    it('loads the image eagerly to avoid late LCP', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute('loading', 'eager')
    })

    it('the image has fetchPriority high for LCP loading priority', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'fetchpriority',
        'high'
      )
    })
  })

  describe('Category icon', () => {
    it('renders no image when the category does not exist', () => {
      const { container } = renderHeader(
        makeArticle({ categorySlug: 'categoria-inexistente' })
      )
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('the image is decorative and hidden from screen readers', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('the image has dimension attributes to prevent CLS', () => {
      const { container } = renderHeader(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })
  })
})
