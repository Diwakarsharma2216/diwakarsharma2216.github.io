export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-subtle)] py-6 sm:py-8 transition-colors duration-200 bg-[var(--bg-canvas)]">
      <div className="container-narrow flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-serif text-base text-[var(--text-primary)]">Tarang Rajpara</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">·</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Surat, IN (UTC+5:30)</span>
          </div>
          <p className="m-0 text-xs text-[var(--text-secondary)] font-mono">
            Full Stack Design Engineer &bull; &copy; {year} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
          <a
            href="https://github.com/tnrajpara"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)] transition-colors no-underline"
          >
            GitHub
          </a>
          <span className="text-[var(--border-strong)]">·</span>
          <a
            href="https://www.linkedin.com/in/tarang-rajpara-330102379"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)] transition-colors no-underline"
          >
            LinkedIn
          </a>
          <span className="text-[var(--border-strong)]">·</span>
          <a
            href="mailto:rajparatarang66@email.com"
            className="hover:text-[var(--accent)] transition-colors no-underline"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
