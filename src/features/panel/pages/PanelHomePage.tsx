import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'

import { ComplaintCounts } from '../components/ComplaintCounts'
import { PANEL_CONTENT, ROLE_LABELS } from '../data/panelContent'
import { usePanelUser } from '../hooks/usePanelUser'

const { home } = PANEL_CONTENT

export const PanelHomePage = () => {
  const user = usePanelUser()
  useDocumentMeta({ title: home.metaTitle, robots: 'noindex, nofollow' })

  const firstName = user.name.split(' ')[0]
  const cities =
    user.role === 'admin'
      ? home.allCities
      : user.assignedCities
          .map(({ city, state }) => `${city}/${state}`)
          .join(', ')
  // The API answers zeros, not an error, to someone without a city: say why, or the person
  // would think there are simply no complaints.
  const hasNoCity = user.role !== 'admin' && user.assignedCities.length === 0

  return (
    <div className='flex flex-col gap-8'>
      <header className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
          {home.greeting(firstName)}
        </h1>
        <p className='text-base text-slate-600'>
          {ROLE_LABELS[user.role]}
          {cities && ` · ${cities}`}
        </p>
      </header>
      {/* Without a city every number is zero: the notice says it all, and no request is made. */}
      {hasNoCity ? (
        <p className='rounded-xl border border-amber-300 bg-amber-50 p-4 text-base text-amber-900'>
          {home.noCities}
        </p>
      ) : (
        <ComplaintCounts />
      )}
    </div>
  )
}
