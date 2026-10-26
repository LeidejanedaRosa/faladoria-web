import { useEffect } from 'react'

import { COMPANY_INFO } from '@shared/data/companyInfo'

interface DocumentMeta {
  title: string
  description?: string
  canonical?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  /** Written on every page: in a SPA, a noindex left by one page would stick to the next. */
  robots?: 'index, follow' | 'noindex, nofollow'
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

export const useDocumentMeta = ({
  title,
  description,
  canonical,
  ogType = 'website',
  twitterCard = 'summary',
  robots = 'index, follow',
}: DocumentMeta) => {
  useEffect(() => {
    const fullTitle = COMPANY_INFO.seo.titleTemplate.replace('%s', title)

    document.title = fullTitle
    setMetaName('robots', robots)

    if (description) {
      setMetaName('description', description)
    } else {
      const existing = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      )
      if (existing) existing.content = ''
    }

    setMetaProperty('og:title', fullTitle)
    setMetaProperty('og:type', ogType)
    setMetaName('twitter:card', twitterCard)
    setMetaName('twitter:title', fullTitle)

    if (canonical) {
      setCanonical(canonical)
      setMetaProperty('og:url', canonical)
      setMetaName('twitter:url', canonical)
    } else {
      document.querySelector('link[rel="canonical"]')?.remove()
      document.querySelector('meta[property="og:url"]')?.remove()
      document.querySelector('meta[name="twitter:url"]')?.remove()
    }

    if (description) {
      setMetaProperty('og:description', description)
      setMetaName('twitter:description', description)
    } else {
      document.querySelector('meta[property="og:description"]')?.remove()
      document.querySelector('meta[name="twitter:description"]')?.remove()
    }
  }, [title, description, canonical, ogType, twitterCard, robots])
}
