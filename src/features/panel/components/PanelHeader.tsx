import type { Ref } from 'react'

import logoFaladoria from '@assets/logo_faladoria.svg'
import type { SessionUser } from '@features/auth/services/authApi'
import { MenuIcon } from '@shared/components/ui'
import { PANEL_ROUTES } from '@shared/data/routes'
import { Link } from 'react-router-dom'

import { PANEL_CONTENT, ROLE_LABELS } from '../data/panelContent'
import { SignOutButton } from './SignOutButton'

export const MOBILE_MENU_ID = 'panel-mobile-menu'

interface PanelHeaderProps {
  user: SessionUser
  isMenuOpen: boolean
  onOpenMenu: () => void
  menuTriggerRef: Ref<HTMLButtonElement>
}

// Dark purple: the logo has near-white lettering and needs a dark background.
export const PanelHeader = ({
  user,
  isMenuOpen,
  onOpenMenu,
  menuTriggerRef,
}: PanelHeaderProps) => {
  const { header } = PANEL_CONTENT

  return (
    <header className='bg-purple-deep text-white'>
      <div className='flex h-16 items-center gap-2 px-2 sm:px-4 lg:px-6'>
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
          className='flex items-center gap-3 rounded-lg px-1 py-1'
        >
          <img src={logoFaladoria} alt='' className='h-9 w-auto' />
          <span className='hidden border-l border-white/25 pl-3 text-sm font-medium text-white/85 sm:inline'>
            {header.panelLabel}
          </span>
        </Link>
        <div className='ml-auto flex items-center gap-4'>
          <div className='hidden text-right sm:block'>
            <p className='text-sm font-semibold'>{user.name}</p>
            <p className='text-xs text-white/80'>{ROLE_LABELS[user.role]}</p>
          </div>
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}
