import { usePanelUser } from '@features/panel/hooks/usePanelUser'
import { Button, StatusMessage } from '@shared/components/ui'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'

import { AccountList } from '../components/AccountList'
import { NewAccountForm } from '../components/NewAccountForm'
import { TemporaryPasswordDialog } from '../components/TemporaryPasswordDialog'
import { USERS_CONTENT } from '../data/usersContent'
import { useNewAccountFlow } from '../hooks/useNewAccountFlow'

const content = USERS_CONTENT
const FORM_ID = 'new-account'

export const TeamPage = () => {
  useDocumentMeta({ title: content.metaTitle, robots: 'noindex, nofollow' })
  const self = usePanelUser()
  const flow = useNewAccountFlow()

  return (
    <div className='flex flex-col gap-8'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
            {content.title}
          </h1>
          <p className='max-w-3xl text-base text-slate-600'>{content.intro}</p>
        </div>
        {/* A disclosure: the same button opens and closes the form, and says which. */}
        <Button
          ref={flow.openButtonRef}
          aria-expanded={flow.isFormOpen}
          aria-controls={FORM_ID}
          onClick={flow.toggleForm}
          className='shrink-0 self-start'
        >
          {content.newAccount.open}
        </Button>
      </header>

      <StatusMessage message={flow.announcement} />

      {flow.isFormOpen && (
        <section
          id={FORM_ID}
          aria-labelledby={`${FORM_ID}-heading`}
          className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5'
        >
          <h2
            id={`${FORM_ID}-heading`}
            className='text-lg font-semibold text-slate-900'
          >
            {content.newAccount.heading}
          </h2>
          <NewAccountForm
            onCreated={flow.onCreated}
            onCancel={flow.closeForm}
          />
        </section>
      )}

      <section
        aria-labelledby='accounts-heading'
        className='flex flex-col gap-4'
      >
        <h2
          id='accounts-heading'
          className='text-lg font-semibold text-slate-900'
        >
          {content.list.heading}
        </h2>
        <AccountList selfId={self.id} />
      </section>

      <TemporaryPasswordDialog
        account={flow.createdAccount}
        onDone={flow.onPasswordNoted}
        returnFocusRef={flow.openButtonRef}
      />
    </div>
  )
}
