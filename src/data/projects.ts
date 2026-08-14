
import * as Folio from '@/assets/projects/applications/folio-erm';
import * as Dashboard from '@/assets/projects/applications/dashboard';
import * as Serials from '@/assets/projects/applications/folio-serials';


import { FolderGit2, Library, Sparkles } from "lucide-react";

export type ProjectCategory = 'applications' | 'libraries' | 'features'

export type ProjectMedia = {
  url: string
  type?: 'image' | 'gif'
  alt: string
  caption?: string
}

export type Link = {
  label: string
  url: string
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
  wikiLinks?: Link[],
  githubUrl?: string | Link[]
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
    id: 'folio-erm',
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
      },
      {
        url: Folio.localKBAdmin,
        type: 'image',
        alt: 'Management screen for ERM Jobs'
      }
    ],
    githubUrl: [
      {
        label: 'Agreements Backend',
        url: 'https://github.com/folio-org/mod-agreements'
      },
      {
        label: 'Licenses Backend',
        url: 'https://github.com/folio-org/mod-licenses'
      },
      {
        label: 'Agreements Frontend',
        url: 'https://github.com/folio-org/ui-agreements'
      },
      {
        label: 'Licenses Frontend',
        url: 'https://github.com/folio-org/ui-licenses'
      },
      {
        label: 'Local KB Management Frontend',
        url: 'https://github.com/folio-org/ui-local-kb-admin'
      },
      {
        label: 'ERM Comparisons Frontend',
        url: 'https://github.com/folio-org/ui-erm-comparisons'
      },
      {
        label: 'ERM Resource Plugin',
        url: 'https://github.com/folio-org/ui-plugin-find-eresource'
      },
      {
        label: 'Agreements Plugin',
        url: 'https://github.com/folio-org/ui-plugin-find-agreement'
      },
      {
        label: 'Licenses Plugin',
        url: 'https://github.com/folio-org/ui-plugin-find-license'
      }
    ],
    tags: ['React', 'Javascript', 'Stripes', 'Java', 'Grails', 'PostgreSQL'],
    highlights: [
      'Lead app development for many years on the front and back end.',
      'Created "Dashboard" application for FOLIO designed to seamlessly show ERM data at a glance and be expandable to other FOLIO applications',
      'Managed integrations with external systems such as GoKB',
      'Large scale refactors over time to raise maintainability',
      'stripes-connect to Tanstack Query refactor',
      'stripes-kint-components library for better Stripes DX',
      'Helper hooks and functions donated back to stripes-core',
      'Testing pattern inversion with Jest'
    ],
    timeframe: "2019-2026"
  },
  {
    id: 'folio-dashboard',
    title: 'FOLIO Dashboard App',
    category: 'applications',
    description: 'An extensible dashboard app for FOLIO App integrations',
    media: [
      {
        url: Dashboard.dragDropGif,
        type: 'gif',
        alt: 'Dashboard drag and drop functionality'
      },
      {
        url: Dashboard.dashboard,
        type: 'image',
        alt: 'Dashboard home'
      },
      {
        url: Dashboard.dashboardMenu,
        type: 'image',
        alt: 'Dashboard functionality menu'
      },
      {
        url: Dashboard.widgetForm,
        type: 'image',
        alt: 'Dashboard widget form'
      },
    ],
    githubUrl: [
      {
        label: 'Dashboard Backend',
        url: 'https://github.com/folio-org/mod-service-interaction'
      },
      {
        label: 'Dashboard Frontend',
        url: 'https://github.com/folio-org/ui-dashboard'
      },
    ],
    tags: ['React', 'Javascript', 'Stripes', 'Java', 'JSON Schema', 'Grails', 'PostgreSQL', 'Tanstack Query'],
    highlights: [
      'First solo app development from concept -> delivery',
      'Designed robust app interaction mechanism using JSON Schema and multi-interfaces',
      'First foray into Tanstack Query for per-widget querying'
    ],
    timeframe: "2021-2026"
  },
  {
    id: 'folio-serials',
    title: 'FOLIO Serials App',
    category: 'applications',
    description: 'A FOLIO Application for managing Serials, templating titles, managinig predicted pieces',
    media: [
      {
        url: Serials.formUnits,
        type: 'gif',
        alt: 'Dynamic time unit form'
      },
      {
        url: Serials.formChronologyEnumeration,
        type: 'gif',
        alt: 'Dynamic chronology/enumeration form'
      },
      {
        url: Serials.formPreview,
        type: 'gif',
        alt: 'Preview predicted pieces'
      }
    ],
    githubUrl: [
      {
        label: 'Serials Backend',
        url: 'https://github.com/folio-org/mod-serials-management'
      },
      {
        label: 'Dashboard Frontend',
        url: 'https://github.com/folio-org/ui-serials-management'
      },
    ],
    wikiLinks: [
      {
        label: 'Wiki Home',
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIOtips/pages/155058265/Serials+Management'
      },
      {
        label: 'Templating',
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIOtips/pages/154861687/Using+Templates'
      },
      {
        label: 'Templating',
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIOtips/pages/154861687/Using+Templates'
      },
      {
        label: 'Publication patterns',
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIOtips/pages/210468907/Setting+up+publication+patterns'
      }
    ],
    tags: ['React', 'Javascript', 'Stripes', 'Java', 'Grails', 'Handlebars', 'OOP', 'PostgreSQL'],
    highlights: [
      'Deep problem space -> solution space analysis and design',
      'Working in depth with product owner and senior developer to pass on analysis and work on delivery',
      'Focus on leadership and communication skills',
      'Complex branching structure for domain designed in an extensible manner'
    ],
    timeframe: "2022-2026"
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
