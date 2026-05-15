import { useEffect } from 'react'

import { COMPANY_INFO } from '@shared/data/companyInfo'
import { Container, PageShell } from '@shared/components/layout'

export function NotFoundPage() {
  useEffect(() => {
    document.title = COMPANY_INFO.seo.titleTemplate.replace(
      '%s',
      'Página não encontrada'
    )
    window.scrollTo(0, 0)
  }, [])

  return (
    <PageShell mainContentLabel="Página não encontrada">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-purple-deepest text-4xl font-bold">404</h1>
        <p className="mt-4 text-lg text-gray-600">Página não encontrada.</p>
        <a
          href="/"
          className="text-purple-dark hover:text-purple-medium mt-6 font-medium transition-colors"
        >
          Voltar para a página inicial
        </a>
      </Container>
    </PageShell>
  )
}
