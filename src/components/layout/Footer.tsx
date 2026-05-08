import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Programme', href: '#included' },
  { label: 'Results', href: '#transformations' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Apply', href: '#apply' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0E14] border-t border-white/5">
      <Container>
        <div className="py-16 grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex flex-col leading-none w-fit">
              <span className="font-display text-xl font-semibold text-[#F8F7F4]">GT</span>
              <span className="text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-[#6B7280]">
                Executive Coaching
              </span>
            </a>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">
              Precision coaching for ambitious professionals ready to lead at the highest level.
            </p>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[#6B7280] hover:text-[#4ADE80] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#6B7280] mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#F8F7F4]/70 hover:text-[#4ADE80] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#6B7280] mb-1">
              Ready to elevate?
            </p>
            <p className="text-sm text-[#F8F7F4]/70 leading-relaxed">
              Applications for the next cohort are open. Secure your spot before they fill.
            </p>
            <Button href="#apply" variant="green" size="md" className="w-fit mt-2">
              Apply Now
            </Button>
          </div>
        </div>

        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-[#6B7280]">
            © {new Date().getFullYear()} GT Executive Coaching. All rights reserved.
          </p>
          <p className="text-[11px] text-[#6B7280]">
            Privacy Policy · Terms of Service
          </p>
        </div>
      </Container>
    </footer>
  )
}
