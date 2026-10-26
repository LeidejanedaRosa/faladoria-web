import type { Ref } from 'react'

import { Button } from '@shared/components/ui'
import { useNavigate } from 'react-router-dom'

import { AUTH_CONTENT, AUTH_ROUTES } from '../data/authContent'
import { useSignOut } from '../hooks/useSignOut'
import { AuthHeading } from './AuthHeading'
import { ChangePasswordForm } from './ChangePasswordForm'

interface ChangePasswordCardProps {
  headingRef: Ref<HTMLHeadingElement>
  isSignedIn: boolean
  isForced: boolean
}

export const ChangePasswordCard = ({
  headingRef,
  isSignedIn,
  isForced,
}: ChangePasswordCardProps) => {
  const navigate = useNavigate()
  const signOutMutation = useSignOut()
  const { changePassword } = AUTH_CONTENT

  const handleSignOut = () =>
    signOutMutation.mutate(undefined, {
      onSettled: () => navigate(AUTH_ROUTES.login, { replace: true }),
    })

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <AuthHeading ref={headingRef}>
          {isForced ? changePassword.forcedHeading : changePassword.heading}
        </AuthHeading>
        <p className='text-base text-slate-700'>
          {isForced ? changePassword.forcedIntro : changePassword.intro}
        </p>
      </div>
      <ChangePasswordForm
        requireEmail={!isSignedIn}
        isForced={isForced}
        onChanged={() => navigate(AUTH_ROUTES.home, { replace: true })}
      />
      {isSignedIn && (
        <Button
          variant='secondary'
          onClick={handleSignOut}
          isLoading={signOutMutation.isPending}
          className='w-full'
        >
          {changePassword.signOut}
        </Button>
      )}
    </div>
  )
}
