import { useRef, useState } from 'react'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import type { ServiceArea } from '../services/serviceAreasApi'
import {
  useReactivateServiceArea,
  useRemoveServiceArea,
} from './useServiceAreaMutations'

const { removeDialog, row } = SERVICE_AREAS_CONTENT

/**
 * Removal (with its confirmation) and reactivation, plus what the page says and where focus goes
 * after each. Both make the row disappear from the list being shown, so focus moves to the list
 * heading instead of falling to <body>.
 */
export const useServiceAreaActions = () => {
  const removeMutation = useRemoveServiceArea()
  const reactivateMutation = useReactivateServiceArea()
  const [announcement, setAnnouncement] = useState('')
  const [removalTarget, setRemovalTarget] = useState<ServiceArea | null>(null)
  const [returnToHeading, setReturnToHeading] = useState(false)
  const listHeadingRef = useRef<HTMLHeadingElement>(null)

  const openRemoval = (area: ServiceArea) => {
    removeMutation.reset()
    setReturnToHeading(false)
    setRemovalTarget(area)
  }

  const confirmRemoval = () => {
    if (!removalTarget) return
    const { id, city, state } = removalTarget
    removeMutation.mutate(id, {
      onSuccess: () => {
        setAnnouncement(removeDialog.removed(city, state))
        setReturnToHeading(true)
        setRemovalTarget(null)
      },
    })
  }

  const reactivate = ({ id, city, state }: ServiceArea) =>
    reactivateMutation.mutate(id, {
      onSuccess: () => {
        setAnnouncement(row.reactivated(city, state))
        listHeadingRef.current?.focus()
      },
    })

  return {
    announcement,
    announce: setAnnouncement,
    listHeadingRef,
    removal: {
      target: removalTarget,
      open: openRemoval,
      cancel: () => setRemovalTarget(null),
      confirm: confirmRemoval,
      isPending: removeMutation.isPending,
      error: removeMutation.error,
      returnFocusRef: returnToHeading ? listHeadingRef : undefined,
    },
    reactivation: {
      run: reactivate,
      pendingId: reactivateMutation.isPending
        ? reactivateMutation.variables
        : undefined,
      error: reactivateMutation.error,
    },
  }
}
