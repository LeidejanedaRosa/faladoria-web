import { vi } from 'vitest'

export const TEST_API_URL = 'https://api.test'
export const TEST_IBGE_URL = 'https://ibge.test/localidades'

export const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export const apiErrorResponse = (status: number, code = 'INTERNAL_ERROR') =>
  jsonResponse({ statusCode: status, code, message: 'Erro.' }, status)

/** Stubs the API address and `fetch`; returns the mock to program per test. */
export const stubApi = () => {
  const fetchMock = vi.fn<typeof fetch>()
  vi.stubEnv('VITE_API_URL', TEST_API_URL)
  vi.stubEnv('VITE_IBGE_API_URL', TEST_IBGE_URL)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

export const requestedUrl = (fetchMock: ReturnType<typeof vi.fn>, call = 0) =>
  String(fetchMock.mock.calls[call]?.[0])

/** A response the test releases by hand, to look at the UI while the request is in flight. */
export const deferredResponse = () => {
  let release: (response: Response) => void = () => {}
  const promise = new Promise<Response>(resolve => {
    release = resolve
  })
  return { promise, release: (response: Response) => release(response) }
}

type RouteHandler = () => Response | Promise<Response>

/**
 * Answers each API path with its own handler. A path the test did not plan for throws: a
 * silent default would let a test pass while the code called the wrong route.
 */
export const routeApi = (
  fetchMock: ReturnType<typeof stubApi>,
  routes: Record<string, RouteHandler>
) => {
  fetchMock.mockImplementation(async input => {
    const { pathname } = new URL(String(input))
    const handler = routes[pathname]
    if (!handler) throw new Error(`Unexpected API call: ${pathname}`)
    return handler()
  })
}

export const calledPaths = (fetchMock: ReturnType<typeof stubApi>) =>
  fetchMock.mock.calls.map(([input]) => new URL(String(input)).pathname)
