import type { ReactNode } from 'react'

import { WHATSAPP_URL } from '@shared/data/companyInfo'
import { AccessibleLink } from '@shared/components/ui'
import { WhatsAppIcon } from './icons'
import { cn } from '@shared/utils/cn'

const VARIANT_STYLES = {
  primary:
    'bg-green-700 text-white hover:bg-green-800 hover:text-white focus:ring-green-500 focus:ring-offset-2',
  secondary:
    'bg-white text-purple-dark hover:bg-lavender hover:text-white focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-dark shadow-lg',
} as const

type WhatsAppCTAVariant = keyof typeof VARIANT_STYLES

interface WhatsAppCTAProps {
  variant?: WhatsAppCTAVariant
  children?: ReactNode
  'aria-label'?: string
  className?: string
}

export const WhatsAppCTA = ({
  variant = 'primary',
  children = 'Reclamar Agora',
  'aria-label': ariaLabel = 'Reclamar agora pelo WhatsApp (abre em nova aba)',
  className,
}: WhatsAppCTAProps) => (
  <AccessibleLink
    href={WHATSAPP_URL}
    external
    showExternalIcon={false}
    className={cn(
      'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus:ring-2 focus:outline-none',
      VARIANT_STYLES[variant],
      className
    )}
    aria-label={ariaLabel}
  >
    <WhatsAppIcon className="h-5 w-5" />
    {children}
  </AccessibleLink>
)
