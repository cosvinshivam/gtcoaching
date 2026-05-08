import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const problems = [
  {
    number: '01',
    heading: 'You\'re the most capable person in the room — and everyone knows it but you.',
    body: 'Despite consistent results, you second-guess your decisions, soften your opinions, and hold back from claiming the authority you\'ve already earned.',
  },
  {
    number: '02',
    heading: 'You\'ve been promoted, but the leadership manual didn\'t come with it.',
    body: 'The skills that got you here — execution, technical excellence, individual output — are not the skills that will take you to the next level. Nobody told you that.',
  },
  {
    number: '03',
    heading: 'You\'re working harder than ever, but progress feels like a treadmill.',
    body: 'More hours. More effort. More responsibility. But not more leverage, not more influence, and not more freedom. You\'re busy, not powerful.',
  },
  {
    number: '04',
    heading: 'You feel isolated at the top — no safe space to think, doubt, or strategise.',
    body: 'The higher you climb, the fewer people you can be honest with. Peers are competitors. Direct reports need confidence from you. You carry it all — alone.',
  },
]

export default function Problem() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="problem">
      <Container>
        <div ref={ref} className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            The Real Problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#F8F7F4] font-semibold leading-tight text-balance"
          >
            High performance is hiding a deeper gap.
          </motion.h2>
        </div>

        <div className="grid gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden md:grid-cols-2">
          {problems.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-[#0A0E14] p-8 md:p-10 flex flex-col gap-4"
            >
              <span className="font-display text-4xl font-semibold text-[#4ADE80]/20">
                {p.number}
              </span>
              <h3 className="font-display text-xl text-[#F8F7F4] font-medium leading-snug">
                {p.heading}
              </h3>
              <p className="font-sans text-sm text-[#6B7280] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
