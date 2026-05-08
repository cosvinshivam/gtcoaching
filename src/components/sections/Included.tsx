import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Pillar {
  number: string
  title: string
  body: string
  image: string
}

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'The Audit',
    body: 'A surgical analysis of your training, nutrition, sleep, and metabolic markers. We map the gaps in your current high-performance life.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
  },
  {
    number: '02',
    title: 'Precision Systems',
    body: 'Nutrition and training protocols designed to survive 14-hour flights and back-to-back board meetings. Zero guesswork.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80&auto=format&fit=crop',
  },
  {
    number: '03',
    title: 'Direct Elite Access',
    body: 'One-on-one strategic coaching via WhatsApp. No chatbots. No junior coaches. Just data-driven performance management.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80&auto=format&fit=crop',
  },
]

export default function Included() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="included" dark={false}>
      <Container>
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 rounded-full mb-6"
          >
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">The Pillars</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-black font-bold leading-tight"
          >
            The blueprint for <br />
            <span className="text-green bg-black px-4 py-1 rounded-xl inline-block mt-2">Executive Power.</span>
          </motion.h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group bg-white rounded-2xl p-8 border border-black/5 hover:border-green/30 transition-all duration-300 shadow-sm"
            >
              <div className="relative h-48 mb-8 overflow-hidden rounded-xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  PILLAR {p.number}
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-black mb-4">{p.title}</h3>
              <p className="font-sans text-sm text-grey leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
