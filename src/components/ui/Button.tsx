import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'dark' | 'outline' | 'athlenia'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  href?: string
}

export default function Button({
  variant = 'athlenia',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-sans font-bold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#CEFF65] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    green: 'bg-green text-black hover:opacity-90 rounded-full',
    dark: 'bg-black text-white hover:bg-onyx rounded-full',
    outline: 'bg-transparent text-black border border-black/10 hover:bg-black hover:text-white rounded-full',
    athlenia: 'bg-black text-white rounded-full hover:opacity-90 group',
  }

  const sizes = {
    sm: 'text-[12px] px-6 py-2.5',
    md: 'text-[14px] px-8 py-3.5',
    lg: 'text-[16px] px-10 py-4',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  const content = (
    <>
      {children}
      {variant === 'athlenia' && (
        <span className="w-8 h-8 rounded-full bg-green text-black flex items-center justify-center ml-4 -mr-4 group-hover:scale-110 transition-transform">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
