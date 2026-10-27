import type { ReactNode } from 'react'

import { Button } from '@shared/components/ui'
import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'
import { Navigate, useLocation } from 'react-router-dom'

import { AUTH_CONTENT, AUTH_ROUTES } from '../data/authContent'
import { useSession } from '../hooks/useSession'
import type { SessionUser } from '../services/authApi'
import type { ReturnPathState } from '../utils/returnPath'
import { FullPageStatus } from './FullPageStatus'

interface RequirePanelSessionProps {
  /** Renders the panel for the signed-in person, who is never null here. */
  render: (user: SessionUser) => ReactNode
}

/**
 * The panel's door. It only decides where the person goes: the API checks every request on its
 * own (401, 403), so hiding a screen here is convenience, not security.
 */
export const RequirePanelSession = ({ render }: RequirePanelSessionProps) => {
  const { data: session, isPending, isError, refetch } = useSession()
  // Retrying first: with no session cached, a refetch goes back to pending and the waiting
  // screen would replace the focused button (the lesson of the transparency board).
  const { isRetrying, retry } = useRecoveryFocus<HTMLElement>(refetch)
  const location = useLocation()
  const { guard } = AUTH_CONTENT

  if (isRetrying || isError) {
    return (
      <FullPageStatus>
        <p role='alert'>{guard.checkFailed}</p>
        <Button
          onClick={() => void retry()}
          isLoading={isRetrying}
          loadingText={guard.retrying}
        >
          {guard.retry}
        </Button>
      </FullPageStatus>
    )
  }

  if (isPending) {
    return (
      <FullPageStatus>
        <output>{guard.checking}</output>
      </FullPageStatus>
    )
  }

  if (!session) {
    const state: ReturnPathState = {
      from: `${location.pathname}${location.search}`,
    }
    return <Navigate to={AUTH_ROUTES.login} replace state={state} />
  }

  // A temporary password is blocked by the API on every panel route: change it first.
  if (session.user.mustChangePassword) {
    return <Navigate to={AUTH_ROUTES.changePassword} replace />
  }

  return render(session.user)
}
