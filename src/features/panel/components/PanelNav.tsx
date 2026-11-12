import { useId } from 'react'

import type { UserRole } from '@features/auth'
import { cn } from '@shared/utils/cn'
import { NavLink } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'
import { navItemsFor, type PanelNavItem } from './panelNavItems'

interface PanelNavProps {
  role: UserRole
  /** Called after a link is chosen: the mobile menu closes itself with it. */
  onNavigate?: () => void
}

interface NavListProps {
  items: readonly PanelNavItem[]
  onNavigate?: () => void
  labelledBy?: string
}

// 48px and 16px on touch screens; smaller from lg, where a mouse points.
const NavList = ({ items, onNavigate, labelledBy }: NavListProps) => (
  <ul aria-labelledby={labelledBy} className='flex flex-col gap-1'>
    {items.map(({ to, label, icon: Icon, end }) => (
      <li key={to}>
        {/* NavLink sets aria-current="page" on the current item by itself. */}
        <NavLink
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors motion-reduce:transition-none lg:min-h-10 lg:text-sm',
              isActive
                ? 'bg-purple-medium text-white'
                : 'text-white/75 hover:bg-white/10 hover:text-white'
            )
          }
        >
          <Icon className='h-5 w-5 shrink-0 lg:h-4 lg:w-4' />
          {label}
        </NavLink>
      </li>
    ))}
  </ul>
)

export const PanelNav = ({ role, onNavigate }: PanelNavProps) => {
  // The nav is drawn twice (sidebar and mobile menu): each copy needs its own id.
  const settingsId = useId()
  const settings = navItemsFor(role, 'settings')

  return (
    <nav aria-label={PANEL_CONTENT.nav.label} className='flex flex-col gap-6'>
      <NavList items={navItemsFor(role, 'main')} onNavigate={onNavigate} />
      {settings.length > 0 && (
        <div className='flex flex-col gap-2'>
          <p
            id={settingsId}
            className='px-3 text-base font-semibold tracking-wider text-white/60 uppercase lg:text-xs'
          >
            {PANEL_CONTENT.nav.settings}
          </p>
          <NavList
            items={settings}
            onNavigate={onNavigate}
            labelledBy={settingsId}
          />
        </div>
      )}
    </nav>
  )
}
