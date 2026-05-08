import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Results', href: '#transformations' },
  { label: 'Programme', href: '#included' },
  { label: 'Testimonials', href: '#testimonials' },
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
          ? 'bg-[#0A0E14]/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      )}
      style={{ top: 'var(--sticky-bar-height, 36px)' }}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none group" aria-label="GT Executive Coaching home">
            <span className="font-display text-lg font-semibold text-[#F8F7F4] tracking-tight group-hover:text-[#4ADE80] transition-colors">
              GT
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-[#6B7280]">
              Executive Coaching
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[11px] font-sans font-medium tracking-widest uppercase text-[#6B7280] hover:text-[#F8F7F4] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Button href="#apply" size="sm" variant="green" className="hidden md:inline-flex">
              Apply Now
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={cn('block h-px w-6 bg-[#F8F7F4] transition-all duration-300', mobileOpen && 'translate-y-[5px] rotate-45')} />
              <span className={cn('block h-px w-6 bg-[#F8F7F4] transition-all duration-300', mobileOpen && 'opacity-0')} />
              <span className={cn('block h-px w-6 bg-[#F8F7F4] transition-all duration-300', mobileOpen && '-translate-y-[9px] -rotate-45')} />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#0A0E14] pt-24 px-8 pb-12 md:hidden"
          >
            <ul className="flex flex-col gap-6" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-display text-3xl text-[#F8F7F4] hover:text-[#4ADE80] transition-colors"
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
                Apply Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
