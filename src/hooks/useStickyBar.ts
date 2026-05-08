import { useState, useEffect } from 'react'

const STORAGE_KEY = 'gt_sticky_bar_dismissed'
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function useStickyBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        setIsVisible(true)
        return
      }
      const dismissedAt = parseInt(raw, 10)
      const now = Date.now()
      if (now - dismissedAt > SEVEN_DAYS_MS) {
        localStorage.removeItem(STORAGE_KEY)
        setIsVisible(true)
      }
    } catch {
      setIsVisible(true)
    }
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
    } catch {
      // ignore
    }
    setIsVisible(false)
  }

  return { isVisible, dismiss }
}
