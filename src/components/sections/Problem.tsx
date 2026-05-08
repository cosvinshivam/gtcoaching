import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Problem() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="about" dark={false} className="bg-white overflow-hidden py-32">
      <Container>
        <div ref={ref} className="grid lg:grid-cols-[400px_1fr] gap-24 items-start">
          
          {/* Left Column: Icons & Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex flex-col gap-20"
          >
            <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-black">
              Our Coaching
            </span>

            {/* Decorative Icons with refined placement */}
            <div className="relative h-[300px]">
              <div className="absolute top-0 right-20 w-3 h-3 bg-black rounded-full" />
              <div className="absolute top-28 right-5 w-8 h-8 bg-black rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 text-black">
                <svg viewBox="0 0 100 100" fill="currentColor">
                   {/* Massive 8-pointed star/asterisk per screenshot */}
                   <path d="M50 0L53.5 46.5L100 50L53.5 53.5L50 100L46.5 53.5L0 50L46.5 46.5L50 0Z" />
                   <path d="M14.6 14.6L85.4 85.4" stroke="currentColor" strokeWidth="8"/>
                   <path d="M85.4 14.6L14.6 85.4" stroke="currentColor" strokeWidth="8"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Text Gradient/Opacity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className="text-[42px] md:text-[68px] font-medium leading-[1.1] tracking-[-0.03em] text-black text-balance">
              Unlock your full athletic potential with expert <span className="inline-block bg-black text-white px-8 py-1 rounded-full font-bold">coaching</span> 
              <span className="text-[#C4C4C4] transition-all duration-1000"> tailored to your goals. Whether you're just starting or going pro, we're here to guide every step of your fitness journey.</span>
            </h2>

            {/* CTA Row - Divider + Arrow Button */}
            <div className="mt-28 pt-12 border-t border-black/10 flex items-center justify-between group">
              <span className="font-bold text-black text-base uppercase tracking-widest">
                Claim your free assessment
              </span>
              <a 
                href="#apply" 
                className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 group-hover:bg-green group-hover:text-black shadow-lg"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17l10-10M10 7h7v7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
