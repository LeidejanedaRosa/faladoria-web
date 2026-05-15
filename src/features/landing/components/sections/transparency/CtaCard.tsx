import { TRANSPARENCY_CONTENT } from '../../../data/transparencyContent'
import { WhatsAppCTA } from '@shared/components/ui/WhatsAppCTA'

export const CtaCard = () => (
  <div className="from-purple-dark to-purple-medium flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br p-6 text-center sm:p-8">
    <h4 className="text-lg font-bold text-white sm:text-xl">
      {TRANSPARENCY_CONTENT.cta.title}
    </h4>
    <p className="text-sm leading-relaxed text-white/80">
      {TRANSPARENCY_CONTENT.cta.description}
    </p>
    <WhatsAppCTA
      variant="secondary"
      className="px-6 py-3 text-sm font-bold transition-transform hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      aria-label="Registrar problema via WhatsApp (abre em nova aba)"
    >
      {TRANSPARENCY_CONTENT.cta.buttonText}
    </WhatsAppCTA>
  </div>
)
