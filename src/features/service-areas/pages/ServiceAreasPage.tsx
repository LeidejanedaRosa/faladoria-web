import { FormAlert, StatusMessage } from '@shared/components/ui'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useSearchParams } from 'react-router-dom'

import { AddServiceAreaForm } from '../components/AddServiceAreaForm'
import { RemoveServiceAreaDialog } from '../components/RemoveServiceAreaDialog'
import { ServiceAreaList } from '../components/ServiceAreaList'
import { StatusFilter } from '../components/StatusFilter'
import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import { useServiceAreaActions } from '../hooks/useServiceAreaActions'
import { useServiceAreas } from '../hooks/useServiceAreas'
import type { ServiceAreaStatus } from '../services/serviceAreasApi'
import { serviceAreaErrorMessage } from '../utils/serviceAreaErrorMessage'

const content = SERVICE_AREAS_CONTENT

const SectionHeading = ({ id, children }: { id: string; children: string }) => (
  <h2 id={id} className='text-lg font-semibold text-slate-900'>
    {children}
  </h2>
)

export const ServiceAreasPage = () => {
  useDocumentMeta({ title: content.metaTitle, robots: 'noindex, nofollow' })
  const [searchParams] = useSearchParams()
  const status: ServiceAreaStatus =
    searchParams.get('situacao') === 'removidas' ? 'removed' : 'active'
  // Only for the counts in the filter: the list reads the same cache.
  const activeAreas = useServiceAreas('active')
  const removedAreas = useServiceAreas('removed')
  const { announcement, announce, listHeadingRef, removal, reactivation } =
    useServiceAreaActions()

  return (
    <div className='flex flex-col gap-8'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
          {content.title}
        </h1>
        <p className='max-w-3xl text-base text-slate-600'>{content.intro}</p>
      </header>

      <StatusMessage message={announcement} />

      <section
        aria-labelledby='add-service-area'
        className='flex flex-col gap-4'
      >
        <SectionHeading id='add-service-area'>
          {content.add.heading}
        </SectionHeading>
        <div className='rounded-xl border border-slate-200 bg-white p-4 sm:p-5'>
          <AddServiceAreaForm onAdded={announce} />
        </div>
      </section>

      <section
        aria-labelledby='service-area-list'
        className='flex flex-col gap-4'
      >
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <h2
            ref={listHeadingRef}
            id='service-area-list'
            tabIndex={-1}
            className='text-lg font-semibold text-slate-900 focus:outline-none'
          >
            {content.list.heading}
          </h2>
          <StatusFilter
            current={status}
            counts={{
              active: activeAreas.data?.length,
              removed: removedAreas.data?.length,
            }}
          />
        </div>
        <FormAlert message={serviceAreaErrorMessage(reactivation.error)} />
        <ServiceAreaList
          key={status}
          status={status}
          onAnnounce={announce}
          onRemove={removal.open}
          onReactivate={reactivation.run}
          reactivatingId={reactivation.pendingId}
        />
      </section>

      <RemoveServiceAreaDialog
        area={removal.target}
        isRemoving={removal.isPending}
        error={serviceAreaErrorMessage(removal.error)}
        onConfirm={removal.confirm}
        onCancel={removal.cancel}
        returnFocusRef={removal.returnFocusRef}
      />
    </div>
  )
}
