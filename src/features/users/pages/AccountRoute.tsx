import { RequireRole } from '@features/panel/components/RequireRole'

import { AccountPage } from './AccountPage'

/** Only the administration manages accounts (the API answers 403 to the others). */
export const AccountRoute = () => (
  <RequireRole roles={['admin']}>
    <AccountPage />
  </RequireRole>
)
