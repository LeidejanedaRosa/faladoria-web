import type { Ref } from 'react'

import { useNavigate } from 'react-router-dom'

import { AUTH_CONTENT, AUTH_ROUTES } from '../data/authContent'
import type { SessionUser } from '../services/authApi'
import { AuthHeading } from './AuthHeading'
import { LoginForm } from './LoginForm'

interface LoginCardProps {
  headingRef: Ref<HTMLHeadingElement>
}

export const LoginCard = ({ headingRef }: LoginCardProps) => {
  const navigate = useNavigate()

  const handleSignedIn = (user: SessionUser) => {
    // A temporary password is blocked everywhere else: go straight to the change.
    if (user.mustChangePassword) {
      navigate(AUTH_ROUTES.changePassword, { replace: true })
      return
    }
    navigate(AUTH_ROUTES.home, { replace: true })
  }

  return (
    <div className='flex flex-col gap-6'>
      <AuthHeading ref={headingRef}>{AUTH_CONTENT.login.heading}</AuthHeading>
      <LoginForm onSignedIn={handleSignedIn} />
    </div>
  )
}
