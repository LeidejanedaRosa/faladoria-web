import { render, screen } from '@/test/test-utils'

import { FOOTER_CONTENT } from '@shared/data/footerContent'
import { describe, expect, it } from 'vitest'

import { FooterLinks } from '../FooterLinks'

describe('FooterLinks', () => {
  it('renders a nav landmark for each link group', () => {
    render(<FooterLinks />)

    const navs = screen.getAllByRole('navigation')

    expect(navs).toHaveLength(FOOTER_CONTENT.linkGroups.length)
  })

  it('labels each nav with the group ariaLabel', () => {
    render(<FooterLinks />)

    for (const group of FOOTER_CONTENT.linkGroups) {
      expect(
        screen.getByRole('navigation', { name: group.ariaLabel })
      ).toBeInTheDocument()
    }
  })

  it('renders every link with its href and label', () => {
    render(<FooterLinks />)

    for (const group of FOOTER_CONTENT.linkGroups) {
      for (const link of group.links) {
        const anchor = screen.getByRole('link', { name: link.label })
        expect(anchor).toHaveAttribute('href', link.href)
      }
    }
  })
})
