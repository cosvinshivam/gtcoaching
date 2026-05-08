import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Problem() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="problem" dark={false}>
      <Container>
        <div
          ref={ref}
          className="grid gap-16 md:gap-24 items-center md:grid-cols-2"
        >
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="bg-green text-black px-4 py-1 rounded-full w-fit mb-8">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase">The Problem</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold text-black leading-tight mb-8">
              You built the company. <br />
              <span className="text-grey italic">You neglected the vehicle.</span>
            </h2>

            <div className="flex flex-col gap-6 font-sans text-base text-grey leading-relaxed max-w-lg">
              <p>
                You manage teams across time zones and close deals at client dinners. You've conquered the boardroom, but the physical toll is undeniable.
              </p>
              <p>
                The problem isn't your discipline. Your career proves you have it in abundance. The problem is that <span className="text-black font-bold">generic plans don't fit high-stakes lives.</span>
              </p>
              <p className="text-black font-medium border-l-4 border-green pl-6 py-2 bg-green/5 rounded-r-xl">
                You need a system that integrates with your stress, your travel, and your real schedule. Not an idealized version of it.
              </p>
            </div>
          </motion.div>

          {/* Image - Rounded & High Impact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=85&auto=format&fit=crop"
              alt="Goran coaching an executive client"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
