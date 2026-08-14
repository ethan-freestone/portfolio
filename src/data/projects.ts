import * as Folio from '@/assets/projects/applications/folio-erm';
import * as Dashboard from '@/assets/projects/applications/dashboard';
import * as Serials from '@/assets/projects/applications/folio-serials';
import * as PushKB from '@/assets/projects/applications/pushkb';
import * as DocDel from '@/assets/projects/applications/docdel';
import * as OA from '@/assets/projects/applications/folio-oa';
import * as ILL from '@/assets/projects/applications/ill';

import { FolderGit2, FolderKanban, Library, type LucideIcon, Sparkles } from "lucide-react";

export type ProjectCategory = 'applications' | 'libraries' | 'features' | 'other'
export type ProjectCategoryDefinition = {
  slug: ProjectCategory
  label: string,
  icon: LucideIcon
}

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

export type Role = string | {
  role: string,
  timeframe: string
}[]

type BaseProject = {
  id: string
  title: string
  description: string
  descriptionDeep?: string | string[]
  media?: ProjectMedia[]
  tags: string[]
  role?: Role
  timeframe?: string
}

export type ApplicationProject = BaseProject & {
  category: 'applications'
  liveUrl?: string
  wikiLinks?: Link[]
  githubUrl?: string | Link[]
  architecture?: string[]
  highlights?: string[]
}

export type LibraryProject = BaseProject & {
  category: 'libraries'
  npmUrl?: string
  bundleSize?: string
  githubUrl: string
  highlights?: string[]
}

export type FeatureProject = BaseProject & {
  category: 'features'
  parentApp: string,
  wikiLinks?: Link[]
}

export type Project = ApplicationProject | LibraryProject | FeatureProject

export const CATEGORIES: ProjectCategoryDefinition[] = [
  { slug: 'applications', label: 'Applications', icon: FolderGit2 },
  { slug: 'libraries', label: 'Software Libraries', icon: Library },
  { slug: 'features', label: 'Features', icon: Sparkles },
  { slug: 'other', label: 'Other', icon: FolderKanban }
]

