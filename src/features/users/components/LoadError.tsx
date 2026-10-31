import { Button } from '@shared/components/ui'

import { USERS_CONTENT } from '../data/usersContent'

const { list } = USERS_CONTENT

interface LoadErrorProps {
  message: string
  isRetrying: boolean
  onRetry: () => void
}

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
      loadingText={list.retrying}
    >
      {list.retry}
    </Button>
  </div>
)
