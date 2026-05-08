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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0E14]"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(74,222,128,0.06) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10 pt-36 pb-24">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-6"
          >
            Executive Coaching · Leadership Development
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-[#F8F7F4] leading-[1.05] tracking-tight text-balance mb-8"
          >
            Stop Performing.{' '}
            <em className="italic text-[#4ADE80] not-italic">Start Leading.</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="font-sans text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-2xl mb-12"
          >
            GT Executive Coaching is a private, high-touch programme for ambitious professionals
            who are ready to close the gap between where they are and where they know they
            should be — in leadership, clarity, and executive presence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="#apply" size="lg" variant="green">
              Apply for Coaching
            </Button>
            <Button href="#included" size="lg" variant="outline">
              Explore the Programme
            </Button>
          </motion.div>

          {/* Social proof micro-stat */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="mt-14 flex flex-wrap items-center gap-6 md:gap-10"
          >
            {[
              { value: '150+', label: 'Leaders Coached' },
              { value: '94%', label: 'Report Promotions Within 12 Mo.' },
              { value: '8+', label: 'Countries' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-display text-3xl font-semibold text-[#F8F7F4]">
                  {stat.value}
                </span>
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#6B7280]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}
