import type { ReactNode } from 'react'

import type { UserRole } from '@features/auth/services/authApi'
import { PANEL_ROUTES } from '@shared/data/routes'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { Link } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'
import { usePanelUser } from '../hooks/usePanelUser'

const { forbidden } = PANEL_CONTENT

interface RequireRoleProps {
  roles: readonly UserRole[]
  children: ReactNode
}

const Forbidden = () => {
  useDocumentMeta({ title: forbidden.title, robots: 'noindex, nofollow' })

  return (
    <div className='flex flex-col items-start gap-4'>
      <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
        {forbidden.title}
      </h1>
      <p className='text-base text-slate-700'>{forbidden.message}</p>
      <Link
        to={PANEL_ROUTES.root}
        className='text-purple-dark hover:text-purple-medium inline-flex min-h-12 items-center font-semibold underline underline-offset-4'
      >
        {forbidden.backHome}
      </Link>
    </div>
  )
}

/**
 * Hides a page from the roles that cannot use it. The menu already leaves it out; this covers
 * a typed address. The API refuses the requests anyway (403): this is guidance, not security.
 */
export const RequireRole = ({ roles, children }: RequireRoleProps) => {
  const { role } = usePanelUser()
  return roles.includes(role) ? children : <Forbidden />
}
