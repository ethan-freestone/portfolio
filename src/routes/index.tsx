import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Code2,
  User,
  Sparkles
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

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">
      <section className="text-center space-y-6 pt-8 pb-4">
        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium rounded-full">
          <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
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
        <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col justify-between">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Code2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl">Projects & Features</CardTitle>
            <CardDescription className="text-base">
              Full-stack web applications and technical feature breakdowns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Web Applications</Badge>
              <Badge variant="outline">Features</Badge>
              <Badge variant="outline">Software Libraries</Badge>
            </div>
            <Button variant="ghost" className="p-0 h-auto font-semibold text-primary group-hover:translate-x-1 transition-transform" asChild>
              <Link to="/projects" className="inline-flex items-center">
                Browse projects <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col justify-between">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
              <User className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl">About Me</CardTitle>
            <CardDescription className="text-base">
              Background, tech stack experience, engineering philosophy, and hobbies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Background</Badge>
              <Badge variant="outline">Technologies</Badge>
              <Badge variant="outline">Experience</Badge>
            </div>
            <Button variant="ghost" className="p-0 h-auto font-semibold text-primary group-hover:translate-x-1 transition-transform" asChild>
              <Link to="/about" className="inline-flex items-center">
                Read background <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
