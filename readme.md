# Diwakar Sharma — Portfolio Data Repository & Single Source of Truth

> Complete, verified data repository for **[diwakarsharma2216.github.io](https://diwakarsharma2216.github.io/)**. Use the structured sections below to easily copy-paste verified metrics, case studies, experience bullets, and skill tags into job applications, resumes, LinkedIn profiles, and technical cover letters.

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-diwakarsharma2216.github.io-ea580c?style=flat&logo=googlechrome&logoColor=white)](https://diwakarsharma2216.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-diwakarsharma--fullstackdev-0077b5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diwakarsharma-fullstackdev/)
[![GitHub](https://img.shields.io/badge/GitHub-Diwakarsharma2216-181717?style=flat&logo=github&logoColor=white)](https://github.com/Diwakarsharma2216)
[![Book Call](https://img.shields.io/badge/Cal.com-Book_a_30m_Call-ea580c?style=flat&logo=calendar&logoColor=white)](https://cal.com/diwakar-sharma-ojozup/30min)
[![Download Resume](https://img.shields.io/badge/Resume-Download_PDF-2563eb?style=flat&logo=adobeacrobatreader&logoColor=white)](https://diwakarsharma2216.github.io/resume.pdf)

---

## Table of Contents
1. [Hiring Logistics & Quick Facts](#1-hiring-logistics--quick-facts)
2. [Recruiter Pitch & Bio Paragraphs](#2-recruiter-pitch--bio-paragraphs)
3. [Verified Production Proof Points](#3-verified-production-proof-points)
4. [Technical Competencies (7 Groups)](#4-technical-competencies-7-groups)
5. [Work Experience & Resume Bullets (Action + Tool + Result)](#5-work-experience--resume-bullets-action--tool--result)
6. [Work Systems Case Studies (Architectural Deep Dives)](#6-work-systems-case-studies-architectural-deep-dives)
7. [Personal Projects & Storefronts](#7-personal-projects--storefronts)
8. [Education & Academic Qualifications](#8-education--academic-qualifications)
9. [FAQ (Interview & Application Q&A)](#9-faq-interview--application-qa)

---

## 1. Hiring Logistics & Quick Facts

| Attribute | Details |
| :--- | :--- |
| **Name** | Diwakar Sharma |
| **Current Role** | Full Stack Developer |
| **Years of Experience** | 2.5+ Years (Commerce platforms, REST APIs, cloud queues, caching) |
| **Primary Location** | Surat, Gujarat, India (UTC+5:30) |
| **Relocation Preference** | Open to relocation in Noida / Delhi NCR & across India |
| **Work Modes** | Onsite / Hybrid / Remote worldwide |
| **Notice Period** | 45 days (negotiable) |
| **Email** | [diwakarsharma2216@gmail.com](mailto:diwakarsharma2216@gmail.com) |
| **Phone** | [+91 6394842216](tel:+916394842216) |
| **Calendar Booking** | [cal.com/diwakar-sharma-ojozup/30min](https://cal.com/diwakar-sharma-ojozup/30min) |
| **GitHub** | [github.com/Diwakarsharma2216](https://github.com/Diwakarsharma2216) |
| **LinkedIn** | [linkedin.com/in/diwakarsharma-fullstackdev](https://www.linkedin.com/in/diwakarsharma-fullstackdev/) |
| **Resume Link** | Drop your PDF into `public/resume.pdf` (serves at `/resume.pdf`) |

---

## 2. Recruiter Pitch & Bio Paragraphs
*(Copy-paste directly for cover letters, introductory emails, or portfolio bios)*

> **Paragraph 1 (What I do):**  
> I write the code behind online stores: storefronts, payment flows, queues, caching and the CMS teams use to run them.

> **Paragraph 2 (Breadth & Ownership):**  
> 2.5+ years across product-based and service-based companies, building with Next.js, React, Node.js, MongoDB and PostgreSQL, and owning features from requirements to production.

> **Paragraph 3 (Key Platforms Delivered):**  
> At Diamond Atelier, I shipped Stripe payments with webhook verification, BullMQ jobs, Redis caching, RBAC and a headless CMS. At Empiric Infotech, I built booking and WhatsApp platforms with Stripe refunds.

> **Paragraph 4 (Collaboration & Quality):**  
> I work directly with design, content and marketing teams, and build with SEO and analytics in mind.

> **Paragraph 5 (Status & Availability):**  
> Based in Surat, India. Open to full-time roles.

---

## 3. Verified Production Proof Points
*(Impact numbers defensible in technical and engineering-management interviews)*

- **`200–400 ms` cached listings:** Sub-second response time for high-traffic diamond jewelry catalog requests via Redis layer.
- **`~4x faster cold build (~52s → ~13s)`:** Benchmark cold catalog rebuild reduced roughly 4x by filtering rows in PostgreSQL (~5,000 to ~800 rows), computing single-card pricing, and sharing in-flight builds (production cached catalog: ~1.8s).
- **`19.8s → 1.2–1.4s` pricing calculation:** Eliminated ~25,200 redundant variant calculation calls across 20 catalog cards.
- **`82.3%` Sharp image compression:** Measured backend media compression pipeline reduction (WebP/AVIF format transcoding with Redis caching).
- **`~15/week → 0` developer image/content tickets:** Custom headless CMS empowered a 6-person content and graphics team to manage live site assets without developer tickets.
- **`200+` students trained:** Instructed and mentored 200+ students in full-stack JavaScript, React, and Node.js at Masai School, running 50+ mock interviews.

---

## 4. Technical Competencies (7 Groups)
*(Organized cleanly for resume "Technical Skills" sections)*

```
• Languages:             JavaScript (ES6+), TypeScript
  (Familiar with):       Java, C, C++
• Frontend:              React.js, Next.js (SSR/SSG/ISR), Redux, Context API, Tailwind CSS, HTML5, CSS3
• Backend:               Node.js, Express.js, REST APIs, JWT Auth, RBAC, Socket.IO, BullMQ, Sharp
• Databases & Cache:     PostgreSQL, MongoDB, Firebase, Redis, Typesense
• Cloud & DevOps:        AWS (EC2, S3), Cloudflare R2, Docker, CI/CD, Git, GitHub
• Product & Commerce:    Stripe, Razorpay, PostHog, CleverTap, Technical SEO
• Tools & Workflow:      Vite, Postman, Linux / Bash, npm, pnpm
```

---

## 5. Work Experience & Resume Bullets (Action + Tool + Result)
*(Tailored for ATS scanners and engineering managers: Action Verb + Technology + Measurable Impact)*

### **1. Diamond Atelier** &bull; Surat, Gujarat (Onsite)
**Software Developer** &bull; *Nov 2025 — Present*  
*Platform: Production Diamond E-Commerce Platform ([diamondforest.com](https://www.diamondforest.com/))*  
*Stack: Next.js, Node.js, PostgreSQL, Redis, BullMQ, Docker, Stripe, Sharp, Typesense*

- Diagnosed query and computation bottlenecks to cut cold product-listing build time roughly 4x (~52s to ~13s on benchmark; ~1.8s cached) by filtering rows in PostgreSQL (~5,000 to ~800 rows), computing single-card pricing (19.8s to 1.2–1.4s), and sharing in-flight builds.
- Architected a headless CMS enabling a 6-person content and graphics team to publish site media and catalog copy independently, reducing developer image-change tickets from ~15/week to 0.
- Integrated Stripe payment processing with cryptographic HMAC webhook verification, failure recovery queues via BullMQ, and backend image optimization with Sharp (measured 82.3% payload reduction) cached in Redis.

---

### **2. Empiric Infotech LLP** &bull; Surat, Gujarat (Onsite)
**MERN Stack Developer** &bull; *Apr 2024 — Oct 2025*  
*Platform: WhatsApp & Booking Platform (Internal Enterprise System)*  
*Stack: Node.js, Express.js, MongoDB, React.js, Stripe, WAHA API, Tailwind CSS*

- Engineered appointment-booking REST APIs using Node.js, Express, and MongoDB with atomic slot reservation algorithms, eliminating double-booking collisions across multi-provider schedules.
- Integrated the WAHA WhatsApp HTTP API into internal business workflows, automating client appointment confirmations, schedule change alerts, and staff reminders without manual intervention.
- Integrated Stripe checkout workflows with automated refund processing, idempotent webhook listeners, and receipt generation, streamlining payment recovery and resolving customer disputes automatically.

---

### **3. Masai School** &bull; Remote
**Associate Instructor & LMS Engineer** &bull; *Oct 2023 — Mar 2024*  
*Platform: Masai LMS Student Assessment Module (Internal Educational Tooling)*  
*Stack: React.js, Node.js, Express.js, JavaScript, MongoDB, Tailwind CSS*

- Mentored and trained 200+ students in full-stack JavaScript, React.js, Node.js, and RESTful architecture, conducting 50+ mock technical interviews with structured rubric evaluations.
- Engineered the student assessment and code review module in React.js and Node.js, centralizing rubric scoring and accelerating assignment grading workflows across cohorts of 200+ students.
- Designed automated submission tracking and structured feedback loops, providing actionable code improvements and increasing cohort assignment completion rates.

---

## 6. Work Systems Case Studies (Architectural Deep Dives)

### Case Study 1: Diamond E-Commerce Platform (diamondforest.com)
- **Problem:** Cold catalog builds on the diamond engagement rings page took ~52 seconds on cache-disabled benchmarks. Simultaneously, a 6-person content and graphics team constantly filed developer tickets for live site text and asset updates.
- **My Role & Ownership:** Full Stack Developer owning platform performance and technical requirements end-to-end. Profiled bottlenecks across PostgreSQL and Node.js, distributed work across teammates, and engineered the self-serve headless CMS.
- **Decisions & Implementation:**
  - Pushed variant filtering directly into PostgreSQL queries, cutting in-memory processing from ~5,000 to ~800 rows.
  - Eliminated speculative quote loops; calculated only the 20 visible card prices, dropping pricing execution from 19.8s down to 1.2–1.4s.
  - Shared in-flight catalog builds across concurrent user requests to stop server CPU spikes.
  - Automated Sharp WebP/AVIF backend transcoding pipeline cached in Redis.
  - Integrated Stripe checkout with cryptographic HMAC signature verification and BullMQ retry queues containerized with Docker CI/CD.
- **Results:**
  - `~52s → ~13s` Cold Build (~4x faster; ~1.8s cached)
  - `Dozens → 1` Requests per Scroll (no speculative polling)
  - `19.8s → 1.2–1.4s` Pricing step
  - `82.3%` Sharp image payload reduction

### Case Study 2: WhatsApp & Booking Platform (Empiric Infotech LLP)
- **Problem:** Client scheduling collisions, manual notification delays, and manual payment dispute handling in customer booking workflows.
- **My Role:** Full-stack MERN Developer owning scheduling algorithm design, WhatsApp WAHA API integration, and Stripe webhook handling.
- **Outcome:** Engineered collision-free booking APIs, automated thousands of monthly WhatsApp appointment alerts, and automated customer refund processing.
- **Engineering Insights:** Designing idempotent webhook listeners, handling asynchronous messaging state failures gracefully, and enforcing granular role-based access control (RBAC).

### Case Study 3: Masai LMS Assessment Module (Masai School)
- **Problem:** Manual grading bottlenecks, inconsistent rubric evaluations, and disconnected progress feedback across cohorts of 200+ full-stack students.
- **My Role:** Associate Instructor & LMS Module Developer responsible for student evaluation pipelines, code reviews, and mock technical interviews.
- **Outcome:** Built centralized student code assessment module, streamlined cohort evaluation workflows, and mentored 200+ aspiring developers in full-stack JavaScript, React, and Node.js.
- **Engineering Insights:** Architecting high-throughput code review workflows, formulating standardized evaluation rubrics, and mentoring junior engineers through structured pull-request reviews.

---

## 7. Personal Projects & Storefronts

### **1. Drone E-Commerce Platform**
- **Category:** Full Stack Commerce
- **Live URL:** [dji-air.vercel.app](https://dji-air.vercel.app/)
- **Repository:** [github.com/Diwakarsharma2216/DjiAir](https://github.com/Diwakarsharma2216/DjiAir)
- **Tech Stack:** React.js, Vite, Tailwind CSS, Razorpay, Node.js, REST APIs
- **Description:** A responsive drone e-commerce storefront built independently to practice complex payment workflows and interactive product specification comparisons. Engineered with modular component architecture, Razorpay checkout, and responsive styling (independent practice project with no DJI affiliation).
- **Core Highlights:**
  - High-performance catalog with interactive hardware comparisons and faceted spec filtering.
  - Razorpay payment gateway integration with client/server transaction signature verification and error recovery.
  - Responsive catalog UI with client-side state persistence and real-time cart synchronization.

### **2. Hevenly Heven E-Commerce Platform**
- **Category:** Full Stack Commerce
- **Live URL:** [hev-en.vercel.app](https://hev-en.vercel.app/)
- **Repository:** [github.com/Diwakarsharma2216/overrated-chicken-3237](https://github.com/Diwakarsharma2216/overrated-chicken-3237)
- **Tech Stack:** React.js, Node.js, Express.js, MongoDB, Tailwind CSS, Redux Toolkit
- **Description:** Full-stack online shopping platform built with the MERN stack and Redux Toolkit. Engineered for product discovery with price/category faceted filtering, persistent cart state across browser sessions, and clean RESTful APIs.
- **Core Highlights:**
  - Multi-category catalog navigation with price/rating faceted search and pagination.
  - Centralized state management with Redux Toolkit for seamless cart persistence across browser sessions.
  - RESTful API endpoints for user authentication, product querying, and order submission.

---

## 8. Education & Academic Qualifications

| Year | Institution | Degree / Program | Details |
| :--- | :--- | :--- | :--- |
| **2023 — 2026** *(Completed)* | **Manipal University Jaipur** | Bachelor of Computer Applications (BCA) | Online degree completed concurrently alongside full-time engineering work. Coursework: Data Structures & Algorithms, OOP (C++, Java), DBMS, Operating Systems, Computer Networks. |
| **Sep 2022 — Jun 2023** | **Masai School** | Full Stack Web Development (NSDC Certified) | 1200+ hours practical, intensive curriculum focused on MERN stack, Data Structures, Algorithms, and System Architecture. |
| **Mar 2021 — Apr 2022** | **Mahatma Gandhi Inter College** | Class XII – Science | Core foundation in Mathematics, Physics, and Chemistry. |

---

## 9. FAQ (Interview & Application Q&A)

#### Q1: Who is Diwakar Sharma?
> **A:** I am a Full Stack Developer based in Surat, Gujarat, India with 2.5+ years of production experience building commerce platforms, responsive storefronts, and backend systems using Next.js, React, Node.js, Express, TypeScript, and PostgreSQL/MongoDB.

#### Q2: What is your core technical stack?
> **A:** My core stack is TypeScript, JavaScript (ES6+), React.js, Next.js, Node.js, Express.js, and Tailwind CSS, backed by PostgreSQL, MongoDB, Redis caching, BullMQ background queues, Stripe payment processing, Sharp media pipelines, and Docker.

#### Q3: What systems have you engineered across your roles?
> **A:** At Diamond Atelier (diamondforest.com), I build production diamond e-commerce features and a headless CMS for our 6-person content team. At Empiric Infotech LLP, I developed appointment-booking REST APIs with RBAC and WAHA WhatsApp automation. At Masai School, I trained 200+ students in full-stack JavaScript and engineered our LMS student review module.

#### Q4: What is your current availability and work preference?
> **A:** My notice period is 45 days (negotiable). I am actively seeking full-time Software Engineer and Full Stack Developer roles, and I am open to relocation in Noida / Delhi NCR & across India, as well as remote roles worldwide.

---

## 10. Developer & Deployment Notes

- **Framework:** TanStack Start (Nitro + Vite + React 19 + Tailwind CSS)
- **Local Dev Server:** `pnpm dev` (runs at `localhost:3000`)
- **Static Build:** `pnpm build` (generates SSR static HTML to `.output/public`)
- **Deploy Command:** `pnpm deploy` (builds and pushes pre-rendered static site to `gh-pages` branch)
- **Deployment URL:** [https://diwakarsharma2216.github.io/](https://diwakarsharma2216.github.io/)
