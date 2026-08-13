import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  Link,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import appCss from '../styles.css?url'

type NavLinkProps = {
  title: ReactNode,
  linkTo: string,
}

const NavLink = ({ title, linkTo }: NavLinkProps) => {
  return (
    <Link
      to={linkTo}
      activeProps={{ className: 'text-foreground font-semibold' }}
      inactiveProps={{ className: 'text-foreground/60 hover:text-foreground' }}
    >
      {title}
    </Link>
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/" className="font-bold tracking-tight text-lg">
            Ethan Freestone
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink linkTo="/" title="Home" />
            <NavLink linkTo="/projects" title="Projects" />
            <NavLink linkTo="/about" title="About" />
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <HeadContent />
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}


export const Route = createRootRouteWithContext<Record<string, never>>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Ethan Freestone | Portfolio' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootComponent,
})
