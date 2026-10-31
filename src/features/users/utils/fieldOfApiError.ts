import { isApiError } from '@shared/lib/api'

/** The form field an API error belongs to, by its `code`; undefined: it goes to the alert. */
export const fieldOfApiError = <Field extends string>(
  error: unknown,
  fieldOfCode: Partial<Record<string, Field>>
): Field | undefined =>
  isApiError(error) ? fieldOfCode[error.code] : undefined
