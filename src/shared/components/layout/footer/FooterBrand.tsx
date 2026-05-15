import { Link } from 'react-router-dom'

import logoFaladoria from '@assets/faladoria_secundaria.svg'
import { COMPANY_INFO } from '@shared/data/companyInfo'
import { FOOTER_CONTENT } from '@shared/data/footerContent'

import { FOOTER_FOCUS_RING } from './footerStyles'

const LOGO_WIDTH = 600
const LOGO_HEIGHT = 485

export const FooterBrand = () => (
  <div>
    <Link
      to="/"
      aria-label={`${COMPANY_INFO.name} - Ir para página inicial`}
      className={`inline-block ${FOOTER_FOCUS_RING}`}
    >
      <img
        src={logoFaladoria}
        alt={`Logo ${COMPANY_INFO.name}`}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="h-14 w-auto"
      />
    </Link>
    <p className="text-lavender mt-4 max-w-xs text-sm leading-relaxed">
      {FOOTER_CONTENT.tagline}
    </p>
  </div>
)
