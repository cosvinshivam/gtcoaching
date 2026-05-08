import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const stats = [
  { value: '500+', label: 'Transformations' },
  { value: '15yr', label: 'Experience' },
  { value: 'Elite', label: 'Coaching' },
]

const logos = ['HSBC', 'Visa', 'PwC', 'McKinsey', 'SAP']

export default function TrustStrip() {
  const { ref, inView } = useScrollReveal()

  return (
    <div className="bg-white py-12 overflow-hidden" ref={ref}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          
          {/* Stats - Athlenia Style */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-12 justify-center lg:justify-start"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-sans text-3xl font-black text-black leading-none">{s.value}</span>
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-grey">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Logo Strip - Pill Style */}
          <div className="flex flex-col lg:items-end gap-6">
            <p className="text-center lg:text-right text-[10px] font-sans font-black tracking-widest uppercase text-grey/40">
              Clients associated with
            </p>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-end gap-3"
            >
              {logos.map((logo, i) => (
                <div
                  key={logo}
                  className="px-6 py-2 bg-black/5 rounded-full font-sans text-[11px] font-bold text-black/40 hover:bg-black hover:text-green transition-all cursor-default"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </Container>
    </div>
  )
}
