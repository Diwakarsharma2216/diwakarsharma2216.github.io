import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { SITE_CONFIG, structuredData } from '../config/seo'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: SITE_CONFIG.title,
      },
      {
        name: 'description',
        content: SITE_CONFIG.description,
      },
      {
        name: 'keywords',
        content: SITE_CONFIG.keywords,
      },
      {
        name: 'author',
        content: SITE_CONFIG.author,
      },
      {
        name: 'creator',
        content: SITE_CONFIG.author,
      },
      {
        name: 'publisher',
        content: SITE_CONFIG.author,
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'application-name',
        content: SITE_CONFIG.shortTitle,
      },
      {
        name: 'apple-mobile-web-app-title',
        content: SITE_CONFIG.name,
      },

      /* Open Graph tags (Facebook, LinkedIn, Discord, Slack, WhatsApp) */
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: SITE_CONFIG.name,
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
        content: SITE_CONFIG.url,
      },
      {
        property: 'og:locale',
        content: SITE_CONFIG.locale,
      },
      {
        property: 'og:image',
        content: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
      },
      {
        property: 'og:image:secure_url',
        content: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:width',
        content: SITE_CONFIG.ogImageWidth,
      },
      {
        property: 'og:image:height',
        content: SITE_CONFIG.ogImageHeight,
      },
      {
        property: 'og:image:alt',
        content: SITE_CONFIG.ogImageAlt,
      },

      /* Twitter / X Cards */
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: SITE_CONFIG.twitterHandle,
      },
      {
        name: 'twitter:creator',
        content: SITE_CONFIG.twitterHandle,
      },
      {
        name: 'twitter:title',
        content: SITE_CONFIG.shortTitle,
      },
      {
        name: 'twitter:description',
        content: SITE_CONFIG.description,
      },
      {
        name: 'twitter:image',
        content: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
      },
      {
        name: 'twitter:image:alt',
        content: SITE_CONFIG.ogImageAlt,
      },

      /* Theme colors for light / dark browser address bars */
      {
        name: 'theme-color',
        content: '#0a0a0a',
        media: '(prefers-color-scheme: dark)',
      },
      {
        name: 'theme-color',
        content: '#fafaf9',
        media: '(prefers-color-scheme: light)',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: SITE_CONFIG.url,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
