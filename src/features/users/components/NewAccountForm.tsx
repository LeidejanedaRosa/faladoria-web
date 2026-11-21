import { Button, FormAlert, TextField } from '@shared/components/ui'
import { Controller } from 'react-hook-form'

import type { AccountGroup } from '../data/accountGroups'
import { NAME_MAX_LENGTH } from '../data/accountRules'
import { USERS_CONTENT } from '../data/usersContent'
import { useNewAccountForm } from '../hooks/useNewAccountForm'
import type { CreatedAccount } from '../services/usersApi'
import { CityTagsField } from './CityTagsField'
import { FixedRole, RoleField, type RoleFieldProps } from './RoleField'

const { newAccount, cities } = USERS_CONTENT

// Each folder holds its own roles, so the new account shows up in the list it came from.
const NewAccountRole = ({
  roles,
  ...field
}: Required<Pick<RoleFieldProps, 'roles'>> & RoleFieldProps) =>
  roles.length === 1 ? (
    <FixedRole role={roles[0]} hint={newAccount.managerRole} />
  ) : (
    <RoleField {...field} roles={roles} />
  )

interface NewAccountFormProps {
  group: AccountGroup
  onCreated: (account: CreatedAccount & { name: string }) => void
  onCancel: () => void
}

export const NewAccountForm = ({
  group,
  onCreated,
  onCancel,
}: NewAccountFormProps) => {
  const { form, submit, nameRef, roles, isAdmin, isSubmitting, formError } =
    useNewAccountForm(group, onCreated)
  const {
    register,
    control,
    formState: { errors },
  } = form
  const { ref: registerNameRef, ...nameField } = register('name')

  return (
    <form
      noValidate
      onSubmit={event => void submit(event)}
      className='flex flex-col gap-5'
    >
      <FormAlert message={formError} />
      <div className='flex flex-col gap-4'>
        <TextField
          {...nameField}
          ref={element => {
            registerNameRef(element)
            nameRef.current = element
          }}
          label={newAccount.name}
          autoComplete='off'
          maxLength={NAME_MAX_LENGTH}
          error={errors.name?.message}
        />
        <TextField
          {...register('email')}
          label={newAccount.email}
          type='email'
          autoComplete='off'
          hint={newAccount.emailHint}
          error={errors.email?.message}
        />
      </div>
      <NewAccountRole
        roles={roles}
        registration={register('role')}
        error={errors.role?.message}
      />
      {isAdmin ? (
        <p className='text-base text-slate-700'>{cities.adminSeesAll}</p>
      ) : (
        <Controller
          control={control}
          name='assignedCities'
          render={({ field, fieldState }) => (
            <CityTagsField
              value={field.value}
              onChange={field.onChange}
              inputRef={field.ref}
              error={fieldState.error?.message}
            />
          )}
        />
      )}
      <div className='flex flex-wrap gap-3'>
        <Button
          type='submit'
          isLoading={isSubmitting}
          loadingText={newAccount.submitting}
        >
          {newAccount.submit}
        </Button>
        <Button variant='secondary' onClick={onCancel}>
          {newAccount.cancel}
        </Button>
      </div>
    </form>
  )
}
