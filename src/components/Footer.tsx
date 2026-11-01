import { SITE_CONFIG } from '../config/seo'
import { env } from '../config/env'
import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-subtle)] pt-8 pb-6 sm:pt-10 sm:pb-8 transition-colors duration-200 bg-[var(--bg-canvas)]">
      <div className="container-narrow">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <div className="flex items-center gap-2.5">
              <Logo size="md" />
              <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:inline-block">·</span>
              <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline-block">
                {env.locationDetail}
              </span>
            </div>
            <p className="m-0 text-xs text-[var(--text-secondary)] font-mono">
              {env.role} &bull; &copy; {year} All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--accent)] transition-colors no-underline"
            >
              GitHub
            </a>
            <span className="text-[var(--border-strong)]">·</span>
            <a
              href={SITE_CONFIG.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--accent)] transition-colors no-underline"
            >
              LinkedIn
            </a>
            <span className="text-[var(--border-strong)]">·</span>
            <a
              href={SITE_CONFIG.links.email}
              className="hover:text-[var(--accent)] transition-colors no-underline"
            >
              Email
            </a>
          </div>
        </div>

        {/* Large Signature Watermark at the very last */}
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]/50 text-center select-none pointer-events-none overflow-hidden">
          <span className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-[var(--text-primary)] opacity-[0.06] font-semibold block uppercase">
            Diwakar Sharma
          </span>
        </div>
      </div>
    </footer>
  )
}
