import { useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'auto'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto'
  }
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }
  return 'auto'
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', mode)
  }

  document.documentElement.style.colorScheme = resolved
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('auto')

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  function selectMode(nextMode: ThemeMode) {
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  if (!mounted) {
    return (
      <div className="h-8 w-24 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] opacity-0" />
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className="inline-flex h-8 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-0.5 transition-colors"
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'light'}
        aria-label="Light mode"
        title="Light mode"
        onClick={() => selectMode('light')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 cursor-pointer ${
          mode === 'light'
            ? 'bg-[var(--bg-surface-raised)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === 'dark'}
        aria-label="Dark mode"
        title="Dark mode"
        onClick={() => selectMode('dark')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 cursor-pointer ${
          mode === 'dark'
            ? 'bg-[var(--bg-surface-raised)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === 'auto'}
        aria-label="System theme"
        title="System theme"
        onClick={() => selectMode('auto')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 cursor-pointer ${
          mode === 'auto'
            ? 'bg-[var(--bg-surface-raised)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      </button>
    </div>
  )
}
