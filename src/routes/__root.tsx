import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles.css?url'

const SITE = 'https://billyx86.github.io/dancing-robot-app'
const DESCRIPTION =
  'A hilarious animated SVG dancing robot. Nightclub firmware. Zero dignity. Maximum groove.'
const SOCIAL_IMAGE = `${SITE}/og-image.png`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Beep Boop Disco Bot' },
      { name: 'description', content: DESCRIPTION },
      // Open Graph / Twitter Card
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Beep Boop Disco Bot' },
      { property: 'og:title', content: 'Beep Boop Disco Bot' },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: `${SITE}/` },
      { property: 'og:image', content: SOCIAL_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Beep Boop Disco Bot' },
      { name: 'twitter:description', content: DESCRIPTION },
      { name: 'twitter:image', content: SOCIAL_IMAGE },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '300x240', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
