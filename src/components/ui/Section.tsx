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
        'section-athlenia relative overflow-hidden',
        dark ? 'bg-black text-white' : 'bg-offwhite text-black',
        className
      )}
    >
      {children}
    </section>
  )
}
