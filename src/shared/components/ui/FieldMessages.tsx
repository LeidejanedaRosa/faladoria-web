interface FieldMessagesProps {
  hintId?: string
  hint?: string
  errorId?: string
  error?: string
}

/** The hint and the error under a form field, with the ids its aria-describedby points to. */
export const FieldMessages = ({
  hintId,
  hint,
  errorId,
  error,
}: FieldMessagesProps) => (
  <>
    {hint && (
      <p id={hintId} className='text-sm text-slate-600'>
        {hint}
      </p>
    )}
    {error && (
      <p id={errorId} className='text-sm font-medium text-red-700'>
        {error}
      </p>
    )}
  </>
)
