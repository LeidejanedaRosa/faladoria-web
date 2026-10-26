import type { Ref } from 'react'

interface AuthHeadingProps {
  children: string
  ref?: Ref<HTMLHeadingElement>
}

// tabIndex -1: the page moves focus here when the card switches sides.
export const AuthHeading = ({ children, ref }: AuthHeadingProps) => (
  <h1
    ref={ref}
    tabIndex={-1}
    className='border-purple-dark border-l-4 pl-3 text-2xl font-bold text-slate-900'
  >
    {children}
  </h1>
)
