export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/itzwish/15min',
    available: true,
  },
  profile: {
    name: 'Revy',
    job: 'Full-Stack Developer and Designer',
    email: 'me@itzwish.me',
    phone: '+8801775204839',
    picture: '/assets/REVY.png',
  },
  socials: {
    github: 'https://github.com/itzwish',
    twitter: 'https://twitter.com/itzwish',
    linkedin: 'https://www.linkedin.com/in/itzwish',
    instagram: 'https://www.instagram.com/itzwish.me',
    spotify: 'https://open.spotify.com/user/31bltoizcmf7c2acf7b34mzcaeae?si=4fb13ff6edd64163',
    discord: 'https://discord.com/users/itzwish.me',
  },
  seo: {
    title: 'itzwish - Portfolio',
    description: 'Full-Stack Developer and Designer. Canvas portfolio template built with Nuxt and Tailwind CSS.',
    url: 'https://itzwish.me',
  },
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'slate',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
