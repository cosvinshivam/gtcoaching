import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function About() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* About Hero - Asymmetrical Split */}
        <section className="relative pt-40 pb-24 overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative rounded-[4rem] overflow-hidden aspect-[4/5] shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=90&auto=format&fit=crop"
                  alt="Coach in environment"
                  className="w-full h-full object-cover grayscale"
                />
              </motion.div>

              <div className="flex flex-col gap-10">
                <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-black">Our Philosophy</span>
                <h1 className="text-5xl md:text-8xl font-medium leading-[1.1] tracking-[-0.03em] text-black uppercase">
                  Beyond <br />
                  <span className="text-[#C4C4C4]">Performance</span>
                </h1>
                <p className="text-xl text-[#565656] leading-relaxed max-w-lg font-sans">
                  Athlenia was founded on the belief that peak physical performance is the non-negotiable foundation for executive excellence. We don't just train bodies; we build the biological resilience required to lead global organizations.
                </p>
                <div className="flex gap-12 pt-10 border-t border-black/10">
                   <div className="flex flex-col gap-2">
                      <span className="text-4xl font-bold text-black">12+</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-grey">Years exp</span>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-4xl font-bold text-black">950+</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-grey">Athletes</span>
                   </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Team Grid */}
        <Section dark={false} className="bg-offwhite">
           <Container>
              <div className="text-center mb-24">
                 <h2 className="text-5xl md:text-7xl font-medium tracking-tight uppercase">The Team</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { name: 'Alex Rivers', role: 'Head Coach', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600' },
                   { name: 'Sarah Chen', role: 'Nutritionist', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600' },
                   { name: 'Marcus Thorne', role: 'Strength Lead', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' }
                 ].map((member) => (
                   <div key={member.name} className="group flex flex-col items-center text-center">
                      <div className="w-full aspect-square rounded-[3rem] overflow-hidden mb-8 shadow-lg">
                         <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-black mb-2">{member.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-grey">{member.role}</p>
                   </div>
                 ))}
              </div>
           </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
