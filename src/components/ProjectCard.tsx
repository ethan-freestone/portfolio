import { ExternalLink, Github, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="feature-card flex flex-col overflow-hidden border border-border">
      {/* Media Container (supports PNG, JPG, and animated GIF) */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border group">
        <img
          src={project.mediaUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.mediaType === 'gif' && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full border border-border">
            <Play className="h-2.5 w-2.5 fill-current text-primary" /> GIF
          </span>
        )}
      </div>

      <CardHeader className="space-y-2 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-4 pt-2">
        {/* Bullet Highlights if available */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside bg-muted/40 p-2.5 rounded-md border border-border/50">
            {project.highlights.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        )}

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[11px] font-medium">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
