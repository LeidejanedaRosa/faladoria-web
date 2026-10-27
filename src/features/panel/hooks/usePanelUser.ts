import type { SessionUser } from '@features/auth/services/authApi'
import { useOutletContext } from 'react-router-dom'

export interface PanelOutletContext {
  user: SessionUser
}

/** The signed-in person, inside any panel page. The session guard guarantees it exists. */
export const usePanelUser = () => useOutletContext<PanelOutletContext>().user
