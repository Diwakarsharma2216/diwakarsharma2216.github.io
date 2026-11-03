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
        content: SITE_CONFIG.shortTitle,
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
// SKILL TIERS (Core / Familiar / Tools — Tightened & Defensible in Interviews)
// ─────────────────────────────────────────────────────────────────────────────
const SKILL_TIERS = [
  {
    tier: 'Core',
    badge: 'Daily Production & Web Engineering',
    description:
      'Technologies used daily in commercial production to engineer full-stack web applications, REST APIs, and responsive user interfaces.',
    skills: [
      'TypeScript',
      'JavaScript (ES6+)',
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'RESTful API Design',
      'HTML5 / CSS3',
    ],
  },
  {
    tier: 'Familiar',
    badge: 'Foundational & Academic',
    description:
      'Foundational languages and platforms studied academically and capable of rapid deployment as project requirements demand.',
    skills: [
      'Java',
      'C',
      'C++',
      'Firebase',
      'Typesense',
      'WebSockets (Socket.IO)',
      'Linux / Bash',
    ],
  },
  {
    tier: 'Tools',
    badge: 'Infrastructure & Workflows',
    description:
      'Databases, caching layers, containerization, and developer tooling configured and maintained in production workflows.',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Redis Caching',
      'BullMQ Queues',
      'Docker',
      'Stripe Integration',
      'Sharp Image Pipeline',
      'Vite',
      'Git & GitHub',
      'Postman',
      'JWT & RBAC',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// HOW I WORK (Disciplines & Engineering Habits)
// ─────────────────────────────────────────────────────────────────────────────
const WORK_HABITS = [
  {
    title: 'Testing & Verification',
    badge: 'Code Quality',
    description:
      'Unit test core business logic and API contracts with Jest and Supertest. Test payment webhooks, queue state transitions, and edge cases with mock payloads before staging or production releases.',
  },
  {
    title: 'Code Review & Git Hygiene',
    badge: 'Collaboration',
    description:
      'Commit small, single-purpose branches with descriptive PR descriptions and architectural rationale. Enforce strict type-checking (tsc --noEmit), linting, and branch protection prior to merging.',
  },
  {
    title: 'Monitoring & Observability',
    badge: 'Reliability',
    description:
      'Implement structured request logging with correlation IDs, health-check endpoints, and queue metrics via BullMQ dashboards to spot bottlenecks and API latency spikes proactively.',
  },
  {
    title: 'Security & Defensive Habits',
    badge: 'Security',
    description:
      'Enforce cryptographic webhook signature verification (Stripe HMAC), short-lived JWTs with token rotation, rate limiting on public endpoints, and strict schema validation with input sanitization against injection.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FAQS (First Person & Verified Knowledge Graph)
// ─────────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Who is Diwakar Sharma?',
    a: 'I am a Full Stack Developer based in Surat, Gujarat, India with 2.5+ years of production experience building web applications and backend systems using Next.js, React, Node.js, Express, TypeScript, and PostgreSQL/MongoDB. I currently work as a Software Developer at Diamond Atelier.',
  },
  {
    q: 'What is your core technical stack?',
    a: 'My core stack centers on TypeScript, JavaScript (ES6+), React.js, Next.js, Node.js, Express.js, and Tailwind CSS on the full-stack tier, backed by PostgreSQL, Redis caching, BullMQ background queues, MongoDB, Stripe payment processing, Sharp media pipelines, and Docker containerization.',
  },
  // TODO: Clarify with Diwakar whether Diamond Atelier uses Strapi CMS or an in-house custom headless CMS. Wording kept neutral as "headless CMS" until confirmed.
  {
    q: 'What systems and companies have you engineered for?',
    a: 'I am currently a Software Developer at Diamond Atelier (diamondforest.com), where I own requirements end to end and distribute work among teammates to build our production diamond e-commerce platform and headless CMS. Previously, I developed WhatsApp automation and appointment booking platforms at Empiric Infotech LLP, and trained 200+ students in full-stack JavaScript while building LMS review modules at Masai School.',
  },
  {
    q: 'What is your availability and preferred work arrangement?',
    a: 'My notice period is 45 days (negotiable). I am actively seeking full-time Software Engineer and Full Stack Developer roles, and I am open to relocation in Noida / Delhi NCR as well as remote roles worldwide.',
  },
  {
    q: 'How can I get in touch or schedule an interview?',
    a: 'You can email me directly at diwakarsharma2216@gmail.com, book a 30-minute introductory call via my Cal.com link (https://cal.com/diwakar-sharma-ojozup/30min), connect with me on LinkedIn (https://www.linkedin.com/in/diwakarsharma-fullstackdev/), or review my code on GitHub (https://github.com/Diwakarsharma2216).',
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

  // Find flagship Diamond Atelier entry from single timeline
  const diamondTimeline = WORK_TIMELINE.find((w) => w.id === 'diamond-atelier')
  const otherWorkTimeline = WORK_TIMELINE.filter((w) => w.id !== 'diamond-atelier')

  return (
    <main className="container-narrow pt-8 sm:pt-14 pb-12 sm:pb-16">
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Kicker, Headline, Impact, Availability, Actions */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <Badge variant="accent" size="sm" dot>
                {env.role}
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                @diwakarsharma2216 &bull; {env.location} &bull; Open for work
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-normal tracking-tight text-[var(--text-primary)] mb-5 leading-[1.08] sm:leading-[1.06]">
              Diwakar Sharma <br />
              <span className="italic text-[var(--accent)] font-serif text-3xl sm:text-5xl lg:text-[3.5rem] block mt-1">
                Full Stack Developer.
              </span>
            </h1>

            {/*
              Hero Outcome-Focused Tagline Alternatives:
              Option 1: "I build e-commerce systems that stay fast: cached product listings in 200-400 ms with Redis, and a headless CMS that lets a 6-person content team publish live without developers." [SELECTED - specific, metrics-driven, supported by production facts]
              Option 2: "Full Stack Developer engineering fast, reliable commerce platforms — cutting cold catalog builds roughly 4x and automating payments with webhook-verified Stripe flows."
              Option 3: "Engineering high-throughput web applications with sub-second Redis caching, resilient Stripe checkout pipelines, and self-serve content architecture."
            */}
            {/* Hero Outcome-Focused Value Statement */}
            <div className="mb-6 max-w-xl space-y-2.5">
              <p className="text-base sm:text-lg text-[var(--text-primary)] font-sans leading-relaxed">
                I build high-performance e-commerce systems — fast storefronts, verified Stripe payment workflows, sub-second Redis caching, and headless CMS tooling that content teams run independently.
              </p>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                2.5+ years engineering production web applications across product and client teams with Next.js, React, Node.js, and PostgreSQL — owning features end-to-end from requirements to deployment.
              </p>
            </div>

            {/* Action Buttons: Primary Filled Resume, Secondary Book Call, Copy Email, Icon Links */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap overflow-x-auto py-1">
              <Button
                as="a"
                href={env.resumeUrl}
                download="Diwakar_Sharma_Resume.pdf"
                variant="primary"
                size="md"
                className="whitespace-nowrap shrink-0"
                title="Download Resume (PDF)"
              >
                <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
                  <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14H2.75z" />
                  <path d="M7.25 1.75v7.69L4.97 7.16a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 9.44V1.75a.75.75 0 0 0-1.5 0z" />
                </svg>
                <span>Download Resume (PDF)</span>
              </Button>

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
                variant="secondary"
                size="md"
                className="cursor-pointer whitespace-nowrap shrink-0"
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="opacity-90">
                  <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 0 1 4.75 0zm0 3.5H2.75a.25.25 0 0 0-.25.25V5h11V3.75a.25.25 0 0 0-.25-.25H11.25V4.5a.75.75 0 0 1-1.5 0V3.5h-5V4.5a.75.75 0 0 1-1.5 0V3.5zM2.5 6.5v7.75c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V6.5h-11z" />
                </svg>
                <span>Book a 30m Call</span>
              </Button>

              <Button
                type="button"
                onClick={copyEmail}
                variant="secondary"
                size="md"
                className="whitespace-nowrap shrink-0"
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
                    <span>Copy Email</span>
                  </>
                )}
              </Button>

              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                title="GitHub"
                className="inline-flex items-center justify-center w-10 h-10 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shrink-0"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>

              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shrink-0"
              >
                <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
            </div>

            {/* Proof Strip Under Buttons */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[var(--text-secondary)] mt-3.5 mb-4">
              <span className="font-medium text-[var(--text-primary)]">200-400 ms cached listings</span>
              <span className="text-[var(--text-muted)]">&bull;</span>
              <span className="font-medium text-[var(--text-primary)]">~4x faster cold build (52s to 13s)</span>
              <span className="text-[var(--text-muted)]">&bull;</span>
              <span className="font-medium text-[var(--text-primary)]">6-person team, no developer needed</span>
            </div>

            {/* Availability Box (Two Lines, No Trailing Dots, WCAG AA Contrast) */}
           
          </div>

          {/* Right Column: Generative Halftone Dither Canvas (Decorative Dot-Art) */}
          <div className="lg:col-span-4 flex items-center justify-center pt-6 lg:pt-0" aria-hidden="true">
            <DitherCanvas />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. CASE STUDY: DIAMOND ATELIER                             */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="case-study" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <h2 className="text-xs uppercase tracking-widest font-mono font-semibold text-[var(--text-primary)]">
              Diamond Atelier: Case Study
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Engagement Rings Performance &amp; Architecture
          </span>
        </div>

        <div className="p-6 sm:p-8 rounded-[12px] border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
          {/* Header & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)]">
                Production E-Commerce &bull; diamondforest.com &bull; {diamondTimeline?.period || 'Nov 2025–Present'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Cutting a Cold Product-Listing Build ~4x (~52s to ~13s) &amp; Headless CMS
              </h3>
            </div>
            {diamondTimeline?.projectUrl && (
              <a
                href={diamondTimeline.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--accent-text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors no-underline cursor-pointer"
              >
                <span>Live Site</span>
                <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                  <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>

          {/* Problem & Role Grid */}
          <div className="grid md:grid-cols-2 gap-6 py-6 border-b border-[var(--border-subtle)]">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                01 / The Problem
              </h4>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                The Engagement Rings page took 50+ seconds on a cold load because the server fetched and processed the whole ~5,000-product catalog for every request, priced every possible ring variation, and the browser fired dozens of background requests.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                02 / My Role &amp; Ownership
              </h4>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                I diagnosed the bottlenecks with timing breakdowns and led the fixes across both the backend and the storefront. I own requirements end to end: understand them, take responsibility for completing them, distribute work among teammates and collect their work.
              </p>
            </div>
          </div>

          {/* Key Architectural & Performance Decisions */}
          <div className="py-6 border-b border-[var(--border-subtle)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
              03 / Key Decisions &amp; Bottleneck Fixes
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  1. Filter in database, not in code
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  The query previously fetched all ~5,000 products and discarded most in a code loop. Pushed the filter into PostgreSQL by product view so only relevant rows (~800) are returned. No database schema changes were needed.
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  2. Price only what the card displays
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Card pricing computed ~1,260 price combinations per card (~25,200 for 20 cards) when the card only shows one price. Fixed by computing only the default price, cutting the pricing step from 19.8s down to 1.2–1.4s.
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  3. Share one in-flight build
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Identical simultaneous requests each ran a full build. Resolved by sharing one in-flight build between concurrent requests (3 simultaneous requests dropped from 39–50s down to 12.8s).
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  4. One request per scroll &amp; no speculative prefetching
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  The browser sent 19 speculative price-quote requests per interaction, plus dozens of background requests while scrolling. Reduced to 1 on-demand quote, restricted infinite scroll to 1 page at a time, and deferred search prefetching until idle.
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] sm:col-span-2">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  5. Headless CMS, Sharp Image Pipeline, Redis &amp; BullMQ
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Built a headless CMS so a 6-person content and graphics team manages site images and content without developer help. Images are served from the backend, compressed with Sharp, and cached in Redis. Also integrated Stripe with webhook verification and failure recovery, RBAC, S3-compatible media uploads, BullMQ background queues, and Docker CI/CD.
                </p>
              </div>
            </div>

            {/* Regression Catch Note */}
            <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs text-[var(--text-secondary)] font-sans">
              <span className="font-mono text-[var(--accent-text)] font-medium">Engineering Correctness: </span>
              I caught and fixed a regression where my filter dropped the catalog from 533 to 430 products, intentionally accepting a few seconds of extra load time to guarantee catalog correctness.
            </div>
          </div>

          {/* Simple Inline SVG Architecture Diagram */}
          <div className="py-6 border-b border-[var(--border-subtle)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
              04 / System Architecture Diagram
            </h4>
            <div className="w-full overflow-x-auto p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <svg
                viewBox="0 0 860 170"
                className="w-full min-w-[720px] h-auto text-[var(--text-primary)]"
                fill="none"
                role="img"
                aria-label="Diamond Atelier Architecture Flowchart Diagram"
              >
                {/* Browser Box */}
                <rect x="20" y="55" width="130" height="60" rx="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="85" y="82" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" fontWeight="bold">Browser</text>
                <text x="85" y="100" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">Client UI</text>

                {/* Arrow 1 */}
                <path d="M150 85 L200 85" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="175" y="78" textAnchor="middle" fill="#ea580c" fontSize="9" fontFamily="monospace">HTTPS</text>

                {/* Next.js Storefront Box */}
                <rect x="200" y="55" width="150" height="60" rx="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="275" y="80" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" fontWeight="bold">Next.js Storefront</text>
                <text x="275" y="98" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">1 req/scroll • Idle fetch</text>

                {/* Arrow 2 */}
                <path d="M350 85 L400 85" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="375" y="78" textAnchor="middle" fill="#ea580c" fontSize="9" fontFamily="monospace">REST</text>

                {/* Node.js Backend Box */}
                <rect x="400" y="45" width="160" height="80" rx="8" stroke="#ea580c" strokeWidth="1.5" fill="#ea580c" fillOpacity="0.08" />
                <text x="480" y="75" textAnchor="middle" fill="#ea580c" fontSize="12" fontFamily="monospace" fontWeight="bold">Node.js Backend</text>
                <text x="480" y="93" textAnchor="middle" fill="currentColor" fillOpacity="0.8" fontSize="10" fontFamily="monospace">In-Flight Deduplication</text>
                <text x="480" y="109" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">Headless CMS &amp; RBAC</text>

                {/* Arrows to Services */}
                <path d="M560 65 L630 35" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M560 78 L630 75" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M560 92 L630 115" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M560 105 L630 150" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />

                {/* PostgreSQL Box */}
                <rect x="630" y="12" width="210" height="42" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="735" y="30" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">PostgreSQL Database</text>
                <text x="735" y="45" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">View-Filtered (~800 rows)</text>

                {/* Redis Box */}
                <rect x="630" y="58" width="210" height="38" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="735" y="75" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Redis Cache</text>
                <text x="735" y="89" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">Catalog &amp; Session Store</text>

                {/* Sharp Box */}
                <rect x="630" y="100" width="210" height="38" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="735" y="117" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Sharp Media Pipeline</text>
                <text x="735" y="131" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">WebP / AVIF Compression</text>

                {/* BullMQ & Stripe Box */}
                <rect x="630" y="142" width="210" height="38" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="735" y="158" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">BullMQ &amp; Stripe Webhooks</text>
                <text x="735" y="172" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">Async Queues &amp; Verification</text>
              </svg>
            </div>
          </div>

          {/* Results Grid */}
          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
              05 / Measurable Results &amp; Metrics
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--accent)] block">~52s &rarr; ~13s</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Cold Build (~4x faster)</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Cache-off benchmark; production cached catalog: ~1.8s.</span>
              </div>

              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">Dozens &rarr; 1</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Requests per Scroll</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">1 request per scroll, no speculative background polling.</span>
              </div>

              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">19 &rarr; 1</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Speculative Quotes</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Replaced speculative queries with 1 on-demand quote.</span>
              </div>

              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">19.8s &rarr; 1.2–1.4s</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Pricing Step</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Eliminated ~25,200 variant calculations across 20 cards.</span>
              </div>

              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">39–50s &rarr; 12.8s</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">3 Concurrent Builds</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">In-flight build deduplication across concurrent requests.</span>
              </div>

              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">82.3%</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Sharp Image Compression</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">WebP/AVIF backend compression pipeline size reduction.</span>
              </div>

              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] sm:col-span-2 lg:col-span-2">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">~15/wk &rarr; 0</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Developer Content Requests</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Headless CMS lets a 6-person content and graphics team update site content directly.</span>
              </div>
            </div>

            {/* Honest note */}
            <div className="text-xs font-mono text-[var(--text-muted)] italic pt-1">
              Honest note: benchmarks were run locally with cache disabled on a dev server with a remote database.
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. FEATURED PROJECTS SECTION                               */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="projects" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
              Featured Projects
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Full-Stack Commerce &bull; Web Applications &bull; Systems Engineering
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
                01 / Work Experience &amp; Production Systems
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Diamond Atelier &bull; Empiric Infotech &bull; Masai School
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans mb-6 max-w-2xl">
            Enterprise platforms, commerce backends, and internal tooling engineered during full-time company employment. Rendered directly from single-source timeline data.
          </p>

          {/* Flagship: Diamond Atelier */}
          {diamondTimeline && (
            <div className="mb-6 p-6 sm:p-8 rounded-[10px] border border-[var(--border-strong)] bg-[var(--bg-surface)]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-[var(--accent-text)] uppercase tracking-wider">
                    {diamondTimeline.company}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">&bull;</span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">{diamondTimeline.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  {diamondTimeline.projectUrl && (
                    <a
                      href={diamondTimeline.projectUrl}
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
                    {diamondTimeline.role} &bull; Core Delivery
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <a
                  href={diamondTimeline.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 text-inherit no-underline"
                >
                  <h4 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    {diamondTimeline.projectTitle}
                  </h4>
                  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-3xl mb-6">
                {diamondTimeline.projectSummary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {diamondTimeline.skills.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Grid: Other Company Work (Internal Platforms rendered as Short Case Studies) */}
          <div className="grid sm:grid-cols-2 gap-6">
            {otherWorkTimeline.map((work) => (
              <div
                key={work.id}
                className="p-5 sm:p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col hover:border-[var(--border-strong)] transition-colors"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono uppercase border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]">
                        {work.company}
                      </span>
                      <span>&bull; {work.period}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Internal Case Study
                    </span>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-serif text-2xl text-[var(--text-primary)]">
                      {work.projectTitle}
                    </h4>
                  </div>

                  {work.caseStudy ? (
                    <div className="space-y-2.5 text-xs font-sans">
                      <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                        <span className="font-mono text-[var(--accent-text)] block font-semibold mb-1">
                          Problem
                        </span>
                        <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-xs">
                          {work.caseStudy.problem}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                          <span className="font-mono text-[var(--text-primary)] block font-semibold mb-1">
                            My Role
                          </span>
                          <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-[11px]">
                            {work.caseStudy.myRole}
                          </p>
                        </div>
                        <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                          <span className="font-mono text-[var(--text-primary)] block font-semibold mb-1">
                            Outcome
                          </span>
                          <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-[11px]">
                            {work.caseStudy.outcome}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                        <span className="font-mono text-[var(--accent-text)] block font-semibold mb-1">
                          What I Learned
                        </span>
                        <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-xs">
                          {work.caseStudy.learned}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                      {work.projectSummary}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
                  {work.skills.map((tech) => (
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
        {/* CATEGORY 2: PERSONAL PROJECTS & APPLICATION SUITE          */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pt-8 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                02 / Personal Projects &amp; Applications
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Full-Stack Commerce &bull; Web Applications &bull; Systems Engineering
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans mb-6 max-w-2xl">
            Full-stack commerce storefronts and production web applications built independently.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {PERSONAL_PROJECTS.map((proj) => {
              return (
                <div
                  key={proj.id}
                  className="p-5 sm:p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col hover:border-[var(--border-strong)] transition-colors"
                >
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                      <span className="text-[11px] font-mono text-[var(--accent-text)] uppercase tracking-wider font-medium">
                        {proj.category}
                      </span>

                      <div className="flex items-center gap-2.5">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors no-underline cursor-pointer py-0.5"
                            title="Open Live Link"
                          >
                            <span>Live</span>
                            <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                              <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                        {proj.repoUrl && (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors no-underline cursor-pointer py-0.5"
                            title="GitHub Repository"
                          >
                            <span>Repo</span>
                            <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-2 text-inherit no-underline max-w-full"
                        >
                          <h4 className="font-serif text-2xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] break-words">
                            {proj.title}
                          </h4>
                          <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                            <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                      ) : (
                        <h4 className="font-serif text-2xl text-[var(--text-primary)] break-words">
                          {proj.title}
                        </h4>
                      )}
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
                    {proj.skills.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. WORK EXPERIENCE SECTION (Action + Tech + Result)       */}
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
          {WORK_TIMELINE.map((exp) => (
            <div key={exp.id} className="py-6 sm:py-7 grid sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
              <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
                {exp.period}
              </div>
              <div className="sm:col-span-4">
                <span className="font-serif text-xl text-[var(--text-primary)]">{exp.company}</span>
                <span className="block text-xs font-mono text-[var(--accent-text)] mt-0.5">
                  {exp.role} &bull; {exp.location} ({exp.workplaceType})
                </span>
              </div>
              <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                <ul className="space-y-2 list-none p-0 m-0">
                  {exp.experienceBullets.map((bullet, idx) => (
                    <li key={idx} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[var(--accent)]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. EDUCATION SECTION                                       */}
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
                <span className="block text-xs font-mono text-[var(--text-muted)]">
                  {edu.degree}
                  {edu.note && (
                    <span className="block text-[var(--accent-text)] text-[11px] font-mono mt-0.5">
                      {edu.note}
                    </span>
                  )}
                </span>
              </div>
              <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
                {edu.coursework}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. CORE STACK & SKILLS (Strong / Working / Familiar)        */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="stack" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Core Stack &amp; Skills
          </h2>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Core &bull; Familiar &bull; Tools
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {SKILL_TIERS.map((tierGroup) => (
            <div key={tierGroup.tier} className="py-5 sm:py-6 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
              <div className="sm:col-span-3">
                <span className="text-xs font-mono text-[var(--accent-text)] tracking-wider uppercase">
                  {tierGroup.tier} Tier
                </span>
                <span className="block font-serif text-lg text-[var(--text-primary)] mt-0.5">
                  {tierGroup.badge}
                </span>
              </div>
              <div className="sm:col-span-5 flex flex-wrap gap-1.5">
                {tierGroup.skills.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="sm:col-span-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                {tierGroup.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 7. HOW I WORK (Engineering Quality & Habits)                */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="how-i-work" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            How I Work &bull; Engineering Discipline
          </h2>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Quality &bull; Security &bull; Reliability
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {WORK_HABITS.map((habit) => (
            <div
              key={habit.title}
              className="p-5 sm:p-6 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-lg text-[var(--text-primary)]">
                  {habit.title}
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[3px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-muted)]">
                  {habit.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                {habit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 8. FAQ & KNOWLEDGE GRAPH (First Person / Verified)         */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="faq" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            FAQ &bull; About Diwakar Sharma
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            First-Person Answers &bull; AEO
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
            Contact &amp; Logistics
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {env.email}
          </span>
        </div>

        {/* Hiring Logistics & Availability Block */}
        <div className="mb-8 p-5 sm:p-6 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-[var(--text-primary)]">
              Hiring Logistics &amp; Availability
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4 text-xs font-mono">
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Location &amp; Timezone:</span>
              <span className="text-[var(--text-primary)]">Surat, Gujarat, India &bull; UTC+5:30 (IST)</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Work Mode:</span>
              <span className="text-[var(--text-primary)]">Open to Onsite, Hybrid &amp; Remote roles</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Relocation Preference:</span>
              <span className="text-[var(--text-primary)]">Open to relocation (Noida / Delhi NCR) &bull; Worldwide remote</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Notice Period:</span>
              <span className="text-[var(--text-primary)]">[45 days / negotiable]</span>
            </div>
            <div className="sm:col-span-2 pt-1 border-t border-[var(--border-subtle)]">
              <span className="text-[var(--text-muted)] inline-block mr-2">English Proficiency:</span>
              <span className="text-[var(--text-primary)]">[Professional Working Proficiency / Fluent]</span>
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-2.5">
            Let&apos;s build together.
          </h3>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
            Open to full-time Software Engineer and Full Stack Developer roles. Whether you have an open requisition, team expansion, or architectural project to discuss, my inbox is open.
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
          </div>

          {/* Mailto fallback link */}
          <p className="text-xs font-mono text-[var(--text-muted)] mt-4">
            Direct email:{' '}
            <a
              href={`mailto:${env.email}`}
              className="text-[var(--accent-text)] underline hover:text-[var(--accent)] transition-colors"
            >
              {env.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
