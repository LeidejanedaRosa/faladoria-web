import {
  ApiError,
  NETWORK_ERROR_CODE,
  UNEXPECTED_RESPONSE_CODE,
} from './ApiError'

type QueryPrimitive = string | number | boolean
type QueryValue = QueryPrimitive | readonly QueryPrimitive[] | undefined

export interface ApiRequestOptions {
  method?: 'GET' | 'POST'
  body?: unknown
  query?: Record<string, QueryValue>
  signal?: AbortSignal
}

const NETWORK_ERROR_MESSAGE =
  'Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.'
const UNEXPECTED_RESPONSE_MESSAGE =
  'O servidor respondeu de um jeito inesperado. Tente de novo em instantes.'

const getApiBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_URL
  if (!baseUrl) {
    throw new Error('VITE_API_URL is not set')
  }
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

const buildUrl = (path: string, query: ApiRequestOptions['query']): string => {
  // Concatenated, not new URL(path, base): the two-argument form drops any path in the base.
  const url = new URL(getApiBaseUrl() + path)
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined) continue
    // Repeated keys (status=open&status=inReview) are how the API reads a list.
    const values = Array.isArray(value) ? value : [value]
    for (const item of values) url.searchParams.append(key, String(item))
  }
  return url.toString()
}

const parseRetryAfter = (response: Response): number | undefined => {
  const seconds = Number(response.headers.get('Retry-After'))
  return Number.isFinite(seconds) && seconds > 0 ? seconds : undefined
}

const isApiErrorBody = (
  body: unknown
): body is { code: string; message: string; details?: unknown } =>
  typeof body === 'object' &&
  body !== null &&
  typeof (body as { code?: unknown }).code === 'string' &&
  typeof (body as { message?: unknown }).message === 'string'

const toApiError = async (response: Response): Promise<ApiError> => {
  const body: unknown = await response.json().catch(() => undefined)
  const retryAfterSeconds = parseRetryAfter(response)

  // A proxy or the hosting platform can answer with HTML instead of the API's error shape.
  if (!isApiErrorBody(body)) {
    return new ApiError({
      status: response.status,
      code: UNEXPECTED_RESPONSE_CODE,
      message: UNEXPECTED_RESPONSE_MESSAGE,
      retryAfterSeconds,
    })
  }

  return new ApiError({
    status: response.status,
    code: body.code,
    message: body.message,
    details: body.details,
    retryAfterSeconds,
  })
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, query, signal }: ApiRequestOptions = {}
): Promise<T> {
  const hasBody = body !== undefined
  // Built outside the try: a missing VITE_API_URL is a deploy mistake and must not
  // reach the user disguised as "check your connection".
  const url = buildUrl(path, query)

  let response: Response
  try {
    response = await fetch(url, {
      method,
      // The session cookie lives on the API's host; without this the browser leaves it out.
      credentials: 'include',
      // Fastify rejects an empty body declared as JSON, so routes without a body
      // (reset-password, read-all) must not send the header.
      headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }
    throw new ApiError({
      status: 0,
      code: NETWORK_ERROR_CODE,
      message: NETWORK_ERROR_MESSAGE,
    })
  }

  if (!response.ok) {
    throw await toApiError(response)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
