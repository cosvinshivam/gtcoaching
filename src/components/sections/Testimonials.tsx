import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const testimonials = [
  {
    quote:
      'I\'d been stuck at VP level for four years, convinced I just wasn\'t "C-suite material." GT coaching dismantled that story in the first three sessions. I moved into a Chief Officer role within nine months.',
    name: 'Karthik N.',
    role: 'Chief Revenue Officer · B2B SaaS',
    initials: 'KN',
  },
  {
    quote:
      'The work wasn\'t just strategic — it was deeply personal. I finally understood why I was the bottleneck in my own career. Six months later, I lead differently, think differently, and feel different walking into any room.',
    name: 'Ananya P.',
    role: 'Director of Product · Global Tech Co.',
    initials: 'AP',
  },
  {
    quote:
      'What separates this from every other coaching programme I\'ve tried is the precision. There was no fluff. Every session went straight to the root. I left with clarity, not just confidence.',
    name: 'Suresh B.',
    role: 'General Manager · Manufacturing Conglomerate',
    initials: 'SB',
  },
  {
    quote:
      'I was burning out, performing at a high level externally, while internally running on empty. The coaching gave me a completely new relationship with how I work, lead, and protect my energy.',
    name: 'Divya R.',
    role: 'SVP Operations · Financial Services',
    initials: 'DR',
  },
  {
    quote:
      'My communication style was sabotaging my authority. I knew what I thought, but couldn\'t command a room. Six weeks in, the feedback from my board changed entirely.',
    name: 'Nikhil V.',
    role: 'Founder & CEO · Series B Startup',
    initials: 'NV',
  },
  {
    quote:
      'I arrived sceptical. I\'ve since referred three colleagues from my organisation. The ROI — in terms of promotions, decisions, and relationships — has been extraordinary.',
    name: 'Preethi M.',
    role: 'Head of Strategy · Tier-1 Consulting Firm',
    initials: 'PM',
  },
]

export default function Testimonials() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="testimonials" dark={false}>
      <Container>
        <div ref={ref} className="max-w-2xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            What Clients Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#0A0E14] font-semibold leading-tight text-balance"
          >
            The words of people who've done the work.
          </motion.h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="bg-[#0A0E14] rounded-sm p-7 flex flex-col gap-6"
            >
              {/* Quote mark */}
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="text-[#4ADE80]/30">
                <path
                  d="M0 18V10.8C0 7.68 0.8 5.04 2.4 2.88 4.04 0.72 6.28 0 9.12 0v3.12C7.68 3.12 6.52 3.64 5.64 4.68 4.8 5.68 4.36 7 4.36 8.56H8V18H0zm14 0V10.8c0-3.12.8-5.76 2.4-7.92C18.04.72 20.28 0 23.12 0v3.12c-1.44 0-2.6.52-3.48 1.56-.84 1-.28 2.32-.28 3.88H23V18H14z"
                  fill="currentColor"
                />
              </svg>

              <blockquote className="font-sans text-sm text-[#F8F7F4]/80 leading-relaxed flex-1 italic">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#4ADE80]/10 flex items-center justify-center shrink-0">
                  <span className="font-sans text-xs font-semibold text-[#4ADE80]">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-[#F8F7F4]">{t.name}</p>
                  <p className="font-sans text-xs text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
