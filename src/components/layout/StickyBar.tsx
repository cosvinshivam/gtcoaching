import { useStickyBar } from '@/hooks/useStickyBar'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function StickyBar() {
  const { isVisible, dismiss } = useStickyBar()

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sticky-bar-height',
      isVisible ? '44px' : '0px'
    )
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-[100] bg-green"
        >
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
            <p className="flex-1 text-center text-[11px] font-sans font-bold tracking-tight text-black">
              <span className="hidden sm:inline">FIND OUT WHY YOUR TRAINING FAILS. </span>
              <a
                href="#resources"
                className="underline hover:no-underline transition-all"
              >
                TAKE THE FOUR-MINUTE BODY AUDIT →
              </a>
            </p>

            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="shrink-0 p-1 rounded text-black/40 hover:text-black transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
