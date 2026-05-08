import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const testimonials = [
  {
    quote: "Goran built everything around my travel schedule. Lost 14kg in five months without missing a single client dinner.",
    name: 'Ahmad K.',
    role: 'Regional Director, HSBC',
    avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=120&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote: "Nobody had ever built a plan that survived a 14-hour flight to Singapore. Goran did. The energy shift was immediate.",
    name: 'Vimal S.',
    role: 'Managing Director, PwC',
    avatar: 'https://images.unsplash.com/photo-1609899464726-209c355947e0?w=120&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote: "Six months. 22 kilos. Still running the company. Still having the dinners. The system just doesn't break.",
    name: 'Naser A.',
    role: 'CEO, Fintech',
    avatar: 'https://images.unsplash.com/photo-1571732154690-f6d1c6a7a3f6?w=120&q=80&auto=format&fit=crop&crop=faces',
  },
]

export default function Testimonials() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="testimonials" dark={false} className="bg-offwhite">
      <Container>
        <div ref={ref} className="max-w-3xl mb-16">
          <div className="bg-black text-white px-4 py-1 rounded-full w-fit mb-8">
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">The Network</span>
          </div>
          <h2 className="font-display text-4xl md:text-7xl font-bold text-black leading-tight mb-8">
            Trusted by the <br />
            <span className="text-grey italic underline decoration-black/10 underline-offset-8">Elite.</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-black/5 flex flex-col gap-8 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-black/5 ring-offset-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-sans text-base font-black text-black leading-none">{t.name}</p>
                  <p className="font-sans text-[10px] font-bold text-grey mt-1 tracking-widest uppercase">{t.role}</p>
                </div>
              </div>

              <blockquote className="font-sans text-lg text-black/80 leading-relaxed italic">
                "{t.quote}"
              </blockquote>

              <div className="mt-auto flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green fill-green">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
