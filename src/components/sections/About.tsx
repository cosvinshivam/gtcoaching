import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const credentials = [
  'ICF-Accredited Executive Coach',
  'Former Senior Leader, 18+ Years',
  'Worked with 150+ Executives Across 8 Countries',
  'Specialisation: Leadership Identity & Presence',
  'Trusted by Leaders at Tier-1 Global Firms',
]

export default function About() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="about" dark={false}>
      <Container>
        <div
          ref={ref}
          className="grid gap-16 items-center md:grid-cols-2"
        >
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-[#0A0E14] rounded-sm overflow-hidden flex items-end">
              {/* Subtle background pattern */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 40%, rgba(74,222,128,0.05) 0%, transparent 60%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-10">
                  <div className="w-20 h-20 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-2xl font-semibold text-[#4ADE80]">GT</span>
                  </div>
                  <p className="font-display text-xl italic text-[#F8F7F4]/30 mt-4">
                    "Precision over performance."
                  </p>
                </div>
              </div>
              {/* Caption strip */}
              <div className="relative z-10 w-full bg-[#14181F]/80 backdrop-blur-sm p-5 border-t border-white/5">
                <p className="font-display text-lg font-semibold text-[#F8F7F4]">GT</p>
                <p className="font-sans text-xs text-[#6B7280] mt-0.5">Executive Coach · Leadership Specialist</p>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-[#4ADE80] text-[#0A0E14] rounded-sm p-5 shadow-xl">
              <p className="font-display text-3xl font-semibold">8+</p>
              <p className="font-sans text-[10px] font-semibold tracking-wider uppercase mt-0.5">
                Years Coaching
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80]">
              About the Coach
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#0A0E14] leading-tight text-balance">
              Built from the inside — not the textbook.
            </h2>
            <div className="flex flex-col gap-4 text-sm text-[#14181F]/70 leading-relaxed font-sans">
              <p>
                GT is an ICF-accredited executive coach who has spent nearly two decades at
                the intersection of high performance, leadership development, and human
                transformation. Before coaching, GT led teams and P&Ls across multiple industries —
                which means the work is grounded in the reality of organisational life, not theory.
              </p>
              <p>
                The GT Executive Coaching methodology was built over years of working with
                senior leaders who were performing at the highest external level while struggling
                internally with identity, authority, and direction. It combines executive coaching,
                somatic awareness, and strategic thinking frameworks to produce results that are
                measurable, lasting, and deeply personal.
              </p>
              <p>
                This is not a service. It is a partnership — and it begins only when the fit
                is right on both sides.
              </p>
            </div>

            {/* Credentials */}
            <ul className="flex flex-col gap-3 my-2" role="list">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shrink-0" />
                  <span className="font-sans text-sm text-[#14181F]/80">{c}</span>
                </li>
              ))}
            </ul>

            <Button href="#apply" variant="dark" size="md" className="w-fit">
              Apply to Work with GT
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
