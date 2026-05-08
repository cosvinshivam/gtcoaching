import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ApplicationFormProps {
  isPage?: boolean
}

export default function ApplicationForm({ isPage = false }: ApplicationFormProps) {
  const { ref, inView } = useScrollReveal()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClasses = 
    "w-full bg-transparent border-b border-black py-8 font-sans text-xl font-bold text-black placeholder:text-black/20 focus:outline-none focus:border-[#3898EC] transition-all duration-300"

  const formContent = (
    <div ref={ref} className={cn("grid gap-24 items-start", !isPage && "lg:grid-cols-2")}>
      
      <div>
        <span className="text-[11px] font-black tracking-[0.3em] uppercase text-grey mb-8 block">
          Contact
        </span>
        <h2 className="text-5xl md:text-8xl font-black text-black leading-tight tracking-tighter uppercase mb-12">
          Start your <br />
          <span className="text-grey italic">journey</span>
        </h2>
        <p className="font-sans text-xl text-grey leading-relaxed max-w-md">
          Fill out the form below and our team will get back to you within 24 hours to schedule your strategy session.
        </p>
      </div>

      <div className="relative">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black text-white rounded-[48px] p-20 text-center flex flex-col items-center gap-8 shadow-3xl"
          >
            <div className="w-24 h-24 rounded-full bg-green text-black flex items-center justify-center text-4xl font-bold">
              ✓
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter">Application Received</h3>
            <p className="text-white/60 text-lg">We'll contact you shortly to begin your performance audit.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="grid md:grid-cols-2 gap-x-12">
              <input type="text" placeholder="Your name" className={inputClasses} required />
              <input type="email" placeholder="Email address" className={inputClasses} required />
            </div>
            <input type="tel" placeholder="Phone number" className={inputClasses} required />
            <textarea 
              placeholder="How can we help you?" 
              className={`${inputClasses} resize-none h-48`} 
              required
            />
            
            <div className="mt-16">
              <Button type="submit" variant="athlenia" size="lg" className="w-full justify-center">
                Send message
              </Button>
            </div>
            
            <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-grey/40">
              By submitting you agree to our privacy policy.
            </p>
          </form>
        )}
      </div>
    </div>
  )

  if (isPage) return formContent

  return (
    <Section id="apply" dark={false} className="bg-offwhite overflow-visible">
      <Container>
        {formContent}
      </Container>
    </Section>
  )
}
