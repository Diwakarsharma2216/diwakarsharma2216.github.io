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
    skills: ['Next.js', 'Node.js', 'Redis', 'BullMQ', 'Docker', 'Stripe', 'Sharp', 'Typesense'],
    projectSummary:
      'Production diamond e-commerce platform. I own requirements end to end and distribute work among teammates: built a headless CMS used by a 6-person content/graphics team, integrated Stripe payments with webhook verification, served compressed media via Sharp with Redis caching, and automated Docker CI/CD pipelines.',
    experienceBullets: [
      'Architected headless CMS using Next.js, Node.js, and MongoDB, decoupling content operations and enabling a 6-person content and graphics team to publish catalog assets [X hours/week faster] without developer assistance.',
      'Engineered backend media pipeline using Sharp image compression and S3/R2 storage with Redis caching, reducing image payloads by up to 82.3% and accelerating initial catalog load by [Y ms].',
      'Implemented Stripe payment gateway with cryptographically verified webhooks, idempotent retry mechanisms, and BullMQ background queues, processing [N orders/day] with a [99.X%] checkout success rate.',
      'Owned platform requirements end to end and distributed technical deliverables among teammates, establishing Docker containerization and automated CI/CD deployment pipelines.',
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
      'Engineered appointment booking REST APIs using Node.js and Express with conflict-free slot calculation algorithms, reducing booking collision errors to [0%] across [N daily appointments].',
      'Integrated WAHA WhatsApp HTTP API into internal workflow automation, dispatching [N automated notifications/month] for employee scheduling and client meeting reminders.',
      'Integrated Stripe checkout workflows with automated customer refund processing and PDF receipt generation, decreasing manual transaction disputes by [X%].',
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
      'Internal Learning Management System student review module for submission tracking, feedback collection, and review workflows. Mentored 200+ students in full-stack JavaScript, React, and Node.js fundamentals, and conducted mock interview evaluations for developer role readiness.',
    experienceBullets: [
      'Engineered student assessment submission module in React.js and Node.js, streamlining code grading workflows and reducing evaluation turnaround time by [X%] for 200+ students.',
      'Trained 200+ students in full-stack JavaScript, React, and Node.js architecture, conducting 50+ mock technical interviews with an [X%] curriculum completion rate.',
      'Designed structured feedback loops and automated progress tracking, increasing assignment completion rates by [X%].',
    ],
  },
]

export const PERSONAL_PROJECTS: PersonalProjectEntry[] = [
  {
    id: 'drone-ecommerce',
    title: 'Drone E-Commerce Platform',
    category: 'Full Stack Commerce',
    liveUrl: env.projectLinks.droneEcommerce,
    isPrivateRepo: true,
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
  {
    id: 'ai-evaluator',
    title: '[AI Project: Technical Interview & Evaluation Platform]',
    category: 'AI Integrations & Evaluation',
    isPlaceholder: true,
    skills: ['Next.js', 'OpenAI / Gemini API', 'Node.js', 'WebSockets', 'Tailwind CSS'],
    summary:
      '[Placeholder for AI project: Real-time technical interview simulator that generates dynamic coding challenges, analyzes algorithmic efficiency via LLM prompts, and produces structured candidate evaluation rubrics.]',
    highlights: [
      '[Engineered dynamic prompt pipeline integrating LLM APIs for automated code review and feedback generation.]',
      '[Built real-time WebSocket connection for streaming interview feedback with sub-[X00ms] latency.]',
      '[Integrated automated rubric scoring based on time/space complexity analysis and code hygiene.]',
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
