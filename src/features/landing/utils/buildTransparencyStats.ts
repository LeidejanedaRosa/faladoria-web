import { formatPercentage } from '@shared/utils/formatPercentage'

import {
  TRANSPARENCY_CONTENT,
  type TransparencyStat,
} from '../data/transparencyContent'
import type { PublicComplaintStats } from '../services/publicComplaints'

export const buildTransparencyStats = ({
  total,
  byStatus,
}: PublicComplaintStats): TransparencyStat[] =>
  TRANSPARENCY_CONTENT.stats.map(({ statuses, detailSuffix, ...stat }) => {
    if (!statuses) return { ...stat, value: total, isTotal: true }

    const value = statuses.reduce((sum, status) => sum + byStatus[status], 0)
    return {
      ...stat,
      value,
      detail: `${formatPercentage(value, total)} ${detailSuffix}`,
    }
  })
