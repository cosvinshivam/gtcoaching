import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const logos = [
  'Tata Group',
  'McKinsey & Co.',
  'Goldman Sachs',
  'Infosys',
  'Deloitte',
  'Amazon',
  'HSBC',
  'Accenture',
]

export default function TrustStrip() {
  const { ref, inView } = useScrollReveal()

  return (
    <div className="bg-[#14181F] border-y border-white/5 py-6 overflow-hidden" ref={ref}>
      <Container>
        <p className="text-center text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-[#6B7280] mb-6">
          Professionals from world-class organisations
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-3"
        >
          {logos.map((logo, i) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="font-sans text-sm font-medium text-[#6B7280] hover:text-[#F8F7F4] transition-colors cursor-default"
            >
              {logo}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </div>
  )
}
