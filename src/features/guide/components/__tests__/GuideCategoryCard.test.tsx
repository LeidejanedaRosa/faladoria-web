import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type { GuideCategory } from '../../data'
import { GuideCategoryCard } from '../GuideCategoryCard'

const mockCategory: GuideCategory = {
  slug: 'seus-direitos',
  label: 'Seus Direitos',
  description:
    'Conheça seus direitos como usuário do SUS e saiba como exigi-los.',
  iconName: 'shield',
}

function renderCard(variant?: 'default' | 'highlight') {
  return render(
    <MemoryRouter>
      <GuideCategoryCard category={mockCategory} variant={variant} />
    </MemoryRouter>
  )
}

describe('GuideCategoryCard', () => {
  describe('Content', () => {
    it('should render the category label as h3', () => {
      renderCard()

      expect(
        screen.getByRole('heading', { name: 'Seus Direitos', level: 3 })
      ).toBeInTheDocument()
    })

    it('should render the category description', () => {
      renderCard()

      expect(screen.getByText(mockCategory.description)).toBeInTheDocument()
    })

    it('should render a link with the category label as accessible name', () => {
      renderCard()

      expect(
        screen.getByRole('link', { name: mockCategory.label })
      ).toHaveAttribute('href', `/guia-do-sus/${mockCategory.slug}`)
    })

    it('should have aria-label with the category label as accessible name', () => {
      renderCard()

      expect(screen.getByRole('link')).toHaveAttribute(
        'aria-label',
        mockCategory.label
      )
    })

    it('should have aria-describedby pointing to the description paragraph', () => {
      const { container } = renderCard()

      const link = screen.getByRole('link')
      const descId = `guide-card-desc-${mockCategory.slug}`

      expect(link).toHaveAttribute('aria-describedby', descId)
      expect(container.querySelector(`#${descId}`)).toHaveTextContent(
        mockCategory.description
      )
    })

    it('should render the icon with aria-hidden', () => {
      const { container } = renderCard()

      const icon = container.querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Variant: highlight', () => {
    it('should render the category label as h3', () => {
      renderCard('highlight')

      expect(
        screen.getByRole('heading', { name: 'Seus Direitos', level: 3 })
      ).toBeInTheDocument()
    })
  })
})
