export const GUIDE_ROUTES = {
  root: '/como-conseguir-pelo-sus',
  category: (slug: string) => `/como-conseguir-pelo-sus/${slug}`,
  article: (categorySlug: string, articleSlug: string) =>
    `/como-conseguir-pelo-sus/${categorySlug}/${articleSlug}`,
} as const
