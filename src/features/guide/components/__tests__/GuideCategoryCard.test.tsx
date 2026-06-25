import { GUIDE_ROUTES } from '@shared/data'
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
  color: 'purple',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <GuideCategoryCard category={mockCategory} />
    </MemoryRouter>
  )
}

describe('GuideCategoryCard', () => {
  describe('Content', () => {
    it('renders the category name', () => {
      renderCard()
      expect(screen.getByText('Seus Direitos')).toBeInTheDocument()
    })

    it('renders the category description', () => {
      renderCard()
      expect(screen.getByText(mockCategory.description)).toBeInTheDocument()
    })

    it('renders the link with the correct href for the category', () => {
      renderCard()
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        GUIDE_ROUTES.category(mockCategory.slug)
      )
    })

    it('the name and description compose the accessible name of the link', () => {
      renderCard()
      expect(
        screen.getByRole('link', {
          name: `${mockCategory.label} ${mockCategory.description}`,
        })
      ).toBeInTheDocument()
    })
  })

  describe('Semantics', () => {
    it('renders the category name as h4', () => {
      renderCard()
      expect(
        screen.getByRole('heading', { level: 4, name: 'Seus Direitos' })
      ).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('the icon is hidden from screen readers', () => {
      const { container } = renderCard()
      const icon = container.querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
