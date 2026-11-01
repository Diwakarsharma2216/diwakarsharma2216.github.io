import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import DitherCanvas from '../components/DitherCanvas'

import { SITE_CONFIG } from '../config/seo'
import { env } from '../config/env'

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

const TECH_STACK_CATEGORIES = [
  {
    number: '01',
    category: 'LANGUAGES',
    title: 'Core Programming',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'C', 'C++'],
    description:
      'Strong algorithmic foundations with deep production expertise in TypeScript, JavaScript (ES6+), Java, and system concepts in C/C++.',
  },
  {
    number: '02',
    category: 'FRONTEND',
    title: 'UI & Web Architecture',
    skills: [
      'React.js',
      'Next.js (SSR/SSG/ISR)',
      'Redux',
      'Context API',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'Responsive Design',
    ],
    description:
      'Production-grade user interfaces with Next.js rendering strategies, predictive state management, accessible component architectures, and responsive design.',
  },
  {
    number: '03',
    category: 'BACKEND',
    title: 'APIs & Services',
    skills: [
      'Node.js',
      'Express.js',
      'REST API Design',
      'JWT Authentication',
      'Socket.IO',
      'Strapi CMS',
      'BullMQ',
      'Sharp',
    ],
    description:
      'High-throughput RESTful endpoints, robust JWT/RBAC security, real-time WebSockets, headless CMS integrations, and distributed background processing.',
  },
  {
    number: '04',
    category: 'DATABASES & CACHE',
    title: 'Storage & Search',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Firebase (Firestore & Realtime)',
      'Redis',
      'Typesense',
    ],
    description:
      'Relational and NoSQL schema design, real-time cloud data sync, aggressive Redis caching, and instant typo-tolerant full-text search indexing.',
  },
  {
    number: '05',
    category: 'CLOUD & DEVOPS',
    title: 'Infrastructure & CI/CD',
    skills: [
      'AWS (EC2, S3)',
      'Docker',
      'Firebase Hosting',
      'Cloudflare R2',
      'Git & GitHub',
      'CI/CD Pipelines',
      'Agile / Scrum',
    ],
    description:
      'Scalable cloud infrastructure on AWS and Cloudflare, containerized services with Docker, automated deployment pipelines, and agile delivery.',
  },
  {
    number: '06',
    category: 'PRODUCT & COMMERCE',
    title: 'SaaS & Analytics',
    skills: [
      'SaaS Development',
      'Stripe',
      'Razorpay',
      'PostHog',
      'CleverTap',
      'SEO Optimization',
    ],
    description:
      'Payment gateway integrations with automated webhook recovery, event-driven user telemetry with PostHog and CleverTap, and high-ranking SEO/AEO.',
  },
  {
    number: '07',
    category: 'CORE CS & SYSTEMS',
    title: 'Computer Science',
    skills: [
      'Data Structures & Algorithms',
      'System Design',
      'OOP',
      'Geolocation APIs',
      'XLSX / CSV Export',
    ],
    description:
      'Robust algorithmic problem solving, object-oriented design patterns, distributed architecture, geospatial mapping, and high-volume data export utilities.',
  },
]

const FAQS = [
  {
    q: 'Who is Diwakar Sharma (diwakarsharma)?',
    a: 'Diwakar Sharma (known online as diwakarsharma and diwakarsharma2216) is a Full Stack Developer based in Surat, Gujarat, India with 2.5+ years of experience engineering scalable web applications using Next.js, React, Node.js, Express, TypeScript, and cloud services. He currently serves as Software Developer at Diamond Atelier.',
  },
  {
    q: "What are Diwakar Sharma's primary technical skills?",
    a: 'Diwakar specializes in Next.js, React 19, TypeScript, JavaScript, Node.js, Express.js, MongoDB, PostgreSQL, Redis caching, BullMQ background queues, Docker, AWS S3, Cloudflare Workers, and Stripe payment processing.',
  },
  {
    q: 'What companies and production systems has Diwakar worked on?',
    a: 'Diwakar is currently Software Developer at Diamond Atelier building a production diamond e-commerce platform and custom headless CMS. Previously, he developed WhatsApp automation & appointment booking platforms at Empiric Infotech LLP and mentored 200+ developers while building LMS review modules at Masai School.',
  },
  {
    q: 'How can I contact or book a meeting with Diwakar Sharma?',
    a: 'You can email Diwakar at diwakarsharma2216@gmail.com, book a 30-minute consultation call on Cal.com (https://cal.com/diwakar-sharma-ojozup/30min), connect on LinkedIn (https://www.linkedin.com/in/diwakarsharma-fullstackdev/), or explore his open-source work on GitHub (https://github.com/Diwakarsharma2216).',
  },
]

function PortfolioPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    (async function () {
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
                {env.role}
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                @diwakarsharma2216 &bull; {env.location} &bull; Open for work
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-normal tracking-tight text-[var(--text-primary)] mb-5 leading-[1.08] sm:leading-[1.06]">
              Diwakar Sharma <br />
              <span className="italic text-[var(--accent)] font-serif text-3xl sm:text-5xl lg:text-[3.5rem] block mt-1">
                Full Stack Developer & Architect.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-7 max-w-xl">
              Engineering clean architecture and scalable cloud systems. Full Stack Developer (<strong className="text-[var(--text-primary)] font-medium">diwakarsharma</strong>) with 2.5+ years of experience building and shipping web applications using Next.js, React, Node.js, and Express. Strong in backend development, commerce workflows, authentication, payments, background queues, and cloud deployment. Currently at <span className="text-[var(--text-primary)] font-medium">Diamond Atelier</span> engineering a production diamond e-commerce platform.
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

        {/* Flagship Feature: Diamond Atelier */}
        <div className="mb-8 p-6 sm:p-8 rounded-[10px] border border-[var(--border-strong)] bg-[var(--bg-surface)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-[var(--accent-text)] uppercase tracking-wider">
                Diamond Atelier
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">&bull;</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">Nov 2025–Present</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={env.projectLinks.diamondAtelier}
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
              <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[var(--bg-canvas)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                Software Developer &bull; Core Platform Delivery
              </span>
            </div>
          </div>

          <div className="mb-3">
            <a
              href={env.projectLinks.diamondAtelier}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 text-inherit no-underline"
            >
              <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                Diamond E-Commerce Platform
              </h3>
              <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-3xl mb-6">
            Production diamond e-commerce platform. Owned feature delivery end-to-end: built a headless CMS enabling a six-person content team to manage website assets without developer intervention, integrated Stripe payments with webhook verification & failure recovery, designed RBAC authentication, implemented S3-compatible media uploads with Sharp image compression, and scaled performance using Redis caching, BullMQ background queues, and Docker CI/CD pipelines.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {['Next.js', 'Node.js', 'Redis', 'BullMQ', 'Docker', 'Stripe', 'Sharp', 'Typesense'].map(
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
          {/* WhatsApp & Booking Platform */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>Backend & Commerce &bull; Apr 2024–Oct 2025</span>
                <a
                  href={env.projectLinks.whatsappBooking}
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
              </div>
              <div className="mb-2">
                <a
                  href={env.projectLinks.whatsappBooking}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-inherit no-underline"
                >
                  <h3 className="font-serif text-2xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    WhatsApp & Booking Platform
                  </h3>
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                Expert appointment-booking system and communication platform at Empiric Infotech. Implemented end-to-end Stripe payment processing with refund workflows, integrated the WAHA API into an internal WhatsApp platform for automated employee and group messaging, and developed scheduling REST APIs with admin-controlled access tiers.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Stripe', 'WAHA API'].map(
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

          {/* Masai LMS Assessment Module */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>EdTech & Workflow &bull; Oct 2023–Mar 2024</span>
                <a
                  href={env.projectLinks.masaiLms}
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
              </div>
              <div className="mb-2">
                <a
                  href={env.projectLinks.masaiLms}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-inherit no-underline"
                >
                  <h3 className="font-serif text-2xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    Masai LMS Assessment Module
                  </h3>
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                Engineered the Learning Management System student review module for submission tracking, feedback collection, and review workflows. Mentored 200+ students in full-stack JavaScript, React, and Node.js fundamentals, and conducted mock interview evaluations for developer role readiness.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['React.js', 'Node.js', 'Express.js', 'JavaScript', 'MongoDB', 'Tailwind CSS'].map(
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

          {/* AI Interview Platform */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>AI & Full Stack &bull; Open Source</span>
                <a
                  href={env.projectLinks.aiInterview}
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
              </div>
              <div className="mb-2">
                <a
                  href={env.projectLinks.aiInterview}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-inherit no-underline"
                >
                  <h3 className="font-serif text-2xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    AI Interview Platform
                  </h3>
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                Full-stack MERN platform built for interactive technical interview practice. Features JWT user authentication, OpenAI API integration for automated question generation and response evaluation, a real-time scoring system, and admin controls.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'Tailwind CSS'].map(
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

          {/* Hevenly Heven E-Commerce */}
          <div className="p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span>Retail & E-Commerce &bull; Full Stack</span>
                <a
                  href={env.projectLinks.hevenlyHeven}
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
              </div>
              <div className="mb-2">
                <a
                  href={env.projectLinks.hevenlyHeven}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-inherit no-underline"
                >
                  <h3 className="font-serif text-2xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    Hevenly Heven E-Commerce
                  </h3>
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                Full-stack online shopping platform designed for product discovery, facet filtering, cart management, and seamless transaction checkout. Built with modular component architecture, state management, and responsive styling.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
              {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs'].map(
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
            Work Experience
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Career Timeline &bull; 2.5+ Years
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {/* Diamond Atelier */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              Nov 2025 — Present
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Diamond Atelier</span>
              <span className="block text-xs font-mono text-[var(--accent-text)]">Software Developer &bull; Surat (Onsite)</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              Own feature delivery end-to-end: built a headless CMS for independent content management, Stripe webhook payment processing, RBAC authorization, S3/R2 media uploads with Sharp compression, Redis caching, BullMQ queues, and Docker CI/CD.
            </div>
          </div>

          {/* Empiric Infotech LLP */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              Apr 2024 — Oct 2025
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Empiric Infotech LLP</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">MERN Stack Developer &bull; Surat (Onsite)</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              Implemented end-to-end Stripe payment processing with refund handling, integrated the WAHA API into an internal WhatsApp platform for targeted messaging, and developed REST APIs for an appointment-booking system with RBAC.
            </div>
          </div>

          {/* Masai School - Experience */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              Oct 2023 — Mar 2024
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Masai School</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">Associate Instructor &bull; Remote</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              Trained 200+ students in JavaScript, React.js, and Node.js fundamentals. Built the LMS student review module for submission tracking, feedback, and review workflows; conducted mock full-stack interviews.
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* EDUCATION SECTION                                          */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="education" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Education
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Academic & Certifications
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {/* Manipal University Jaipur - Education */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              2023 — 2026
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Manipal University Jaipur</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">Bachelor of Computer Applications (BCA)</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
              Coursework: DSA, OOP (C++, Java), Python, DBMS, Operating Systems, Computer Networks.
            </div>
          </div>

          {/* Masai School - Education */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              Sep 2022 — Jun 2023
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Masai School</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">Full Stack Web Development (NSDC Certified)</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
              Coursework: Data Structures & Algorithms, React.js, Redux, Node.js fundamentals.
            </div>
          </div>

          {/* Mahatma Gandhi Inter College */}
          <div className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
            <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
              Mar 2021 — Apr 2022
            </div>
            <div className="sm:col-span-4">
              <span className="font-serif text-lg text-[var(--text-primary)]">Mahatma Gandhi Inter College</span>
              <span className="block text-xs font-mono text-[var(--text-muted)]">Class XII – Science</span>
            </div>
            <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
              Science & Mathematics foundations.
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* CORE STACK SECTION                                         */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="stack" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Core Stack &amp; Skills
          </h2>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Technical Specification &bull; Production
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {TECH_STACK_CATEGORIES.map((group) => (
            <div key={group.category} className="py-5 sm:py-6 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
              <div className="sm:col-span-3">
                <span className="text-xs font-mono text-[var(--accent-text)] tracking-wider">
                  {group.number} / {group.category}
                </span>
                <span className="block font-serif text-lg text-[var(--text-primary)] mt-0.5">
                  {group.title}
                </span>
              </div>
              <div className="sm:col-span-5 flex flex-wrap gap-1.5">
                {group.skills.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
                  >
                    {tech}
                  </span>
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
      {/* FAQ & KNOWLEDGE GRAPH (AEO / AGENT SEARCH OPTIMIZED)       */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="faq" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            FAQ &bull; About Diwakar Sharma
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            AEO & Quick Facts
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
      {/* CONTACT SECTION                                            */}
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
            Open to full-time engineering roles and collaborative projects. Whether you have an open position or a system architecture to discuss, my inbox is open.
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
