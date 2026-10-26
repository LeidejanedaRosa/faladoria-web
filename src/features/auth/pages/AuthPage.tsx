import { useEffect, useRef } from 'react'

import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useNavigate } from 'react-router-dom'

import {
  type AuthAsidePanel,
  AuthLayout,
  type AuthMode,
} from '../components/AuthLayout'
import { ChangePasswordCard } from '../components/ChangePasswordCard'
import { LoginCard } from '../components/LoginCard'
import { AUTH_CONTENT, AUTH_ROUTES } from '../data/authContent'
import { useSession } from '../hooks/useSession'

interface AuthPageProps {
  mode: AuthMode
}

/**
 * Login and password change share one page so the card stays mounted and slides between the
 * two sides of the band. Each side keeps its own address: back button and direct links work.
 */
export const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate()
  const { data: session } = useSession()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const previousModeRef = useRef(mode)
  const { login, changePassword, aside } = AUTH_CONTENT

  const isSignedIn = Boolean(session)
  const isForced = Boolean(session?.user.mustChangePassword)

  useDocumentMeta({
    title: mode === 'login' ? login.metaTitle : changePassword.metaTitle,
    robots: 'noindex, nofollow',
  })

  // The button that switched sides is now in the hidden half: hand focus to the new form.
  useEffect(() => {
    if (previousModeRef.current === mode) return
    previousModeRef.current = mode
    headingRef.current?.focus()
  }, [mode])

  const panels: Record<AuthMode, AuthAsidePanel> = {
    login: {
      note: aside.noAccess,
      switchPrompt: login.switchPrompt,
      switchLabel: login.switchButton,
      onSwitch: () => navigate(AUTH_ROUTES.changePassword),
    },
    // Signed in, "Entrar" would lead nowhere: the way out is "Sair", inside the card.
    changePassword: isSignedIn
      ? {
          note: isForced
            ? changePassword.forcedAsideNote
            : changePassword.asideNote,
        }
      : {
          note: changePassword.asideNote,
          switchPrompt: changePassword.switchPrompt,
          switchLabel: changePassword.switchButton,
          onSwitch: () => navigate(AUTH_ROUTES.login),
        },
  }

  return (
    <AuthLayout mode={mode} panels={panels}>
      {mode === 'login' ? (
        <LoginCard headingRef={headingRef} />
      ) : (
        <ChangePasswordCard
          headingRef={headingRef}
          isSignedIn={isSignedIn}
          isForced={isForced}
        />
      )}
    </AuthLayout>
  )
}
