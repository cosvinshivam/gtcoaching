import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const cards = [
  {
    label: 'Free Guide',
    title: 'The Executive Presence Blueprint',
    description:
      'A 12-page guide on the exact frameworks used with senior leaders to develop commanding presence, authority, and influence — without changing who you are.',
    cta: 'Download Free Guide',
    ctaHref: '#apply',
    variant: 'green' as const,
    tag: 'Free Resource',
  },
  {
    label: 'Podcast',
    title: 'The GT Leadership Podcast',
    description:
      'Weekly conversations with senior executives, coaches, and leadership researchers on what actually moves the needle at the top. No fluff. No motivation theatre.',
    cta: 'Listen Now',
    ctaHref: 'https://youtube.com',
    variant: 'outline' as const,
    tag: 'New Episodes Weekly',
  },
]

export default function LeadMagnet() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="resources">
      <Container>
        <div ref={ref} className="max-w-xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            Free Resources
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#F8F7F4] font-semibold leading-tight text-balance"
          >
            Start before you apply.
          </motion.h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="bg-[#14181F] border border-white/5 rounded-sm p-8 md:p-10 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-[#6B7280]">
                  {card.label}
                </span>
                <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#4ADE80] bg-[#4ADE80]/10 px-3 py-1 rounded-full">
                  {card.tag}
                </span>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-display text-2xl font-semibold text-[#F8F7F4] leading-snug">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-[#6B7280] leading-relaxed">{card.description}</p>
              </div>

              <Button href={card.ctaHref} variant={card.variant} size="md" className="w-fit">
                {card.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
