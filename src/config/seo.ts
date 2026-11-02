import { env } from './env'

export const SITE_CONFIG = {
  name: env.siteName,
  handle: 'diwakarsharma',
  shortTitle: env.shortTitle,
  title: env.title,
  description: env.description,
  url: env.siteUrl,
  ogImage: '/og-image.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: `${env.siteName} — ${env.role} Portfolio`,
  twitterHandle: env.twitterHandle,
  author: env.siteName,
  locale: 'en_US',
  links: {
    github: env.githubUrl,
    linkedin: env.linkedinUrl,
    email: `mailto:${env.email}`,
    cal: `https://cal.com/${env.calLink}`,
  },
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: SITE_CONFIG.name,
      alternateName: 'diwakarsharma',
      jobTitle: env.role,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      image: `${SITE_CONFIG.url}/apple-touch-icon.png`,
      email: `mailto:${env.email}`,
      telephone: env.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      sameAs: [
        SITE_CONFIG.links.github,
        SITE_CONFIG.links.linkedin,
        `https://x.com/${env.twitterHandle.replace('@', '')}`,
        `https://cal.com/${env.calLink}`,
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Diamond Atelier',
        jobTitle: 'Software Developer',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Manipal University Jaipur',
          description: 'Bachelor of Computer Applications (BCA) - Online (while working full-time)',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Masai School',
          description: 'Full Stack Web Development & Data Structures (NSDC Certified)',
        },
      ],
      knowsAbout: [
        'TypeScript',
        'JavaScript (ES6+)',
        'React.js',
        'Next.js',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'RESTful API Design',
        'JWT & RBAC',
        'MongoDB',
        'PostgreSQL',
        'Redis Caching',
        'BullMQ Background Queues',
        'Docker',
        'Stripe Payments & Webhooks',
        'Sharp Media Pipeline',
        'Git & GitHub',
        'Data Structures & Algorithms',
        'System Design',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: `${SITE_CONFIG.name} — Portfolio`,
      description: SITE_CONFIG.description,
      inLanguage: 'en-US',
      publisher: {
        '@id': `${SITE_CONFIG.url}/#person`,
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_CONFIG.url}/#profilepage`,
      url: SITE_CONFIG.url,
      name: `${SITE_CONFIG.name} — ${env.role} Portfolio`,
      mainEntity: {
        '@id': `${SITE_CONFIG.url}/#person`,
      },
      isPartOf: {
        '@id': `${SITE_CONFIG.url}/#website`,
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_CONFIG.url}/#projects`,
      name: 'Featured Projects by Diwakar Sharma',
      description:
        'Production e-commerce platforms, automated communication systems, and LMS tools engineered by Diwakar Sharma.',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Diamond E-Commerce Platform',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description:
              'Production diamond e-commerce platform with custom headless CMS, Stripe webhook verification, Sharp media compression, Redis caching, BullMQ queues, and Docker CI/CD.',
            url: env.projectLinks.diamondAtelier,
            author: { '@id': `${SITE_CONFIG.url}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'WhatsApp & Appointment Booking Platform',
            applicationCategory: 'CommunicationApplication',
            operatingSystem: 'Web',
            description:
              'Internal appointment-booking system with WAHA WhatsApp API integration, Stripe refund workflows, and RBAC tiers developed at Empiric Infotech.',
            author: { '@id': `${SITE_CONFIG.url}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Masai LMS Student Assessment Module',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Web',
            description:
              'Internal LMS assessment module for code submission tracking, evaluation rubrics, and feedback workflows engineered at Masai School.',
            author: { '@id': `${SITE_CONFIG.url}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Drone E-Commerce Platform',
            applicationCategory: 'ShoppingApplication',
            operatingSystem: 'Web',
            description:
              'Modern full-stack drone e-commerce storefront for DJI aerial systems and camera hardware, featuring interactive showcases, cart persistence, and Razorpay payment checkout.',
            url: env.projectLinks.droneEcommerce,
            author: { '@id': `${SITE_CONFIG.url}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Hevenly Heven E-Commerce Platform',
            applicationCategory: 'ShoppingApplication',
            operatingSystem: 'Web',
            description:
              'Full-stack MERN e-commerce application with Redux Toolkit state management, product filtering, and RESTful APIs.',
            url: env.projectLinks.hevenlyHeven,
            author: { '@id': `${SITE_CONFIG.url}/#person` },
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_CONFIG.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Diwakar Sharma?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I am a Full Stack Developer based in Surat, Gujarat, India with 2.5+ years of experience engineering scalable web applications using Next.js, React, Node.js, Express, TypeScript, and cloud systems. I currently work as a Software Developer at Diamond Atelier.',
          },
        },
        {
          '@type': 'Question',
          name: 'What technologies do I specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I specialize in Next.js, React.js, TypeScript, JavaScript, Node.js, Express.js, MongoDB, PostgreSQL, Redis caching, BullMQ background queues, Docker, and Stripe payment processing.',
          },
        },
        {
          '@type': 'Question',
          name: 'What companies and production systems have I worked on?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I am currently a Software Developer at Diamond Atelier building our diamond e-commerce platform and custom headless CMS. Previously, I developed WhatsApp automation & appointment booking platforms at Empiric Infotech LLP, and mentored 200+ students while building LMS review modules at Masai School.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can you contact me or book a call?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can email me directly at diwakarsharma2216@gmail.com, book a 30-minute consultation call at https://cal.com/diwakar-sharma-ojozup/30min, connect on LinkedIn, or explore my GitHub profile.',
          },
        },
      ],
    },
  ],
}
