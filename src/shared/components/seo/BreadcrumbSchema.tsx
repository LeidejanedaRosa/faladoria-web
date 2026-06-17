import { COMPANY_INFO } from '@shared/data/companyInfo'
import type { BreadcrumbItem } from '@shared/data/structuredData'

import { JsonLdScript } from './JsonLdScript'

const SCHEMA_CONTEXT = 'https://schema.org'

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const { url: baseUrl } = COMPANY_INFO

  const breadcrumbSchema = {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, index) => {
      const isLastItem = index === items.length - 1
      const listItem: Record<string, unknown> = {
        '@type': 'ListItem' as const,
        position: index + 1,
        name: item.name,
      }
      if (!isLastItem) {
        listItem.item = item.url ?? baseUrl
      }
      return listItem
    }),
  }

  return <JsonLdScript data={breadcrumbSchema} />
}
