/**
 * Whether focus needs rescuing after something replaced the control that had it: it is nowhere
 * (body, null) or still on that control. If the person moved on to another control, it is not.
 */
export const isFocusLost = (trigger: Element | null) => {
  const active = document.activeElement
  return active === null || active === document.body || active === trigger
}
