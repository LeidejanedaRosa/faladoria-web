import type { ReactNode } from 'react'

import logoFaladoria from '@assets/logo_faladoria.svg'
import { Button } from '@shared/components/ui'
import { COMPANY_INFO } from '@shared/data/companyInfo'
import { cn } from '@shared/utils/cn'

import { AUTH_CONTENT } from '../data/authContent'

export type AuthMode = 'login' | 'changePassword'

export interface AuthAsidePanel {
  note: string
  switchPrompt?: string
  switchLabel?: string
  onSwitch?: () => void
}

interface AuthLayoutProps {
  mode: AuthMode
  /** The band text for each mode: login's sits on the right, the change's on the left. */
  panels: Record<AuthMode, AuthAsidePanel>
  children: ReactNode
}

const LOGO_ALT = COMPANY_INFO.name

const SwitchControl = ({
  switchPrompt,
  switchLabel,
  onSwitch,
}: AuthAsidePanel) =>
  switchLabel && onSwitch ? (
    <div className='flex flex-col items-center gap-3'>
      <p className='font-medium'>{switchPrompt}</p>
      <Button variant='secondary' onClick={onSwitch}>
        {switchLabel}
      </Button>
    </div>
  ) : null

const BandPanel = ({
  panel,
  isActive,
}: {
  panel: AuthAsidePanel
  isActive: boolean
}) => (
  // inert takes the hidden side out of the tab order and of the screen reader at once.
  <div
    inert={!isActive}
    className={cn(
      'flex w-[36%] flex-col items-center gap-4 text-center text-white transition-opacity duration-500 motion-reduce:transition-none',
      isActive ? 'opacity-100' : 'opacity-0'
    )}
  >
    <img src={logoFaladoria} alt={LOGO_ALT} className='h-16 w-auto' />
    <p className='text-xl font-semibold'>{AUTH_CONTENT.aside.title}</p>
    <p className='text-white/85'>{AUTH_CONTENT.aside.description}</p>
    <p className='text-sm text-white/80'>{panel.note}</p>
    <SwitchControl {...panel} />
  </div>
)

// The logo has near-white lettering: it always sits on the purple, never on the white card.
export const AuthLayout = ({ mode, panels, children }: AuthLayoutProps) => {
  const activePanel = panels[mode]

  return (
    <main
      id='main-content'
      className='from-purple-dark to-purple-medium flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-10'
    >
      <div className='relative flex w-full max-w-4xl flex-col items-center gap-6 lg:block'>
        <img
          src={logoFaladoria}
          alt={LOGO_ALT}
          className='h-14 w-auto lg:hidden'
        />

        <section
          className={cn(
            'motion-safe:animate-card-in relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-transform duration-500 ease-in-out motion-reduce:transition-none sm:p-8 lg:ml-12',
            // From 48px off the left edge to 48px off the right one: its own width minus 2 × 48px.
            mode === 'changePassword' && 'lg:translate-x-[calc(100%-6rem)]'
          )}
        >
          {children}
        </section>

        {/* After the card in the DOM: the keyboard reaches the form first, as the eye does. */}
        <aside className='bg-purple-deep/50 hidden rounded-2xl lg:absolute lg:inset-x-0 lg:top-1/2 lg:flex lg:h-[70%] lg:-translate-y-1/2 lg:items-center lg:justify-between lg:px-10'>
          <BandPanel
            panel={panels.changePassword}
            isActive={mode === 'changePassword'}
          />
          <BandPanel panel={panels.login} isActive={mode === 'login'} />
        </aside>

        <div className='flex max-w-md flex-col items-center gap-4 text-center text-white lg:hidden'>
          <p className='text-sm text-white/90'>{activePanel.note}</p>
          <SwitchControl {...activePanel} />
        </div>
      </div>
    </main>
  )
}
