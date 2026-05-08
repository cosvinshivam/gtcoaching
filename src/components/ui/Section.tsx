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
        'py-20 md:py-28',
        dark ? 'bg-[#0A0E14]' : 'bg-[#F8F7F4]',
        className
      )}
    >
      {children}
    </section>
  )
}
