import logoFaladoria from '@assets/logo_faladoria.svg'
import type { UserRole } from '@features/auth/services/authApi'
import { PANEL_ROUTES } from '@shared/data/routes'
import { Link } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'
import { PanelNav } from './PanelNav'
import { SignOutButton } from './SignOutButton'

interface PanelSidebarProps {
  role: UserRole
  onNavigate?: () => void
}

/** Logo, menu and sign out, on the brand's dark purple (the logo has near-white lettering).
 * The phone menu skips the logo: the bar above it already shows one. */
export const PanelSidebar = ({ role, onNavigate }: PanelSidebarProps) => (
  <div className='flex h-full flex-col gap-8'>
    <Link
      to={PANEL_ROUTES.root}
      onClick={onNavigate}
      aria-label={PANEL_CONTENT.header.homeLink}
      className='hidden w-fit rounded-lg px-2 py-1 lg:block'
    >
      <img src={logoFaladoria} alt='' className='h-11 w-auto' />
    </Link>
    <PanelNav role={role} onNavigate={onNavigate} />
    <div className='mt-auto'>
      <SignOutButton />
    </div>
  </div>
)
