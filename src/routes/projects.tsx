import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { CATEGORIES } from "#/data/projects.ts"

export const Route = createFileRoute('/projects')({
  beforeLoad: ({ location }) => {
    // Redirect /projects directly to /projects/applications
    if (location.pathname === '/projects' || location.pathname === '/projects/') {
      throw redirect({
        to: '/projects/$category',
        params: { category: 'applications' },
        replace: true,
      })
    }
  },
  component: ProjectsLayout,
})

function ProjectsLayout() {
  return (
    <div className="page-wrap py-12 space-y-8 rise-in">
      <div className="space-y-3">
        <span className="island-kicker">Portfolio & Work</span>
        <h1 className="display-title text-4xl md:text-5xl font-bold">
          Projects & Code
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A showcase of full-stack web applications, open-source libraries, and specific feature modules built for production.
        </p>
      </div>

      {/* Subpage Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon

          return (
            <Link
              key={cat.slug}
              to="/projects/$category"
              params={{ category: cat.slug }}
              className="nav-link px-4 py-2 rounded-md text-sm font-semibold transition-colors"
              activeProps={{
                className: 'bg-secondary text-foreground is-active',
              }}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {cat.label}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Child Subpage Output */}
      <Outlet />
    </div>
  )
}
