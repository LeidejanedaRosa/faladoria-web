import { AUTH_ROUTES } from '@features/auth/data/authContent'
import { useSignOut } from '@features/auth/hooks/useSignOut'
import { Button } from '@shared/components/ui'
import { useNavigate } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'

export const SignOutButton = () => {
  const navigate = useNavigate()
  const signOutMutation = useSignOut()
  const { header } = PANEL_CONTENT

  return (
    <Button
      variant='secondary'
      isLoading={signOutMutation.isPending}
      loadingText={header.signingOut}
      onClick={() =>
        signOutMutation.mutate(undefined, {
          onSettled: () => navigate(AUTH_ROUTES.login, { replace: true }),
        })
      }
      className='border-white/40 bg-transparent px-4 text-white hover:bg-white/10 aria-disabled:hover:bg-transparent'
    >
      {header.signOut}
    </Button>
  )
}