export const PROJECTS_DATA: Project[] = [
  // --- APPLICATIONS ---
  {
    id: 'folio-erm',
    title: 'FOLIO ERM App Suite',
    category: 'applications',
    description: 'Electronic Resource Management suite built for libraries to track their agreements and licenses.',
    descriptionDeep: [
      'A suite of apps dedicated to the management of Electronic Resource Management inside FOLIO. These include: Agreements, Licenses, Local KB Admin and ERM Comparisons.',
      'The Agreements app comprises of a Local KB designed to accept harvested records from external systems and commit them to a central shape, as well as CRUD for Agreement and Agreement Line objects corresponding to entitlements for those resources.' +
      'It includes extensive matching logic, a job/task scheduling system + management, an entitlement log feed for harvesting changes, connections to Organisations apps and more.',
      'The licenses app is an app allowing the construction of License data, including a complete custom Term creation and filtering system.',
      'The local kb management app allows oversight and management of KB jobs, including harvests, imports, identifier reassignment and more.',
      'The comparisons app allows for a resource by resource comparison of overlap between package titles, or titles for agreements, or a combination of the both.'
    ],
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
        url: Folio.comparisonsReport,
        type: 'image',
        alt: 'Comparison report between 2 packages'
      },
      {
        url: Folio.comparisonsForm,
        type: 'image',
        alt: 'Comparison form'
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
    role: [
      {
        role: 'Developer',
        timeframe: '2019-2022'
      },
      {
        role: 'Tech Lead',
        timeframe: '2022-2026'
      }
    ],
    tags: ['React', 'Javascript', 'Stripes', 'Java', 'Grails', 'PostgreSQL'],
    highlights: [
      'Lead app development for many years on the front and back end.',
      'Created "Dashboard" application for FOLIO designed to seamlessly show ERM data at a glance and be expandable to other FOLIO applications',
      'Representing Knowledge Integration at WolfCon 2025',
      'Managed integrations with external systems such as GoKB',
      'Large scale refactors over time to raise maintainability',
      'Heavily involved in Grails 4 -> 5 and 5 -> 6 migrations',
      'stripes-connect to Tanstack Query refactor',
      'stripes-kint-components library for better Stripes DX',
      'Helper hooks and functions donated back to stripes-core',
      'Testing pattern inversion with Jest',
    ],
    timeframe: "2019-2026",
    liveUrl: 'https://folio-etesting-snapshot-diku.ci.folio.org/',
    wikiLinks: [
      {
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIJET/pages/513704182/Reference+environments',
        label: 'FOLIO Reference Environments (Credentials)'
      },
    ]
  },
  {
    id: 'ill',
    title: 'ILL Application',
    category: 'applications',
    description: 'A comprehensive resource sharing and Interlibrary Loan (ILL) platform built on ISO18626, enabling automated consortial borrowing, lending, and request fulfillment across disparate library systems.',
    descriptionDeep: [
      'Initially heavily involved in Project ReShare, mod-ill was forked from mod-rs and taken forward with a raft of new features.',
      'Engineered to facilitate peer-to-peer resource sharing and consortial borrowing, enabling libraries to fulfill patron requests for materials held outside their local network.',
      'Features state-driven workflow managing the complete lifecycle for both Requester and Supplier flows, including auto-routing and rota building through to shipping, receiving, renewals, and returns.',
      'Includes a centralized Directory service to manage institutional metadata, library configurations, copyright compliance rules, and host LMS integration settings.',
      'Integrates with a Shared Index to execute real-time availability lookups and intelligent load-balancing across participating supplier libraries.'
    ],
    media: [
      {
        url: ILL.supplierFlow,
        type: 'gif',
        alt: 'Supplier flow taking an ILL request through fulfillment'
      },
      {
        url: ILL.requesterFlow,
        type: 'gif',
        alt: 'Requester flow on receipt of item.'
      },
      {
        url: ILL.directory,
        alt: 'Directory application lookup screen'
      },
      {
        url: ILL.directoryView,
        alt: 'Directory record'
      },
      {
        url: ILL.adminLibraries,
        alt: 'Administrative management screen for Institution records'
      },
      {
        url: ILL.institutionSwitcher,
        alt: 'ILL allows soft-multitenancy via an "institution switcher"'
      },
      {
        url: ILL.copyrightSettings,
        type: 'gif',
        alt: 'Stripes SASQ querying hooked up in the settings screen'
      },
      {
        url: ILL.hostLmsSettings,
        alt: 'Neat and tidy settings screens across the multitude of functionality switches in ILL'
      },
      {
        url: ILL.sharedIndex,
        alt: 'Real time availability checking via a shared index'
      }
    ],
    role: [
      {
        role: 'ReShare Developer',
        timeframe: '2019-2022'
      },
      {
        role: 'ILL Senior Engineer and Frontend Lead',
        timeframe: '2024-2026'
      }
    ],
    tags: ['Grails', 'ISO Standards', 'React', 'Stripes', 'PostgreSQL'],
    highlights: [
      'Sitting on the ISO Standards committee for ISO 18626',
      'Implementing an ISO standard and discussing interoperability',
      'Developing new Stripes patterns for standard addresses',
      'Working deeply with an engineering team to productise ILL',
      'Representing Knowledge Integration at WolfCon 2025'
    ]
  },
  {
    id: 'folio-dashboard',
    title: 'FOLIO Dashboard App',
    category: 'applications',
    description: 'An extensible dashboard app for FOLIO App integrations',
    descriptionDeep: [
      'Uses Okapi (okapi-facade in Eureka) to surface a multi-interface',
      'Implementing apps can supply varying WidgetDefinitions to this interface, choosing from a select list of WidgetTypes',
      'From there a form is dynamically generated for the user, and a user can create WidgetInstances configuring from the options made available via the WidgetDefinition'
    ],
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
    liveUrl: 'https://folio-etesting-snapshot-diku.ci.folio.org/dashboard',
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
    role: [
      {
        role: 'Original Author',
        timeframe: '2021'
      },
      {
        role: 'Tech Lead',
        timeframe: '2021-2026'
      }
    ],
    timeframe: "2021-2026",
    wikiLinks: [
      {
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIJET/pages/513704182/Reference+environments',
        label: 'FOLIO Reference Environments (Credentials)'
      },
      {
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIOtips/pages/5671716/Introduction+to+Dashboard',
        label: 'Introduction to Dashboard'
      },
      {
        url: 'https://folio-org.atlassian.net/wiki/spaces/ERM/pages/5840208/Dashboard+Documentation',
        label: 'Dashboard Documentation'
      }
    ]
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
    role: [
      {
        role: 'Senior Engineer',
        timeframe: '2022'
      },
      {
        role: 'Tech Lead',
        timeframe: '2022-2026'
      }
    ],
    timeframe: "2022-2026"
  },
  {
    id: 'pushkb',
    title: 'PushKB',
    category: 'applications',
    description: 'A standalone microservice designed to harvest, cache, transform and push data from one system into another.',
    descriptionDeep: [
      'A microservice using reactive programming to rapidly ingest and cache records from a source, then transform them using a JSONPath extension library and push to a Destination.',
      'Initial implementation uses GOKB as Source, FOLIO as Destination to push records and avoid long running job issues',
      'Scalable both horizontally and vertically for rapid dissemination of resource updates across multiple FOLIO tenants at once',
      'Designed to be extensible beyond these, potentially acting as an ITTT type API mediator in future.'
    ],
    tags: [
      'Micronaut', 'Project Reactor', 'JSONPath', 'Reactive Programming', 'Scheduling', 'Scalability'
    ],
    highlights: [
      'Designing an entire microservice out of the FOLIO stack for the first time',
      'Getting to grips with reactive programming principles',
      'Designing robust algorithms for ensuring no data loss',
      'Scalability engineering for running multiple PushKB microservices in parallel'
    ],
    githubUrl: [
      {
        label: 'PushKB Repository',
        url: 'https://gitlab.com/knowledge-integration/libraries/pushkb'
      },
    ],
    media: [
      {
        url: PushKB.pushKBIngest,
        alt: 'PushKB Source Record GET showing rapid ingest of data',
        type: 'gif'
      },
      {
        url: PushKB.pushKBAlgo,
        alt: 'Diagram of the PushKB Push algorithm'
      },
      {
        url: PushKB.pushKBExample,
        alt: 'Demonstration of the algorithm in action chunking updates'
      }
    ],
    role: [
      {
        role: 'Original Author',
        timeframe: '2025'
      },
    ],
    timeframe: '2025-2026'
  },
  {
    id: 'docdel',
    title: 'DocDel Secure Document Delivery',
    category: 'applications',
    description: 'OpenRS microservice dedicated to the upload, storage and retrieval of digital documents, primarily for ILL',
    descriptionDeep: [
      'A standalone microservice designed for the next step of integration with different LMS providers.',
      'My focus was primarily on refactors and choice of frontend frameworks, including a new design language, choosing form and fetch libraries and ensuring a cohesive developer experience',
      'Development followed a prototype/cleanup pattern, whereby one developer would rapidly prototype alongside myself providing refactors and UX improvements'
    ],
    media: [
      {
        url: DocDel.layoutShift,
        type: 'gif',
        alt: 'A demonstration of the power of Halfway to define layout shifts with the same underlying code.'
      },
      {
        url: DocDel.docdelHome,
        alt: 'The DocDel splash screen'
      }
    ],
    liveUrl: 'https://docdel-dev.kihosting.net/',
    tags: ['React', 'HalfwayUI', 'Headless Components', 'Micronaut', 'NGINX', 'Gitlab CI'],
    highlights: [
      'Developing HalfwayUI as a headless component library',
      'Beginning to get to grips with AI Assisted Development',
      'Understanding UX flows and usability concerns'
    ],
    role: [
      {
        role: 'Frontend Engineer',
        timeframe: '2026'
      },
    ],
    timeframe: "2026",
  },
  {
    id: 'folio-oa',
    title: 'FOLIO Open Access',
    category: 'applications',
    description: 'A dedicated FOLIO module for tracking Open Access publication requests, article processing charges (APCs), correspondence, and institutional funding workflows.',
    descriptionDeep: [
      'Built within the FOLIO ecosystem to support libraries and research institutions in managing their Open Access workflows from initial request to publisher settlement.',
      'Includes flexible data models for tracking publication requests, publication types, journals, external authors, and associated organization agreements/entitlements.',
      'Provides tight integration with existing FOLIO apps, pulling agreement data from mod-agreements and organisation metadata from mod-organizations.'
    ],
     media: [
      {
        url: OA.requestForm,
        type: 'image',
        alt: 'Open Access Request Form'
      },
      {
        url: OA.checklistSettings,
        type: 'image',
        alt: 'Set up dynamic checklist items for APC requests'
      },
       {
         url: OA.checklist,
         type: 'image',
         alt: 'Apply checklist items to a request'
       },
       {
         url: OA.journalTypedown,
         type: 'image',
         alt: 'Journal typedown, create and match functionality'
       },
       {
         url: OA.userTypedown,
         type: 'image',
         alt: 'User typedown, create and match functionality'
       }
    ],
    liveUrl: 'https://folio-etesting-snapshot-diku.ci.folio.org/oa',
    githubUrl: [
      {
        label: 'OA Backend',
        url: 'https://github.com/folio-org/mod-oa'
      },
      {
        label: 'OA Frontend',
        url: 'https://github.com/folio-org/ui-oa'
      }
    ],
    tags: ['React', 'Javascript', 'Stripes', 'Java', 'Grails', 'PostgreSQL'],
    highlights: [
      'Architected end-to-end publication request and APC payment workflows from early stage concepts through production',
      'Integrated with FOLIO Agreements for greater cross-app functionality',
      'Designed new components and helper patterns for Stripes applications',
      'Created an NPM library to sit between Stripes and developers to ease development of new apps and allow rapid development of features across FOLIO flower release apps and non-flower release apps.'
    ],
    role: [
      {
        role: 'Tech Lead / Senior Developer',
        timeframe: '2021-2026'
      }
    ],
    timeframe: '2021-2026',
    wikiLinks: [
      {
        label: 'FOLIO Reference Environments (Credentials)',
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIJET/pages/513704182/Reference+environments'
      },
      {
        label: 'Open Access App Documentation',
        url: 'https://folio-org.atlassian.net/wiki/spaces/FOLIOtips/pages/5673362/Open+Access+Requests'
      }
    ]
  },
  {
    id: 'quote-wall',
    title: 'Quote Wall',
    category: 'applications',
    description: 'Personal side project based on a friendship group in-joke. Individual quotes that are funny out of context are stored, searchable and can be served as a random selection on the homescreen.',
    tags: ['NextJS', 'FaunaDB', 'Material UI', 'Auth and User management'],
    highlights: [
      "Learning how to operate with a NoSQL database",
      "Understanding Trigram searching",
      "Hooking up basic authentication",
      "Learning how to project manage solo",
      "Understanding how a \"product\" launch can affect usage",
    ],
    role: [
      {
        role: 'Original Author',
        timeframe: '2022'
      },
    ],
    timeframe: "2022",
  },
  /*
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
