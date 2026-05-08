import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'dark' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  href?: string
}

export default function Button({
  variant = 'green',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-sans font-semibold tracking-widest uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#4ADE80] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    green: 'bg-[#4ADE80] text-[#0A0E14] hover:bg-[#22c55e]',
    dark: 'bg-[#0A0E14] text-[#F8F7F4] border border-[#14181F] hover:bg-[#14181F]',
    outline: 'bg-transparent text-[#4ADE80] border border-[#4ADE80] hover:bg-[#4ADE80] hover:text-[#0A0E14]',
  }

  const sizes = {
    sm: 'text-[10px] px-5 py-2.5 rounded-sm',
    md: 'text-[11px] px-7 py-3.5 rounded-sm',
    lg: 'text-[12px] px-9 py-4 rounded-sm',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
