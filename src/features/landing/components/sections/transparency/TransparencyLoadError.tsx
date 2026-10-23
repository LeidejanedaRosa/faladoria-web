import { TRANSPARENCY_CONTENT } from '../../../data/transparencyContent'

interface TransparencyLoadErrorProps {
  onRetry: () => void
  isRetrying?: boolean
}

export const TransparencyLoadError = ({
  onRetry,
  isRetrying = false,
}: TransparencyLoadErrorProps) => (
  <div
    role='alert'
    className='bg-purple-deep flex flex-col items-start gap-3 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between'
  >
    <p className='text-sm text-white/80 sm:text-base'>
      {TRANSPARENCY_CONTENT.loadError}
    </p>
    {/* aria-disabled, not disabled: a disabled button loses focus, which is what retrying must not do. */}
    <button
      type='button'
      onClick={onRetry}
      aria-disabled={isRetrying}
      className='min-h-12 shrink-0 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 aria-disabled:cursor-wait aria-disabled:opacity-70 aria-disabled:hover:bg-transparent motion-reduce:transition-none'
    >
      {isRetrying
        ? TRANSPARENCY_CONTENT.retryingButton
        : TRANSPARENCY_CONTENT.retryButton}
    </button>
  </div>
)
