import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import DitherCanvas from '../components/DitherCanvas'

import { SITE_CONFIG } from '../config/seo'
import { env } from '../config/env'
import {
  WORK_TIMELINE,
  PERSONAL_PROJECTS,
  EDUCATION_TIMELINE,
} from '../config/timeline'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: SITE_CONFIG.title,
      },
      {
        name: 'description',
        content: SITE_CONFIG.description,
      },
      {
        property: 'og:title',
        content: SITE_CONFIG.title,
      },
      {
        property: 'og:description',
        content: SITE_CONFIG.description,
      },
      {
        property: 'og:url',
        content: `${SITE_CONFIG.url}/`,
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: `${SITE_CONFIG.url}/`,
      },
    ],
  }),
  component: PortfolioPage,
})

// ─────────────────────────────────────────────────────────────────────────────
// SKILL GROUPS (Regrouped into Strong / Working / Familiar)
// ─────────────────────────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    tier: 'STRONG',
    title: 'Core Production Competencies',
    badge: 'Interview Ready',
    description:
      'Technologies I use daily in production with deep knowledge of internals, performance profiling, concurrency, and architecture. Fully interview-ready.',
    skills: [
      { name: 'TypeScript', note: 'Strict typing, generics, utility types' },
      { name: 'JavaScript (ES6+)', note: 'Event loop, async/await, closures' },
      { name: 'React.js (v19)', note: 'Hooks, state architecture, component lifecycle' },
      { name: 'Next.js', note: 'App/Pages router, SSR, SSG, ISR, API routes' },
      { name: 'Node.js & Express.js', note: 'REST APIs, middleware, streams, clustering' },
      { name: 'Tailwind CSS', note: 'Responsive design, design systems, utility patterns' },
      { name: 'MongoDB', note: 'Aggregation pipelines, indexing, schema design' },
      { name: 'PostgreSQL', note: 'Relational modeling, indexing, joins, ACID' },
      { name: 'RESTful API Design', note: 'Idempotency, status codes, OpenAPI' },
      { name: 'Git & GitHub', note: 'Branching, code review, atomic commits' },
    ],
  },
  {
    tier: 'WORKING',
    title: 'Production-Tested in Real Systems',
    badge: 'Actively Deployed',
    description:
      'Technologies I actively configure, integrate, and maintain across production environments and background infrastructure.',
    skills: [
      { name: 'Redis', note: 'In-memory caching, TTL strategies, session store' },
      { name: 'BullMQ', note: 'Distributed background job queues, retries' },
      { name: 'Docker', note: 'Containerization, multi-stage builds, compose' },
      { name: 'Stripe Payments', note: 'Webhooks, idempotent retries, refunds' },
      { name: 'Sharp Image Engine', note: 'WebP/AVIF compression, dynamic resizing' },
      { name: 'Typesense', note: 'Typo-tolerant full-text search indexing' },
      { name: 'Vite', note: 'Module bundling, SSR configurations' },
      { name: 'Postman', note: 'API contract testing, environment variables' },
      { name: 'Linux / Bash', note: 'Server management, shell scripting, logs' },
      { name: 'CI/CD Pipelines', note: 'Automated testing, build & deployment hooks' },
    ],
  },
  {
    tier: 'FAMILIAR',
    title: 'Academic & Project Exposure',
    badge: 'Foundational',
    description:
      'Technologies learned through university coursework, early projects, or legacy systems that I can ramp up on quickly when required.',
    skills: [
      { name: 'Java', note: 'Object-oriented programming, data structures' },
      { name: 'C / C++', note: 'Pointers, memory management, low-level OS concepts' },
      { name: 'Firebase', note: 'Firestore, Realtime DB, Authentication' },
      { name: 'WebSockets (Socket.IO)', note: 'Bi-directional real-time communication' },
      { name: 'AWS (EC2, S3)', note: 'Cloud storage, basic compute instances' },
      { name: 'Cloudflare R2', note: 'S3-compatible edge object storage' },
      { name: 'Geolocation APIs', note: 'Geocoding, distance calculations' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// HOW I WORK (Defensible Engineering Habits)
// ─────────────────────────────────────────────────────────────────────────────
const WORK_HABITS = [
  {
    title: 'Testing & Verification',
    category: 'Reliability',
    summary:
      'I write integration tests for critical business paths—especially payment transactions, webhook signatures, and auth middleware. I maintain Postman API test collections for contract verification before releasing schema changes, and rely on strict TypeScript compiler checks (`noImplicitAny`, `strictNullChecks`) to catch errors at compile time.',
  },
  {
    title: 'Code Review & Standards',
    category: 'Collaboration',
    summary:
      'I keep pull requests small, scoped, and single-purpose with clear context and test steps to accelerate review turnaround. I automate code formatting and linting via ESLint and Prettier in pre-commit hooks, and write descriptive commit messages following the Conventional Commits specification.',
  },
  {
    title: 'Monitoring & Performance',
    category: 'Observability',
    summary:
      'I implement structured JSON logging with request IDs across all API endpoints for rapid root-cause analysis. I profile slow database queries, deploy Redis caching with sensible TTLs to protect database capacity under load spikes, and track worker health in BullMQ dashboards to prevent silent queue stalling.',
  },
  {
    title: 'Security & Defensive Coding',
    category: 'Hygiene & RBAC',
    summary:
      'I enforce least-privilege Role-Based Access Control (RBAC) at the route and service layer, not just the client UI. I cryptographically verify all external webhooks (e.g., Stripe SHA-256 signatures) before processing payloads, sanitize user inputs against injection risks, and isolate credentials in environment variables.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FAQ (First Person Everywhere, Matching Technical Stack)
// ─────────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Who am I and what is my background?',
    a: 'I am a Full Stack Developer based in Surat, Gujarat, India with 2.5+ years of experience engineering scalable web applications using Next.js, React, Node.js, Express, TypeScript, and cloud systems. I currently serve as a Software Developer at Diamond Atelier, owning core features and architecture for our production jewelry e-commerce platform.',
  },
  {
    q: 'What technologies do I specialize in and defend in interviews?',
    a: 'I specialize in TypeScript, JavaScript (ES6+), React.js (v19), Next.js, Node.js, Express.js, MongoDB, PostgreSQL, Redis caching, BullMQ background queues, Docker, and Stripe payment processing with webhook verification.',
  },
  {
    q: 'What companies and production systems have I engineered?',
    a: 'I am currently a Software Developer at Diamond Atelier building our diamond e-commerce platform and custom headless CMS. Previously, I developed WhatsApp automation & appointment booking platforms at Empiric Infotech LLP, and mentored 200+ students while building LMS review modules at Masai School.',
  },
  {
    q: 'How can you contact me or book an interview call?',
    a: 'You can email me directly at diwakarsharma2216@gmail.com, book a 30-minute consultation call on my Cal.com calendar, connect with me on LinkedIn, or inspect my public repositories on GitHub.',
  },
]

function PortfolioPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: env.calNamespace })
      cal('floatingButton', {
        calLink: env.calLink,
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        buttonColor: '#ea580c',
        buttonTextColor: '#ffffff',
      })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(env.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Find flagship entry from single timeline
  const diamondRole = WORK_TIMELINE.find((t) => t.id === 'diamond-atelier')!
  const otherWorkRoles = WORK_TIMELINE.filter((t) => t.id !== 'diamond-atelier')

  return (
    <main className="container-narrow pt-8 sm:pt-14 pb-12 sm:pb-16">
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                           */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Kicker, Headline, Bio, Actions */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <Badge variant="accent" size="sm" dot>
                {env.role}
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                @diwakarsharma2216 &bull; {env.location} &bull; Open for opportunities
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-normal tracking-tight text-[var(--text-primary)] mb-5 leading-[1.08] sm:leading-[1.06]">
              Diwakar Sharma <br />
              <span className="italic text-[var(--accent)] font-serif text-3xl sm:text-5xl lg:text-[3.5rem] block mt-1">
                Full Stack Developer.
              </span>
            </h1>

            {/* Impact statement with real metric placeholders */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-4 max-w-xl">
              I build high-performance web systems and commerce backends with Next.js, Node.js &amp; TypeScript — scaling APIs to <span className="font-mono text-[var(--text-primary)] font-medium bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">[N requests/sec]</span>, reducing catalog query latency by <span className="font-mono text-[var(--text-primary)] font-medium bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">[X%]</span>, and handling <span className="font-mono text-[var(--text-primary)] font-medium bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">[N orders/day]</span> with resilient payment pipelines.
            </p>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-sans leading-relaxed mb-7 max-w-xl">
              Currently Software Developer at <span className="text-[var(--text-primary)] font-medium">Diamond Atelier</span>, leading the engineering of a production diamond e-commerce platform and custom headless CMS.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
              <Button
                type="button"
                data-cal-link={env.calLink}
                data-cal-namespace={env.calNamespace}
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                onClick={async () => {
                  const cal = await getCalApi({ namespace: env.calNamespace })
                  cal('modal', {
                    calLink: env.calLink,
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

              {/* Download Resume (PDF) Button */}
              <a
                href={env.resumeUrl}
                download="Diwakar_Sharma_Resume.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] text-xs font-mono font-medium border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors no-underline shadow-sm"
                title="Download Resume PDF"
              >
                <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
                  <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14H2.75z" />
                  <path d="M7.25 1.75v7.69L4.97 7.16a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 9.44V1.75a.75.75 0 0 0-1.5 0z" />
                </svg>
                <span>Download Resume (PDF)</span>
              </a>

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
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-[6px] text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors no-underline whitespace-nowrap"
              >
                GitHub
              </a>

              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-[6px] text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors no-underline whitespace-nowrap"
              >
                LinkedIn
              </a>
            </div>

            {/* Availability Line */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-[var(--text-muted)]">
              <span>
                <span className="text-[var(--text-secondary)] font-medium">Notice Period:</span>{' '}
                <span className="text-[var(--accent-text)]">{env.noticePeriod}</span>
              </span>
              <span>&bull;</span>
              <span>
                <span className="text-[var(--text-secondary)] font-medium">Seeking:</span>{' '}
                {env.rolesSought}
              </span>
              <span>&bull;</span>
              <span>
                <span className="text-[var(--text-secondary)] font-medium">Preference:</span>{' '}
                {env.workPreference}
              </span>
            </div>
          </div>

          {/* Right Column: Generative Halftone Dither Canvas */}
          <div className="lg:col-span-4 flex items-center justify-center pt-6 lg:pt-0">
            <DitherCanvas />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. FEATURED PROJECTS SECTION (Powered by Timeline Array)  */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="projects" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
              Featured Projects
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Production &bull; Personal &bull; 2023–Present
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* CATEGORY 1: WORK EXPERIENCE & PRODUCTION PLATFORMS        */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"></span>
              <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                01 / Work Experience & Production Systems
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Diamond Atelier &bull; Empiric Infotech &bull; Masai School
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans mb-6 max-w-2xl">
            Enterprise systems, commerce backends, and internal platforms engineered during full-time company tenure.
          </p>

          {/* Flagship Feature: Diamond Atelier (Rendered from WORK_TIMELINE) */}
          <div className="mb-6 p-6 sm:p-8 rounded-[10px] border border-[var(--border-strong)] bg-[var(--bg-surface)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-[var(--accent-text)] uppercase tracking-wider">
                  {diamondRole.company}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">&bull;</span>
                <span className="text-xs font-mono text-[var(--text-muted)]">{diamondRole.period}</span>
              </div>
              <div className="flex items-center gap-2">
                {diamondRole.projectUrl && (
                  <a
                    href={diamondRole.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--accent-text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors no-underline cursor-pointer"
                    title="Open Live Link"
                  >
                    <span>Live Link</span>
                    <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                      <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[var(--bg-canvas)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                  {diamondRole.role} &bull; Core Platform Delivery
                </span>
              </div>
            </div>

            <div className="mb-3">
              <a
                href={diamondRole.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 text-inherit no-underline"
              >
                <h4 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                  {diamondRole.projectTitle}
                </h4>
                <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                  <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-3xl mb-6">
              {diamondRole.projectSummary}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {diamondRole.skills.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Grid: Other Work Experience Roles (Rendered from WORK_TIMELINE) */}
          <div className="grid sm:grid-cols-2 gap-6">
            {otherWorkRoles.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono uppercase border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]">
                        {item.company}
                      </span>
                      <span>&bull; {item.period}</span>
                    </div>
                    {item.privateNotice && (
                      <span className="px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-muted)]">
                        {item.privateNotice.badge}
                      </span>
                    )}
                  </div>

                  <div className="mb-2">
                    <h4 className="font-serif text-2xl text-[var(--text-primary)]">
                      {item.projectTitle}
                    </h4>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-4">
                    {item.projectSummary}
                  </p>

                  {/* 2-line safe-to-share private project description */}
                  {item.privateNotice && (
                    <div className="p-3 mb-5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] leading-relaxed">
                      <span className="text-[var(--text-secondary)] font-semibold">Scope:</span> {item.privateNotice.summary}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
                  {item.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 3. CASE STUDY: DIAMOND ATELIER PRODUCTION ARCHITECTURE     */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div className="mb-14 p-6 sm:p-8 rounded-[12px] border border-[var(--border-strong)] bg-[var(--bg-surface)]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono uppercase font-semibold bg-[var(--accent)] text-white">
                Deep Dive Case Study
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Diamond Atelier &bull; High-Throughput Headless Commerce
              </span>
            </div>
            <span className="text-xs font-mono text-[var(--accent-text)]">
              Architecture &bull; Performance &bull; Payments
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-8">
            {/* Left 7 cols: Problem, Role, Decisions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] mb-1">
                  01 / The Challenge
                </h4>
                <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                  High-ticket jewelry commerce demands sub-second catalog responsiveness, ultra-crisp visual presentation for high-res gem assets without payload bloat, 100% resilient payment processing for high-value orders, and zero-developer-dependency content updates for a 6-person catalog merchandising team.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] mb-1">
                  02 / My Role
                </h4>
                <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                  Software Developer leading end-to-end platform architecture: authored custom headless CMS data schemas, integrated cryptographic Stripe webhook verification, engineered Sharp media pipelines to S3/R2, and implemented Redis caching with BullMQ worker queues.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] mb-2">
                  03 / Key Architectural Decisions
                </h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)] font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5 font-mono text-xs">▸</span>
                    <div>
                      <strong className="text-[var(--text-primary)]">Custom Headless CMS:</strong> Built tailored content schemas with RBAC, liberating the marketing team from code deploys and reducing asset update turnaround from days to minutes.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5 font-mono text-xs">▸</span>
                    <div>
                      <strong className="text-[var(--text-primary)]">Sharp Image Pipeline:</strong> Ingested high-res raw photography, automated WebP/AVIF generation, and streamed assets to S3/Cloudflare R2, cutting payload sizes by <span className="font-mono text-[var(--text-primary)]">[X%]</span>.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5 font-mono text-xs">▸</span>
                    <div>
                      <strong className="text-[var(--text-primary)]">Multi-Tier Redis Caching:</strong> Cached hot diamond catalog queries and filter aggregations with TTL invalidation, keeping database CPU load low under traffic spikes.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5 font-mono text-xs">▸</span>
                    <div>
                      <strong className="text-[var(--text-primary)]">BullMQ Asynchronous Queues:</strong> Decoupled heavy tasks (invoice generation, webhook retries, transaction email dispatches) from the main request/response cycle.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right 5 cols: Measurable Results (Placeholders) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[var(--bg-canvas)] p-6 rounded-[8px] border border-[var(--border-subtle)]">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] mb-4">
                  04 / Measurable Impact (Metrics)
                </h4>
                <div className="space-y-4">
                  <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    <div className="text-lg font-mono font-bold text-[var(--accent-text)]">[X% Faster]</div>
                    <div className="text-xs text-[var(--text-secondary)] font-sans">Initial page load acceleration via Sharp WebP/AVIF compression &amp; Redis cache</div>
                  </div>
                  <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    <div className="text-lg font-mono font-bold text-[var(--accent-text)]">[Y% Reduction]</div>
                    <div className="text-xs text-[var(--text-secondary)] font-sans">Product drop bounce rate reduction attributed to instant filter facets</div>
                  </div>
                  <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    <div className="text-lg font-mono font-bold text-[var(--accent-text)]">[Z Hours/Week]</div>
                    <div className="text-xs text-[var(--text-secondary)] font-sans">Engineering time saved by empowering non-technical team with headless CMS</div>
                  </div>
                  <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    <div className="text-lg font-mono font-bold text-[var(--accent-text)]">[99.X%] Checkout Success</div>
                    <div className="text-xs text-[var(--text-secondary)] font-sans">Zero lost orders with idempotent Stripe webhook verification &amp; failure retries</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
                Production platform live at <a href={diamondRole.projectUrl} target="_blank" rel="noreferrer" className="text-[var(--accent-text)] hover:underline">diamondforest.com ↗</a>
              </div>
            </div>
          </div>

          {/* Architecture Diagram (Inline SVG) */}
          <div className="pt-6 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
              <span>System Architecture Diagram</span>
              <span>Next.js &bull; Node.js &bull; Redis &bull; BullMQ &bull; S3/R2</span>
            </div>

            <div className="w-full overflow-x-auto bg-[var(--bg-canvas)] p-4 rounded-[8px] border border-[var(--border-subtle)]">
              <svg
                viewBox="0 0 760 210"
                className="w-full min-w-[680px] h-auto font-mono text-[11px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Defs for arrow marker */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 3, 0 6" fill="var(--accent)" />
                  </marker>
                </defs>

                {/* Box 1: Client Layer */}
                <rect x="15" y="25" width="150" height="70" rx="6" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
                <text x="90" y="52" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Client Application</text>
                <text x="90" y="70" fill="var(--text-muted)" textAnchor="middle" fontSize="10">Next.js (SSR / SSG)</text>

                {/* Line: Client -> Gateway */}
                <path d="M165 60 H 225" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <text x="195" y="52" fill="var(--accent-text)" textAnchor="middle" fontSize="9">HTTPS</text>

                {/* Box 2: API Gateway / Backend */}
                <rect x="235" y="25" width="160" height="70" rx="6" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
                <text x="315" y="52" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Node.js API Service</text>
                <text x="315" y="70" fill="var(--text-muted)" textAnchor="middle" fontSize="10">Express &bull; Auth &bull; CMS</text>

                {/* Line: Gateway <-> Redis */}
                <path d="M395 60 H 455" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

                {/* Box 3: Redis Cache */}
                <rect x="465" y="25" width="140" height="70" rx="6" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
                <text x="535" y="52" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Redis Cache</text>
                <text x="535" y="70" fill="var(--text-muted)" textAnchor="middle" fontSize="10">Catalog &amp; Session TTL</text>

                {/* Vertical lines from Gateway down to subsystems */}
                <path d="M280 95 V 135" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <path d="M350 95 V 135" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

                {/* Subsystem 1: Stripe & BullMQ */}
                <rect x="200" y="140" width="155" height="55" rx="6" fill="var(--bg-surface)" stroke="var(--border-subtle)" strokeWidth="1.2" />
                <text x="277" y="163" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Stripe Webhooks</text>
                <text x="277" y="179" fill="var(--text-muted)" textAnchor="middle" fontSize="10">Idempotency &amp; BullMQ</text>

                {/* Subsystem 2: Sharp & S3/R2 */}
                <rect x="375" y="140" width="155" height="55" rx="6" fill="var(--bg-surface)" stroke="var(--border-subtle)" strokeWidth="1.2" />
                <text x="452" y="163" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Sharp Media Engine</text>
                <text x="452" y="179" fill="var(--text-muted)" textAnchor="middle" fontSize="10">WebP/AVIF &rarr; S3 / R2</text>

                {/* Line from subsystems to Primary DB */}
                <path d="M530 167 H 585" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

                {/* Box 4: Primary Storage */}
                <rect x="595" y="140" width="150" height="55" rx="6" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
                <text x="670" y="163" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Primary MongoDB</text>
                <text x="670" y="179" fill="var(--text-muted)" textAnchor="middle" fontSize="10">Replica Set &amp; Storage</text>
              </svg>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* CATEGORY 2: PERSONAL PROJECTS & REPOSITORIES               */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pt-8 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                02 / Personal Projects
              </h3>
            </div>
            {/* Renamed subtitle per Task 5 */}
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Full-Stack Commerce &bull; Web Applications &bull; Systems Engineering
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans mb-6 max-w-2xl">
            Full-stack web applications, dynamic e-commerce integrations, and architectural systems built independently.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERSONAL_PROJECTS.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-[10px] border ${
                  item.isPlaceholder
                    ? 'border-dashed border-[var(--border-strong)] bg-[var(--bg-canvas)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                } flex flex-col justify-between transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                    <span className="px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono uppercase border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      {item.isPlaceholder ? 'Slot: Upcoming' : 'Personal Project'}
                    </span>
                    {item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors no-underline cursor-pointer"
                        title="Open Live Link"
                      >
                        <span>Live Link</span>
                        <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                          <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">In Development</span>
                    )}
                  </div>

                  <div className="mb-2">
                    {item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-inherit no-underline"
                      >
                        <h4 className="font-serif text-xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                          {item.title}
                        </h4>
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                          <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    ) : (
                      <h4 className="font-serif text-xl text-[var(--text-primary)]">
                        {item.title}
                      </h4>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Repo Link Field per Task 5 */}
                  <div className="mb-4 text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-2">
                    <span className="text-[var(--text-secondary)] font-medium">Repository:</span>
                    {item.repoUrl ? (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--accent-text)] hover:underline inline-flex items-center gap-1"
                      >
                        <span>GitHub Repo</span>
                        <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                          <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    ) : item.isPrivateRepo ? (
                      <span>Private repository</span>
                    ) : (
                      <span>[Placeholder slot]</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
                  {item.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. WORK EXPERIENCE (Rendered from single WORK_TIMELINE)     */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="experience" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Work Experience
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Career Timeline &bull; 2.5+ Years
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {WORK_TIMELINE.map((item) => (
            <div key={item.id} className="py-6 sm:py-7 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
              <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
                {item.period}
                <span className="block text-[11px] text-[var(--text-muted)] opacity-80 mt-0.5">
                  {item.location} ({item.workplaceType})
                </span>
              </div>
              <div className="sm:col-span-4">
                <span className="font-serif text-lg text-[var(--text-primary)]">{item.company}</span>
                <span className="block text-xs font-mono text-[var(--accent-text)]">{item.role}</span>
              </div>
              <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans">
                {/* Action + Technology + Measurable Result Bullets */}
                <ul className="space-y-2 list-none p-0 m-0">
                  {item.experienceBullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-mono text-xs mt-0.5 shrink-0">▪</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. EDUCATION (Marking BCA as Online while full-time)        */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="education" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Education
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Academic &amp; Certifications
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {EDUCATION_TIMELINE.map((edu) => (
            <div key={edu.id} className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
              <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
                {edu.period}
              </div>
              <div className="sm:col-span-4">
                <span className="font-serif text-lg text-[var(--text-primary)]">{edu.institution}</span>
                <span className="block text-xs font-mono text-[var(--text-muted)]">{edu.degree}</span>
                {edu.note && (
                  <span className="inline-block mt-1 text-[11px] font-mono text-[var(--accent-text)] bg-[var(--bg-canvas)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                    {edu.note}
                  </span>
                )}
              </div>
              <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
                {edu.coursework}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. CORE STACK (Regrouped: Strong / Working / Familiar)     */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="stack" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
              Technical Stack &amp; Skills
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Strong &bull; Working &bull; Familiar
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {SKILL_GROUPS.map((group) => (
            <div key={group.tier} className="py-6 sm:py-7 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
              <div className="sm:col-span-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[var(--accent-text)] tracking-wider">
                    {group.tier}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
                    {group.badge}
                  </span>
                </div>
                <span className="block font-serif text-lg text-[var(--text-primary)] mt-1">
                  {group.title}
                </span>
              </div>

              <div className="sm:col-span-5 flex flex-wrap gap-2">
                {group.skills.map((tech) => (
                  <div
                    key={tech.name}
                    className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
                    title={tech.note}
                  >
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>

              <div className="sm:col-span-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                {group.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 7. HOW I WORK (Engineering Discipline & Habits)            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="how-i-work" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            How I Work &bull; Engineering Discipline
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Testing &bull; Reviews &bull; Monitoring &bull; Security
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {WORK_HABITS.map((habit) => (
            <div
              key={habit.title}
              className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-[var(--accent-text)]">
                  <span>{habit.category}</span>
                </div>
                <h3 className="font-serif text-xl text-[var(--text-primary)] mb-3">
                  {habit.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                  {habit.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 8. FAQ (First Person Everywhere, AEO & Agent Optimized)    */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="faq" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            FAQ &bull; Frequently Asked Questions
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Recruiter &amp; Engineering Q&amp;A
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group py-4 cursor-pointer [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between font-serif text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors list-none select-none">
                <span>{item.q}</span>
                <span className="text-xs font-mono text-[var(--text-muted)] group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 9. CONTACT SECTION                                         */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Contact
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {env.email}
          </span>
        </div>

        <div className="max-w-xl">
          <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-2.5">
            Let&apos;s build together.
          </h3>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
            I am open to full-time Software Engineer and Full Stack Developer roles. Whether you have an open requisition or a high-concurrency system architecture to discuss, my inbox is open.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Button
              type="button"
              data-cal-link={env.calLink}
              data-cal-namespace={env.calNamespace}
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              onClick={async () => {
                const cal = await getCalApi({ namespace: env.calNamespace })
                cal('modal', {
                  calLink: env.calLink,
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
              href={SITE_CONFIG.links.email}
              onClick={() => {
                window.location.href = SITE_CONFIG.links.email
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
