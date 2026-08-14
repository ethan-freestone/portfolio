
import * as Folio from '@/assets/projects/applications/folio-erm';


import { FolderGit2, Library, Sparkles } from "lucide-react";

export type ProjectCategory = 'applications' | 'libraries' | 'features'

export type ProjectMedia = {
  url: string
  type?: 'image' | 'gif'
  alt: string
  caption?: string
}

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  description: string
  longDescription?: string // Markdown or longer text narrative
  media: ProjectMedia[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  highlights?: string[]
  architecture?: string[]
  role?: string
  timeframe?: string
}

export const CATEGORIES = [
  { slug: 'applications', label: 'Applications', icon: FolderGit2 },
  { slug: 'libraries', label: 'Software Libraries', icon: Library },
  { slug: 'features', label: 'Features & Modules', icon: Sparkles },
]

export const PROJECTS_DATA: Project[] = [
  // --- APPLICATIONS ---
  {
    id: 'folio-app',
    title: 'FOLIO ERM App Suite',
    category: 'applications',
    description: 'Electronic Resource Management suite built for libraries to track their agreements and licenses.',
    media: [
      {
        url: Folio.packages,
        type: 'image',
        alt: 'ERM Package Manager'
      },
      {
        url: Folio.pkg,
        type: 'image',
        alt: 'ERM Package View'
      },
      {
        url: Folio.agreementView1,
        type: 'image',
        alt: 'ERM Agreement View'
      },
      {
        url: Folio.agreementView2,
        type: 'image',
        alt: 'ERM Agreement Line Table View'
      },
      {
        url: Folio.agreementSelector,
        type: 'image',
        alt: 'ERM Agreement Selector Plugin'
      },
      {
        url: Folio.agreementsSettings,
        type: 'image',
        alt: 'ERM Agreement Settings'
      },
      {
        url: Folio.agreementLineView,
        type: 'image',
        alt: 'ERM Agreement Line View'
      },
      {
        url: Folio.licenseForm,
        type: 'image',
        alt: 'ERM Licenses Form'
      }
    ],
    tags: ['React', 'Javascript', 'Stripes', 'Java', 'Grails', 'PostgreSQL'],
    highlights: [
      'Lead app development for many years on the front and back end.',
      'Created "Dashboard" application for FOLIO designed to seamlessly show ERM data at a glance and be expandable to other FOLIO applications',
      'Managed integrations with external systems such as GoKB'

    ],
  },
  /*{
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
  },*/
]
