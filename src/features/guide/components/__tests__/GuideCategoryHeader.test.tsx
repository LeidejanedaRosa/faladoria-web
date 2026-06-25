import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { GUIDE_CATEGORY_HEADING_ID, GUIDE_CONTENT } from '../../data'
import type { GuideCategory } from '../../data'
import { GuideCategoryHeader } from '../GuideCategoryHeader'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: {},
  GUIDE_CATEGORY_IMAGES: { consulta: '/fake-category.png' },
  SHARED_STEP_IMAGES: {},
}))

const mockCategoryWithImage: GuideCategory = {
  slug: 'consulta',
  label: 'Consultas',
  description: 'Saiba como agendar consultas pelo SUS.',
  iconName: 'clipboard',
  color: 'purple',
}

const mockCategoryWithoutImage: GuideCategory = {
  slug: 'seus-direitos',
  label: 'Seus Direitos',
  description: 'Conheça seus direitos como usuário do SUS.',
  iconName: 'shield',
  color: 'indigo',
}

describe('GuideCategoryHeader', () => {
  describe('Content', () => {
    it('renders the category name as h1', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      expect(
        screen.getByRole('heading', { level: 1, name: 'Consultas' })
      ).toBeInTheDocument()
    })

    it('the h1 has the correct id for aria-labelledby', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', GUIDE_CATEGORY_HEADING_ID)
    })

    it('renders the category description', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      expect(
        screen.getByText('Saiba como agendar consultas pelo SUS.')
      ).toBeInTheDocument()
    })

    it('renders the info banner for the category page', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.infoBanner)
      ).toBeInTheDocument()
    })
  })

  describe('Conditional image', () => {
    it('renders the image when the category has one associated', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        '/fake-category.png'
      )
    })

    it('renders no image when the category has no associated image', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithoutImage} />
      )
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })

    it('loads the image eagerly to avoid late LCP', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      expect(container.querySelector('img')).toHaveAttribute('loading', 'eager')
    })

    it('the image has fetchPriority high for LCP loading priority', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'fetchpriority',
        'high'
      )
    })
  })

  describe('Accessibility', () => {
    it('the image is decorative and hidden from screen readers', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('the image has dimension attributes to prevent CLS', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      const img = container.querySelector('img')
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })
  })
})
