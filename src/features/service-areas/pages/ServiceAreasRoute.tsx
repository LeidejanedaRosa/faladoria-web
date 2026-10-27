import { RequireRole } from '@features/panel/components/RequireRole'

import { ServiceAreasPage } from './ServiceAreasPage'

/** Only the administration manages the served cities (the API answers 403 to the others). */
export const ServiceAreasRoute = () => (
  <RequireRole roles={['admin']}>
    <ServiceAreasPage />
  </RequireRole>
)
