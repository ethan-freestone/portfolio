import { createFileRoute } from '@tanstack/react-router'
import { PROJECTS_DATA } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'

export const Route = createFileRoute('/projects/')({
  component: ProjectsIndex,
})

function ProjectsIndex() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
