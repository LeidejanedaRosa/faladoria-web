import { Outlet, useOutletContext } from 'react-router-dom'

import type { PanelOutletContext } from '../hooks/usePanelUser'
import { PanelFolders } from './PanelFolders'

/** Parent route of the folder pages: the admin sees the folders above the page; the others,
 * who have only the complaints, see the page alone. */
export const PanelFoldersLayout = () => {
  const context = useOutletContext<PanelOutletContext>()

  return (
    <div className='flex flex-col gap-6'>
      {context.user.role === 'admin' && <PanelFolders />}
      {/* Passed on: the pages below read the signed-in person from it. */}
      <Outlet context={context} />
    </div>
  )
}
