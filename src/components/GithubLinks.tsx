import { ExternalLink, Github, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { GithubLink } from '@/data/projects'

export function GithubLinks({ github }: { github: string | GithubLink[] }) {
  if (!github) return null

  // Single URL case
  if (typeof github === 'string') {
    return (
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="GitHub Repository"
      >
        <Github className="h-4 w-4" />
      </a>
    )
  }

  // Multiple URLs case -> Dropdown Menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
        <Github className="h-4 w-4" />
        <ChevronDown className="h-3 w-3 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {github.map((repo) => (
          <DropdownMenuItem key={repo.url} asChild className="cursor-pointer">
            <a href={repo.url} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full text-xs">
              <span>{repo.label}</span>
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
