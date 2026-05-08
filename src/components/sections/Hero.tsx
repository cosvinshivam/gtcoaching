import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

const avatars = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=faces',
]

export default function Hero() {
  return (
    <section className="relative bg-black pt-5">
      {/* Main Rounded Container - 64px mask */}
      <div className="relative mx-auto max-w-[1480px] min-h-[92vh] rounded-t-[64px] overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=90&auto=format&fit=crop"
            alt="Athlete training"
            className="w-full h-full object-cover grayscale opacity-70"
          />
          {/* Bottom-weighted gradient per audit */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <Container className="relative z-10 h-full flex flex-col justify-end pb-24 pt-48">
          <div className="grid lg:grid-cols-[1fr_420px] gap-20 items-end">
            
            {/* Left Content */}
            <div className="flex flex-col gap-14">
              {/* Trust Badge - Surgical accuracy: 48px avatars, -15px overlap, 2px black border */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="flex">
                  {avatars.map((url, i) => (
                    <div 
                      key={i} 
                      className="w-12 h-12 rounded-full border-2 border-black overflow-hidden shadow-sm first:ml-0 -ml-[15px] relative z-[10]"
                      style={{ zIndex: 30 - i }}
                    >
                      <img src={url} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 font-sans text-[18px] font-bold text-white">
                    <span>Rated 4.9/5</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#CEFF65">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-white/60">from</span>
                  </div>
                  <span className="text-[12px] font-bold text-white/40 tracking-widest uppercase">over 600 reviews</span>
                </div>
              </motion.div>

              {/* Heading - Surgical accuracy: 92px, Weight 500, Leading 1.17, Kerning -0.02em */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[64px] sm:text-[80px] md:text-[92px] font-medium text-white leading-[1.17] tracking-[-0.02em] text-balance"
              >
                Unleash your potential <br />
                with expert sports coaching
              </motion.h1>
            </div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group hidden lg:block"
            >
              <div className="aspect-[4/5] bg-white p-5 rounded-[48px] shadow-2xl relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=90&auto=format&fit=crop"
                  alt="Coach feature"
                  className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Signature Arrow Circle - Surgical accuracy: 64px x 64px, Lime Green */}
                <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-green text-black flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17l10-10M10 7h7v7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Floating Tag */}
              <div className="absolute top-10 left-10 bg-black/80 backdrop-blur-md text-white px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest">
                Elite Performance
              </div>
            </motion.div>

          </div>
        </Container>

      </div>
    </section>
  )
}
