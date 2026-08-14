import { createFileRoute } from '@tanstack/react-router'
import {
  Building2,
  Code2,
  Gamepad2,
  MapPin,
  Briefcase,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PROFILE_DATA } from '@/data/about'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">

      <section className="flex flex-ycol md:flex-row items-center md:items-start gap-8 border-b pb-8">
        <Avatar className="h-32 w-32 border-2 border-border shadow-md">
          <AvatarImage src={PROFILE_DATA.avatarUrl} alt={PROFILE_DATA.name} />
          <AvatarFallback className="text-2xl font-bold">EF</AvatarFallback>
        </Avatar>

        <div className="space-y-4 text-center md:text-left flex-1">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {PROFILE_DATA.name}
            </h1>
            <p className="text-lg font-medium text-primary mt-1">
              {PROFILE_DATA.role}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm text-muted-foreground mt-2">
              <MapPin className="h-4 w-4" />
              <span>{PROFILE_DATA.location}</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            {PROFILE_DATA.bio}
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            {PROFILE_DATA.bioDeep}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Skills & Tech Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILE_DATA.skills.map((group) => (
            <Card key={group.category} className="flex flex-col justify-between">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold border-b pb-2">
                  {group.category}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Core Skills */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Core Proficiencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.strengths.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Secondary / Light Skills */}
                {group.tried && group.tried.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                      Working Knowledge
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.tried.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs text-muted-foreground border-dashed">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        </div>

        <div className="space-y-4">
          {PROFILE_DATA.experience.map((job) => (
            <Card key={`${job.company}-${job.role}`}>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <CardTitle className="text-lg font-bold">{job.role}</CardTitle>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full w-fit">
                    {job.period}
                  </span>
                </div>
                <CardDescription className="text-sm font-medium text-foreground/80 flex items-center gap-1.5 pt-0.5">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hobbies & Personal Interests */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Hobbies & Interests</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROFILE_DATA.hobbies.map((hobby) => (
            <Card key={hobby.name}>
              <CardHeader className="pb-2">
                {hobby.Icon && <hobby.Icon className="h-5 w-5 text-primary mb-2" />}
                <CardTitle className="text-base font-semibold">{hobby.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {hobby.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
