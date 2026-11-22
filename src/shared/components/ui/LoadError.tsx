import { UI_CONTENT } from '@shared/data/uiContent'

import { Button } from './Button'

interface LoadErrorProps {
  message: string
  isRetrying: boolean
  onRetry: () => void
}

/** A load that failed, with a retry that keeps focus on the button while it runs. */
export const LoadError = ({ message, isRetrying, onRetry }: LoadErrorProps) => (
  <div
    role='alert'
    className='flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between'
  >
    <p className='text-base text-red-800'>{message}</p>
    <Button
      variant='secondary'
      onClick={onRetry}
      isLoading={isRetrying}
      loadingText={UI_CONTENT.retrying}
    >
      {UI_CONTENT.retry}
    </Button>
  </div>
)
