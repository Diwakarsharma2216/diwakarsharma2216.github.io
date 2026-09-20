import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import DitherCanvas from '../components/DitherCanvas'

export const Route = createFileRoute('/')({ component: PortfolioPage })

function PortfolioPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' })
      cal('floatingButton', {
        calLink: 'tarang-rajpara-lgnt7r/30min',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        buttonColor: '#ea580c',
        buttonTextColor: '#ffffff',
      })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('rajparatarang66@email.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="container-narrow pt-8 sm:pt-14 pb-12 sm:pb-16">
      {/* ────────────────────────────────────────────────────────── */}
      {/* HERO SECTION                                             */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Kicker, Headline, Bio, Actions */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <Badge variant="accent" size="sm" dot>
                Full Stack Design Engineer
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                Surat, India &bull; Open for work
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal tracking-tight text-[var(--text-primary)] mb-5 leading-[1.08] sm:leading-[1.06]">
              Building clean architecture <br />
              <span className="italic text-[var(--accent)] font-serif">and interfaces that feel good to use.</span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-7 max-w-xl">
              Software engineer with 2+ years building large-scale web applications. I care about solid system architecture, thoughtful typography, and interfaces that feel fast, tactile, and intentional. Currently at <span className="text-[var(--text-primary)] font-medium">Diamond Atelier</span> engineering Diamond Forest.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Button
                type="button"
                data-cal-link="tarang-rajpara-lgnt7r/30min"
                data-cal-namespace="30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                onClick={async () => {
                  const cal = await getCalApi({ namespace: '30min' })
                  // @ts-expect-error Cal API modal
                  cal('modal', {
                    calLink: 'tarang-rajpara-lgnt7r/30min',
                    config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
                  })
                }}
                variant="primary"
                size="md"
                className="cursor-pointer"
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="opacity-90">
                  <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 0 1 4.75 0zm0 3.5H2.75a.25.25 0 0 0-.25.25V5h11V3.75a.25.25 0 0 0-.25-.25H11.25V4.5a.75.75 0 0 1-1.5 0V3.5h-5V4.5a.75.75 0 0 1-1.5 0V3.5zM2.5 6.5v7.75c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V6.5h-11z" />
                </svg>
                Contact Me
              </Button>

              <Button
                type="button"
                onClick={copyEmail}
                variant="secondary"
                size="md"
              >
                {copied ? (
                  <>
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="text-[var(--accent)]">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[var(--accent)] font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="opacity-70">
                      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25v-7.5z" />
                      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25v-7.5zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-7.5z" />
                    </svg>
                    Copy Email
                  </>
                )}
              </Button>

              <a
                href="https://github.com/tnrajpara"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-[6px] text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors no-underline whitespace-nowrap"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/tarang-rajpara-330102379"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-[6px] text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors no-underline whitespace-nowrap"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Generative Halftone Dither Canvas */}
          <div className="lg:col-span-4 flex items-center justify-center pt-6 lg:pt-0">
            <DitherCanvas />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* PROJECTS SECTION                                           */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="projects" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-8">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Projects
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Selected Work &bull; 2024–Present
          </span>
        </div>

        {/* Flagship Feature: Diamond Forest */}
        <div className="mb-8 p-6 sm:p-8 rounded-[10px] border border-[var(--border-strong)] bg-[var(--bg-surface)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-[var(--accent-text)] uppercase tracking-wider">
                Diamond Atelier
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">&bull;</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">2025–Present</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[var(--bg-canvas)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
              Lead Frontend Engineer (~90% ownership)
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-3">
            Diamond Forest
          </h3>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-3xl mb-6">
            Large-scale luxury jewellery e-commerce platform. As the sole frontend engineer handling approximately 90% of all client code, I translated Figma design systems into performant production layouts, built the complete storefront catalog, shopping cart, and wishlist, and engineered an interactive 3D ring viewer and customiser using <strong>Three.js</strong> for real-time 360&deg; in-browser inspection.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {['Next.js', 'TypeScript', 'Three.js', 'TanStack Query', 'Tailwind CSS', 'Figma'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Selected Projects Editorial Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Torin Wealth */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>Brand & Motion</span>
                <span>2024–2025</span>
              </div>
              <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-2">
                Torin Wealth
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                Brand presence site for a wealth management firm. Implemented fluid micro-animations with Framer Motion and lightweight state via Zustand directly from Figma designs. On-page SEO improvements drove measurable inbound lead growth for the client.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['Next.js', 'TypeScript', 'Framer Motion', 'Zustand', 'TanStack Query', 'Tailwind CSS'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Phone Win Dashboard */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>Admin & Operations</span>
                <span>2024–2025</span>
              </div>
              <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-2">
                Phone Win Dashboard
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                Admin control panel featuring 50+ CRUD workflows for user management, reward campaigns, and administrative audits. Integrated a real-time live chat customer support system powered by Socket.IO, with server caching via TanStack Query.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['React', 'TypeScript', 'Socket.IO', 'TanStack Query', 'Shadcn UI', 'Tailwind CSS'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* AKA Gaming Dashboard */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>Gaming & Realtime</span>
                <span>2024–2025</span>
              </div>
              <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-2">
                AKA Gaming Dashboard
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                Real-time content management and live player analytics dashboard for a gaming platform. Built live event telemetry feeds using Socket.IO, interactive data visualisations, and role-based access control across administration tiers.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['React', 'TypeScript', 'Socket.IO', 'Zustand', 'Shadcn UI', 'Tailwind CSS'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Account Mart */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>Digital Marketplace</span>
                <span>2024–2025</span>
              </div>
              <h3 className="font-serif text-2xl text-[var(--text-primary)] mb-2">
                Account Mart
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                End-to-end digital account marketplace with complete listing, categorized browsing, and purchase workflows. Handled global cart and multi-step transaction validation states using Zustand, implemented from Figma designs.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['React', 'Vite', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Figma'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* EXPERIENCE & EDUCATION SECTION                             */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="experience" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Experience & Education
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Career Timeline
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {/* Diamond Atelier */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              2025 — Present
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Diamond Atelier</span>
              <span className="block text-xs font-mono text-[var(--accent-text)]">Software Engineer</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              Sole frontend engineer on Diamond Forest (~90% of all frontend work). Built storefront, catalog, cart, wishlist, and interactive 3D ring viewer (Three.js).
            </div>
          </div>

          {/* Freelance */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              2024 — 2025
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Independent Freelance</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">Full Stack Engineer</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              Shipped 4 production web applications spanning operational dashboards, marketplaces, and brand sites directly from Figma into code.
            </div>
          </div>

          {/* Bachelor's */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              2023 — 2025
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Sarvajanik University</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">Bachelor&apos;s Degree</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
              Computer Science &bull; Degree completion
            </div>
          </div>

          {/* Diploma */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              2019 — 2022
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Bhagwan Mahavir University</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">Diploma in Engineering</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
              Engineering foundations &bull; Diploma completion
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* CORE STACK SECTION                                         */}
      {/* ────────────────────────────────────────────────────────── */}
      {/* CORE STACK SECTION (INDUSTRIAL SPEC SHEET)                 */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="stack" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Core Stack
          </h2>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Technical Specification &bull; Production
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {/* Row 1: Frontend & Architecture */}
          <div className="py-5 sm:py-6 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
            <div className="sm:col-span-3">
              <span className="text-xs font-mono text-[var(--accent-text)] tracking-wider">
                01 / FRONTEND
              </span>
              <span className="block font-serif text-lg text-[var(--text-primary)] mt-0.5">
                Architecture & UI
              </span>
            </div>
            <div className="sm:col-span-5 flex flex-wrap gap-1.5">
              {['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5 / CSS3'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="sm:col-span-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              Strictly typed component architectures, design systems from Figma, and responsive, accessible layouts.
            </div>
          </div>

          {/* Row 2: 3D & Realtime */}
          <div className="py-5 sm:py-6 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
            <div className="sm:col-span-3">
              <span className="text-xs font-mono text-[var(--accent-text)] tracking-wider">
                02 / GRAPHICS
              </span>
              <span className="block font-serif text-lg text-[var(--text-primary)] mt-0.5">
                3D & Realtime
              </span>
            </div>
            <div className="sm:col-span-5 flex flex-wrap gap-1.5">
              {['Three.js (WebGL)', 'Socket.IO', 'Framer Motion'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="sm:col-span-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              Interactive 3D canvas customisers with 360&deg; orbital controls, physics motion, and live WebSocket telemetry.
            </div>
          </div>

          {/* Row 3: State & Data */}
          <div className="py-5 sm:py-6 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
            <div className="sm:col-span-3">
              <span className="text-xs font-mono text-[var(--accent-text)] tracking-wider">
                03 / DATA LAYER
              </span>
              <span className="block font-serif text-lg text-[var(--text-primary)] mt-0.5">
                State & Sync
              </span>
            </div>
            <div className="sm:col-span-5 flex flex-wrap gap-1.5">
              {['TanStack Query', 'Zustand', 'REST APIs'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="sm:col-span-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              Server-state synchronization, aggressive cache revalidation, and lightweight multi-step client stores.
            </div>
          </div>

          {/* Row 4: Runtime & Workflow */}
          <div className="py-5 sm:py-6 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
            <div className="sm:col-span-3">
              <span className="text-xs font-mono text-[var(--accent-text)] tracking-wider">
                04 / WORKFLOW
              </span>
              <span className="block font-serif text-lg text-[var(--text-primary)] mt-0.5">
                Runtime & Tools
              </span>
            </div>
            <div className="sm:col-span-5 flex flex-wrap gap-1.5">
              {['Node.js', 'Express', 'Vite', 'Figma', 'Git & GitHub'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="sm:col-span-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              Backend runtime services, lightning-fast bundlers, design handoff in Figma, and Git collaboration workflows.
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* CONTACT SECTION                                            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Contact
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            rajparatarang66@email.com
          </span>
        </div>

        <div className="max-w-xl">
          <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-2.5">
            Let&apos;s build together.
          </h3>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
            Open to full-time engineering roles and select freelance projects. Whether you have an open position or a web project to build, my inbox is open.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Button
              type="button"
              data-cal-link="tarang-rajpara-lgnt7r/30min"
              data-cal-namespace="30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              onClick={async () => {
                const cal = await getCalApi({ namespace: '30min' })
                // @ts-expect-error Cal API modal
                cal('modal', {
                  calLink: 'tarang-rajpara-lgnt7r/30min',
                  config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
                })
              }}
              variant="primary"
              size="md"
              className="cursor-pointer"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="opacity-90">
                <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 0 1 4.75 0zm0 3.5H2.75a.25.25 0 0 0-.25.25V5h11V3.75a.25.25 0 0 0-.25-.25H11.25V4.5a.75.75 0 0 1-1.5 0V3.5h-5V4.5a.75.75 0 0 1-1.5 0V3.5zM2.5 6.5v7.75c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V6.5h-11z" />
              </svg>
              Book a 30m Call
            </Button>

            <Button
              type="button"
              onClick={copyEmail}
              variant="secondary"
              size="md"
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="text-[var(--accent)]">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--accent)] font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="opacity-70">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25v-7.5z" />
                    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25v-7.5zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-7.5z" />
                  </svg>
                  Copy Email
                </>
              )}
            </Button>

            <Button
              as="a"
              href="mailto:rajparatarang66@email.com"
              onClick={() => {
                window.location.href = 'mailto:rajparatarang66@email.com'
              }}
              variant="secondary"
              size="md"
            >
              Open in Mail App &rarr;
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
