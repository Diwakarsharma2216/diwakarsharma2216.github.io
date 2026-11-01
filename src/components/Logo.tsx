import * as React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({
  size = 'md',
  showText = true,
  className = '',
}: LogoProps) {
  const sizeMap = {
    sm: { box: 24, font: 'text-lg sm:text-xl' },
    md: { box: 32, font: 'text-xl sm:text-2xl' },
    lg: { box: 44, font: 'text-2xl sm:text-3xl' },
  }
  const dims = (size && sizeMap[size]) ? sizeMap[size] : sizeMap.md
  const uniqueId = React.useId().replace(/:/g, '')
  const gradientId = `logo-grad-${uniqueId}`

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Geometric DS Monogram Emblem */}
      <svg
        width={dims.box}
        height={dims.box}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#0a0a0a" />
        <rect
          width="62"
          height="62"
          x="1"
          y="1"
          rx="15"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Letter D in clean white */}
        <path d="M16 20 V44" stroke="#f5f5f5" strokeWidth="4.5" strokeLinecap="round" />
        <path
          d="M16 20 H23 C31 20 34.5 24.5 34.5 32 C34.5 39.5 31 44 23 44 H16"
          stroke="#f5f5f5"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Letter S in brand gradient */}
        <path
          d="M47.5 25 C47 21 44 19.5 40.5 19.5 C36 19.5 33.5 22.5 33.5 26 C33.5 30 36.5 31.5 40.5 32.5 C45 33.5 47.5 35.5 47.5 39.5 C47.5 43.5 44.5 44.5 40.5 44.5 C36 44.5 33 42 32.5 38"
          stroke={`url(#${gradientId})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <span
          className={`font-serif tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] font-normal ${dims.font}`}
        >
          Diwakar Sharma
        </span>
      )}
    </span>
  )
}
