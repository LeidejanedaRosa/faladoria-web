import { TRANSPARENCY_CONTENT } from '@components/data/transparencyContent'
import { ChartIcon } from '@components/ui/icons'

export const TransparencyHeader = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <ChartIcon className="h-7 w-7 text-white/80" />
        <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {TRANSPARENCY_CONTENT.headline}
        </h3>
      </div>
      <p className="max-w-xl text-sm text-white/70 sm:text-base">
        {TRANSPARENCY_CONTENT.subtitle.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
    <span
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80"
    >
      <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
      {TRANSPARENCY_CONTENT.liveIndicator}
    </span>
  </div>
)
