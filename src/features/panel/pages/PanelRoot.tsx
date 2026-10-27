import { RequirePanelSession } from '@features/auth/components/RequirePanelSession'

import { PanelLayout } from '../components/PanelLayout'

/** Every panel page sits behind the session guard, inside the panel layout. */
export const PanelRoot = () => (
  <RequirePanelSession render={user => <PanelLayout user={user} />} />
)
