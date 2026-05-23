import React, { forwardRef } from 'react'

import type { AccessibilityProps } from '@shared/types/accessibility'
import { cn } from '@shared/utils/cn'

interface MainContentProps extends AccessibilityProps {
  children: React.ReactNode
  className?: string
}

export const MainContent = forwardRef<HTMLElement, MainContentProps>(
  ({ children, className = '', id = 'main-content', ...props }, ref) => (
    <main
      ref={ref}
      id={id}
      className={cn('focus:outline-none', className)}
      tabIndex={-1}
      {...props}
    >
      {children}
    </main>
  )
)

MainContent.displayName = 'MainContent'
