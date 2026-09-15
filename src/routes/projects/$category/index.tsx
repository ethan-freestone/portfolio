import { createFileRoute } from '@tanstack/react-router'

import type { ProjectCategory } from '@/types'
import { PROJECTS_DATA } from '@/data'
import { ProjectCard } from '@/components'

export const Route = createFileRoute('/projects/$category/')({
  component: CategorySubpage,
})

function CategorySubpage() {
  const { category } = Route.useParams()

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => p.category === (category as ProjectCategory)
  )

  if (filteredProjects.length === 0) {
    return (
      <div className="island-shell p-8 text-center space-y-2">
        <h3 className="text-xl font-bold">No projects found</h3>
        <p className="text-muted-foreground text-sm">
          No items logged under the "{category}" category yet.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
