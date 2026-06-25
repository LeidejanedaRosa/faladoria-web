import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import {
  CATEGORY_GROUPS,
  GUIDE_CATEGORIES,
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CONTENT,
} from '../../../data'
import { GuideCategoriesSection } from '../GuideCategoriesSection'

function renderSection() {
  return render(
    <MemoryRouter>
      <GuideCategoriesSection />
    </MemoryRouter>
  )
}

describe('GuideCategoriesSection', () => {
  describe('Structure & Accessibility', () => {
    it('should render a region landmark labeled by the section heading', () => {
      renderSection()
      expect(
        screen.getByRole('region', { name: GUIDE_CONTENT.intro.heading })
      ).toBeInTheDocument()
    })

    it('should have the section id that the hero CTA links to', () => {
      renderSection()
      const section = screen.getByRole('region', {
        name: GUIDE_CONTENT.intro.heading,
      })
      expect(section).toHaveAttribute('id', GUIDE_CATEGORIES_SECTION_ID)
    })

    it('should render h2 with the section heading', () => {
      renderSection()
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: GUIDE_CONTENT.intro.heading,
        })
      ).toBeInTheDocument()
    })

    it('should render one h3 per group', () => {
      renderSection()
      CATEGORY_GROUPS.forEach(group => {
        expect(
          screen.getByRole('heading', { level: 3, name: group.label })
        ).toBeInTheDocument()
      })
    })
  })

  describe('Content', () => {
    it('should render the section description', () => {
      renderSection()
      expect(
        screen.getByText(GUIDE_CONTENT.intro.description)
      ).toBeInTheDocument()
    })

    it('should render a link for each guide category', () => {
      renderSection()
      expect(screen.getAllByRole('link')).toHaveLength(GUIDE_CATEGORIES.length)
    })

    it('should render all category labels', () => {
      renderSection()
      GUIDE_CATEGORIES.forEach(category => {
        expect(screen.getByText(category.label)).toBeInTheDocument()
      })
    })

    it('should render all group descriptions', () => {
      renderSection()
      CATEGORY_GROUPS.forEach(group => {
        expect(screen.getByText(group.description)).toBeInTheDocument()
      })
    })
  })
})
