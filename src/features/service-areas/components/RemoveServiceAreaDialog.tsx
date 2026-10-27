import type { RefObject } from 'react'

import { ConfirmDialog, WarningIcon } from '@shared/components/ui'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import { useAccountsInCity } from '../hooks/useAccountsInCity'
import type { ServiceArea } from '../services/serviceAreasApi'

const { removeDialog } = SERVICE_AREAS_CONTENT

interface RemoveServiceAreaDialogProps {
  area: ServiceArea | null
  isRemoving: boolean
  error?: string
  onConfirm: () => void
  onCancel: () => void
  returnFocusRef?: RefObject<HTMLElement | null>
}

const AccountsNotice = ({ area }: { area: ServiceArea }) => {
  const { data: count, isPending, isError } = useAccountsInCity(area)

  if (isPending)
    return <p className='text-slate-600'>{removeDialog.countingAccounts}</p>
  if (isError)
    return <p className='text-slate-600'>{removeDialog.accountsUnknown}</p>
  if (count === 0) return <p>{removeDialog.noAccounts}</p>

  return (
    <p className='flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900'>
      <WarningIcon className='mt-0.5 h-5 w-5 shrink-0' />
      {removeDialog.accounts(count)}
    </p>
  )
}

export const RemoveServiceAreaDialog = ({
  area,
  isRemoving,
  error,
  onConfirm,
  onCancel,
  returnFocusRef,
}: RemoveServiceAreaDialogProps) => (
  <ConfirmDialog
    isOpen={area !== null}
    title={area ? removeDialog.title(area.city, area.state) : ''}
    confirmLabel={removeDialog.confirm}
    confirmingLabel={removeDialog.confirming}
    cancelLabel={removeDialog.cancel}
    isConfirming={isRemoving}
    error={error}
    onConfirm={onConfirm}
    onCancel={onCancel}
    returnFocusRef={returnFocusRef}
  >
    {area && (
      <>
        <p>{removeDialog.consequence}</p>
        <AccountsNotice area={area} />
        <p>{removeDialog.undo}</p>
      </>
    )}
  </ConfirmDialog>
)
