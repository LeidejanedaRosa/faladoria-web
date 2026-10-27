interface IbgeMunicipality {
  nome: string
}

const getIbgeBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_IBGE_API_URL
  if (!baseUrl) {
    throw new Error('VITE_IBGE_API_URL is not set')
  }
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

/** The official names of a state's cities, in alphabetical order. */
export const fetchCitiesOfState = async (
  state: string,
  signal?: AbortSignal
): Promise<string[]> => {
  // Plain fetch, not apiRequest: the IBGE is another service, without our cookie or error shape.
  const response = await fetch(
    `${getIbgeBaseUrl()}/estados/${encodeURIComponent(state)}/municipios?orderBy=nome`,
    { signal }
  )
  if (!response.ok) {
    throw new Error(`IBGE answered ${response.status}`)
  }
  const municipalities = (await response.json()) as IbgeMunicipality[]
  return municipalities.map(({ nome }) => nome)
}
