import type { Ref } from 'react'

import type { SessionUser } from '@features/auth'
import { CloseIcon } from '@shared/components/ui'
import { cn } from '@shared/utils/cn'

import { PANEL_CONTENT, ROLE_LABELS } from '../data/panelContent'
import { MOBILE_MENU_ID } from './PanelHeader'
import { PanelSidebar } from './PanelSidebar'

interface PanelMobileMenuProps {
  user: SessionUser
  isOpen: boolean
  onClose: () => void
  menuRef: Ref<HTMLDivElement>
}

// Same pattern as the public site's menu: a modal dialog, focus trapped inside, Escape and the
// backdrop close it (useSidebar), and focus returns to the ☰ button.
export const PanelMobileMenu = ({
  user,
  isOpen,
  onClose,
  menuRef,
}: PanelMobileMenuProps) => {
  const { header } = PANEL_CONTENT

  return (
    <div
      id={MOBILE_MENU_ID}
      role='dialog'
      aria-modal='true'
      aria-label={header.mobileMenu}
      className={cn(
        'fixed inset-0 z-40 lg:hidden',
        isOpen ? 'visible' : 'invisible'
      )}
    >
      <div
        role='presentation'
        aria-hidden='true'
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-slate-900/50 transition-opacity motion-reduce:transition-none',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div
        ref={menuRef}
        className={cn(
          'bg-purple-deep absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto p-4 text-white shadow-xl transition-transform motion-reduce:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='flex items-start justify-between gap-2'>
          <div>
            <p className='font-semibold'>{user.name}</p>
            <p className='text-sm text-white/80'>{ROLE_LABELS[user.role]}</p>
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label={header.closeMenu}
            className='flex h-12 w-12 items-center justify-center rounded-lg hover:bg-white/10'
          >
            <CloseIcon />
          </button>
        </div>
        <div className='flex-1'>
          <PanelSidebar role={user.role} onNavigate={onClose} />
        </div>
      </div>
    </div>
  )
}
