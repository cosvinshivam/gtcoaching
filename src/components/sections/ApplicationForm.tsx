import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const inputBase =
  'w-full bg-white border border-black/5 rounded-2xl px-6 py-5 font-sans text-base text-black placeholder:text-grey/40 focus:outline-none focus:border-green focus:ring-4 focus:ring-green/10 transition-all duration-200'

export default function ApplicationForm() {
  const { ref, inView } = useScrollReveal()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Section id="apply" className="bg-offwhite">
      <Container>
        <div ref={ref} className="max-w-[1000px] mx-auto bg-black rounded-[3rem] p-10 md:p-20 overflow-hidden relative shadow-3xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-green/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-20 items-start relative z-10">
            <div>
              <div className="bg-green text-black px-4 py-1 rounded-full w-fit mb-8">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase">The Application</span>
              </div>
              <h2 className="font-display text-4xl md:text-7xl font-bold text-white leading-tight mb-8">
                Start the <br />
                <span className="text-green italic">Selection.</span>
              </h2>
              <p className="font-sans text-lg text-grey leading-relaxed max-w-sm mb-12">
                I personally review every application. If you meet the criteria for performance coaching, you will receive a response within 48 hours.
              </p>
              
              <div className="flex flex-col gap-4 text-white/40 font-sans text-xs uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green" />
                  Limited to 10 active clients
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green" />
                  Global coaching via Zoom/WhatsApp
                </div>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green rounded-3xl p-12 text-center flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-green text-3xl font-bold">
                  ✓
                </div>
                <h3 className="font-display text-3xl font-bold text-black">Application Sent.</h3>
                <p className="font-sans text-base text-black/70">
                  Your strategy is being reviewed. Check your inbox within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="text" placeholder="Full Name" className={inputBase} required />
                  <input type="email" placeholder="Business Email" className={inputBase} required />
                </div>
                <input type="tel" placeholder="WhatsApp Number" className={inputBase} required />
                <textarea 
                  placeholder="Tell me about your current goals and typical week..." 
                  className={cn(inputBase, 'resize-none h-40')} 
                  required
                />
                <Button type="submit" variant="green" size="lg" className="w-full">
                  Submit Application
                </Button>
                <p className="text-center font-sans text-[10px] text-grey/40 uppercase tracking-widest mt-2">
                  Privacy guaranteed. Your data is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
