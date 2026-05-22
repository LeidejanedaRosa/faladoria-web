import { TERMS_OF_USE_CONTENT } from '../data/termsOfUseContent'
import { LegalPageLayout } from './LegalPageLayout'

export function TermsOfUsePage() {
  return (
    <LegalPageLayout
      title={TERMS_OF_USE_CONTENT.title}
      lastUpdated={TERMS_OF_USE_CONTENT.lastUpdated}
      sections={TERMS_OF_USE_CONTENT.sections}
    />
  )
}
