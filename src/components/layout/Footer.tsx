import Container from '@/components/ui/Container'

export default function Footer() {
  return (
    <footer className="bg-black py-32 overflow-hidden relative border-t border-white/5">
      <Container>
        <div className="grid gap-20 lg:grid-cols-2 items-start mb-32">
          <div>
            <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center font-black text-black text-2xl mb-12">
              GT
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-12">
              Unleash your <br />
              <span className="text-white/20">Potential</span>
            </h2>
            <a href="#apply" className="btn-athlenia px-10 py-5">
              Start your training
              <span className="icon-pill">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Quick links</span>
              <ul className="flex flex-col gap-4 text-sm font-bold text-white/60">
                <li><a href="#" className="hover:text-green">Home</a></li>
                <li><a href="#methods" className="hover:text-green">Coaching</a></li>
                <li><a href="#pricing" className="hover:text-green">Pricing</a></li>
                <li><a href="#apply" className="hover:text-green">Get started</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Utility</span>
              <ul className="flex flex-col gap-4 text-sm font-bold text-white/60">
                <li><a href="#" className="hover:text-green">Privacy</a></li>
                <li><a href="#" className="hover:text-green">Terms</a></li>
                <li><a href="#" className="hover:text-green">Cookies</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Follow</span>
              <ul className="flex flex-col gap-4 text-sm font-bold text-white/60">
                <li><a href="#" className="hover:text-green">Instagram</a></li>
                <li><a href="#" className="hover:text-green">LinkedIn</a></li>
                <li><a href="#" className="hover:text-green">Twitter</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Location</span>
              <p className="text-sm font-bold text-white/60 leading-relaxed">
                Dubai, UAE <br />
                Performance Center
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            © {new Date().getFullYear()} GT Coaching. All rights reserved.
          </p>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-green hover:text-green transition-all cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.013-4.85-.07c-1.17-.054-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.013-3.584.07-4.85c.054-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.15.26-2.914.557-.79.307-1.459.718-2.126 1.384-.666.667-1.077 1.335-1.384 2.126-.297.764-.501 1.637-.558 2.914-.058 1.28-.072 1.688-.072 4.947s.014 3.668.072 4.947c.057 1.277.26 2.15.558 2.914.307.79.718 1.459 1.384 2.126.667.666 1.336 1.077 2.126 1.384.764.297 1.637.501 2.914.558 1.28.058 1.688.072 4.947.072s3.668-.014 4.947-.072c1.277-.057 2.15-.26 2.914-.558.79-.307 1.459-.718 2.126-1.384.666-.667 1.077-1.335 1.384-2.126.297-.764.501-1.637.558-2.914.058-1.28.072-1.688.072-4.947s-.014-3.668-.072-4.947c-.057-1.277-.26-2.15-.558-2.914-.307-.79-.718-1.459-1.384-2.126-.667-.666-1.336-1.077-2.126-1.384-.764-.297-1.637-.501-2.914-.558-1.28-.058-1.688-.072-4.947-.072z"/>
                   <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
             </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
