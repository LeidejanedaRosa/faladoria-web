import { FOOTER_CONTENT } from '@components/data/footerContent'

export const FooterBottom = () => (
  <div className="mt-12 border-t border-white/10 pt-8">
    <small className="text-lavender/70 block text-center text-xs leading-relaxed">
      {FOOTER_CONTENT.copyright} {FOOTER_CONTENT.legalNote}
    </small>
  </div>
)
