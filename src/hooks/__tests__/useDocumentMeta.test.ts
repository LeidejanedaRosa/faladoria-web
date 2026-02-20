import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDocumentMeta } from '../useDocumentMeta'

vi.mock('@components/data', () => ({
  COMPANY_INFO: {
    seo: {
      titleTemplate: '%s | Faladoria',
    },
  },
}))

describe('useDocumentMeta', () => {
  afterEach(() => {
    document.title = ''
    document.querySelector('meta[name="description"]')?.remove()
  })

  describe('title', () => {
    it('should set document title using the template', () => {
      renderHook(() => useDocumentMeta({ title: 'Guia do SUS' }))

      expect(document.title).toBe('Guia do SUS | Faladoria')
    })

    it('should update title when it changes', () => {
      const { rerender } = renderHook(
        ({ title }) => useDocumentMeta({ title }),
        { initialProps: { title: 'Page A' } }
      )

      expect(document.title).toBe('Page A | Faladoria')

      rerender({ title: 'Page B' })

      expect(document.title).toBe('Page B | Faladoria')
    })
  })

  describe('meta description', () => {
    it('should create meta description when it does not exist', () => {
      renderHook(() =>
        useDocumentMeta({
          title: 'Test',
          description: 'A test description',
        })
      )

      const meta = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      )
      expect(meta).toBeTruthy()
      expect(meta!.content).toBe('A test description')
    })

    it('should update existing meta description', () => {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Old description'
      document.head.appendChild(meta)

      renderHook(() =>
        useDocumentMeta({
          title: 'Test',
          description: 'New description',
        })
      )

      expect(meta.content).toBe('New description')
    })

    it('should not create meta description when not provided', () => {
      renderHook(() => useDocumentMeta({ title: 'Test' }))

      const meta = document.querySelector('meta[name="description"]')
      expect(meta).toBeNull()
    })

    it('should clear existing meta description when navigating to a page without one', () => {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Previous page description'
      document.head.appendChild(meta)

      renderHook(() => useDocumentMeta({ title: 'Test' }))

      expect(
        document.querySelector<HTMLMetaElement>('meta[name="description"]')
          ?.content
      ).toBe('')
    })
  })
})
