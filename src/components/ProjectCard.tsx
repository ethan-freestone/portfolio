import React from 'react'
import { Link } from '@tanstack/react-router'
import Autoplay from 'embla-carousel-autoplay'
import { Maximize2, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Project } from '@/data/projects'
import { getTitleMedia } from "#/lib";

export function ProjectCard({ project }: { project: Project }) {
  const hasMultipleMedia = (project.media ?? []).length > 1

  // Initialize Autoplay plugin (stop on hover/interaction so users can view images)
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  const projectMedia = project.media?.length
    ? [getTitleMedia({ title: project.title }), ...project.media]
    : [getTitleMedia({ title: project.title })];

  return (
    <Card className="feature-card flex flex-col overflow-hidden border border-border group/card">
      <div className="relative aspect-video w-full bg-muted border-b border-border group/carousel">
        <Carousel
          plugins={hasMultipleMedia ? [plugin.current] : []}
          className="w-full h-full"
        >
          <CarouselContent className="ml-0 h-full">
            {projectMedia.map((item, index) => (
              <CarouselItem key={index} className="pl-0 relative aspect-video w-full">
                <img
                  src={item.url}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />

                {item.type === 'gif' && (
                  <span className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full border border-border shadow-sm">
                    <Play className="h-2.5 w-2.5 fill-current text-primary" /> GIF
                  </span>
                )}

                {item.caption && (
                  <span className="absolute bottom-2 left-2 z-10 bg-background/85 backdrop-blur-sm text-foreground text-[11px] px-2 py-0.5 rounded border border-border/60">
                    {item.caption}
                  </span>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          {hasMultipleMedia && (
            <>
              <CarouselPrevious className="left-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-background/80 hover:bg-background border-border" />
              <CarouselNext className="right-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-background/80 hover:bg-background border-border" />
            </>
          )}
        </Carousel>

        <Link
          to="/projects/$category/$projectId"
          params={{ category: project.category, projectId: project.id }}
          className="absolute top-3 left-3 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity"
        >
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/80 backdrop-blur-md hover:bg-background border border-border" title="Open Fullscreen View">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <CardHeader className="space-y-2 pb-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/projects/$category/$projectId"
            params={{ category: project.category, projectId: project.id }}
            className="hover:underline underline-offset-4"
          >
            <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
          </Link>
        </div>

        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-4 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[11px] font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="pt-2 border-t border-border/50 flex justify-end">
          <Link
            to="/projects/$category/$projectId"
            params={{ category: project.category, projectId: project.id }}
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            View full project breakdown &rarr;
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
