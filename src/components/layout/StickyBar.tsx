import { useStickyBar } from '@/hooks/useStickyBar'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function StickyBar() {
  const { isVisible, dismiss } = useStickyBar()

  // Keep a CSS var in sync so Header knows how far to offset
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sticky-bar-height',
      isVisible ? '36px' : '0px'
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
          className="fixed top-0 left-0 right-0 z-[100] bg-[#4ADE80] text-[#0A0E14]"
        >
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
            <p className="flex-1 text-center text-[11px] font-semibold tracking-widest uppercase">
              🎯 Limited spots for 2025 cohort — Applications close soon.{' '}
              <a
                href="#apply"
                className="underline underline-offset-2 hover:no-underline"
              >
                Apply Now
              </a>
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="shrink-0 p-1 rounded opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
