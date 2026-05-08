import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const forYou = [
  'You lead a business or hold a high-stakes role.',
  'Your life involves frequent travel and high-pressure dinners.',
  'You have tried generic programs that failed to stick.',
  'You want a body that sustains your ambition for decades.',
  'You value expert vision over self-guided guesswork.',
]

export default function WhoFor() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="who-for" className="bg-black">
      <Container>
        <div ref={ref} className="grid gap-16 lg:grid-cols-2 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green text-black px-4 py-1 rounded-full w-fit mb-8">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase">The Alignment</span>
            </div>
            <h2 className="font-display text-4xl md:text-7xl font-bold text-white leading-[1.1] mb-8">
              For those <br />
              <span className="text-green italic">who lead.</span>
            </h2>
            <p className="font-sans text-lg text-grey leading-relaxed max-w-md mb-10">
              Elite coaching isn't just about training. It's about optimizing the human component of your business strategy.
            </p>
            <Button href="#apply" variant="green" size="lg">
              Check Your Eligibility
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-onyx rounded-[2rem] p-10 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle glow in background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green/5 blur-[100px] rounded-full pointer-events-none" />

            <h3 className="font-display text-2xl font-bold text-white mb-10">This is for you if...</h3>
            
            <ul className="flex flex-col gap-6" role="list">
              {forYou.map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                  className="flex gap-4 items-start"
                >
                  <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-green flex items-center justify-center text-black">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-sans text-base text-white/80 leading-snug">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="font-sans text-sm italic text-grey">
                "If you want someone who always agrees with you, hire a friend. If you want real change, hire a strategist."
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
