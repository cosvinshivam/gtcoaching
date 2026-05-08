import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Transformation {
  id: number
  name: string
  role: string
  before: string
  after: string
  bgColor: string
}

const transformations: Transformation[] = [
  { id: 1, name: 'Aditya R.', role: 'VP, Fintech · Mumbai', before: 'Overlooked for MD role 3 years running', after: 'Promoted to Managing Director in 8 months', bgColor: '#14181F' },
  { id: 2, name: 'Priya S.', role: 'Director, FMCG · Delhi', before: 'Paralysed by imposter syndrome at the table', after: 'Leading global strategy with full authority', bgColor: '#0f1419' },
  { id: 3, name: 'Rohit M.', role: 'CTO, SaaS Startup · Bangalore', before: 'Team bottleneck — every decision ran through him', after: 'Built autonomous leadership layer; doubled capacity', bgColor: '#111720' },
  { id: 4, name: 'Sanya K.', role: 'Head of Operations · London', before: 'Burnout, resentment, and no clear path forward', after: 'Designed a role that matched her ambition and life', bgColor: '#0d1118' },
  { id: 5, name: 'Vikram T.', role: 'SVP, Banking · Singapore', before: 'Technically respected but not seen as "leadership material"', after: 'Recognised as C-suite succession candidate', bgColor: '#10151c' },
  { id: 6, name: 'Meera J.', role: 'GM, Consulting · Pune', before: 'Avoided difficult conversations; conflict-averse', after: 'Now navigates board-level tensions with precision', bgColor: '#0c1017' },
]

interface LightboxProps {
  item: Transformation
  onClose: () => void
}

function Lightbox({ item, onClose }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-5"
      role="dialog"
      aria-modal="true"
      aria-label={`Transformation story: ${item.name}`}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#14181F] border border-white/10 rounded-sm max-w-md w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-[#F8F7F4] transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <p className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-5">
          Transformation Story
        </p>
        <h3 className="font-display text-2xl font-semibold text-[#F8F7F4] mb-1">{item.name}</h3>
        <p className="font-sans text-xs text-[#6B7280] mb-7">{item.role}</p>

        <div className="flex flex-col gap-4">
          <div className="bg-[#0A0E14] rounded-sm p-4">
            <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#6B7280] mb-2">Before</p>
            <p className="font-sans text-sm text-[#F8F7F4]/70 leading-relaxed">{item.before}</p>
          </div>
          <div className="bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-sm p-4">
            <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#4ADE80] mb-2">After</p>
            <p className="font-sans text-sm text-[#F8F7F4] leading-relaxed">{item.after}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Transformations() {
  const { ref, inView } = useScrollReveal()
  const [selected, setSelected] = useState<Transformation | null>(null)

  return (
    <Section id="transformations">
      <Container>
        <div ref={ref} className="max-w-2xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#F8F7F4] font-semibold leading-tight text-balance"
          >
            Real people. Real transformations.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-sans text-sm text-[#6B7280] mt-4"
          >
            Click any card to read the full story.
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transformations.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              onClick={() => setSelected(t)}
              className="text-left bg-[#14181F] border border-white/5 rounded-sm p-6 hover:border-[#4ADE80]/30 hover:bg-[#14181F]/80 transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-[#4ADE80]"
              aria-label={`View transformation: ${t.name}`}
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="font-display text-base font-medium text-[#F8F7F4] group-hover:text-[#4ADE80] transition-colors">
                    {t.name}
                  </p>
                  <p className="font-sans text-xs text-[#6B7280] mt-0.5">{t.role}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#4ADE80]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4ADE80]/20 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-sans text-xs text-[#6B7280] line-clamp-2">
                  <span className="text-[#6B7280]/60">Before: </span>{t.before}
                </p>
                <p className="font-sans text-xs text-[#F8F7F4]/80 line-clamp-2">
                  <span className="text-[#4ADE80]">After: </span>{t.after}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
    </Section>
  )
}
