import { WHATSAPP_URL } from '@components/data/companyInfo'
import { AccessibleLink } from '@components/ui'
import { WhatsAppIcon } from '@components/ui/icons'
import { cn } from '@utils/cn'

interface WhatsAppCTAProps {
  className?: string
}

export const WhatsAppCTA = ({ className }: WhatsAppCTAProps) => (
  <AccessibleLink
    href={WHATSAPP_URL}
    external
    showExternalIcon={false}
    className={cn(
      'items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none',
      className
    )}
    aria-label="Reclamar agora pelo WhatsApp (abre em nova aba)"
  >
    <WhatsAppIcon className="h-5 w-5" />
    Reclamar Agora
  </AccessibleLink>
)
