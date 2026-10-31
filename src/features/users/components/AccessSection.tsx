import {
  Button,
  ConfirmDialog,
  FormAlert,
  StatusMessage,
} from '@shared/components/ui'

import { USERS_CONTENT } from '../data/usersContent'
import { useAccessFlow } from '../hooks/useAccessFlow'
import type { User } from '../services/usersApi'
import { AccountSection } from './AccountSection'

const { accessSection: content } = USERS_CONTENT

const SwitchAccess = ({ user }: { user: User }) => {
  const flow = useAccessFlow(user)

  return (
    <>
      <p className='text-base text-slate-700'>
        {flow.isDeactivated ? content.deactivatedIntro : content.activeIntro}
      </p>
      <StatusMessage message={flow.announcement} />
      <FormAlert message={flow.pageError} />
      {/* The same <Button> in both branches: React keeps its DOM element and only changes the
          label, so focus stays on it when "Desativar" becomes "Reativar". */}
      {flow.isDeactivated ? (
        <Button
          onClick={flow.reactivate}
          isLoading={flow.isSwitching}
          loadingText={content.reactivating}
          className='self-start'
        >
          {content.reactivate}
        </Button>
      ) : (
        <Button
          variant='danger'
          onClick={flow.openConfirm}
          className='self-start'
        >
          {content.deactivate}
        </Button>
      )}
      <ConfirmDialog
        isOpen={flow.isConfirmOpen}
        title={content.confirmTitle(user.name)}
        confirmLabel={content.deactivate}
        confirmingLabel={content.confirming}
        cancelLabel={content.cancel}
        isConfirming={flow.isSwitching}
        error={flow.dialogError}
        onConfirm={flow.deactivate}
        onCancel={flow.cancel}
      >
        <p>{content.confirmBody}</p>
        {user.assignedComplaintCount > 0 && (
          <p className='font-semibold text-slate-900'>
            {content.casesStay(user.assignedComplaintCount)}
          </p>
        )}
      </ConfirmDialog>
    </>
  )
}

interface AccessSectionProps {
  user: User
  isSelf: boolean
}

export const AccessSection = ({ user, isSelf }: AccessSectionProps) => (
  <AccountSection heading={content.heading}>
    {isSelf ? (
      <p className='text-base text-slate-700'>{content.self}</p>
    ) : (
      <SwitchAccess user={user} />
    )}
  </AccountSection>
)
