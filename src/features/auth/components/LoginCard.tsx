import type { Ref } from 'react'

import { AUTH_CONTENT } from '../data/authContent'
import { AuthHeading } from './AuthHeading'
import { LoginForm } from './LoginForm'

interface LoginCardProps {
  headingRef: Ref<HTMLHeadingElement>
}

// Where to go after signing in is decided by AuthPage, from the session: one place only.
export const LoginCard = ({ headingRef }: LoginCardProps) => (
  <div className='flex flex-col gap-6'>
    <AuthHeading ref={headingRef}>{AUTH_CONTENT.login.heading}</AuthHeading>
    <LoginForm />
  </div>
)
