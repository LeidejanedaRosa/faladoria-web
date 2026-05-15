import { useState } from 'react'
import type { ReactNode } from 'react'

import { MainContent, SkipLink } from '@shared/components/ui'

import { FooterSection } from './footer'
import { Header } from './Header'

interface PageShellProps {
  children: ReactNode
  mainContentLabel: string
  schemas?: ReactNode
}

export function PageShell({
  children,
  mainContentLabel,
  schemas,
}: PageShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {schemas}
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
      <Header onSidebarToggle={setIsSidebarOpen} />
      <div inert={isSidebarOpen || undefined}>
        <MainContent aria-label={mainContentLabel}>{children}</MainContent>
        <FooterSection />
      </div>
    </>
  )
}
