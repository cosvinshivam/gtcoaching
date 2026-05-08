import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Footer() {
  return (
    <footer className="bg-black py-24 md:py-32 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center font-bold text-black text-2xl mb-12 shadow-[0_0_40px_rgba(206,255,101,0.2)]">
            GT
          </div>

          <h2 className="font-display text-4xl md:text-8xl font-bold text-white leading-none tracking-tighter mb-12">
            BUILD YOUR <br />
            <span className="text-green italic">LEGACY.</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-20">
            <Button href="#apply" variant="green" size="lg">
              Start Now
            </Button>
            <a 
              href="mailto:contact@gtcoaching.com" 
              className="font-sans text-sm font-bold text-white hover:text-green transition-colors uppercase tracking-[0.2em]"
            >
              Direct Email
            </a>
          </div>

          <div className="w-full h-px bg-white/10 mb-12" />

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-sans font-bold tracking-widest text-grey uppercase">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>

            <div className="flex items-center gap-8 text-[10px] font-sans font-bold tracking-widest text-grey/40 uppercase">
              <span>© {new Date().getFullYear()} GT COACHING</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>

        </div>
      </Container>
    </footer>
  )
}
