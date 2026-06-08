import { WHATSAPP_URL } from '@shared/data/companyInfo'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CONTENT } from '../../data'
import { GuideCategoryFooter } from '../GuideCategoryFooter'

function renderFooter() {
  return render(<GuideCategoryFooter />)
}

describe('GuideCategoryFooter', () => {
  describe('Seção de dica', () => {
    it('renderiza o título da dica', () => {
      renderFooter()
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.tip.title)
      ).toBeInTheDocument()
    })

    it('renderiza a descrição da dica', () => {
      renderFooter()
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.tip.description)
      ).toBeInTheDocument()
    })
  })

  describe('Link de ajuda', () => {
    it('renderiza o título da seção de ajuda', () => {
      renderFooter()
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.help.title)
      ).toBeInTheDocument()
    })

    it('renderiza a descrição da seção de ajuda', () => {
      renderFooter()
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.help.description)
      ).toBeInTheDocument()
    })

    it('o link aponta para o WHATSAPP_URL', () => {
      renderFooter()
      expect(screen.getByRole('link')).toHaveAttribute('href', WHATSAPP_URL)
    })

    it('o link abre em nova aba com rel="noopener noreferrer"', () => {
      renderFooter()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
