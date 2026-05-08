import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Right-side hero image — Athlenia style */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[50%] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85&auto=format&fit=crop"
          alt="Athlete training in a premium gym"
          className="w-full h-full object-cover object-center opacity-40 grayscale"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent lg:from-black lg:via-black/60"
        />
      </div>

      {/* Subtle lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(206,255,101,0.08) 0%, transparent 50%)',
        }}
      />

      <Container className="relative z-10 pt-36 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow with pill */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 bg-green/10 border border-green/20 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-green">
              Performance Leadership
            </span>
          </motion.div>

          {/* H1 - High Impact */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight text-balance mb-8"
          >
            Don't just lead. <br />
            <span className="text-green italic">Outperform.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="font-sans text-lg md:text-xl text-grey leading-relaxed max-w-xl mb-12"
          >
            Executive body transformation built for the high-stakes world. 
            Proven systems for those who refuse to settle for average.
          </motion.p>

          {/* CTAs - Pill style */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Button href="#apply" size="lg" variant="green">
              Start Your Transformation
            </Button>
            <a
              href="#resources"
              className="group flex items-center gap-3 font-sans text-sm font-bold text-white/70 hover:text-green transition-colors"
            >
              Take the Body Audit 
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-green group-hover:bg-green group-hover:text-black transition-all">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
