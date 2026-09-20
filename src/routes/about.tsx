import { createFileRoute } from '@tanstack/react-router'
import { SITE_CONFIG } from '../config/seo'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      {
        title: `About — ${SITE_CONFIG.name}`,
      },
      {
        name: 'description',
        content:
          'Learn more about Tarang Rajpara, Full Stack Design Engineer. Background, experience, architecture philosophy, and contact details.',
      },
      {
        property: 'og:title',
        content: `About — ${SITE_CONFIG.name}`,
      },
      {
        property: 'og:description',
        content:
          'Learn more about Tarang Rajpara, Full Stack Design Engineer. Background, experience, architecture philosophy, and contact details.',
      },
      {
        property: 'og:url',
        content: `${SITE_CONFIG.url}/about`,
      },
      {
        name: 'twitter:title',
        content: `About — ${SITE_CONFIG.name}`,
      },
      {
        name: 'twitter:description',
        content:
          'Learn more about Tarang Rajpara, Full Stack Design Engineer. Background, experience, architecture philosophy, and contact details.',
      },
    ],
  }),
  component: About,
})

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          TanStack Start gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
  )
}
