import { z } from 'zod'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'

const { errors } = SERVICE_AREAS_CONTENT

export const cityLocationSchema = z.object({
  state: z.string().min(1, errors.stateRequired),
  city: z.string().trim().min(1, errors.cityRequired),
})

export type CityLocationValues = z.infer<typeof cityLocationSchema>
