import React from 'react'

import { cn } from '@shared/utils/cn'

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  asChild?: boolean
}

export const ScreenReaderOnly = ({
  children,
  asChild = false,
}: ScreenReaderOnlyProps) => {
  if (asChild) {
    if (!React.isValidElement<{ className?: string }>(children)) {
      return <span className='sr-only'>{children}</span>
    }

    return React.cloneElement(children, {
      className: cn(children.props.className, 'sr-only'),
    })
  }

  return <span className='sr-only'>{children}</span>
}
