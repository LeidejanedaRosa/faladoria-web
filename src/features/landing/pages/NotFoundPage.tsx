import { Container, PageShell } from '@shared/components/layout'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useScrollToTop } from '@shared/hooks/useScrollToTop'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  useDocumentMeta({ title: 'Página não encontrada' })
  useScrollToTop()

  return (
    <PageShell mainContentLabel='Página não encontrada'>
      <Container className='flex min-h-[60vh] flex-col items-center justify-center py-20 text-center'>
        <h1 className='text-purple-deepest text-4xl font-bold'>404</h1>
        <p className='mt-4 text-lg text-gray-600'>Página não encontrada.</p>
        <Link
          to='/'
          className='text-purple-dark hover:text-purple-medium mt-6 font-medium transition-colors'
        >
          Voltar para a página inicial
        </Link>
      </Container>
    </PageShell>
  )
}
