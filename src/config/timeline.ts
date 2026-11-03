import { env } from './env'

export interface CaseStudyData {
  problem: string
  myRole: string
  stack: string[]
  outcome: string
  learned: string
  screenshotPlaceholder?: string
}

export interface WorkTimelineEntry {
  id: string
  company: string
  role: string
  period: string
  dateRange: {
    start: string
    end: string
  }
  location: string
  workplaceType: 'Onsite' | 'Remote' | 'Hybrid'
  isCurrent?: boolean

  // Project linkage
  projectTitle: string
  projectCategory: 'work'
  projectUrl?: string
  isPrivate: boolean
  privateNotice?: {
    badge: string
    summary: string
  }
  skills: string[]
  projectSummary: string

  // Short Case Study Card data (for internal/restricted platforms)
  caseStudy?: CaseStudyData

  // Action + Technology + Measurable result bullets
  experienceBullets: string[]
  highlight?: boolean
}

export interface PersonalProjectEntry {
  id: string
  title: string
  category: string
  liveUrl?: string
  repoUrl?: string
  isPrivateRepo?: boolean
  isPlaceholder?: boolean
  skills: string[]
  summary: string
  highlights: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  period: string
  note?: string
  coursework: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE TIMELINE SOURCE OF TRUTH (Dates & Roles can never diverge)
// ─────────────────────────────────────────────────────────────────────────────

export const WORK_TIMELINE: WorkTimelineEntry[] = [
  {
    id: 'diamond-atelier',
    company: 'Diamond Atelier',
    role: 'Software Developer',
    period: 'Nov 2025 – Present',
    dateRange: { start: 'Nov 2025', end: 'Present' },
    location: 'Surat',
    workplaceType: 'Onsite',
    isCurrent: true,
    projectTitle: 'Diamond E-Commerce Platform',
    projectCategory: 'work',
    projectUrl: env.projectLinks.diamondAtelier,
    isPrivate: false,
    skills: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'Stripe', 'Sharp'],
    projectSummary:
      'Production diamond e-commerce platform (diamondforest.com). I own requirements end to end and distribute work among teammates: built a headless CMS so a 6-person content and graphics team manages site images and content without developer help. Images are served from backend, compressed with Sharp, and cached in Redis. Integrated Stripe with webhook verification and failure recovery, RBAC, BullMQ queues, and Docker CI/CD.',
    experienceBullets: [
      'Diagnosed query and computation bottlenecks to cut cold product-listing build time roughly 4x (~52s to ~13s on benchmark; ~1.8s cached) by filtering rows in PostgreSQL (~5,000 to ~800 rows), computing single-card pricing (19.8s to 1.2–1.4s), and sharing in-flight builds.',
      'Architected a headless CMS enabling a 6-person content and graphics team to publish site media and catalog copy independently, reducing developer image-change tickets from ~15/week to 0.',
      'Integrated Stripe payment processing with cryptographic HMAC webhook verification, failure recovery queues via BullMQ, and backend image optimization with Sharp (measured 82.3% payload reduction) cached in Redis.',
    ],
    highlight: true,
  },
  {
    id: 'empiric-infotech',
    company: 'Empiric Infotech LLP',
    role: 'MERN Stack Developer',
    period: 'Apr 2024 – Oct 2025',
    dateRange: { start: 'Apr 2024', end: 'Oct 2025' },
    location: 'Surat',
    workplaceType: 'Onsite',
    projectTitle: 'WhatsApp & Booking Platform',
    projectCategory: 'work',
    isPrivate: true,
   
    skills: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Stripe', 'WAHA API'],
    projectSummary:
      'Internal appointment-booking system and automated communication platform at Empiric Infotech. Built scheduling REST APIs with admin-controlled access tiers, integrated the WAHA API into an internal WhatsApp platform for automated notifications, and implemented Stripe payment processing with automated refund workflows.',
    caseStudy: {
      problem:
        'Client scheduling collisions, manual notification delays, and manual payment dispute handling in customer booking workflows.',
      myRole:
        'Full-stack MERN Developer owning scheduling algorithm design, WhatsApp WAHA API integration, and Stripe webhook handling.',
      stack: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Stripe', 'WAHA API'],
      outcome:
        'Engineered collision-free booking APIs, automated thousands of monthly WhatsApp appointment alerts, and automated customer refund processing.',
      learned:
        'Designing idempotent webhook listeners, handling asynchronous messaging state failures gracefully, and enforcing granular role-based access control.',
      // screenshotPlaceholder: 'WhatsApp & Booking System Dashboard & Architecture',
    },
    experienceBullets: [
      'Engineered appointment-booking REST APIs using Node.js, Express, and MongoDB with atomic slot reservation algorithms, eliminating double-booking collisions across multi-provider schedules.',
      'Integrated the WAHA WhatsApp HTTP API into internal business workflows, automating client appointment confirmations, schedule change alerts, and staff reminders without manual intervention.',
      'Integrated Stripe checkout workflows with automated refund processing, idempotent webhook listeners, and receipt generation, streamlining payment recovery and resolving customer disputes automatically.',
    ],
  },
  {
    id: 'masai-school',
    company: 'Masai School',
    role: 'Associate Instructor & LMS Engineer',
    period: 'Oct 2023 – Mar 2024',
    dateRange: { start: 'Oct 2023', end: 'Mar 2024' },
    location: 'Remote',
    workplaceType: 'Remote',
    projectTitle: 'Masai LMS Assessment Module',
    projectCategory: 'work',
    isPrivate: true,
    skills: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'MongoDB', 'Tailwind CSS'],
    projectSummary:
      'Internal Learning Management System student review module for submission tracking, feedback collection, and review workflows. Trained 200+ students in full-stack JavaScript, React, and Node.js fundamentals, and conducted mock interview evaluations for developer role readiness.',
    caseStudy: {
      problem:
        'Manual grading bottlenecks, inconsistent rubric evaluations, and disconnected progress feedback across cohorts of 200+ full-stack students.',
      myRole:
        'Associate Instructor & LMS Module Developer responsible for student evaluation pipelines, code reviews, and mock technical interviews.',
      stack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'MongoDB', 'Tailwind CSS'],
      outcome:
        'Built centralized student code assessment module, streamlined cohort evaluation workflows, and mentored 200+ aspiring developers in full-stack JavaScript, React, and Node.js.',
      learned:
        'How to architect high-throughput assessment review workflows, formulate standardized rubric metrics, and mentor junior engineers through code review.',
    },
    experienceBullets: [
      'Mentored and trained 200+ students in full-stack JavaScript, React.js, Node.js, and RESTful architecture, conducting 50+ mock technical interviews with structured rubric evaluations.',
      'Engineered the student assessment and code review module in React.js and Node.js, centralizing rubric scoring and accelerating assignment grading workflows across cohorts of 200+ students.',
      'Designed automated submission tracking and structured feedback loops, providing actionable code improvements and increasing cohort assignment completion rates.',
    ],
  },
]

