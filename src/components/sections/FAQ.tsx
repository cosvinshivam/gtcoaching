import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const faqs = [
  { question: 'What is the investment?', answer: 'The program is a six-month commitment. Investment ranges from $600 to $1,200 per month depending on the specific protocols and level of monitoring required.' },
  { question: 'What is the time commitment?', answer: 'You need 3-4 hours per week for training. Nutrition and lifestyle protocols are integrated into your existing routine. This is built for people with zero spare time.' },
  { question: 'Does this work for travelers?', answer: 'Yes. Most of my clients spend 50% of their time on the road. We build hotel-gym protocols and restaurant templates that move with you.' },
  { question: 'What makes this different?', answer: 'Most coaches sell effort. I sell systems. We don\'t rely on how you "feel" that day. We follow the data-driven framework we built together.' },
]

export default function FAQ() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="faq" dark={false} className="bg-offwhite">
      <Container>
        <div ref={ref} className="max-w-3xl mb-16">
          <div className="bg-black text-white px-4 py-1 rounded-full w-fit mb-8">
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase">Intelligence</span>
          </div>
          <h2 className="font-display text-4xl md:text-7xl font-bold text-black leading-tight mb-8">
            The <br />
            <span className="text-grey italic">Details.</span>
          </h2>
        </div>

        <div className="max-w-4xl flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-3xl border border-black/5 overflow-hidden group hover:border-green/30 transition-all"
            >
              <details className="group">
                <summary className="flex items-center justify-between gap-6 p-8 cursor-pointer select-none list-none">
                  <h3 className="font-sans text-xl font-bold text-black tracking-tight">
                    {faq.question}
                  </h3>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-open:bg-green group-open:text-black transition-all">
                    <svg
                      className="text-black group-open:rotate-45 transition-transform duration-300"
                      width="14" height="14" viewBox="0 0 10 10" fill="none"
                    >
                      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </summary>
                <div className="px-8 pb-8 pr-16">
                  <p className="font-sans text-base text-grey leading-relaxed">
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
