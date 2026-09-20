import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'subtle'
  size?: 'sm' | 'md'
  dot?: boolean
}

export function Badge({
  className = '',
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const hasDisplayClass = /\b(block|inline-block|inline|flex|inline-flex|hidden|grid)\b/.test(className)
  const baseStyles =
    `${hasDisplayClass ? '' : 'inline-flex '}items-center font-mono font-medium tracking-tight rounded-full transition-colors select-none whitespace-nowrap shrink-0`

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-1 gap-1.5 leading-none',
    md: 'text-xs px-3 py-1 gap-1.5 leading-none',
  }

  const variantStyles = {
    default:
      'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]',
    accent:
      'bg-[var(--accent-subtle)] text-[var(--accent-text)] border border-[var(--accent)]/30',
    outline:
      'bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)]',
    subtle:
      'bg-[var(--bg-surface-raised)] text-[var(--text-secondary)]',
  }

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
        </span>
      )}
      {children}
    </span>
  )
}
