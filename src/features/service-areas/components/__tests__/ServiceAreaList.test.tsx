import { VARGINHA } from '@/test/fixtures/serviceAreas'
import {
  apiErrorResponse,
  deferredResponse,
  jsonResponse,
  stubApi,
} from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { ServiceAreaStatus } from '../../services/serviceAreasApi'
import { ServiceAreaList } from '../ServiceAreaList'

const renderList = (status: ServiceAreaStatus = 'active') =>
  render(
    <ServiceAreaList
      status={status}
      onAnnounce={vi.fn()}
      onRemove={vi.fn()}
      onReactivate={vi.fn()}
    />,
    { wrapper: createQueryWrapper() }
  )

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('ServiceAreaList', () => {
  it('announces the loading state while the cities arrive', () => {
    stubApi().mockReturnValue(new Promise(() => {}))

    renderList()

    expect(screen.getByRole('status')).toHaveTextContent(
      'Carregando as cidades…'
    )
  })

  it('says there is no removed city', async () => {
    stubApi().mockResolvedValue(jsonResponse({ serviceAreas: [] }))

    renderList('removed')

    expect(
      await screen.findByText('Nenhuma cidade removida.')
    ).toBeInTheDocument()
  })

  it('keeps the retry button focused while it retries, then focuses the list', async () => {
    const slowRetry = deferredResponse()
    stubApi()
      .mockResolvedValueOnce(apiErrorResponse(503))
      .mockReturnValueOnce(slowRetry.promise)
    renderList()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar as cidades agora.'
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Tentar de novo' })
    )
    expect(
      screen.getByRole('button', { name: 'Tentando de novo…' })
    ).toHaveFocus()

    slowRetry.release(jsonResponse({ serviceAreas: [VARGINHA] }))

    const city = await screen.findByText('Varginha/MG')
    await waitFor(() => expect(document.activeElement).not.toBe(document.body))
    expect(document.activeElement).toContainElement(city)
  })
})
