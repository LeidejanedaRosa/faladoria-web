import { useLocation, useNavigate } from 'react-router-dom'

import { type AccountGroup, GROUP_ROUTES } from '../data/accountGroups'

interface DrawerLocationState {
  fromList?: boolean
}

/** Passed by the list's links: the drawer was opened from the list, which is one step back. */
export const OPENED_FROM_LIST: DrawerLocationState = { fromList: true }

/**
 * Closing goes back when the list opened the drawer, so Back afterwards does not reopen it. A
 * drawer reached by a pasted link or a reload has nothing behind it in the panel: closing
 * replaces it with the folder's list instead of leaving the site.
 */
export const useCloseDrawer = (group: AccountGroup) => {
  const navigate = useNavigate()
  const state = useLocation().state as DrawerLocationState | null

  return () => {
    if (state?.fromList) {
      void navigate(-1)
      return
    }
    void navigate(GROUP_ROUTES[group], { replace: true })
  }
}
