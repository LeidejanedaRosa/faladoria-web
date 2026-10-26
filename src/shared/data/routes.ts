export const GUIDE_ROUTES = {
  root: '/como-conseguir-pelo-sus',
  category: (slug: string) => `/como-conseguir-pelo-sus/${slug}`,
  article: (categorySlug: string, articleSlug: string) =>
    `/como-conseguir-pelo-sus/${categorySlug}/${articleSlug}`,
} as const

/** The administrative panel. Its pages are only reached by typing the address. */
export const PANEL_ROUTES = {
  root: '/dashboard',
} as const

// Reads the address the way React Router matches it: decoded and case-insensitive, so
// /Dashboard and /%64ashboard, which open the panel, are panel paths too.
const normalizePath = (pathname: string): string | undefined => {
  try {
    return decodeURIComponent(pathname).toLowerCase()
  } catch {
    return undefined
  }
}

export const isPanelPath = (pathname: string) => {
  const path = normalizePath(pathname)
  // Undecodable: treat as panel. Wrongly skipping a recording is harmless; recording is not.
  if (path === undefined) return true
  return path === PANEL_ROUTES.root || path.startsWith(`${PANEL_ROUTES.root}/`)
}
