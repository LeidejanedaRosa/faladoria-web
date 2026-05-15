import { useEffect } from 'react'

import { COMPANY_INFO } from '@shared/data/companyInfo'

interface DocumentMeta {
  title: string
  description?: string
}

export const useDocumentMeta = ({ title, description }: DocumentMeta) => {
  useEffect(() => {
    document.title = COMPANY_INFO.seo.titleTemplate.replace('%s', title)

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    )

    if (description) {
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    } else if (meta) {
      meta.content = ''
    }
  }, [title, description])
}
