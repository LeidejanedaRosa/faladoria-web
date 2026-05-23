import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FooterMission } from '../FooterMission'

vi.mock('@assets/logo_faladoria.svg', () => ({ default: '/mock-logo.svg' }))

vi.mock('@shared/data/footerContent', () => ({
  FOOTER_CONTENT: {
    missionLabel: 'Nossa Missão',
    mission:
      'Facilitar o acesso à saúde garantindo soluções para os usuários do SUS.',
    missionHighlight: 'usuários do SUS.',
    contact: { title: '', items: [] },
    linkGroups: [],
    brand: { tagline: '' },
  },
}))

describe('FooterMission', () => {
  it('renders the mission label', () => {
    render(<FooterMission />)
    expect(screen.getByText('Nossa Missão')).toBeInTheDocument()
  })

  it('wraps the highlighted portion in a strong element', () => {
    render(<FooterMission />)
    const strong = screen.getByText('usuários do SUS.')
    expect(strong.tagName).toBe('STRONG')
  })

  it('renders the prefix text before the highlight', () => {
    render(<FooterMission />)
    const strong = screen.getByText('usuários do SUS.')
    const paragraph = strong.closest('p') as HTMLElement
    expect(paragraph.textContent).toContain(
      'Facilitar o acesso à saúde garantindo soluções para os '
    )
  })

  it('does not duplicate text when highlight is at the end of mission', () => {
    render(<FooterMission />)
    const paragraph = screen
      .getByText('usuários do SUS.')
      .closest('p') as HTMLElement
    const fullText = paragraph.textContent ?? ''
    const mission =
      'Facilitar o acesso à saúde garantindo soluções para os usuários do SUS.'
    expect(fullText.trim()).toBe(mission)
  })
})
