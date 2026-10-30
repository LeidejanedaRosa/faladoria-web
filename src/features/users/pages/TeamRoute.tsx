import { RequireRole } from '@features/panel/components/RequireRole'

import { TeamPage } from './TeamPage'

/** Only the administration manages accounts (the API answers 403 to the others). */
export const TeamRoute = () => (
  <RequireRole roles={['admin']}>
    <TeamPage />
  </RequireRole>
)
