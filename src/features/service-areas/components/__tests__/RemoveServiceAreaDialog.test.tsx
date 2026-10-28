import { VARGINHA } from '@/test/fixtures/serviceAreas'
import { apiErrorResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { RemoveServiceAreaDialog } from '../RemoveServiceAreaDialog'

const renderDialog = () =>
  render(
    <RemoveServiceAreaDialog
      area={VARGINHA}
      isRemoving={false}
      onConfirm={vi.fn()}
      onCancel={vi.fn()}
    />,
    { wrapper: createQueryWrapper() }
  )

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('RemoveServiceAreaDialog', () => {
  it('says it is checking the accounts while the count arrives', () => {
    stubApi().mockReturnValue(new Promise(() => {}))

    renderDialog()

    expect(
      screen.getByText('Conferindo quantas contas atendem esta cidade…')
    ).toBeInTheDocument()
  })

  it('still lets the city be removed when the count fails, and says it is unknown', async () => {
    stubApi().mockResolvedValue(apiErrorResponse(503))

    renderDialog()

    expect(
      await screen.findByText(
        'Não foi possível conferir as contas que atendem esta cidade.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Remover cidade' })
    ).toBeInTheDocument()
  })
})
