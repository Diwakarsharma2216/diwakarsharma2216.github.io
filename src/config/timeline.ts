import { env } from './env'

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
      'Diagnosed query and computation bottlenecks to cut cold product-listing build time roughly 4x (~52s to ~13s on cache-disabled benchmark; production ~1.8s cached) by filtering in PostgreSQL (~5,000 to ~800 rows), pricing only displayed cards (19.8s to 1.2–1.4s), and sharing in-flight builds (3 requests: 39–50s to 12.8s).',
      'Architected headless CMS so a 6-person content and graphics team manages site images and content without developer help, reducing developer image-change tickets from ~15/week to 0.',
      'Engineered backend media pipeline serving images compressed with Sharp and cached in Redis, decreasing image payloads by up to 82.3% and accelerating catalog rendering.',
      'Implemented Stripe payment gateway with cryptographic webhook verification, idempotent retry recovery, and BullMQ background queues, processing high-volume checkout with 99.9% webhook verification and transaction reliability.',
      'Owned requirements end to end: understood specifications, took full delivery responsibility, distributed tasks among teammates, and established Docker CI/CD deployment pipelines.',
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
    privateNotice: {
      badge: 'Private Enterprise Project',
      summary:
        'Proprietary internal platform engineered for staff scheduling, appointment booking, and WhatsApp notifications via WAHA API. Source code and live production environment restricted under company NDA.',
    },
    skills: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Stripe', 'WAHA API'],
    projectSummary:
      'Internal appointment-booking system and automated communication platform at Empiric Infotech. Built scheduling REST APIs with admin-controlled access tiers, integrated the WAHA API into an internal WhatsApp platform for automated notifications, and implemented Stripe payment processing with automated refund workflows.',
    experienceBullets: [
      'Engineered appointment booking REST APIs using Node.js and Express with conflict-free slot calculation algorithms, eliminating scheduling collisions across high-volume daily appointments.',
      'Integrated WAHA WhatsApp HTTP API into internal workflow automation, dispatching thousands of automated notifications monthly for employee scheduling and client meeting reminders.',
      'Integrated Stripe checkout workflows with automated customer refund processing and PDF receipt generation, eliminating manual dispute handling.',
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
    privateNotice: {
      badge: 'Private Educational Platform',
      summary:
        'Internal LMS infrastructure engineered for evaluating student code submissions, rubric scoring, and mentor feedback tracking. Enterprise internal tooling not publicly accessible.',
    },
    skills: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'MongoDB', 'Tailwind CSS'],
    projectSummary:
      'Internal Learning Management System student review module for submission tracking, feedback collection, and review workflows. Trained 200+ students in full-stack JavaScript, React, and Node.js fundamentals, and conducted mock interview evaluations for developer role readiness.',
    experienceBullets: [
      'Trained 200+ students in full-stack JavaScript, React.js, and Node.js architecture, conducting 50+ mock technical interviews with high student placement readiness.',
      'Engineered student assessment submission module in React.js and Node.js, streamlining code grading workflows and significantly accelerating evaluation turnaround time for 200+ students.',
      'Designed structured feedback loops and automated progress tracking, increasing assignment submission consistency and timely rubric reviews.',
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
      'Modern drone e-commerce storefront showcasing premium DJI aerial systems and camera hardware. Engineered with interactive product showcases, dynamic specification comparisons, cart management, and seamless Razorpay payment gateway integration for real-time order transactions.',
    highlights: [
      'Architected high-performance drone commerce interface with interactive DJI hardware catalog and variant filtering.',
      'Integrated Razorpay payment gateway with client/server transaction signature verification and error recovery.',
      'Engineered responsive catalog UI with client-side state persistence and real-time cart synchronization.',
    ],
  },
  {
    id: 'hevenly-heven',
    title: 'Hevenly Heven E-Commerce',
    category: 'Full Stack Commerce',
    liveUrl: env.projectLinks.hevenlyHeven,
    repoUrl: 'https://github.com/Diwakarsharma2216/overrated-chicken-3237',
    isPrivateRepo: false,
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit'],
    summary:
      'Full-stack online shopping platform designed for product discovery, faceted filtering, cart persistence via Redux Toolkit, and seamless transaction checkout. Built with modular component architecture, responsive styling, and clean RESTful APIs.',
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
    period: '2023 — 2026',
    note: 'Online (while working full-time)',
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
