import { WarningIcon } from './icons'

interface FormAlertProps {
  message?: string
}

/** A form-wide error (e.g. wrong e-mail or password), announced as soon as it appears. */
export const FormAlert = ({ message }: FormAlertProps) => {
  if (!message) return null

  return (
    <div
      role='alert'
      className='flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800'
    >
      <WarningIcon className='mt-0.5 h-4 w-4 shrink-0' />
      <p>{message}</p>
    </div>
  )
}
