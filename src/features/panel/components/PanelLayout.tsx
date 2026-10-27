import type { SessionUser } from '@features/auth/services/authApi'
import { MainContent, SkipLink } from '@shared/components/ui'
import { useSidebar } from '@shared/hooks/useSidebar'
import { Outlet } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'
import type { PanelOutletContext } from '../hooks/usePanelUser'
import { PanelHeader } from './PanelHeader'
import { PanelMobileMenu } from './PanelMobileMenu'
import { PanelNav } from './PanelNav'

interface PanelLayoutProps {
  user: SessionUser
}

export const PanelLayout = ({ user }: PanelLayoutProps) => {
  const { isOpen, open, close, triggerRef, sidebarRef } = useSidebar()
  const outletContext: PanelOutletContext = { user }

  return (
    <div className='min-h-screen bg-slate-50'>
      <SkipLink href='#main-content'>{PANEL_CONTENT.skipLink}</SkipLink>
      <PanelHeader
        user={user}
        isMenuOpen={isOpen}
        onOpenMenu={open}
        menuTriggerRef={triggerRef}
      />
      <PanelMobileMenu
        user={user}
        isOpen={isOpen}
        onClose={close}
        menuRef={sidebarRef}
      />
      <div className='lg:flex'>
        <aside className='hidden w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:block lg:min-h-[calc(100vh-4rem)]'>
          <PanelNav role={user.role} />
        </aside>
        <MainContent className='min-w-0 flex-1'>
          {/* Centred and capped: on very wide screens the content does not stretch edge to edge. */}
          <div className='mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8'>
            <Outlet context={outletContext} />
          </div>
        </MainContent>
      </div>
    </div>
  )
}
