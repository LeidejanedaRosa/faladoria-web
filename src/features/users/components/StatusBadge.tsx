import { cn } from '@shared/utils/cn'

import { USERS_CONTENT } from '../data/usersContent'
import type { UserStatus } from '../services/usersApi'

const TONES: Record<UserStatus, string> = {
  active: 'border-green-200 bg-green-50 text-green-900',
  pendingFirstAccess: 'border-amber-300 bg-amber-50 text-amber-900',
  temporaryCredentialExpired: 'border-red-200 bg-red-50 text-red-800',
  deactivated: 'border-slate-300 bg-slate-100 text-slate-700',
}

/** The color helps, but the word says it all: nothing depends on seeing the color (WCAG 1.4.1). */
export const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span
    className={cn(
      'inline-flex w-fit rounded-md border px-2 py-0.5 text-sm font-medium',
      TONES[status]
    )}
  >
    {USERS_CONTENT.statuses[status]}
  </span>
)
