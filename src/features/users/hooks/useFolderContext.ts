import type { PanelOutletContext } from '@features/panel/hooks/usePanelUser'
import { useOutletContext } from 'react-router-dom'

import type { AccountGroup } from '../data/accountGroups'
import type { ShownAccount } from './useNewAccountFlow'

/** What a folder hands to the drawer over its list. Keeps `user`, so `usePanelUser` still works. */
export interface FolderOutletContext extends PanelOutletContext {
  group: AccountGroup
  onAccountCreated: (account: ShownAccount) => void
}

export const useFolderContext = () => useOutletContext<FolderOutletContext>()
