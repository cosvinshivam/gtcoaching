import { motion } from 'framer-motion'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

const methods = [
  {
    id: '01',
    title: 'Sport-specific skill development',
    body: 'Master the technical aspects of your discipline with expert-led drills and precision-focused protocols.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'Personalized training plans',
    body: 'Data-driven training frameworks designed around your physiology, schedule, and high-performance goals.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1000&q=80&auto=format&fit=crop',
  },
  {
    id: '03',
    title: 'Strength & conditioning',
    body: 'Build a resilient physical foundation with targeted strength work and metabolic optimization.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=80&auto=format&fit=crop',
  },
]

export default function Included() {
  const { ref, inView } = useScrollReveal()
  const [active, setActive] = useState('01')

  return (
    <Section id="methods" dark={false} className="bg-white">
      <Container>
        <div ref={ref} className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Vertical Accordion */}
          <div className="flex flex-col gap-6">
            <div className="mb-8">
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-grey">
                Proven Methods
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActive(m.id)}
                  className={cn(
                    "flex flex-col text-left p-10 rounded-[48px] transition-all duration-500 group",
                    active === m.id 
                      ? "bg-black text-white shadow-2xl scale-[1.02]" 
                      : "bg-[#F4F4F4] text-black hover:bg-black/5"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "text-[12px] font-black tracking-widest",
                      active === m.id ? "text-green" : "text-grey"
                    )}>
                      {m.id}
                    </span >
                    {active === m.id && (
                      <motion.div
                        layoutId="active-mark"
                        className="w-8 h-8 rounded-full bg-green text-black flex items-center justify-center"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 9l8-8M3 1h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter leading-none">
                    {m.title}
                  </h3>
                  <p className={cn(
                    "text-base leading-relaxed transition-opacity duration-500",
                    active === m.id ? "opacity-70" : "opacity-0 h-0 overflow-hidden"
                  )}>
                    {m.body}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Dynamic Image */}
          <div className="relative aspect-square md:aspect-[4/5] rounded-[48px] overflow-hidden bg-black">
            {methods.map((m) => (
              <motion.img
                key={m.id}
                src={m.image}
                alt={m.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: active === m.id ? 0.7 : 0,
                  scale: active === m.id ? 1 : 1.1
                }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-12 left-12 right-12">
               <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Focus discipline</p>
               <h4 className="text-white text-3xl font-black tracking-tighter uppercase leading-none">High-performance <br /> training</h4>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}
