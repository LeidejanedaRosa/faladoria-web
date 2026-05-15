import { ShieldIcon } from '@shared/components/ui'
import { FOOTER_CONTENT } from '@shared/data/footerContent'

export const FooterBottom = () => (
  <div className="mt-12 border-t border-white/10 pt-8">
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2">
        <ShieldIcon className="text-lavender/70 h-4 w-4" />
        <small className="text-lavender/70 text-xs">
          {FOOTER_CONTENT.copyright}
        </small>
      </div>
      <small className="text-lavender/70 text-xs">
        {FOOTER_CONTENT.legalNote}
      </small>
    </div>
  </div>
)
