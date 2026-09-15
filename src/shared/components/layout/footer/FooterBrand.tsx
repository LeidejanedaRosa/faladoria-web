import logoFaladoria from '@assets/faladoria-secondary.svg'
import { COMPANY_INFO, LOGO_HEIGHT, LOGO_WIDTH } from '@shared/data/companyInfo'
import { Link } from 'react-router-dom'

import { FOOTER_FOCUS_RING } from './footerStyles'

export const FooterBrand = () => (
  <div>
    <Link
      to='/'
      aria-label={`${COMPANY_INFO.name} - Ir para página inicial`}
      className={`inline-block ${FOOTER_FOCUS_RING}`}
    >
      <img
        src={logoFaladoria}
        alt={`Logo ${COMPANY_INFO.name}`}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className='h-14 w-auto'
      />
    </Link>
    <p className='text-lavender mt-4 max-w-xs text-sm leading-relaxed'>
      Conectando cidadãos à gestão pública para um{' '}
      <strong className='font-bold'>SUS</strong> melhor para todos.
    </p>
  </div>
)
