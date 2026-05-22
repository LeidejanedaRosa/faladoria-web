import { PRIVACY_POLICY_CONTENT } from '../data/privacyPolicyContent'
import { LegalPageLayout } from './LegalPageLayout'

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title={PRIVACY_POLICY_CONTENT.title}
      lastUpdated={PRIVACY_POLICY_CONTENT.lastUpdated}
      sections={PRIVACY_POLICY_CONTENT.sections}
    />
  )
}
