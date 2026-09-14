import { render, screen } from '@/test/test-utils'

import { FOOTER_CONTENT } from '@shared/data/footerContent'
import { describe, expect, it } from 'vitest'

import { FooterContact } from '../FooterContact'

describe('FooterContact', () => {
  it('renders the contact section title', () => {
    render(<FooterContact />)

    expect(screen.getByText(FOOTER_CONTENT.contact.title)).toBeInTheDocument()
  })

  it('renders an internal mailto link without target=_blank', () => {
    render(<FooterContact />)

    const emailItem = FOOTER_CONTENT.contact.items.find(
      item => item.iconName === 'email'
    )!
    const link = screen.getByRole('link', { name: emailItem.ariaLabel })

    expect(link).toHaveAttribute('href', emailItem.href)
    expect(link).not.toHaveAttribute('target')
  })

  it('renders an external WhatsApp link with target=_blank and rel=noopener noreferrer', () => {
    render(<FooterContact />)

    const whatsappItem = FOOTER_CONTENT.contact.items.find(
      item => item.iconName === 'whatsapp'
    )!
    const link = screen.getByRole('link', { name: whatsappItem.ariaLabel })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders an item without href as plain text, not a link', () => {
    render(<FooterContact />)

    const addressItem = FOOTER_CONTENT.contact.items.find(
      item => item.iconName === 'location'
    )!

    expect(screen.getByText(addressItem.label)).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: addressItem.label })
    ).not.toBeInTheDocument()
  })
})
