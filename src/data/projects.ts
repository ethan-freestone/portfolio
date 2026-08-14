import { FolderGit2, Library, Sparkles } from "lucide-react";

export type ProjectCategory = 'applications' | 'libraries' | 'features'

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  description: string
  // Supports local image imports or static public paths (.gif, .png, .webp)
  mediaUrl: string
  mediaType?: 'image' | 'gif'
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  highlights?: string[]
}

export const CATEGORIES = [
  { slug: 'applications', label: 'Applications', icon: FolderGit2 },
  { slug: 'libraries', label: 'Software Libraries', icon: Library },
  { slug: 'features', label: 'Features & Modules', icon: Sparkles },
]

export const PROJECTS_DATA: Project[] = [
  // --- APPLICATIONS ---
  {
    id: 'foliage-app',
    title: 'FOLIO ERM App',
    category: 'applications',
    description: 'Electronic Resource Management suite built for university libraries to track agreements, licenses, and e-holdings.',
    mediaUrl: 'https://placehold.co/800x450/173a40/4fb8b2?text=ERM+App+Demo+GIF',
    mediaType: 'gif',
    tags: ['React', 'TypeScript', 'Stripes', 'Java', 'PostgreSQL'],
    highlights: [
      'Architected complex data workflows for electronic agreements',
      'Integrated accessible form controls and keyboard navigation',
    ],
  },
  {
    id: 'quote-wall',
    title: 'Quote Wall',
    category: 'applications',
    description: 'Personal side project allowing real-time quote submission and tagging.',
    mediaUrl: 'https://placehold.co/800x450/2f6a4a/e7f0e8?text=Quote+Wall+Preview',
    tags: ['Vue', 'FaunaDB', 'Tailwind CSS'],
  },

  // --- LIBRARIES ---
  {
    id: 'frontside-interactors-custom',
    title: 'FOLIO UI Component Kit',
    category: 'libraries',
    description: 'Shared UI component and headless utility library powering modular frontends across microservices.',
    mediaUrl: 'https://placehold.co/800x450/173a40/60d7cf?text=Component+Library',
    tags: ['TypeScript', 'Headless Components', 'Jest', 'Semantic Release'],
    highlights: [
      'Automated semantic releases via GitHub Actions',
      'Zero-dependency headless hook abstractions',
    ],
  },

  // --- FEATURES ---
  {
    id: 'license-comparer',
    title: 'License Comparison Engine',
    category: 'features',
    description: 'A visual diff-checking feature allowing librarians to compare terms between competing resource providers.',
    mediaUrl: 'https://placehold.co/800x450/2f6a4a/6ec89a?text=License+Diff+Feature',
    mediaType: 'gif',
    tags: ['React', 'Diffing Algorithms', 'Tailwind CSS'],
  },
]
