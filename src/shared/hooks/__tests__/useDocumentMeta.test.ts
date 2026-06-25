import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDocumentMeta } from '../useDocumentMeta'

vi.mock('@shared/data/companyInfo', () => ({
  COMPANY_INFO: {
    url: 'https://faladoria-web.vercel.app',
    seo: {
      titleTemplate: '%s | Faladoria',
    },
  },
}))

const BASE_URL = 'https://faladoria-web.vercel.app'

afterEach(() => {
  document.title = ''
  document
    .querySelectorAll(
      'meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]'
    )
    .forEach(el => el.remove())
})

describe('useDocumentMeta', () => {
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
        useDocumentMeta({ title: 'Test', description: 'A test description' })
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
        useDocumentMeta({ title: 'Test', description: 'New description' })
      )
      expect(meta.content).toBe('New description')
    })

    it('should not create meta description when not provided', () => {
      renderHook(() => useDocumentMeta({ title: 'Test' }))
      expect(document.querySelector('meta[name="description"]')).toBeNull()
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

  describe('canonical', () => {
    it('should create canonical link when provided', () => {
      const url = `${BASE_URL}/como-conseguir-pelo-sus/consulta`
      renderHook(() => useDocumentMeta({ title: 'Test', canonical: url }))
      expect(
        document.querySelector('link[rel="canonical"]')?.getAttribute('href')
      ).toBe(url)
    })

    it('should update existing canonical link', () => {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = `${BASE_URL}/`
      document.head.appendChild(link)

      const newUrl = `${BASE_URL}/como-conseguir-pelo-sus`
      renderHook(() => useDocumentMeta({ title: 'Test', canonical: newUrl }))
      expect(
        document.querySelector('link[rel="canonical"]')?.getAttribute('href')
      ).toBe(newUrl)
    })

    it('should not create canonical when not provided', () => {
      renderHook(() => useDocumentMeta({ title: 'Test' }))
      expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    })

    it('should remove existing canonical when navigating to a page without one', () => {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = `${BASE_URL}/`
      document.head.appendChild(link)

      renderHook(() => useDocumentMeta({ title: 'Test' }))
      expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    })
  })

  describe('Open Graph tags', () => {
    it('should set og:title with the full title', () => {
      renderHook(() => useDocumentMeta({ title: 'Meu Artigo' }))
      expect(
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content')
      ).toBe('Meu Artigo | Faladoria')
    })

    it('should set og:type to website by default', () => {
      renderHook(() => useDocumentMeta({ title: 'Página' }))
      expect(
        document
          .querySelector('meta[property="og:type"]')
          ?.getAttribute('content')
      ).toBe('website')
    })

    it('should set og:type to article when specified', () => {
      renderHook(() => useDocumentMeta({ title: 'Artigo', ogType: 'article' }))
      expect(
        document
          .querySelector('meta[property="og:type"]')
          ?.getAttribute('content')
      ).toBe('article')
    })

    it('should set og:url when canonical is provided', () => {
      const url = `${BASE_URL}/como-conseguir-pelo-sus/consulta`
      renderHook(() => useDocumentMeta({ title: 'Página', canonical: url }))
      expect(
        document
          .querySelector('meta[property="og:url"]')
          ?.getAttribute('content')
      ).toBe(url)
    })

    it('should set og:description when description is provided', () => {
      renderHook(() =>
        useDocumentMeta({ title: 'Página', description: 'Descrição OG' })
      )
      expect(
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute('content')
      ).toBe('Descrição OG')
    })

    it('should remove existing og:url when navigating to a page without canonical', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:url')
      meta.content = `${BASE_URL}/previous-page`
      document.head.appendChild(meta)

      renderHook(() => useDocumentMeta({ title: 'Test' }))
      expect(document.querySelector('meta[property="og:url"]')).toBeNull()
    })

    it('should remove existing og:description when navigating to a page without description', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = 'Previous description'
      document.head.appendChild(meta)

      renderHook(() => useDocumentMeta({ title: 'Test' }))
      expect(
        document.querySelector('meta[property="og:description"]')
      ).toBeNull()
    })
  })

  describe('Twitter Card tags', () => {
    it('should set twitter:title with the full title', () => {
      renderHook(() => useDocumentMeta({ title: 'Artigo Twitter' }))
      expect(
        document
          .querySelector('meta[name="twitter:title"]')
          ?.getAttribute('content')
      ).toBe('Artigo Twitter | Faladoria')
    })

    it('should set twitter:url when canonical is provided', () => {
      const url = `${BASE_URL}/como-conseguir-pelo-sus`
      renderHook(() => useDocumentMeta({ title: 'Guia', canonical: url }))
      expect(
        document
          .querySelector('meta[name="twitter:url"]')
          ?.getAttribute('content')
      ).toBe(url)
    })

    it('should set twitter:description when description is provided', () => {
      renderHook(() =>
        useDocumentMeta({ title: 'Página', description: 'Descrição Twitter' })
      )
      expect(
        document
          .querySelector('meta[name="twitter:description"]')
          ?.getAttribute('content')
      ).toBe('Descrição Twitter')
    })

    it('should remove existing twitter:url when navigating to a page without canonical', () => {
      const meta = document.createElement('meta')
      meta.name = 'twitter:url'
      meta.content = `${BASE_URL}/previous-page`
      document.head.appendChild(meta)

      renderHook(() => useDocumentMeta({ title: 'Test' }))
      expect(document.querySelector('meta[name="twitter:url"]')).toBeNull()
    })

    it('should remove existing twitter:description when navigating to a page without description', () => {
      const meta = document.createElement('meta')
      meta.name = 'twitter:description'
      meta.content = 'Previous description'
      document.head.appendChild(meta)

      renderHook(() => useDocumentMeta({ title: 'Test' }))
      expect(
        document.querySelector('meta[name="twitter:description"]')
      ).toBeNull()
    })
  })
})
