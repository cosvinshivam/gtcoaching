import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Introductory',
    price: '$50',
    features: ['1-on-1 coaching session', 'Personalized training plan', 'Goal setting session'],
    highlight: false,
  },
  {
    name: 'Advanced',
    price: '$120',
    features: ['3 coaching sessions per week', 'Custom nutrition framework', 'Priority support', 'Monthly assessment'],
    highlight: true,
  },
  {
    name: 'Group training',
    price: '$40',
    features: ['Weekly group sessions', 'Sport-specific drills', 'Community access'],
    highlight: false,
  },
]

export default function LeadMagnet() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="pricing" dark={false} className="bg-white">
      <Container>
        <div ref={ref} className="text-center mb-24">
          <span className="text-[11px] font-black tracking-[0.3em] uppercase text-grey mb-8 block">
            Pricing
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-black leading-tight tracking-tighter uppercase">
            Choose your <br />
            <span className="text-grey italic">plan</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                "p-12 rounded-[48px] border transition-all duration-500 relative overflow-hidden",
                plan.highlight 
                  ? "bg-black text-white border-black h-[110%] z-10 shadow-3xl" 
                  : "bg-[#F4F4F4] text-black border-black/5"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-8 right-8 bg-green text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Best Seller
                </div>
              )}

              <h3 className="text-2xl font-black mb-8 tracking-tighter uppercase">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                <span className={cn("text-sm font-bold uppercase", plan.highlight ? "text-green" : "text-grey")}>
                  Per session
                </span>
              </div>

              <div className="w-full h-px bg-current opacity-10 mb-12" />

              <ul className="flex flex-col gap-5 mb-16">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-4 items-start text-sm font-bold">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={plan.highlight ? "text-green" : "text-black"}>
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#apply" className={cn(
                "btn-athlenia w-full justify-center text-base py-5",
                plan.highlight ? "bg-green text-black" : "bg-black text-white"
              )}>
                Get started
                <span className={cn("icon-pill", plan.highlight ? "bg-black text-white" : "bg-green text-black")}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
