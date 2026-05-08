import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    title: 'Apply',
    description:
      'Complete a short application so we can understand where you are, what you\'re working toward, and whether this programme is the right fit. There is no obligation and no hard sell.',
    cta: null,
  },
  {
    number: '02',
    title: 'Discovery Call',
    description:
      'If your application is shortlisted, you\'ll be invited to a 45-minute discovery conversation. This is a two-way assessment — you\'re evaluating us just as much as we\'re evaluating you.',
    cta: null,
  },
  {
    number: '03',
    title: 'Begin Coaching',
    description:
      'If we\'re aligned on fit, we\'ll design a bespoke engagement that maps to your specific goals, context, and timeline. Most programmes run 6–12 months with bi-weekly sessions.',
    cta: 'Apply Now',
  },
]

export default function Steps() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="steps">
      <Container>
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            The Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#F8F7F4] font-semibold leading-tight text-balance"
          >
            Simple, clear, and built for serious people.
          </motion.h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="bg-[#14181F] border border-white/5 rounded-sm p-8 flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Number watermark */}
              <span
                aria-hidden
                className="absolute -right-3 -top-5 font-display text-8xl font-semibold text-white/[0.03] select-none"
              >
                {step.number}
              </span>

              <div className="w-10 h-10 rounded-sm bg-[#4ADE80]/10 flex items-center justify-center">
                <span className="font-display text-sm font-semibold text-[#4ADE80]">
                  {step.number}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl font-semibold text-[#F8F7F4]">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {step.cta && (
                <div className="mt-auto pt-2">
                  <Button href="#apply" variant="green" size="sm">
                    {step.cta}
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
