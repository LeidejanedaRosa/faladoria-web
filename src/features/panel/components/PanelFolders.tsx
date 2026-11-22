import { useActiveAccountCounts } from '@features/users'
import { PANEL_ROUTES } from '@shared/data/routes'
import { cn } from '@shared/utils/cn'
import { NavLink } from 'react-router-dom'

import { PANEL_CONTENT } from '../data/panelContent'
import { useComplaintCounts } from '../hooks/useComplaintCounts'
import { isTeamCounts } from '../services/complaintCounts'

type FolderId = keyof typeof FOLDER_THEMES

// Whole class names: Tailwind only builds the classes it finds written out in the code.
const FOLDER_THEMES = {
  complaints: {
    open: 'bg-purple-medium text-white',
    closed: 'bg-white text-purple-dark',
  },
  team: { open: 'bg-teal-700 text-white', closed: 'bg-white text-teal-800' },
  managers: {
    open: 'bg-amber-700 text-white',
    closed: 'bg-white text-amber-800',
  },
}

const FOLDER_ROUTES: Record<FolderId, string> = {
  complaints: PANEL_ROUTES.root,
  team: PANEL_ROUTES.team,
  managers: PANEL_ROUTES.managers,
}

const useFolderCounts = (): Partial<Record<FolderId, number>> => {
  const { data: complaints } = useComplaintCounts()
  const { data: accounts } = useActiveAccountCounts()
  return {
    complaints:
      complaints && isTeamCounts(complaints)
        ? complaints.byStatus.open
        : undefined,
    team: accounts?.team,
    managers: accounts?.managers,
  }
}

interface FolderProps {
  id: FolderId
  count: number | undefined
}

const Folder = ({ id, count }: FolderProps) => {
  const { title, caption } = PANEL_CONTENT.folders[id]
  const theme = FOLDER_THEMES[id]

  return (
    <NavLink
      to={FOLDER_ROUTES[id]}
      end
      className={({ isActive }) =>
        cn(
          'relative flex min-h-14 flex-1 items-center justify-between gap-3 rounded-2xl rounded-tl-none px-4 py-2 transition-shadow motion-reduce:transition-none sm:min-h-16 sm:flex-col sm:items-start sm:gap-1 sm:p-4',
          isActive
            ? `${theme.open} shadow-lg`
            : `${theme.closed} shadow-sm hover:shadow-md`
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* The folder's ear: same colour as the card, its right edge cut on a slant. */}
          <span
            aria-hidden='true'
            className={cn(
              'absolute -top-2.5 left-0 h-3 w-2/5 rounded-tl-lg [clip-path:polygon(0_0,calc(100%-12px)_0,100%_100%,0_100%)]',
              isActive ? theme.open : theme.closed
            )}
          />
          <span className='text-base font-semibold'>{title}</span>
          {count !== undefined && (
            <span className='flex flex-wrap items-baseline justify-end gap-x-1.5 sm:justify-start'>
              <span className='text-xl font-semibold sm:text-2xl'>{count}</span>
              <span className='text-base lg:text-sm'>{caption}</span>
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

/** The admin's three folders. Each is a page of its own, so reload and Back keep the folder. */
export const PanelFolders = () => {
  const counts = useFolderCounts()

  return (
    <nav aria-label={PANEL_CONTENT.folders.label}>
      {/* One row per folder on phones: three side by side do not fit "Reclamações". */}
      <ul className='grid grid-cols-1 gap-5 pt-2.5 sm:grid-cols-3 sm:gap-4'>
        {(Object.keys(FOLDER_ROUTES) as FolderId[]).map(id => (
          <li key={id} className='flex flex-col'>
            <Folder id={id} count={counts[id]} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
