import { useServiceAreas } from '@features/service-areas'
import { ActionHistory, type TargetNames } from '@features/staff-actions'

import { USERS_CONTENT } from '../data/usersContent'
import { useUsers } from '../hooks/useUsers'
import type { User } from '../services/usersApi'
import { AccountSection } from './AccountSection'

/** Accounts and cities by id, so the history can say which one was changed. Removed cities
 * too: removing one is among the actions the log is read for. */
const useTargetNames = (): TargetNames => {
  const { data: users = [] } = useUsers()
  const { data: active = [] } = useServiceAreas('active')
  const { data: removed = [] } = useServiceAreas('removed')
  return new Map([
    ...users.map(({ id, name }) => [id, name] as const),
    ...[...active, ...removed].map(
      ({ id, city, state }) => [id, `${city}/${state}`] as const
    ),
  ])
}

export const HistorySection = ({ user }: { user: User }) => {
  const targetNames = useTargetNames()
  return (
    <AccountSection heading={USERS_CONTENT.historySection.heading}>
      <ActionHistory actorId={user.id} targetNames={targetNames} />
    </AccountSection>
  )
}
