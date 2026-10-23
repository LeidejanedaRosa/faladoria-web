import { TRANSPARENCY_CONTENT } from '../../../data/transparencyContent'

interface TransparencyLoadErrorProps {
  onRetry: () => void
}

export const TransparencyLoadError = ({
  onRetry,
}: TransparencyLoadErrorProps) => (
  <div
    role='alert'
    className='bg-purple-deep flex flex-col items-start gap-3 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between'
  >
    <p className='text-sm text-white/80 sm:text-base'>
      {TRANSPARENCY_CONTENT.loadError}
    </p>
    <button
      type='button'
      onClick={onRetry}
      className='min-h-12 shrink-0 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 motion-reduce:transition-none'
    >
      {TRANSPARENCY_CONTENT.retryButton}
    </button>
  </div>
)
