import { COMPANY_INFO } from '@shared/data/companyInfo'
import { slugify } from '@shared/utils/slugify'

import { JsonLdScript } from './JsonLdScript'

const SCHEMA_CONTEXT = 'https://schema.org'

interface BreadcrumbItem {
  name: string
  url?: string
}

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
        listItem.item = item.url || `${baseUrl}/#${slugify(item.name)}`
      }
      return listItem
    }),
  }

  return <JsonLdScript data={breadcrumbSchema} />
}
