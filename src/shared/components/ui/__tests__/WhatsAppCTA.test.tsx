import { render, screen } from '@/test/test-utils'

import { WHATSAPP_URL } from '@shared/data/companyInfo'
import { describe, expect, it } from 'vitest'

import { WhatsAppCTA } from '../WhatsAppCTA'

describe('WhatsAppCTA', () => {
  describe('rendering', () => {
    it('should render default label', () => {
      render(<WhatsAppCTA />)

      expect(screen.getByRole('link')).toHaveTextContent('Reclamar Agora')
    })

    it('should render custom children', () => {
      render(<WhatsAppCTA>Falar com suporte</WhatsAppCTA>)

      expect(screen.getByRole('link')).toHaveTextContent('Falar com suporte')
    })
  })

  describe('link behavior', () => {
    it('should link to WhatsApp URL', () => {
      render(<WhatsAppCTA />)

      expect(screen.getByRole('link')).toHaveAttribute('href', WHATSAPP_URL)
    })

    it('should open in a new tab', () => {
      render(<WhatsAppCTA />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('accessibility', () => {
    it('should have default aria-label', () => {
      render(<WhatsAppCTA />)

      expect(screen.getByRole('link')).toHaveAttribute(
        'aria-label',
        'Reclamar agora pelo WhatsApp (abre em nova aba)'
      )
    })

    it('should accept custom aria-label', () => {
      render(<WhatsAppCTA aria-label='Suporte via WhatsApp' />)

      expect(screen.getByRole('link')).toHaveAttribute(
        'aria-label',
        'Suporte via WhatsApp'
      )
    })
  })

  describe('variants', () => {
    it('should apply primary variant styles by default', () => {
      render(<WhatsAppCTA />)

      expect(screen.getByRole('link')).toHaveClass('bg-green-700', 'text-white')
    })

    it('should apply secondary variant styles', () => {
      render(<WhatsAppCTA variant='secondary' />)

      const link = screen.getByRole('link')
      expect(link).toHaveClass('bg-white')
      expect(link).toHaveClass('text-purple-dark')
    })

    it('should accept custom className', () => {
      render(<WhatsAppCTA className='custom-class' />)

      expect(screen.getByRole('link')).toHaveClass('custom-class')
    })
  })
})
