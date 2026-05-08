import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const faqs = [
  {
    question: 'Who is this coaching programme designed for?',
    answer:
      'This programme is designed for senior professionals and leaders — typically at VP, Director, Head of, GM, or C-suite level — who are at a critical inflection point in their career. They are high performers externally but are dealing with internal challenges around identity, authority, decision-making, or transition. The average client has 10–18 years of experience.',
  },
  {
    question: 'How long is the coaching engagement?',
    answer:
      'Most engagements run between 6 and 12 months, with bi-weekly 60-minute coaching sessions. Shorter or longer formats are available depending on context and goals. We do not offer one-off sessions — meaningful transformation requires time, depth, and continuity.',
  },
  {
    question: 'What is the investment?',
    answer:
      'Pricing is not listed publicly because each engagement is bespoke and scoped according to your specific goals, timeline, and context. Pricing is discussed only after a discovery call and mutual confirmation of fit. What we can say: this is a high-investment, high-return engagement designed for professionals who take their development seriously.',
  },
  {
    question: 'Is this done virtually or in-person?',
    answer:
      'All coaching sessions are conducted virtually via Zoom or a platform of your choice. Clients have found this format ideal for senior executives with demanding schedules. In-person intensive formats are available for specific engagements.',
  },
  {
    question: 'How is this different from other executive coaching programmes?',
    answer:
      'Most coaching programmes focus on skills and behaviours. GT Coaching goes deeper — to identity, operating assumptions, and the internal structures that drive (or limit) your leadership. The work is precise, evidence-based, and grounded in real organisational experience. It is also selective: we only work with clients where we believe meaningful transformation is possible.',
  },
  {
    question: 'Do you offer group coaching or workshops?',
    answer:
      'Currently, GT Executive Coaching is a private, one-to-one engagement only. We do offer custom leadership development workshops and team offsites for organisations. Reach out directly for corporate enquiries.',
  },
  {
    question: 'What happens after I submit my application?',
    answer:
      'Applications are reviewed within 5 business days. If shortlisted, you\'ll receive an invitation to schedule a 45-minute discovery call. This call is mutual — it\'s your opportunity to evaluate the programme as much as ours to assess fit. There is no obligation or pressure to proceed.',
  },
  {
    question: 'Can my organisation sponsor or pay for this coaching?',
    answer:
      'Yes. Many clients are sponsored by their organisations as part of leadership development or succession programmes. We provide standard documentation for corporate reimbursement. We\'re also happy to speak with HR or L&D teams directly if that helps facilitate the process.',
  },
]

export default function FAQ() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="faq">
      <Container>
        <div ref={ref} className="max-w-2xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            Frequently Asked Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#F8F7F4] font-semibold leading-tight text-balance"
          >
            Everything you need to know.
          </motion.h2>
        </div>

        <div className="max-w-3xl flex flex-col gap-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
              className="border-b border-white/5"
            >
              <details className="group">
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer select-none">
                  <h3 className="font-sans text-sm font-medium text-[#F8F7F4] group-hover:text-[#4ADE80] transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <div className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-open:border-[#4ADE80]/40 transition-colors">
                    <svg
                      className="text-[#6B7280] group-open:rotate-45 transition-transform duration-300 group-open:text-[#4ADE80]"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </summary>
                <div className="pb-6">
                  <p className="font-sans text-sm text-[#6B7280] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
