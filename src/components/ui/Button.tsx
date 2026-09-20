import * as React from 'react'

type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export type ButtonProps = BaseButtonProps &
  (
    | ({ as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  )

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      as = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-ui tracking-[0.01em] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer no-underline'

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs rounded-[4px] gap-1.5',
      md: 'h-10 px-4 text-sm rounded-[6px] gap-2',
      lg: 'h-12 px-6 text-base rounded-[6px] gap-2.5',
    }

    const variantStyles = {
      primary:
        'bg-[var(--text-primary)] text-[var(--bg-canvas)] hover:opacity-90 active:scale-[0.98]',
      secondary:
        'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] active:scale-[0.98]',
      outline:
        'border border-[var(--border-strong)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface)] active:scale-[0.98]',
      ghost:
        'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] active:scale-[0.98]',
      accent:
        'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98]',
    }

    const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

    if (as === 'a') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    )
  }
)

Button.displayName = 'Button'
