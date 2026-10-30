/**
 * The result of an action ("Varginha/MG foi removida"). Always in the page, empty until there
 * is a message: a live region that appears together with its text is often not announced.
 */
export const StatusMessage = ({ message }: { message: string }) => (
  <p
    role='status'
    className={
      message
        ? 'rounded-lg border border-green-200 bg-green-50 p-3 text-base text-green-900'
        : 'sr-only'
    }
  >
    {message}
  </p>
)
