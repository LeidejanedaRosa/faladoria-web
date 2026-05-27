import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CATEGORIES_SECTION_ID, GUIDE_CONTENT } from '../../../data'
import { GuideHeroSection } from '../GuideHeroSection'

function renderSection() {
  return render(<GuideHeroSection />)
}

describe('GuideHeroSection', () => {
  describe('Structure & Accessibility', () => {
    it('should render a region landmark labeled by the hero heading', () => {
      renderSection()

      expect(
        screen.getByRole('region', {
          name: new RegExp(GUIDE_CONTENT.hero.headline.base),
        })
      ).toBeInTheDocument()
    })

    it('should render h1 with the full hero headline', () => {
      renderSection()

      const heading = screen.getByRole('heading', { level: 1 })

      expect(heading).toHaveTextContent(
        `${GUIDE_CONTENT.hero.headline.base} ${GUIDE_CONTENT.hero.headline.highlight}`
      )
    })

    it('should render the trust signals list with an accessible label', () => {
      renderSection()

      expect(
        screen.getByRole('list', { name: 'Destaques do guia' })
      ).toBeInTheDocument()
    })

    it('should render the hero image with descriptive alt text', () => {
      renderSection()

      expect(
        screen.getByRole('img', { name: GUIDE_CONTENT.hero.image.alt })
      ).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should render the badge text', () => {
      renderSection()

      expect(screen.getByText(GUIDE_CONTENT.hero.badge)).toBeInTheDocument()
    })

    it('should render the description', () => {
      renderSection()

      expect(
        screen.getByText(GUIDE_CONTENT.hero.description)
      ).toBeInTheDocument()
    })

    it('should render all trust signal labels', () => {
      renderSection()

      GUIDE_CONTENT.hero.trustSignals.forEach(signal => {
        expect(screen.getByText(signal.label)).toBeInTheDocument()
      })
    })

    it('should render one list item per trust signal', () => {
      renderSection()

      const list = screen.getByRole('list', { name: 'Destaques do guia' })
      const items = within(list).getAllByRole('listitem')

      expect(items).toHaveLength(GUIDE_CONTENT.hero.trustSignals.length)
    })
  })

  describe('CTA', () => {
    it('should render a link with the CTA text', () => {
      renderSection()

      expect(
        screen.getByRole('link', { name: new RegExp(GUIDE_CONTENT.hero.cta) })
      ).toBeInTheDocument()
    })

    it('should link to the categories section by anchor', () => {
      renderSection()

      expect(
        screen.getByRole('link', { name: new RegExp(GUIDE_CONTENT.hero.cta) })
      ).toHaveAttribute('href', `#${GUIDE_CATEGORIES_SECTION_ID}`)
    })
  })

  describe('InfoBar', () => {
    it('should render the infoBar message', () => {
      renderSection()

      expect(
        screen.getByText(GUIDE_CONTENT.hero.infoBar.message)
      ).toBeInTheDocument()
    })

    it('should render the infoBar badge', () => {
      renderSection()

      expect(
        screen.getByText(GUIDE_CONTENT.hero.infoBar.badge)
      ).toBeInTheDocument()
    })
  })
})
