import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    title: 'The Intake',
    description: 'A deep-dive audit of your physiology and schedule. We identify the exact barriers to your performance.',
  },
  {
    number: '02',
    title: 'System Design',
    description: 'We build your custom nutrition and training framework. It is designed to survive your real life, not a laboratory.',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Direct accountability and strategic adjustments. We hold the line until the results are irrefutable.',
  },
]

export default function Steps() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="steps" className="bg-black">
      <Container>
        <div ref={ref} className="max-w-3xl mb-20">
          <div className="bg-green text-black px-4 py-1 rounded-full w-fit mb-8">
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">The Process</span>
          </div>
          <h2 className="font-display text-4xl md:text-7xl font-bold text-white leading-tight mb-8">
            Precision <br />
            <span className="text-green italic">Implementation.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-onyx rounded-[2rem] p-10 border border-white/5 hover:border-green/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-green text-black flex items-center justify-center font-bold text-lg mb-8 group-hover:scale-110 transition-transform">
                {step.number}
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="font-sans text-base text-grey leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <Button href="#apply" variant="green" size="lg">
            Start the Process
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
