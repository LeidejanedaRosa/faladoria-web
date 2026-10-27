import type { ReactNode } from 'react'

interface FullPageStatusProps {
  children: ReactNode
}

/** Covers the screen while the panel decides where the person belongs. */
export const FullPageStatus = ({ children }: FullPageStatusProps) => (
  <div className='flex min-h-screen items-center justify-center bg-slate-50 px-4'>
    <div className='flex flex-col items-center gap-4 text-center text-slate-700'>
      <span
        aria-hidden='true'
        className='border-lavender border-t-purple-dark h-10 w-10 animate-spin rounded-full border-4 motion-reduce:animate-none'
      />
      {children}
    </div>
  </div>
)
