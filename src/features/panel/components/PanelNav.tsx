import type { UserRole } from '@features/auth/services/authApi'
import { cn } from '@shared/utils/cn'
import { NavLink } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'
import { navItemsFor } from './panelNavItems'

interface PanelNavProps {
  role: UserRole
  /** Called after a link is chosen: the mobile menu closes itself with it. */
  onNavigate?: () => void
}

export const PanelNav = ({ role, onNavigate }: PanelNavProps) => (
  <nav aria-label={PANEL_CONTENT.nav.label}>
    <ul className='flex flex-col gap-1'>
      {navItemsFor(role).map(({ to, label, icon: Icon, end }) => (
        <li key={to}>
          {/* NavLink sets aria-current="page" on the current item by itself. */}
          <NavLink
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex min-h-12 items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors motion-reduce:transition-none',
                isActive
                  ? 'bg-lavender-light text-purple-dark'
                  : 'text-slate-700 hover:bg-slate-100'
              )
            }
          >
            <Icon className='h-5 w-5 shrink-0' />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
)
