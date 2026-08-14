import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink, FolderGit2, Play, Book, Package } from 'lucide-react'
import { PROJECTS_DATA } from '@/data/projects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { getTitleMedia } from "#/lib";

export const Route = createFileRoute('/projects/$category/$projectId')({
  component: ProjectDetailView,
})

function ProjectDetailView() {
  const { projectId } = Route.useParams()
  const navigate = useNavigate()

  const project = PROJECTS_DATA.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="island-shell p-12 text-center space-y-4">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <Button onClick={() => navigate({ to: '/projects' })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>
    )
  }

  const renderRoles = () => {
    if (!project.role) return null;

    // Single string role
    if (typeof project.role === 'string') {
      return (
        <div className="space-y-1">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</span>
          <p className="text-sm font-medium">{project.role}</p>
        </div>
      )
    }

    // Array of roles with timeframes
    return (
      <div className="space-y-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Roles</span>
        <div className="space-y-3">
          {project.role.map((r, idx) => (
            <div key={idx} className="space-y-0.5 border-l-2 border-primary/20 pl-3">
              <p className="text-sm font-medium">{r.role}</p>
              <p className="text-xs text-muted-foreground">{r.timeframe}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const projectMedia = project.media?.length
    ? [getTitleMedia({ title: project.title }), ...project.media]
    : [getTitleMedia({ title: project.title })];

  return (
    <div className="space-y-8 rise-in max-w-5xl mx-auto">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/projects/$category', params: { category: project.category } })}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to {project.category}
        </Button>
      </div>

      <Card className="overflow-hidden border border-border shadow-xl">
        <Carousel className="w-full">
          <CarouselContent className="ml-0">
            {projectMedia.map((item, index) => (
              <CarouselItem key={index} className="pl-0 relative aspect-video w-full bg-black/5">
                <img
                  src={item.url}
                  alt={item.alt}
                  className="h-full w-full object-contain bg-background"
                />

                {item.type === 'gif' && (
                  <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1 rounded-full border border-border shadow-md">
                    <Play className="h-3 w-3 fill-current text-primary" /> Animated GIF
                  </span>
                )}

                {item.caption && (
                  <div className="absolute bottom-4 left-4 right-4 z-10 bg-background/90 backdrop-blur-md text-foreground text-xs p-3 rounded-lg border border-border/80 max-w-lg">
                    {item.caption}
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          {projectMedia.length > 1 && (
            <>
              <CarouselPrevious className="left-4 bg-background/80 hover:bg-background border-border h-10 w-10" />
              <CarouselNext className="right-4 bg-background/80 hover:bg-background border-border h-10 w-10" />
            </>
          )}
        </Carousel>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="island-kicker capitalize">{project.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {project.title}
            </h1>
          </div>

          <p key="description-main" className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {project.descriptionDeep && (Array.isArray(project.descriptionDeep) ? project.descriptionDeep : [project.descriptionDeep]).map((desc, index) => (
            <p key={`description-${index}`} className="text-lg text-muted-foreground leading-relaxed">
              {desc}
            </p>
          ))}

          {project.category !== 'features' && project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-lg font-bold">Key Deliverables & Impact</h3>
              <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground leading-relaxed">
                {project.highlights.map((point, idx) => (
                  <li key={idx} className="marker:text-primary">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {project.category === 'applications' && project.architecture && project.architecture.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-lg font-bold">Technical Implementation</h3>
              <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground leading-relaxed">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="marker:text-primary">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-6 border border-border bg-card/50">

            <div className="space-y-4">

              {/* Application specific button */}
              {project.category === 'applications' && project.liveUrl && (
                <Button asChild className="w-full gap-2">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" /> Live Application
                  </a>
                </Button>
              )}

              {/* Library specific button */}
              {project.category === 'libraries' && project.npmUrl && (
                <Button asChild className="w-full gap-2" variant="default">
                  <a href={project.npmUrl} target="_blank" rel="noreferrer">
                    <Package className="h-4 w-4" /> View on NPM
                  </a>
                </Button>
              )}


              {/* Feature Context */}
              {project.category === 'features' && project.parentApp && (
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parent Application</span>
                  <p className="text-sm font-medium">{project.parentApp}</p>
                </div>
              )}

              {/* Library Context */}
              {project.category === 'libraries' && project.bundleSize && (
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bundle Size</span>
                  <p className="text-sm font-medium">{project.bundleSize}</p>
                </div>
              )}

              {/* Source Repositories (Shared across Apps and Libraries) */}
              {(project.category === 'applications' || project.category === 'libraries') && project.githubUrl && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Source Repositories
                  </span>

                  {typeof project.githubUrl === 'string' ? (
                    <Button asChild variant="outline" className="w-full justify-start gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <FolderGit2 className="h-4 w-4" /> Repository
                      </a>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      {project.githubUrl.map((repo) => (
                        <a
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-start justify-between gap-2.5 p-2.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs font-mono transition-colors group"
                        >
                          <div className="flex items-start gap-2 min-w-0">
                            <FolderGit2 className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                            <span className="break-all whitespace-normal leading-tight text-foreground">
                              {repo.label}
                            </span>
                          </div>
                          <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wiki Links Section */}
              {project.wikiLinks && project.wikiLinks.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Documentation & Wiki
                  </span>
                  <div className="space-y-2">
                    {project.wikiLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start justify-between gap-2.5 p-2.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs font-mono transition-colors group"
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          <Book className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="break-all whitespace-normal leading-tight text-foreground">
                            {link.label}
                          </span>
                        </div>
                        <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {renderRoles()}

            {project.timeframe && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Period</span>
                <p className="text-sm font-medium">{project.timeframe}</p>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-border/60">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Technologies</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
