import type { ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Code2,
  FileUser,
  User2,
  type LucideIcon,
} from 'lucide-react'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HomeSectionCard
} from '@/components'

import { PROFILE_DATA } from "@/data";

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">
      <section className="text-center space-y-6 pt-8 pb-4">
        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium rounded-full">
          Full-Stack Software Engineer
        </Badge>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          {PROFILE_DATA.name}
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          {PROFILE_DATA.bio}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HomeSectionCard
          Icon={Code2}
          description="Browse full stack applications and features developed."
          badges={[
            { text: "Web Applications" },
            { text: "Features" },
            { text: "Software Libraries" },
          ]}
          linkTo="/projects"
          linkText="Browse projects"
          title="Projects and Features"
        />
        <HomeSectionCard
          Icon={User2}
          description="Browse background, technologies experience, engineering philosophy, and hobbies."
          badges={[
            { text: "Background" },
            { text: "Technologies" },
            { text: "Experience" },
          ]}
          linkTo="/about"
          linkText="Read background"
          title="About Me"
        />
        <HomeSectionCard
          Icon={FileUser}
          description="Printable version of my CV"
          badges={[]}
          linkTo="/cv"
          linkText="Read CV"
          title="Curriculum Vitae"
        />
      </section>
      <section className="grid grid-cols-1">
        <Card className="text-center py-4 pb-4">
          React SPA built with Shadcn components and TanStack Start.
        </Card>
      </section>
    </div>
  )
}
