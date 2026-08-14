import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { Layers } from 'lucide-react'
import { CATEGORIES } from "#/data/projects.ts";

export const Route = createFileRoute('/projects')({
  component: ProjectsLayout,
})

function ProjectsLayout() {
  const location = useLocation()

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
        <Link
          to="/projects"
          activeOptions={{ exact: true }}
          className="nav-link px-4 py-2 rounded-md text-sm font-semibold transition-colors [&.is-active]:bg-secondary [&.is-active]:text-foreground"
        >
          <span className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            All Projects
          </span>
        </Link>

        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = location.pathname.includes(`/projects/${cat.slug}`)

          return (
            <Link
              key={cat.slug}
              to="/projects/$category"
              params={{ category: cat.slug }}
              className={`nav-link px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive ? 'bg-secondary text-foreground is-active' : ''
              }`}
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
