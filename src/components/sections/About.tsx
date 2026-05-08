import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function About() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="about" dark={false} className="bg-white">
      <Container>
        <div ref={ref} className="grid gap-16 md:gap-24 items-center md:grid-cols-2">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-3xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=85&auto=format&fit=crop&crop=faces"
                alt="Goran - Coach"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-10 left-10">
                <h3 className="font-display text-4xl font-black text-white leading-none">Goran T.</h3>
                <p className="font-sans text-[10px] font-bold text-green mt-2 tracking-[0.3em] uppercase">Head Performance Strategist</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="bg-black text-white px-4 py-1 rounded-full w-fit mb-8">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase">The Architect</span>
            </div>
            <h2 className="font-display text-4xl md:text-7xl font-bold text-black leading-tight mb-8">
              Strategist. <br />
              <span className="text-grey italic">Not just a coach.</span>
            </h2>

            <div className="flex flex-col gap-6 font-sans text-lg text-grey leading-relaxed">
              <p>
                I have spent 15 years optimizing the bodies of high-performing executives. Over 500 transformations across London, Dubai, and Singapore.
              </p>
              <p>
                My approach is clinical. We don't rely on motivation; we rely on <span className="text-black font-bold">systems and data.</span> I build the framework. You execute. 
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {['HSBC', 'Visa', 'PwC', 'McKinsey'].map((brand) => (
                  <div key={brand} className="px-5 py-2 bg-black/5 rounded-full font-sans text-[11px] font-bold text-black/40">
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
