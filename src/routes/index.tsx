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
// TECHNICAL SKILLS (7 Tightened Groups — Defensible in Technical Interviews)
// ─────────────────────────────────────────────────────────────────────────────
interface SkillGroup {
  category: string
  skills: string[]
  familiarWith?: string[]
  note: string
}

const TECHNICAL_SKILLS_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript'],
    familiarWith: ['Java', 'C/C++'],
    note: 'Primary commercial languages for full-stack web and backend platforms.',
  },
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js (SSR/SSG/ISR)', 'Redux', 'Context API', 'Tailwind CSS', 'HTML5', 'CSS3'],
    note: 'Component architecture, state management, responsive styling, and rendering modes.',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT auth', 'RBAC', 'Socket.IO', 'BullMQ', 'Sharp'],
    note: 'RESTful API engineering, authentication tiers, background job queues, and media pipelines.',
  },
  {
    category: 'Databases & Cache',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Typesense'],
    note: 'Relational & document stores, sub-second cache layers, and search indexing.',
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3)', 'Cloudflare R2', 'Docker', 'CI/CD', 'Git/GitHub'],
    note: 'Containerization, cloud object storage pipelines, and continuous deployment.',
  },
  {
    category: 'Product & Commerce',
    skills: ['Stripe', 'Razorpay', 'PostHog', 'CleverTap', 'SEO'],
    note: 'Payment gateway integrations, customer analytics telemetry, and technical SEO structure.',
  },
  {
    category: 'Tools & Workflow',
    skills: ['Vite', 'Postman', 'Linux / Bash', 'npm / pnpm'],
    note: 'Developer toolchains, API test automation, and terminal environments.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FAQS (First Person & Verified Knowledge Graph — 4 Questions)
// ─────────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Who is Diwakar Sharma?',
    a: 'I am a Full Stack Developer based in Surat, Gujarat, India with 2.5+ years of production experience building commerce platforms, responsive storefronts, and backend systems using Next.js, React, Node.js, Express, TypeScript, and PostgreSQL/MongoDB.',
  },
  {
    q: 'What is your core technical stack?',
    a: 'My core stack is TypeScript, JavaScript (ES6+), React.js, Next.js, Node.js, Express.js, and Tailwind CSS, backed by PostgreSQL, MongoDB, Redis caching, BullMQ background queues, Stripe payment processing, Sharp media pipelines, and Docker.',
  },
  {
    q: 'What systems have you engineered across your roles?',
    a: 'At Diamond Atelier (diamondforest.com), I build production diamond e-commerce features and a headless CMS for our 6-person content team. At Empiric Infotech LLP, I developed appointment-booking REST APIs with RBAC and WAHA WhatsApp automation. At Masai School, I trained 200+ students in full-stack JavaScript and engineered our LMS student review module.',
  },
  {
    q: 'What is your current availability and work preference?',
    a: 'My notice period is 45 days (negotiable). I am actively seeking full-time Software Engineer and Full Stack Developer roles, and I am open to relocation in Noida / Delhi NCR as well as remote roles worldwide.',
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

  // Find flagship Diamond Atelier entry and secondary company systems
  const diamondTimeline = WORK_TIMELINE.find((w) => w.id === 'diamond-atelier')
  const otherWorkTimeline = WORK_TIMELINE.filter((w) => w.id !== 'diamond-atelier')

  return (
    <main className="container-narrow pt-8 sm:pt-14 pb-12 sm:pb-16">
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. SUMMARY (HERO) SECTION                                   */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="summary" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center min-w-0">
          {/* Left Column: Kicker, Headline, 5-Paragraph Summary, Actions */}
          <div className="lg:col-span-8 min-w-0 max-w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <Badge variant="accent" size="sm" dot>
                {env.role}
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                @diwakarsharma2216 &bull; {env.location} &bull; Open for work
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[4.25rem] font-normal tracking-tight text-[var(--text-primary)] mb-5 leading-[1.1] sm:leading-[1.06] break-words">
              Diwakar Sharma <br />
              <span className="italic text-[var(--accent)] font-serif text-2xl sm:text-4xl lg:text-[3.5rem] block mt-1">
                Full Stack Developer
              </span>
            </h1>

            {/* 5 Short Summary Paragraphs (Exact Recruiter Copy) */}
            <div className="space-y-3 mb-6 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
              <p>
                I write the code behind online stores: storefronts, payment flows, queues, caching and the CMS teams use to run them.
              </p>
              <p>
                3 years across product-based and service-based companies, building with Next.js, React, Node.js, MongoDB and PostgreSQL, and owning features from requirements to production.
              </p>
              <p>
                At Diamond Atelier, I shipped Stripe payments with webhook verification, BullMQ jobs, Redis caching, RBAC and a headless CMS. At Empiric Infotech, I built booking and WhatsApp platforms with Stripe refunds.
              </p>
              <p>
                I work directly with design, content and marketing teams, and build with SEO and analytics in mind.
              </p>
              
            </div>

            {/* Action Buttons: Download Resume, Book a 30m Call, Copy Email, Socials */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 py-1 min-w-0 max-w-full">
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
                <span>Download Resume</span>
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
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-mono text-[var(--text-secondary)] mt-3.5 mb-4 leading-normal">
              <span className="font-medium text-[var(--text-primary)]">200-400 ms cached listings</span>
              <span className="text-[var(--text-muted)] hidden sm:inline">&bull;</span>
              <span className="font-medium text-[var(--text-primary)]">~4x faster cold build (52s to 13s)</span>
              <span className="text-[var(--text-muted)] hidden sm:inline">&bull;</span>
              <span className="font-medium text-[var(--text-primary)]">6-person team, no developer needed</span>
            </div>
          </div>

          {/* Right Column: Generative Halftone Dither Canvas (Decorative Dot-Art) */}
          <div className="lg:col-span-4 min-w-0 max-w-full flex items-center justify-center pt-6 lg:pt-0" aria-hidden="true">
            <DitherCanvas />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. TECHNICAL SKILLS SECTION (7 Tightened Competencies)     */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="skills" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6 gap-1 sm:gap-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Technical Skills
          </h2>
          
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {TECHNICAL_SKILLS_GROUPS.map((group) => (
            <div key={group.category} className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
              <div className="sm:col-span-3">
                <span className="font-serif text-lg text-[var(--text-primary)] block">
                  {group.category}
                </span>
                <span className="text-[11px] font-sans text-[var(--text-muted)] block mt-0.5">
                  {group.note}
                </span>
              </div>
              <div className="sm:col-span-9 flex flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {group.familiarWith && group.familiarWith.length > 0 && (
                  <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2 pt-0.5">
                    <span className="italic text-[11px]">Familiar with:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.familiarWith.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-[3px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. WORK EXPERIENCE SECTION (Timeline & 2-3 Action Bullets) */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="experience" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6 gap-1 sm:gap-4">
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
      {/* 4. CASE STUDIES (Work Systems Only)                        */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="case-studies" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6 gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <h2 className="text-xs uppercase tracking-widest font-mono font-semibold text-[var(--text-primary)]">
              Case Studies
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Production Work Systems &bull; Architectural Deep Dives
          </span>
        </div>

        {/* 1. Flagship Deep Dive: Diamond Atelier */}
        <div className="mb-8 p-6 sm:p-8 rounded-[12px] border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)]">
                Production E-Commerce &bull; diamondforest.com &bull; Nov 2025–Present
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Diamond E-Commerce Platform
              </h3>
            </div>
            {diamondTimeline?.projectUrl && (
              <a
                href={diamondTimeline.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--accent-text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors no-underline cursor-pointer"
                title="Visit Diamond Forest"
              >
                <span>Live Platform</span>
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                  <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>

          {/* Structured Problem, Role, Decisions, Results Grid */}
          <div className="grid sm:grid-cols-2 gap-4 py-6 border-b border-[var(--border-subtle)]">
            <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] block font-semibold mb-1.5">
                01 / The Challenge
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed m-0">
                Cold catalog builds on the diamond engagement rings page took ~52 seconds on cache-disabled benchmarks. Simultaneously, a 6-person content and graphics team constantly filed developer tickets for live site text and asset updates.
              </p>
            </div>

            <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] block font-semibold mb-1.5">
                02 / My Role &amp; Ownership
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed m-0">
                Full Stack Developer owning platform performance and technical requirements end-to-end. Profiled bottlenecks across PostgreSQL and Node.js, distributed work across teammates, and engineered the self-serve headless CMS.
              </p>
            </div>

            <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] block font-semibold mb-1.5">
                03 / What I Built &amp; Decisions
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed m-0">
                Pushed filtering into PostgreSQL (~5k to ~800 rows), computed only displayed card prices (pricing step from 19.8s to 1.2–1.4s), shared in-flight catalog builds across concurrent requests, and automated backend image compression with Sharp &amp; Redis.
              </p>
            </div>

            <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)] block font-semibold mb-1.5">
                04 / Payments &amp; Resilience
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed m-0">
                Integrated Stripe checkout with cryptographic HMAC webhook verification, failure retry idempotency, and BullMQ background queues, containerized with Docker CI/CD.
              </p>
            </div>
          </div>

          {/* Architecture Diagram SVG */}
          <div className="pt-6 pb-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Architecture Overview
            </h4>
            <div className="w-full min-w-0 max-w-full overflow-x-auto p-3 sm:p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <div className="text-[11px] font-mono text-[var(--text-muted)] sm:hidden mb-2 flex items-center gap-1">
                <span>&larr; Scroll architecture diagram &rarr;</span>
              </div>
              <svg
                viewBox="0 0 850 190"
                className="w-full min-w-[720px] h-auto text-[var(--text-primary)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Client Browser */}
                <rect x="10" y="55" width="130" height="60" rx="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="75" y="80" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" fontWeight="bold">Browser Client</text>
                <text x="75" y="98" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">Single Price Quote</text>

                {/* Arrow 1 */}
                <path d="M140 85 L200 85" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" markerEnd="url(#arrow)" />

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
          <div className="pt-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Measurable Results &amp; Metrics
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-4 min-w-0">
              <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-lg sm:text-xl font-serif text-[var(--accent)] block">~52s &rarr; ~13s</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Cold Build (~4x faster)</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Cache-off benchmark; production cached: ~1.8s.</span>
              </div>

              <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-lg sm:text-xl font-serif text-[var(--text-primary)] block">Dozens &rarr; 1</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Requests per Scroll</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">1 request per scroll, no background polling.</span>
              </div>

              <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-lg sm:text-xl font-serif text-[var(--text-primary)] block">19.8s &rarr; 1.2–1.4s</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Pricing Calculation</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Eliminated ~25,200 variant calls across 20 cards.</span>
              </div>

              <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-lg sm:text-xl font-serif text-[var(--text-primary)] block">82.3%</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Sharp Compression</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">WebP/AVIF backend media size reduction.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {diamondTimeline?.skills.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Secondary Work Systems Case Studies: Empiric Infotech & Masai School */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
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
                        Engineering Insights
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

              <div className="mt-auto pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5 shrink-0">
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
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. PERSONAL PROJECTS SECTION                               */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="projects" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6 gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <h2 className="text-xs uppercase tracking-widest font-mono font-semibold text-[var(--text-primary)]">
              Personal Projects
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Independent Applications &bull; Storefronts &amp; Tooling
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
          {PERSONAL_PROJECTS.map((proj) => (
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
                  <h4 className="font-serif text-2xl text-[var(--text-primary)]">
                    {proj.title}
                  </h4>
                </div>

                <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              <div className="mt-auto pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
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
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. EDUCATION SECTION                                       */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="education" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6 gap-1 sm:gap-4">
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
      {/* 7. FAQ (First-Person Verified Answers)                      */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="faq" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6 gap-1 sm:gap-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            FAQ
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            First-Person Answers &bull; 4 Key Questions
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
      {/* 8. CONTACT SECTION                                         */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6 gap-1 sm:gap-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Contact
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {env.email}
          </span>
        </div>

        {/* Small Availability Line */}
       
        <div className="max-w-xl">
          <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-2.5">
            Let&apos;s build together.
          </h3>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
            Open to full-time Software Engineer and Full Stack Developer roles. Whether you have an open requisition, team expansion, or architectural project to discuss, my inbox is open.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
            <Button
              as="a"
              href={env.resumeUrl}
              download="Diwakar_Sharma_Resume.pdf"
              variant="primary"
              size="md"
              title="Download Resume (PDF)"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
                <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14H2.75z" />
                <path d="M7.25 1.75v7.69L4.97 7.16a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 9.44V1.75a.75.75 0 0 0-1.5 0z" />
              </svg>
              <span>Download Resume</span>
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
              className="cursor-pointer"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M4.75 0a.75.75 0 0 1 .75.75V2h5V.75a.75.75 0 0 1 1.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 0 1 4.75 0zm0 3.5H2.75a.25.25 0 0 0-.25.25V5h11V3.75a.25.25 0 0 0-.25-.25H11.25V4.5a.75.75 0 0 1-1.5 0V3.5h-5V4.5a.75.75 0 0 1-1.5 0V3.5zM2.5 6.5v7.75c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V6.5h-11z" />
              </svg>
              <span>Book a 30m Call</span>
            </Button>

            <Button
              type="button"
              onClick={copyEmail}
              variant="secondary"
              size="md"
            >
              {copied ? 'Copied!' : 'Copy Email'}
            </Button>

            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[6px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors no-underline"
              title="GitHub Profile"
            >
              GitHub
            </a>

            <a
              href={SITE_CONFIG.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[6px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors no-underline"
              title="LinkedIn Profile"
            >
              LinkedIn
            </a>
          </div>

          {/* Mailto Fallback Link (No redundant Open in Mail App button) */}
          <p className="text-xs font-mono text-[var(--text-muted)] mt-4">
            Prefer direct email? Write to{' '}
            <a
              href={SITE_CONFIG.links.email}
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
