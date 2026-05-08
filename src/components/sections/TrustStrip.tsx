import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

const stats = [
  { value: '98%', label: 'Client retention' },
  { value: '24+', label: 'Years of experience' },
  { value: '600+', label: 'Successful sessions' },
]

export default function TrustStrip() {
  const { ref, inView } = useScrollReveal()

  return (
    <div className="bg-white py-32 overflow-hidden border-t border-black/5" ref={ref}>
      <Container>
        <div className="grid md:grid-cols-3 gap-16 md:gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "flex flex-col items-center text-center px-12",
                i < stats.length - 1 && "md:border-r md:border-black/10"
              )}
            >
              <span className="text-[80px] md:text-[120px] font-black text-black leading-none tracking-tighter mb-4">
                {s.value}
              </span>
              <span className="text-[12px] font-black tracking-[0.3em] uppercase text-grey">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Center-aligned bridge button */}
        <div className="flex justify-center mt-32">
          <a href="#apply" className="group relative flex items-center justify-center w-32 h-32 rounded-full bg-green text-black transition-transform hover:scale-110">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:rotate-45">
              <path d="M7 17l10-10M10 7h7v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute inset-0 rounded-full border border-black/10 animate-ping opacity-20" />
          </a>
        </div>
      </Container>
    </div>
  )
}
