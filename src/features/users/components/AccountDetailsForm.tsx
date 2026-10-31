import { ROLE_LABELS } from '@features/panel/data/panelContent'
import {
  Button,
  FormAlert,
  StatusMessage,
  TextField,
} from '@shared/components/ui'
import { PANEL_ROUTES } from '@shared/data/routes'
import { Link } from 'react-router-dom'

import { NAME_MAX_LENGTH } from '../data/accountRules'
import { USERS_CONTENT } from '../data/usersContent'
import {
  type SaveResult,
  useAccountDetailsForm,
} from '../hooks/useAccountDetailsForm'
import type { User } from '../services/usersApi'
import { AccountCitiesField } from './AccountCitiesField'
import { RoleField } from './RoleField'

const { account: content, newAccount } = USERS_CONTENT

// No radios: the API refuses a change of one's own role, so the form does not offer one.
const OwnRole = ({ role }: { role: User['role'] }) => (
  <div className='flex flex-col gap-1'>
    <p className='text-sm font-medium text-slate-800'>{newAccount.role}</p>
    <p className='text-base font-semibold text-slate-900'>
      {ROLE_LABELS[role]}
    </p>
    <p className='text-sm text-slate-600'>{content.ownRole}</p>
  </div>
)

// Both regions stay in the page, so each message is announced when it arrives.
const SaveMessages = ({ result }: { result: SaveResult | null }) => {
  const outOfReach = result?.complaintsOutOfReach ?? 0
  return (
    <>
      <StatusMessage message={result?.message ?? ''} />
      <StatusMessage
        tone='warning'
        message={outOfReach > 0 ? content.outOfReach(outOfReach) : ''}
      />
    </>
  )
}

interface AccountDetailsFormProps {
  user: User
  isSelf: boolean
}

export const AccountDetailsForm = ({
  user,
  isSelf,
}: AccountDetailsFormProps) => {
  const { form, submit, result, isSubmitting, formError, ...cities } =
    useAccountDetailsForm(user)
  const { errors } = form.formState

  return (
    <form
      noValidate
      onSubmit={event => void submit(event)}
      className='flex flex-col gap-5'
    >
      <FormAlert message={formError} />
      <TextField
        {...form.register('name')}
        label={newAccount.name}
        autoComplete='off'
        maxLength={NAME_MAX_LENGTH}
        error={errors.name?.message}
        className='max-w-md'
      />
      {isSelf ? (
        <OwnRole role={user.role} />
      ) : (
        <RoleField
          registration={form.register('role')}
          error={errors.role?.message}
        />
      )}
      <AccountCitiesField control={form.control} {...cities} />
      <SaveMessages result={result} />
      <div className='flex flex-wrap gap-3'>
        <Button
          type='submit'
          isLoading={isSubmitting}
          loadingText={content.submitting}
        >
          {content.submit}
        </Button>
        <Link
          to={PANEL_ROUTES.team}
          className='inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-base font-semibold text-slate-800 hover:bg-slate-50'
        >
          {content.cancel}
        </Link>
      </div>
    </form>
  )
}
