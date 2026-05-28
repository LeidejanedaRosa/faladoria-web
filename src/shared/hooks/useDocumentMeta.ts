import { useEffect } from 'react'

import { COMPANY_INFO } from '@shared/data/companyInfo'

interface DocumentMeta {
  title: string
  description?: string
  canonical?: string
  ogType?: 'website' | 'article'
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
}: DocumentMeta) => {
  useEffect(() => {
    const fullTitle = COMPANY_INFO.seo.titleTemplate.replace('%s', title)

    document.title = fullTitle

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
    setMetaName('twitter:title', fullTitle)

    if (canonical) {
      setCanonical(canonical)
      setMetaProperty('og:url', canonical)
      setMetaName('twitter:url', canonical)
    }

    if (description) {
      setMetaProperty('og:description', description)
      setMetaName('twitter:description', description)
    }
  }, [title, description, canonical, ogType])
}
