# PLACEHOLDERS.md — Production Metrics & Hiring Data Checklist

This document tracks every placeholder on **[diwakarsharma2216.github.io](https://diwakarsharma2216.github.io/)** that requires your real-world metrics. No numbers have been fabricated. Update these values in `src/config/timeline.ts` and `src/routes/index.tsx` as you gather verified production data.

---

## 1. Diamond Atelier (Software Developer)
*Platform: Diamond E-Commerce Platform ([diamondforest.com](https://www.diamondforest.com/))*

| Placeholder | Context | Current Value / Estimate | Location in Code |
| :--- | :--- | :--- | :--- |
| **`[X s]`** | Production catalog load time with Redis cache enabled (cold dev was ~13s; baseline ~52s) | `~1.8s` (production cached) | `src/config/timeline.ts`, `src/routes/index.tsx` |
| **`[N/week]`** | Developer image/content update tickets prior to headless CMS self-service | `~15/week → 0` | `src/config/timeline.ts`, `src/routes/index.tsx` |
| **`[X%]`** | Image size reduction achieved via Sharp WebP/AVIF backend compression | `82.3%` (measured) | `src/config/timeline.ts`, `src/routes/index.tsx` |
| **`[N orders/month]`** | Stripe checkout volume processed via cryptographically verified webhooks | `[N orders/month]` | `src/config/timeline.ts` |
| **`[99.X%]`** | Stripe webhook idempotency and transaction success reliability rate | `99.9%` | `src/config/timeline.ts` |

---

## 2. Empiric Infotech LLP (MERN Stack Developer)
*Platform: WhatsApp & Booking Platform (Internal Enterprise System)*

*Status: All bullets filled with real architectural achievements (atomic slot reservations, automated WAHA WhatsApp alerts, automated Stripe refunds and webhook processing) — no bracket placeholders remain.*

---

## 3. Masai School (Associate Instructor & LMS Engineer)
*Platform: Masai LMS Student Assessment Module*

*Status: All bullets filled with real metrics (200+ students trained in JS/React/Node, 50+ mock interviews, centralized code grading module) — no bracket placeholders remain.*

---

## 4. Hiring Logistics & Availability
*Section: Contact & Logistics*

*Status: Notice period set to `45 days (negotiable)` and English proficiency set to `Professional Working Proficiency (Fluent)` — no bracket placeholders remain.*

---

## 5. Decision Checklist
* [ ] **Headless CMS clarification**: Confirm whether Diamond Atelier runs on Strapi CMS or a custom-built in-house headless CMS (tracked via `// TODO` in code).
* [ ] **Hevenly Heven repository visibility**: Confirm if `github.com/Diwakarsharma2216/overrated-chicken-3237` should remain public for recruiter review or be flagged as private.
* [ ] **Resume PDF upload**: Drop your latest PDF into `public/resume.pdf` to replace the placeholder file.

