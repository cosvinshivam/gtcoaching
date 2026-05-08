import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const features = [
  {
    id: '01',
    title: 'Performance Coaching',
    description: 'Master the technical aspects of your discipline with expert-led drills and precision-focused protocols.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: '02',
    title: 'Precision Nutrition',
    description: 'Data-driven training frameworks designed around your physiology, schedule, and high-performance goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )
  },
  {
    id: '03',
    title: 'Tactical Recovery',
    description: 'Elite recovery protocols to ensure you stay in the game longer and perform at your peak every day.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
]

export default function Steps() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="features" dark={false} className="bg-white py-0 pb-32">
      <Container>
        <div ref={ref} className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-12 rounded-[3rem] border border-black/5 hover:border-black/10 transition-all group flex flex-col items-start shadow-sm"
            >
              <div className="w-24 h-24 rounded-[1.5rem] bg-green text-black flex items-center justify-center mb-10 group-hover:scale-105 transition-transform">
                <div className="w-10 h-10">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tighter leading-tight">
                {f.title}
              </h3>
              <p className="text-grey leading-relaxed mb-10">
                {f.description}
              </p>
              
              <a href="#apply" className="mt-auto flex items-center gap-3 font-black text-[11px] uppercase tracking-widest text-black group-hover:text-green transition-colors">
                Explore service
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-green group-hover:border-green group-hover:text-black transition-all">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
