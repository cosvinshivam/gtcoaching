import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
}

export default function Section({ children, className, id, dark = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden py-20 md:py-28',
        dark ? 'bg-black text-white' : 'bg-offwhite text-ink',
        className
      )}
    >
      {children}
    </section>
  )
}
