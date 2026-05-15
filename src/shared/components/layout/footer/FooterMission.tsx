import { TargetIcon } from '@shared/components/ui'
import { FOOTER_CONTENT } from '@shared/data/footerContent'

const MissionIllustration = () => (
  <svg
    width="120"
    height="90"
    viewBox="0 0 120 90"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="28"
      cy="22"
      r="11"
      stroke="#b3abf2"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <path
      d="M9 78c0-16 8-25 19-25s19 9 19 25"
      stroke="#b3abf2"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <circle
      cx="92"
      cy="22"
      r="11"
      stroke="#b3abf2"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <path
      d="M73 78c0-16 8-25 19-25s19 9 19 25"
      stroke="#b3abf2"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <path
      d="M60 28c-3-7-12-7-12 1 0 8 12 17 12 17s12-9 12-17c0-8-9-8-12-1z"
      stroke="#5f58f3"
      strokeWidth="1.5"
    />
  </svg>
)

export const FooterMission = () => {
  const highlight = FOOTER_CONTENT.missionHighlight
  const prefix = FOOTER_CONTENT.mission.slice(
    0,
    FOOTER_CONTENT.mission.lastIndexOf(highlight)
  )

  return (
    <div className="bg-purple-deep mt-8 rounded-xl border border-white/10 p-6 lg:p-8">
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="bg-purple-dark animate-glow-pulse flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
          <TargetIcon className="h-8 w-8 text-white" />
        </div>

        <div className="flex-1">
          <p className="text-purple-medium text-xs font-semibold tracking-widest uppercase">
            {FOOTER_CONTENT.missionLabel}
          </p>
          <p className="mt-2 text-base leading-relaxed text-white">
            {prefix}
            <strong className="text-purple-dark font-semibold">
              {highlight}
            </strong>
          </p>
        </div>

        <div className="hidden shrink-0 lg:block">
          <MissionIllustration />
        </div>
      </div>
    </div>
  )
}
