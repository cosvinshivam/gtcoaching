import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const cards = [
  {
    id: 'audit',
    tag: '4 MINS',
    title: 'The Body Audit',
    description: 'Score yourself across the five pillars of executive performance. Data-driven and brutally honest.',
    cta: 'Start Audit',
    image: 'https://images.unsplash.com/photo-1461088945293-0c17689e48ac?w=800&q=85&auto=format&fit=crop',
  },
  {
    id: 'file',
    tag: '8 PAGES',
    title: 'The Performance File',
    description: 'A deep dive into three real-world transformations. Numbers, schedules, and outcomes.',
    cta: 'Get Access',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=85&auto=format&fit=crop',
  },
]

export default function LeadMagnet() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="resources" className="bg-black">
      <Container>
        <div ref={ref} className="max-w-3xl mb-16 text-center mx-auto">
          <div className="bg-green text-black px-4 py-1 rounded-full w-fit mb-8 mx-auto">
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">Resources</span>
          </div>
          <h2 className="font-display text-4xl md:text-7xl font-bold text-white leading-tight mb-8">
            Upgrade Your <br />
            <span className="text-green italic">Operating System.</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-onyx rounded-[2.5rem] overflow-hidden group border border-white/5 hover:border-green/20 transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx to-transparent opacity-80" />
                <div className="absolute top-6 left-6 bg-green text-black text-[9px] font-black px-3 py-1 rounded-full tracking-widest">
                  {card.tag}
                </div>
              </div>
              <div className="p-10 flex flex-col gap-6">
                <h3 className="font-display text-3xl font-bold text-white leading-none">{card.title}</h3>
                <p className="font-sans text-base text-grey leading-relaxed">{card.description}</p>
                <Button href="#apply" variant="green" size="md" className="w-full">
                  {card.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
