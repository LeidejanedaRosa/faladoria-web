import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  ApiError,
  apiRequest,
  isApiError,
  NETWORK_ERROR_CODE,
  UNEXPECTED_RESPONSE_CODE,
} from '..'

const API_URL = 'https://api.example.test'

const jsonResponse = (
  body: unknown,
  status = 200,
  headers: Record<string, string> = {}
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })

const fetchMock = vi.fn<typeof fetch>()

const lastCall = () => {
  const [url, init] = fetchMock.mock.calls.at(-1) ?? []
  return { url: String(url), init: init ?? {} }
}

const captureError = async (promise: Promise<unknown>): Promise<ApiError> => {
  const error = await promise.catch((caught: unknown) => caught)
  if (!isApiError(error)) throw new Error('expected an ApiError')
  return error
}

beforeEach(() => {
  vi.stubEnv('VITE_API_URL', API_URL)
  vi.stubGlobal('fetch', fetchMock)
  fetchMock.mockReset()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('apiRequest — request', () => {
  it('prefixes the path with the API address and ignores a trailing slash in it', async () => {
    vi.stubEnv('VITE_API_URL', `${API_URL}/`)
    fetchMock.mockResolvedValue(jsonResponse({}))

    await apiRequest('/api/public/complaints')

    expect(lastCall().url).toBe(`${API_URL}/api/public/complaints`)
  })

  it('always sends the session cookie, even to another subdomain', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))

    await apiRequest('/api/auth/get-session')

    expect(lastCall().init.credentials).toBe('include')
  })

  it('repeats the key for list values and drops undefined ones', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))

    await apiRequest('/api/complaints', {
      query: {
        status: ['inReview', 'inProgress'],
        unread: true,
        limit: 20,
        cursor: undefined,
      },
    })

    expect(lastCall().url).toBe(
      `${API_URL}/api/complaints?status=inReview&status=inProgress&unread=true&limit=20`
    )
  })

  it('adds query values to a path that already has some, without a second "?"', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))

    await apiRequest('/api/service-areas?status=removed', {
      query: { limit: 5 },
    })

    expect(lastCall().url).toBe(
      `${API_URL}/api/service-areas?status=removed&limit=5`
    )
  })

  it('encodes query values', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))

    await apiRequest('/api/public/complaints', {
      query: { city: 'Poços de Caldas', state: 'MG' },
    })

    expect(lastCall().url).toBe(
      `${API_URL}/api/public/complaints?city=Po%C3%A7os+de+Caldas&state=MG`
    )
  })

  it('sends a JSON body with its content type', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }))

    await apiRequest('/api/complaints/claim', {
      method: 'POST',
      body: { complaintId: 'c1' },
    })

    const { init } = lastCall()
    expect(init.method).toBe('POST')
    expect(init.body).toBe('{"complaintId":"c1"}')
    expect(init.headers).toEqual({ 'Content-Type': 'application/json' })
  })

  it('sends no content type when there is no body, which the API would reject', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ temporaryPassword: 'x' }))

    await apiRequest('/api/users/u1/reset-password', { method: 'POST' })

    const { init } = lastCall()
    expect(init.headers).toBeUndefined()
    expect(init.body).toBeUndefined()
  })

  it('fails before calling the network when the API address is not configured', async () => {
    vi.stubEnv('VITE_API_URL', '')

    await expect(apiRequest('/api/complaints')).rejects.toThrow(
      'VITE_API_URL is not set'
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('apiRequest — success', () => {
  it('returns the parsed JSON body', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ total: 3 }))

    await expect(apiRequest('/api/public/complaints/stats')).resolves.toEqual({
      total: 3,
    })
  })

  it('returns undefined for 204, the answer of every complaint action', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }))

    await expect(
      apiRequest('/api/complaints/read', {
        method: 'POST',
        body: { complaintId: 'c1' },
      })
    ).resolves.toBeUndefined()
  })

  it('returns the body of 202, which is a success and not an error', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ timelineRecord: 'pending' }, 202)
    )

    await expect(
      apiRequest('/api/complaints/messages', {
        method: 'POST',
        body: { complaintId: 'c1', text: 'Olá' },
      })
    ).resolves.toEqual({ timelineRecord: 'pending' })
  })
})

describe('apiRequest — errors', () => {
  it('turns the API error body into an ApiError with status, code and message', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(
        {
          statusCode: 403,
          code: 'MUST_CHANGE_PASSWORD',
          message: 'Troque sua senha antes de continuar.',
        },
        403
      )
    )

    const error = await captureError(apiRequest('/api/complaints'))

    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(403)
    expect(error.code).toBe('MUST_CHANGE_PASSWORD')
    expect(error.message).toBe('Troque sua senha antes de continuar.')
  })

  it('keeps the details, so a form can mark the invalid fields', async () => {
    const details = { formErrors: [], fieldErrors: { state: ['Invalid'] } }
    fetchMock.mockResolvedValue(
      jsonResponse(
        {
          statusCode: 400,
          code: 'VALIDATION_ERROR',
          message: 'Dados inválidos.',
          details,
        },
        400
      )
    )

    const error = await captureError(apiRequest('/api/users'))

    expect(error.details).toEqual(details)
  })

  it('reads how long to wait from Retry-After on 429', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(
        {
          statusCode: 429,
          code: 'RATE_LIMITED',
          message: 'Muitas tentativas.',
        },
        429,
        { 'Retry-After': '8' }
      )
    )

    const error = await captureError(apiRequest('/api/auth/sign-in/email'))

    expect(error.retryAfterSeconds).toBe(8)
  })

  it('ignores a Retry-After that is not a number of seconds', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(
        { statusCode: 429, code: 'RATE_LIMITED', message: 'Muitas.' },
        429,
        { 'Retry-After': 'Wed, 21 Oct 2026 07:28:00 GMT' }
      )
    )

    const error = await captureError(apiRequest('/api/complaints'))

    expect(error.retryAfterSeconds).toBeUndefined()
  })

  it('gives a generic Portuguese message when the error body is not the API format', async () => {
    fetchMock.mockResolvedValue(
      new Response('<html>Bad Gateway</html>', { status: 502 })
    )

    const error = await captureError(apiRequest('/api/complaints'))

    expect(error.status).toBe(502)
    expect(error.code).toBe(UNEXPECTED_RESPONSE_CODE)
    expect(error.message).toMatch(/servidor respondeu de um jeito inesperado/)
  })

  it('turns a failed connection into a NETWORK_ERROR with status 0', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))

    const error = await captureError(apiRequest('/api/complaints'))

    expect(error.status).toBe(0)
    expect(error.code).toBe(NETWORK_ERROR_CODE)
    expect(error.message).toMatch(/Verifique sua conexão/)
  })

  it('lets a cancelled request through untouched, so the caller can ignore it', async () => {
    const abortError = new DOMException('Aborted', 'AbortError')
    fetchMock.mockRejectedValue(abortError)

    await expect(apiRequest('/api/complaints')).rejects.toBe(abortError)
  })
})
