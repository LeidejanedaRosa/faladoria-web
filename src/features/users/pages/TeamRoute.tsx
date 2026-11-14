import { RequireRole } from '@features/panel/components/RequireRole'

import type { AccountGroup } from '../data/accountGroups'
import { TeamPage } from './TeamPage'

/** Only the administration manages accounts (the API answers 403 to the others). */
export const TeamRoute = ({ group }: { group: AccountGroup }) => (
  <RequireRole roles={['admin']}>
    <TeamPage group={group} />
  </RequireRole>
)
