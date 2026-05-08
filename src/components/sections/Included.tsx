import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Block {
  number: string
  title: string
  description: string
  bullets: string[]
  imageRight: boolean
  accent: string
}

const blocks: Block[] = [
  {
    number: '01',
    title: 'Executive Identity & Presence',
    description:
      'Most leadership gaps aren\'t skill gaps — they\'re identity gaps. We rebuild how you see yourself as a leader from the inside out, so your presence changes before you say a word.',
    bullets: [
      'Reframe your leadership identity to match the level you\'re moving to',
      'Develop the internal authority that external titles cannot give',
      'Eliminate approval-seeking, hedging, and the performance of confidence',
    ],
    imageRight: false,
    accent: '#4ADE80',
  },
  {
    number: '02',
    title: 'Strategic Thinking & Decision Architecture',
    description:
      'Senior leaders are not paid to execute — they are paid to think. We elevate how you frame problems, allocate attention, and make decisions under uncertainty.',
    bullets: [
      'Shift from reactive problem-solver to proactive strategic architect',
      'Build mental models that help you see around corners',
      'Make high-stakes decisions faster and with less second-guessing',
    ],
    imageRight: true,
    accent: '#4ADE80',
  },
  {
    number: '03',
    title: 'Influence, Communication & Stakeholder Mastery',
    description:
      'At senior levels, everything is negotiation. We sharpen your ability to influence boards, peers, and teams — without coercion, politics, or sacrificing your integrity.',
    bullets: [
      'Own any room with clear, commanding executive communication',
      'Navigate complex stakeholder dynamics with nuance and confidence',
      'Turn difficult conversations from threats into leverage',
    ],
    imageRight: false,
    accent: '#4ADE80',
  },
  {
    number: '04',
    title: 'High-Performance Systems & Sustainable Leverage',
    description:
      'Elite performance is not about doing more — it\'s about designing better. We help you engineer the systems, rhythms, and boundaries that sustain peak performance without burnout.',
    bullets: [
      'Design a personal operating system that protects your energy and focus',
      'Build team systems that operate without you as the bottleneck',
      'Reclaim time sovereignty at the senior level',
    ],
    imageRight: true,
    accent: '#4ADE80',
  },
  {
    number: '05',
    title: 'Legacy, Vision & Long-Game Leadership',
    description:
      'What does exceptional leadership look like for you — not on paper, but in life? We work on the vision that pulls you forward, the legacy you\'re building, and the leader you want to become.',
    bullets: [
      'Clarify the long-term arc of your career and leadership journey',
      'Design a personal leadership philosophy that is yours — not borrowed',
      'Align your professional ambition with what actually matters to you',
    ],
    imageRight: false,
    accent: '#4ADE80',
  },
]

function IncludedBlock({ block, index }: { block: Block; index: number }) {
  const { ref, inView } = useScrollReveal()

  return (
    <div
      ref={ref}
      className="grid gap-12 items-center md:grid-cols-2 py-14 border-b border-white/5 last:border-0"
    >
      {/* Text — conditionally ordered */}
      <motion.div
        initial={{ opacity: 0, x: block.imageRight ? -32 : 32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.05 }}
        className={block.imageRight ? 'md:order-1' : 'md:order-2'}
      >
        <span className="font-display text-5xl font-semibold text-[#4ADE80]/15">
          {block.number}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F7F4] mt-2 mb-4 leading-snug">
          {block.title}
        </h3>
        <p className="font-sans text-sm text-[#6B7280] leading-relaxed mb-6">
          {block.description}
        </p>
        <ul className="flex flex-col gap-3" role="list">
          {block.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <svg className="shrink-0 mt-1 text-[#4ADE80]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-sans text-sm text-[#F8F7F4]/80 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Visual block */}
      <motion.div
        initial={{ opacity: 0, x: block.imageRight ? 32 : -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1 }}
        className={`${block.imageRight ? 'md:order-2' : 'md:order-1'} aspect-[4/3] bg-[#14181F] border border-white/5 rounded-sm flex items-center justify-center`}
      >
        <div className="text-center p-8">
          <p className="font-display text-6xl font-semibold text-[#4ADE80]/10 mb-2">
            {block.number}
          </p>
          <p className="font-display text-lg italic text-[#F8F7F4]/30">{block.title}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Included() {
  const { ref, inView } = useScrollReveal()

  return (
    <Section id="included" dark={false}>
      <Container>
        <div ref={ref} className="max-w-2xl mb-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4ADE80] mb-4"
          >
            What's Included
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-[#0A0E14] font-semibold leading-tight text-balance"
          >
            Five pillars of executive transformation.
          </motion.h2>
        </div>

        <div>
          {blocks.map((block, i) => (
            <IncludedBlock key={block.number} block={block} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
