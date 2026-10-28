import type { Ref } from 'react'

/** One ref callback that fills several refs: for an element that two owners need to focus. */
export const mergeRefs =
  <T>(...refs: (Ref<T> | undefined)[]) =>
  (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }
  }
