import { type ReactNode, useId } from 'react'

interface AccountSectionProps {
  heading: string
  children: ReactNode
}

/** One block of the account page (data, password, access), named by its heading. */
export const AccountSection = ({ heading, children }: AccountSectionProps) => {
  const headingId = useId()
  return (
    <section
      aria-labelledby={headingId}
      className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5'
    >
      <h2 id={headingId} className='text-lg font-semibold text-slate-900'>
        {heading}
      </h2>
      {children}
    </section>
  )
}