export const PERSONAL_PROJECTS: PersonalProjectEntry[] = [
  {
    id: 'drone-ecommerce',
    title: 'Drone E-Commerce Platform',
    category: 'Full Stack Commerce',
    liveUrl: env.projectLinks.droneEcommerce,
    repoUrl: 'https://github.com/Diwakarsharma2216/DjiAir',
    isPrivateRepo: false,
    skills: ['React.js', 'Vite', 'Tailwind CSS', 'Razorpay', 'Node.js', 'REST APIs'],
    summary:
      'A responsive drone e-commerce storefront built independently to practice complex payment workflows and interactive product specification comparisons. Engineered with modular component architecture, Razorpay checkout, and responsive styling (independent project with no DJI affiliation).',
    highlights: [
      'Architected high-performance drone commerce interface with interactive hardware catalog and variant filtering.',
      'Integrated Razorpay payment gateway with client/server transaction signature verification and error recovery.',
      'Engineered responsive catalog UI with client-side state persistence and real-time cart synchronization.',
    ],
  },
  {
    id: 'hevenly-heven',
    title: 'Hevenly Heven E-Commerce',
    category: 'Full Stack Commerce',
   
    // TODO: Confirm whether this repository (github.com/Diwakarsharma2216/overrated-chicken-3237) should remain public for recruiters or be marked private.
    isPrivateRepo: false,
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit'],
    summary:
      'Full-stack online shopping platform built with the MERN stack and Redux Toolkit. Engineered for product discovery with price/category faceted filtering, persistent cart state across browser sessions, and clean RESTful APIs.',
    highlights: [
      'Built multi-category catalog navigation with price/rating faceted search and pagination.',
      'Implemented centralized state management with Redux Toolkit for seamless cart persistence across sessions.',
      'Engineered RESTful API endpoints for user authentication, product querying, and order submission.',
    ],
  },
]

export const EDUCATION_TIMELINE: EducationEntry[] = [
  {
    id: 'manipal-university',
    institution: 'Manipal University Jaipur',
    degree: 'Bachelor of Computer Applications (BCA)',
    period: '2023 — 2026 (Completed)',
    note: 'Online (completed concurrently alongside full-time engineering work)',
    coursework:
      'Coursework: Data Structures & Algorithms, Object-Oriented Programming (C++, Java), DBMS, Operating Systems, Computer Networks.',
  },
  {
    id: 'masai-school-edu',
    institution: 'Masai School',
    degree: 'Full Stack Web Development (NSDC Certified)',
    period: 'Sep 2022 — Jun 2023',
    coursework:
      'Coursework: 1200+ hours practical curriculum focused on MERN Stack, Data Structures, Algorithms, and System Architecture.',
  },
  {
    id: 'mg-college',
    institution: 'Mahatma Gandhi Inter College',
    degree: 'Class XII – Science',
    period: 'Mar 2021 — Apr 2022',
    coursework: 'Science & Mathematics foundations (Physics, Mathematics, Chemistry).',
  },
]
