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
    green: 'bg-green text-black hover:opacity-90',
    dark: 'bg-black text-white border border-white/20 hover:bg-onyx',
    outline: 'bg-transparent text-green border border-green hover:bg-green hover:text-black',
  }

  const sizes = {
    sm: 'text-[10px] px-6 py-2.5 rounded-full',
    md: 'text-[11px] px-8 py-3.5 rounded-full',
    lg: 'text-[12px] px-10 py-4 rounded-full',
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
