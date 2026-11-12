import { Suspense } from 'react'

import type { SessionUser } from '@features/auth/services/authApi'
import { MainContent, SkipLink } from '@shared/components/ui'
import { useSidebar } from '@shared/hooks/useSidebar'
import { Outlet } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'
import type { PanelOutletContext } from '../hooks/usePanelUser'
import { PanelHeader } from './PanelHeader'
import { PanelMobileMenu } from './PanelMobileMenu'
import { PanelSidebar } from './PanelSidebar'

interface PanelLayoutProps {
  user: SessionUser
}

export const PanelLayout = ({ user }: PanelLayoutProps) => {
  const { isOpen, open, close, triggerRef, sidebarRef } = useSidebar()
  const outletContext: PanelOutletContext = { user }

  return (
    <div className='bg-panel-canvas min-h-screen lg:flex lg:gap-4 lg:p-4'>
      <SkipLink href='#main-content'>{PANEL_CONTENT.skipLink}</SkipLink>
      <aside className='bg-purple-deep sticky top-4 hidden h-[calc(100vh-2rem)] w-60 shrink-0 overflow-y-auto rounded-2xl p-4 text-white lg:block'>
        <PanelSidebar role={user.role} />
      </aside>
      <PanelMobileMenu
        user={user}
        isOpen={isOpen}
        onClose={close}
        menuRef={sidebarRef}
      />
      <div className='flex min-w-0 flex-1 flex-col lg:gap-2'>
        <PanelHeader
          user={user}
          isMenuOpen={isOpen}
          onOpenMenu={open}
          menuTriggerRef={triggerRef}
        />
        <MainContent className='flex-1'>
          {/* Centred and capped: on very wide screens the content does not stretch edge to edge. */}
          <div className='mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-2 lg:py-4'>
            {/* Here, not only at the top of the app: while a page's code loads, the header and
                the menu stay on screen. */}
            <Suspense
              fallback={
                <output className='text-base text-slate-600'>
                  {PANEL_CONTENT.loadingPage}
                </output>
              }
            >
              <Outlet context={outletContext} />
            </Suspense>
          </div>
        </MainContent>
      </div>
    </div>
  )
}
