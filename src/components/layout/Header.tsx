import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Results', href: '#transformations' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      )}
      style={{ top: 'var(--sticky-bar-height, 44px)' }}
    >
      <Container>
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          {/* Logo - Athlenia Style */}
          <a href="#" className="flex items-center gap-2 group" aria-label="GT Coaching home">
            <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center font-bold text-black group-hover:scale-105 transition-transform">
              GT
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-sans text-sm font-black tracking-tighter text-white uppercase">
                Executive
              </span>
              <span className="font-sans text-[10px] font-bold tracking-widest text-green uppercase">
                Coaching
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-white/60 hover:text-green transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-6">
            <Button href="#apply" size="sm" variant="green" className="hidden md:inline-flex">
              Apply Now
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={cn('block h-0.5 w-5 bg-white transition-all duration-300', mobileOpen && 'translate-y-[4px] rotate-45')} />
              <span className={cn('block h-0.5 w-5 bg-white transition-all duration-300', mobileOpen && 'opacity-0')} />
              <span className={cn('block h-0.5 w-5 bg-white transition-all duration-300', mobileOpen && '-translate-y-[10px] -rotate-45')} />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-black pt-32 px-8 pb-12 md:hidden"
          >
            <ul className="flex flex-col gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-sans text-4xl font-bold text-white hover:text-green transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button
                href="#apply"
                size="lg"
                variant="green"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Apply for Coaching
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
