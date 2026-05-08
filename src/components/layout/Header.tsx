import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { 
    label: 'Pages', 
    href: '#', 
    hasDropdown: true,
    items: [
      { label: 'Coaching', href: '/coaching' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-500 py-8',
        scrolled ? 'bg-black/40 backdrop-blur-md py-4' : 'bg-transparent'
      )}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <Container>
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="text-4xl font-bold text-white tracking-tighter" aria-label="Athlenia home">
            Athlenia
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10 h-full" role="list">
            {navLinks.map((link) => (
              <li 
                key={link.label} 
                className="relative flex items-center gap-1 group cursor-pointer h-12"
                onMouseEnter={() => link.hasDropdown ? setActiveDropdown(link.label) : setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="text-[14px] font-bold text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <svg 
                    width="10" height="6" viewBox="0 0 10 6" fill="none" 
                    className={cn(
                      "text-white/60 transition-transform duration-300",
                      activeDropdown === link.label && "rotate-180 text-white"
                    )}
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.hasDropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl p-4 shadow-2xl border border-black/5"
                    >
                      <div className="flex flex-col gap-2">
                        {link.items?.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="text-[13px] font-bold text-grey hover:text-black hover:bg-offwhite px-3 py-2 rounded-lg transition-all"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 group h-10 w-10 items-center justify-center"
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-6 bg-white transition-all group-hover:w-8" />
            <span className="block h-0.5 w-8 bg-white" />
            <span className="block h-0.5 w-6 bg-white transition-all group-hover:w-8" />
          </button>
        </nav>
      </Container>
    </header>
  )
}
