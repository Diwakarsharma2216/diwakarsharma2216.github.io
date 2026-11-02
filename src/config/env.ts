export const env = {
  // Personal & Site Info
  siteName: import.meta.env.VITE_SITE_NAME || 'Diwakar Sharma',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://diwakarsharma2216.github.io',
  role: import.meta.env.VITE_ROLE || 'Full Stack Developer',
  location: import.meta.env.VITE_LOCATION || 'Surat, Gujarat, India',
  locationDetail:
    import.meta.env.VITE_LOCATION_DETAIL || 'Surat, Gujarat, India (UTC+5:30)',
  phone: import.meta.env.VITE_PHONE || '+91 6394842216',

  // Career & Availability
  noticePeriod: import.meta.env.VITE_NOTICE_PERIOD || '[X weeks / Immediate]',
  rolesSought:
    import.meta.env.VITE_ROLES_SOUGHT || 'Software Engineer / Full Stack Engineer',
  workPreference:
    import.meta.env.VITE_WORK_PREFERENCE || 'Remote / Hybrid / Onsite in [City/Relocation]',
  resumeUrl: import.meta.env.VITE_RESUME_URL || '/resume.pdf',

  // Contact & Social Links
  email: import.meta.env.VITE_EMAIL || 'diwakarsharma2216@gmail.com',
  githubUrl:
    import.meta.env.VITE_GITHUB_URL || 'https://github.com/Diwakarsharma2216',
  linkedinUrl:
    import.meta.env.VITE_LINKEDIN_URL ||
    'https://www.linkedin.com/in/diwakarsharma-fullstackdev/',
  twitterHandle: import.meta.env.VITE_TWITTER_HANDLE || '@diwakarsharma2216',

  // Cal.com Meeting Booking
  calLink: import.meta.env.VITE_CAL_LINK || 'diwakar-sharma-ojozup/30min',
  calNamespace: import.meta.env.VITE_CAL_NAMESPACE || '30min',

  // Project Live / Demo Links
  projectLinks: {
    diamondAtelier:
      import.meta.env.VITE_PROJECT_DIAMOND_URL ||
      'https://www.diamondforest.com/',
    whatsappBooking:
      import.meta.env.VITE_PROJECT_BOOKING_URL ||
      'https://github.com/Diwakarsharma2216',
    masaiLms:
      import.meta.env.VITE_PROJECT_LMS_URL ||
      'https://github.com/Diwakarsharma2216',
    droneEcommerce:
      import.meta.env.VITE_PROJECT_DRONE_URL ||
      'https://dji-air.vercel.app/',
    hevenlyHeven:
      import.meta.env.VITE_PROJECT_HEVENLY_URL ||
      'https://hev-en.vercel.app/',
  },

  // SEO & Headings (Clean, under 160 characters, no keyword stuffing)
  shortTitle:
    import.meta.env.VITE_SHORT_TITLE ||
    'Diwakar Sharma — Full Stack Developer',
  title:
    import.meta.env.VITE_TITLE ||
    'Diwakar Sharma — Full Stack Developer',
  description:
    import.meta.env.VITE_DESCRIPTION ||
    'Full Stack Developer specializing in React, Next.js, Node.js, and scalable cloud systems. Building high-performance web applications and e-commerce platforms.',
}
