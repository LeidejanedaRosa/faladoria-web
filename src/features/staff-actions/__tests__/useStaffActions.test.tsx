import { fakeStaffActionsApi } from '@/test/fakeStaffActionsApi'
import { buildStaffAction } from '@/test/fixtures/staffActions'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useStaffActions } from '../useStaffActions'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const FIRST = buildStaffAction({ occurredAt: '2026-11-22T12:00:00.000Z' })
const SECOND = buildStaffAction({ occurredAt: '2026-11-20T12:00:00.000Z' })

describe('useStaffActions', () => {
  it('asks only for the person’s actions, without a cursor on the first page', async () => {
    const requests = fakeStaffActionsApi(stubApi(), [[FIRST]])

    const { result } = renderHook(() => useStaffActions('usr_ana'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(requests[0].get('actorId')).toBe('usr_ana')
    expect(requests[0].has('cursor')).toBe(false)
  })

  it('follows the cursor to the next page, and stops on the last one', async () => {
    const requests = fakeStaffActionsApi(stubApi(), [[FIRST], [SECOND]])
    const { result } = renderHook(() => useStaffActions('usr_ana'), {
      wrapper: createQueryWrapper(),
    })
    await waitFor(() => expect(result.current.hasNextPage).toBe(true))

    await act(() => result.current.fetchNextPage())

    await waitFor(() =>
      expect(result.current.data?.pages.flatMap(page => page.actions)).toEqual([
        FIRST,
        SECOND,
      ])
    )
    expect(requests[1].get('cursor')).toBe('1')
    expect(result.current.hasNextPage).toBe(false)
  })

  it('keeps each person’s history apart', async () => {
    const requests = fakeStaffActionsApi(stubApi(), [[FIRST]])
    const wrapper = createQueryWrapper()
    const { rerender, result } = renderHook(
      ({ actorId }) => useStaffActions(actorId),
      { wrapper, initialProps: { actorId: 'usr_ana' } }
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    rerender({ actorId: 'usr_leo' })

    await waitFor(() => expect(requests).toHaveLength(2))
    expect(requests[1].get('actorId')).toBe('usr_leo')
  })
})
