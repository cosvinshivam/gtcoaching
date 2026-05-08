import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const serviceCards = [
  {
    title: 'Expert coaching guidance',
    desc: 'Our expert coaches provide personalized support, ensuring every athlete grows stronger daily.',
  },
  {
    title: 'Customized training plans',
    desc: 'Training programs designed to fit personal goals, helping athletes achieve consistent success.',
  },
  {
    title: 'Build confidence & strength',
    desc: 'Focused coaching develops confidence and strength, preparing athletes for higher performance levels.',
  },
  {
    title: 'Progress tracking & support',
    desc: 'Regular assessments track progress clearly, with coaching support to guide steady improvement.',
  },
  {
    title: 'Flexible coaching options',
    desc: 'Choose from various training formats, offering flexibility while maintaining strong coaching support.',
  },
  {
    title: 'Proven success strategies',
    desc: 'Coaching methods backed by proven results ensure reliable growth and measurable performance gains.',
  },
]

export default function Coaching() {
  return (
    <>
      <Header />
      <main className="bg-white">
        
        {/* 1. Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden bg-black pt-20">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=90" 
               className="w-full h-full object-cover opacity-60 grayscale"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>

          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-green mb-8 block">OUR COACHING</span>
              <h1 className="text-6xl md:text-[120px] font-medium leading-[1.0] tracking-[-0.04em] text-white uppercase">
                Our coaching
              </h1>
            </motion.div>
          </Container>
        </section>

        {/* 2. Experience & Step into Strength */}
        <section className="py-32 border-b border-black/5">
          <Container>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <div className="flex items-center gap-10">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-black flex items-center justify-center">
                       <span className="text-8xl font-black text-white">24</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-green rounded-full flex items-center justify-center text-black">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                       </svg>
                    </div>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Years of experience</h3>
                     <p className="text-grey text-sm leading-relaxed max-w-[240px]">
                        With over two decades of trusted coaching, we provide expert guidance and proven strategies to help athletes grow stronger.
                     </p>
                  </div>
               </div>

               <div className="lg:pl-24 lg:border-l border-black/10">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-grey mb-6 block">TRANSFORM YOUR LIFE</span>
                  <h2 className="text-5xl md:text-6xl font-medium tracking-tighter uppercase leading-[1.1]">
                    Step into strength <br /> with expert coaching.
                  </h2>
               </div>
            </div>
          </Container>
        </section>

        {/* 3. Triple Metric Strip */}
        <div className="bg-white border-b border-black/5 py-24">
           <Container>
              <div className="grid md:grid-cols-3 gap-16">
                 <div className="flex gap-6 items-start">
                    <span className="text-sm font-bold">01</span>
                    <p className="text-lg font-bold leading-tight">Join a community of <span className="text-black">950+</span> satisfied athletes.</p>
                 </div>
                 <div className="flex gap-6 items-start">
                    <span className="text-sm font-bold">02</span>
                    <p className="text-lg font-bold leading-tight"><span className="text-black">60%</span> of our coaching is now delivered fully online.</p>
                 </div>
                 <div className="flex gap-6 items-start">
                    <span className="text-sm font-bold">03</span>
                    <p className="text-lg font-bold leading-tight">Over <span className="text-black">200</span> success stories of real transformations.</p>
                 </div>
              </div>
           </Container>
        </div>

        {/* 4. Professional Coaching Feature Section */}
        <section className="py-32">
           <Container>
              <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
                 <div className="flex flex-col items-start gap-10">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase leading-[1.05]">
                       Transform your game with professional coaching services.
                    </h2>
                    <p className="text-xl text-grey leading-relaxed max-w-lg">
                       Our coaching services are designed to help athletes build skills, strengthen discipline, and develop confidence while improving performance through expert training programs created to deliver lasting success and growth.
                    </p>
                    <Button variant="athlenia" size="lg">Join now</Button>
                 </div>
                 <div className="relative aspect-square rounded-[4rem] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1444491741275-3747c53c99b4?w=1000&q=90" 
                      className="w-full h-full object-cover grayscale"
                    />
                 </div>
              </div>
           </Container>
        </section>

        {/* 5. Service Grid (6 Cards) */}
        <section className="py-32 bg-offwhite">
           <Container>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {serviceCards.map((card, i) => (
                   <div key={i} className="bg-white p-12 rounded-[3rem] border border-black/5 hover:border-black/10 transition-all flex flex-col items-start group">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-green flex items-center justify-center text-black mb-10 group-hover:scale-105 transition-transform">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                         </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-6 tracking-tighter uppercase">{card.title}</h3>
                      <p className="text-grey text-sm leading-relaxed mb-10">{card.desc}</p>
                      <a href="#" className="mt-auto font-bold text-[10px] uppercase tracking-widest hover:text-green transition-colors">
                         View more →
                      </a>
                   </div>
                 ))}
              </div>
           </Container>
        </section>

        {/* 6. Bottom Branding Section */}
        <section className="py-32 border-t border-black/5">
           <Container>
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
                 <div className="flex items-center gap-4 bg-green/10 px-4 py-2 rounded-full border border-green/20">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">TRUST</span>
                 </div>
                 <p className="text-sm font-bold uppercase tracking-tight text-center md:text-right max-w-sm">
                    Join 850+ companies elevating success with our coaching services.
                 </p>
              </div>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                 {['Guidance', 'Mentorship', 'Coaching'].map(link => (
                   <a key={link} href="#" className="text-4xl md:text-7xl font-medium uppercase tracking-tighter hover:text-green transition-all">{link}</a>
                 ))}
              </div>
           </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
