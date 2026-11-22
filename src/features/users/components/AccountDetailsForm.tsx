import {
  Button,
  FormAlert,
  StatusMessage,
  TextField,
} from '@shared/components/ui'

import { NAME_MAX_LENGTH } from '../data/accountRules'
import { USERS_CONTENT } from '../data/usersContent'
import {
  type SaveResult,
  useAccountDetailsForm,
} from '../hooks/useAccountDetailsForm'
import type { User } from '../services/usersApi'
import { AccountCitiesField } from './AccountCitiesField'
import { FixedRole, RoleField } from './RoleField'

const { account: content, newAccount } = USERS_CONTENT

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
  onCancel: () => void
}

export const AccountDetailsForm = ({
  user,
  isSelf,
  onCancel,
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
      {/* No radios for oneself: the API refuses a change of one's own role. */}
      {isSelf ? (
        <FixedRole role={user.role} hint={content.ownRole} />
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
        <Button variant='secondary' onClick={onCancel}>
          {content.cancel}
        </Button>
      </div>
    </form>
  )
}
