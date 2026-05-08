import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

interface Transformation {
  id: number
  image: string
  caption: string
  title: string
}

const transformations: Transformation[] = [
  { id: 1, title: 'Fat Loss', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop', caption: '18kg lost in 6 months while managing a global portfolio.' },
  { id: 2, title: 'Muscle Mass', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop', caption: '8kg lean muscle gain with 3 sessions per week.' },
  { id: 3, title: 'Metabolism', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80&auto=format&fit=crop', caption: 'Restored metabolic health and consistent energy levels.' },
  { id: 4, title: 'Performance', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80&auto=format&fit=crop', caption: 'Strength benchmarks doubled in 24 weeks.' },
  { id: 5, title: 'Composition', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80&auto=format&fit=crop', caption: '12% body fat reduction despite heavy travel.' },
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-5"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-black rounded-[3rem] overflow-hidden border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-green hover:text-black transition-all"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <div className="bg-green text-black px-4 py-1 rounded-full w-fit mb-8 font-bold text-[10px] tracking-widest uppercase">
              Result Outcome
            </div>
            <h3 className="font-display text-4xl md:text-7xl font-black text-white leading-none tracking-tighter mb-8">{item.title}</h3>
            <p className="font-sans text-xl text-white/60 leading-relaxed italic">
              "{item.caption}"
            </p>
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
    <Section id="transformations" className="bg-black">
      <Container>
        <div ref={ref} className="max-w-4xl mb-20">
          <p className="font-sans text-sm font-bold tracking-[0.3em] uppercase text-green mb-8">Success stories</p>
          <h2 className="font-display text-5xl md:text-[100px] font-black text-white leading-[0.95] tracking-[-0.05em] uppercase mb-12">
            Real bodies. <br />
            <span className="text-white/40">Real Results.</span>
          </h2>
          <p className="font-sans text-xl text-white/60 leading-relaxed max-w-xl">
            Success in the gym is as measurable as success in business. We track, we optimize, and we deliver irrefutable outcomes.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {transformations.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-[3rem] cursor-pointer bg-onyx",
                i === 0 && "sm:col-span-2 sm:aspect-[2/1] lg:col-span-2 lg:aspect-[2/1]"
              )}
              onClick={() => setSelected(t)}
            >
              <img
                src={t.image}
                alt={t.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-green mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.title}
                  </p>
                  <h3 className="font-display text-3xl font-black text-white mb-2 leading-none">{t.caption}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Section>
  )
}
