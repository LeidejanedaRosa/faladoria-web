import { AUTH_ROUTES } from '@features/auth'
import { Button, ConfirmDialog, StatusMessage } from '@shared/components/ui'
import { Link } from 'react-router-dom'

import { USERS_CONTENT } from '../data/usersContent'
import { usePasswordResetFlow } from '../hooks/usePasswordResetFlow'
import type { User } from '../services/usersApi'
import { AccountSection } from './AccountSection'
import { TemporaryPasswordDialog } from './TemporaryPasswordDialog'

const { passwordSection: content } = USERS_CONTENT

const ResetPassword = ({ user }: { user: User }) => {
  const flow = usePasswordResetFlow(user)

  return (
    <>
      <p className='text-base text-slate-700'>{content.intro}</p>
      {user.status === 'temporaryCredentialExpired' && (
        <p className='rounded-lg border border-amber-300 bg-amber-50 p-3 text-base text-amber-900'>
          {content.expired}
        </p>
      )}
      <StatusMessage message={flow.announcement} />
      <Button variant='secondary' onClick={flow.open} className='self-start'>
        {content.open}
      </Button>
      <ConfirmDialog
        isOpen={flow.isConfirmOpen}
        title={content.confirmTitle(user.name)}
        confirmLabel={content.confirm}
        confirmingLabel={content.confirming}
        cancelLabel={content.cancel}
        isConfirming={flow.isResetting}
        error={flow.error}
        onConfirm={flow.confirm}
        onCancel={flow.cancel}
      >
        <p>{content.confirmBody}</p>
      </ConfirmDialog>
      <TemporaryPasswordDialog
        account={flow.shownPassword}
        title={content.dialogTitle}
        onDone={flow.onPasswordNoted}
      />
    </>
  )
}

interface PasswordSectionProps {
  user: User
  isSelf: boolean
}

export const PasswordSection = ({ user, isSelf }: PasswordSectionProps) => (
  <AccountSection heading={content.heading}>
    {/* A reset here would end one's own session: one's own password changes on its own page. */}
    {isSelf && (
      <p className='text-base text-slate-700'>
        {content.self}{' '}
        <Link
          to={AUTH_ROUTES.changePassword}
          className='text-purple-dark relative font-semibold underline underline-offset-4 after:absolute after:-inset-x-2 after:-inset-y-3.5'
        >
          {content.selfLink}
        </Link>
      </p>
    )}
    {!isSelf && user.status === 'deactivated' && (
      <p className='text-base text-slate-700'>{content.deactivated}</p>
    )}
    {!isSelf && user.status !== 'deactivated' && <ResetPassword user={user} />}
  </AccountSection>
)
