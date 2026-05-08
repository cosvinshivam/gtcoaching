import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const leftColumn = [
  'A senior leader or mid-to-senior professional with 8–20 years of experience',
  'Preparing for a C-suite, VP, or Director-level transition',
  'Technically brilliant, but finding the "soft" side of leadership elusive',
  'Running at capacity and craving strategic leverage — not more to-do lists',
  'Determined to lead with calm authority instead of reactive urgency',
  'Willing to do the deep inner work required for lasting outer change',
]

const rightColumn = [
  'Looking for motivational content, life coaching, or career counselling',
  'Seeking a quick fix, shortcut, or surface-level behaviour change',
  'Not ready to invest seriously in your own development',
  'Looking for someone to validate your excuses rather than expand your thinking',
  'Unwilling to be challenged, questioned, or held to a higher standard',
]

export default function WhoFor() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="who-for" dark={false}>
      <Container>
        <div ref={ref} className="max-w-2xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            Who This Is For
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#0A0E14] font-semibold leading-tight text-balance"
          >
            This programme is built for a very specific type of person.
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* This IS for */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="bg-[#0A0E14] rounded-sm p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
              <p className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-[#4ADE80]">
                This is for you if...
              </p>
            </div>
            <ul className="flex flex-col gap-4" role="list">
              {leftColumn.map((item) => (
                <li key={item} className="flex gap-3">
                  <svg className="shrink-0 mt-0.5 text-[#4ADE80]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-sans text-sm text-[#F8F7F4]/80 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* This is NOT for */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="bg-[#F8F7F4] border border-[#0A0E14]/10 rounded-sm p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-2 h-2 rounded-full bg-[#6B7280]" />
              <p className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-[#6B7280]">
                This is NOT for you if...
              </p>
            </div>
            <ul className="flex flex-col gap-4" role="list">
              {rightColumn.map((item) => (
                <li key={item} className="flex gap-3">
                  <svg className="shrink-0 mt-0.5 text-[#6B7280]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="font-sans text-sm text-[#14181F]/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[#0A0E14]/10">
              <Button href="#apply" variant="dark" size="md">
                See If You Qualify
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
