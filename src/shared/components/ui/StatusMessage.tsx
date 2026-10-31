const TONES = {
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-amber-300 bg-amber-50 text-amber-900',
} as const

interface StatusMessageProps {
  message: string
  tone?: keyof typeof TONES
}

/**
 * The result of an action ("Varginha/MG foi removida"). Always in the page, empty until there
 * is a message: a live region that appears together with its text is often not announced.
 */
export const StatusMessage = ({
  message,
  tone = 'success',
}: StatusMessageProps) => (
  <p
    role='status'
    className={
      message ? `rounded-lg border p-3 text-base ${TONES[tone]}` : 'sr-only'
    }
  >
    {message}
  </p>
)
