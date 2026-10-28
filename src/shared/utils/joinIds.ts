/** Joins the ids that exist into an `aria-describedby` value, or `undefined` when there are none. */
export const joinIds = (...ids: (string | false | undefined)[]) =>
  ids.filter(Boolean).join(' ') || undefined
