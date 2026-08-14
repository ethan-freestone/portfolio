import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Code2,
  User,
  type LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ReactNode } from "react";

export const Route = createFileRoute('/')({ component: Home })

type HomeSectionCardBadge = {
  Icon?: LucideIcon,
  text: string,
}

type HomeSectionCardProps = {
  Icon: LucideIcon,
  description: ReactNode,
  badges: HomeSectionCardBadge[],
  linkTo: string,
  linkText: string,
  title: string,
}

const HomeSectionCard = ({
  Icon,
  description,
  badges,
  linkTo,
  linkText,
  title
}: HomeSectionCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col justify-between">
      <CardHeader>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {badges?.map(({
            Icon,
            text
          }) => (
            <Badge variant="outline">
              {Icon && <Icon/>}
              {text}
            </Badge>
          ))}
        </div>
        <Button variant="ghost" className="p-0 h-auto font-semibold text-primary group-hover:translate-x-1 transition-transform" asChild>
          <Link to={linkTo} className="inline-flex items-center">
          {linkText} <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">
      <section className="text-center space-y-6 pt-8 pb-4">
        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium rounded-full">
          Full-Stack Software Engineer
        </Badge>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Ethan Freestone portfolio
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          Building web applications, mainly in the libraries space since 2019. Delivering strong, robust front and back end solutions for customer's needs.
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
          Icon={User}
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
      </section>
      <section className="grid grid-cols-1">
        <Card className="text-center py-4 pb-4">
          React SPA built with Shadcn components and TanStack Start.
        </Card>
      </section>
    </div>
  )
}
