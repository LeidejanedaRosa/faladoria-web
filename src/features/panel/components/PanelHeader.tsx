import type { Ref } from 'react'

import logoFaladoria from '@assets/logo_faladoria.svg'
import type { SessionUser } from '@features/auth/services/authApi'
import { MenuIcon } from '@shared/components/ui'
import { PANEL_ROUTES } from '@shared/data/routes'
import { Link } from 'react-router-dom'

import { PANEL_CONTENT, ROLE_LABELS } from '../data/panelContent'
import { initialsOf } from '../utils/initialsOf'

export const MOBILE_MENU_ID = 'panel-mobile-menu'

interface PanelHeaderProps {
  user: SessionUser
  isMenuOpen: boolean
  onOpenMenu: () => void
  menuTriggerRef: Ref<HTMLButtonElement>
}

const UserBadge = ({ user }: { user: SessionUser }) => (
  <div className='flex items-center gap-3 rounded-full lg:bg-white lg:py-1.5 lg:pr-4 lg:pl-1.5 lg:shadow-sm'>
    <span
      aria-hidden='true'
      className='bg-purple-medium flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white'
    >
      {initialsOf(user.name)}
    </span>
    <span className='hidden flex-col sm:flex'>
      <span className='text-sm font-semibold'>{user.name}</span>
      <span className='text-xs text-white/80 lg:text-slate-600'>
        {ROLE_LABELS[user.role]}
      </span>
    </span>
  </div>
)

// One banner for every screen: a dark bar with ☰ on phones, only the person's badge on
// desktop, where the logo and the menu live in the sidebar.
export const PanelHeader = ({
  user,
  isMenuOpen,
  onOpenMenu,
  menuTriggerRef,
}: PanelHeaderProps) => {
  const { header } = PANEL_CONTENT

  return (
    <header className='bg-purple-deep text-white lg:bg-transparent lg:text-slate-900'>
      <div className='flex h-16 items-center gap-2 px-2 sm:px-4 lg:h-auto lg:justify-end lg:px-0'>
        <button
          ref={menuTriggerRef}
          type='button'
          onClick={onOpenMenu}
          aria-expanded={isMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          aria-label={header.openMenu}
          className='flex h-12 w-12 items-center justify-center rounded-lg hover:bg-white/10 lg:hidden'
        >
          <MenuIcon />
        </button>
        <Link
          to={PANEL_ROUTES.root}
          aria-label={header.homeLink}
          className='rounded-lg px-1 py-1 lg:hidden'
        >
          <img src={logoFaladoria} alt='' className='h-8 w-auto' />
        </Link>
        <div className='ml-auto'>
          <UserBadge user={user} />
        </div>
      </div>
    </header>
  )
}
