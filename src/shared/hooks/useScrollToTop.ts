import { useEffect } from 'react'

export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [])
}
