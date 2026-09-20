import * as React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'surface' | 'ghost'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  className = '',
  variant = 'raised',
  hover = false,
  padding = 'md',
  children,
  ...props
}: CardProps) {
  const baseStyles =
    'rounded-[10px] border border-[var(--border-subtle)] transition-all duration-200 shadow-[var(--shadow-card)]'

  const variantStyles = {
    raised: 'bg-[var(--bg-surface-raised)]',
    surface: 'bg-[var(--bg-surface)]',
    ghost: 'bg-transparent shadow-none',
  }

  const paddingStyles = {
    none: '',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-6 sm:p-8',
  }

  const hoverStyles = hover
    ? 'hover:border-[var(--border-strong)]'
    : ''

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
