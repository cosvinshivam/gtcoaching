import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const testimonials = [
  {
    quote: "Athlenia build everything around my travel schedule. Lost 14kg in five months without missing a single client dinner.",
    name: 'Ahmad K.',
    role: 'Regional Director, HSBC',
    avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=120&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote: "Nobody had ever built a plan that survived a 14-hour flight to Singapore. Athlenia did. The energy shift was immediate.",
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
  {
    quote: "The best investment I've made in my career. Physical resilience is the foundation of mental performance.",
    name: 'Sarah L.',
    role: 'VP Operations',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop&crop=faces',
  }
]

export default function Testimonials() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="testimonials" dark={false} className="bg-white overflow-hidden">
      <Container>
        <div ref={ref} className="mb-20">
          <span className="text-[11px] font-black tracking-[0.3em] uppercase text-grey mb-8 block">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-black leading-tight tracking-tighter uppercase">
            Trusted by <br />
            <span className="text-grey italic">the elite</span>
          </h2>
        </div>

        {/* Horizontal Scroll with Snap */}
        <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory -mx-6 px-6 sm:-mx-12 sm:px-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="min-w-[320px] md:min-w-[480px] bg-white rounded-[48px] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-black/5 snap-center flex flex-col gap-10"
            >
              <div className="flex gap-1 text-green">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl font-black text-black leading-tight tracking-tighter">
                "{t.quote}"
              </blockquote>

              <div className="mt-auto flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-offwhite ring-1 ring-black/5">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans text-base font-black text-black leading-none">{t.name}</p>
                  <p className="font-sans text-[10px] font-bold text-grey mt-2 tracking-widest uppercase">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Custom scroll indicator */}
        <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden mt-8">
           <motion.div 
             className="h-full bg-black w-1/4 rounded-full"
             animate={{ x: ['0%', '150%', '300%'] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           />
        </div>
      </Container>
    </Section>
  )
}
