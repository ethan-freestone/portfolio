import { useState, type ReactNode, useMemo } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  Link,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { HarmonySwitcher } from "#/components";
import { Home } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = useMemo(() => ([
    {
      link: '/',
      title: 'Home',
    },
    {
      link: '/projects',
      title: 'Projects',
    },
    {
      link: '/about',
      title: 'About',
    },
    {
      link: '/cv',
      title: 'CV',
    },
  ]), []);

  return (
    <RootDocument>
      <header className="print:hidden! sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container px-4">
          <div className="flex h-14 items-center justify-between">
            <Link to="/" className="font-bold tracking-tight text-lg mr-4">
              <Home/>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </>
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {links.map(({ link, title }) => (
                <NavLink linkTo={link} title={title} />
              ))}
              <HarmonySwitcher />
            </nav>
          </div>

          {/* Mobile Navigation Dropdown */}
          {isMobileMenuOpen && (
            <nav className="md:hidden flex flex-col gap-4 pb-4 pt-2 text-sm font-medium border-t">
              {links.map(({ link, title }) => (
                <NavLink linkTo={link} title={title} />
              ))}
              <div className="pt-2 border-t mt-2">
                <HarmonySwitcher />
              </div>
            </nav>
          )}
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
    <html lang="en" data-harmony="triadic">
      <head>
        <HeadContent />
      </head>
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
