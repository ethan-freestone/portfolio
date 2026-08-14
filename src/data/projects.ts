import {
  Folio,
  Dashboard,
  Serials,
  ILL,
  OA,
  DocDel,
  PushKB
} from '@/assets/projects/applications';

import {
  AccessControl,
  AddressPlugins,
  Halfway,
  KintComponents
} from '@/assets/projects/libraries';

import {
  ResourceDeletion
} from '@/assets/projects/features';

import {
  Bruno,
  PipelineUtils
} from '@/assets/projects/other';

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
  wikiLinks?: Link[],
  highlights?: string[]
}

export type ApplicationProject = BaseProject & {
  category: 'applications'
  liveUrl?: string
  githubUrl?: string | Link[]
  architecture?: string[]
}

export type LibraryProject = BaseProject & {
  category: 'libraries'
  npmUrl?: string
  bundleSize?: string
  githubUrl: string
}

export type FeatureProject = BaseProject & {
  category: 'features'
  parentApp: string,
}

export type OtherProject = BaseProject & {
  category: 'other'
  highlights?: string[]
  githubUrl?: string | Link[]
  npmUrl?: string
}

export type Project = ApplicationProject | LibraryProject | FeatureProject | OtherProject

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
    githubUrl: [
      {
        url: 'https://gitlab.com/knowledge-integration/libraries/networks/mod-ill',
        label: 'Mod ILL'
      },
      {
        url: 'https://gitlab.com/knowledge-integration/libraries/networks/ill-ui',
        label: 'ILL UI'
      },
      {
        url: 'https://gitlab.com/knowledge-integration/libraries/networks/ill-directory',
        label: 'ILL Directory'
      },
      {
        url: 'https://gitlab.com/knowledge-integration/libraries/networks/stripes-ill',
        label: 'Stripes ILL'
      },
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
    wikiLinks: [
      {
        url: 'https://openlibraryfoundation.atlassian.net/wiki/spaces/ILL/pages',
        label: 'ILL JIRA Pages'
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
    timeframe: '2025-2026',
    wikiLinks: [
      {
        url: 'https://gitlab.com/knowledge-integration/libraries/pushkb/-/blob/v1.0.0/README.md',
        label: 'PushKB README'
      },
      {
        url: 'https://gitlab.com/knowledge-integration/libraries/pushkb/-/blob/v1.0.0/docs/pushkb_documentation.md',
        label: 'PushKB Documentation'
      },
      {
        url: 'https://gitlab.com/knowledge-integration/libraries/pushkb/-/blob/v1.0.0/docs/gokb_to_folio_workflow.md',
        label: 'GOKB to FOLIO Documentation'
      }
    ]
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
    // --- LIBRARIES ---
    {
      id: 'halfway-ui',
      title: 'Halfway UI',
      category: 'libraries',
      description: 'Shared headless UI component and utility library powering microservice frontends.',
      descriptionDeep: [
        'Halfway is designed to be a component library which can allow a frontend application to mimic the look and feel "well enough" for any of a number of LMS systems',
        'The premise is "write once, maintain once, use everywhere", allowing the applications to fit nicely standalone, alongside other OpenRS components, or in a FOLIO environment',
        'Focus is on consistent, modern looking and feeling, accessible components with intuitive APIs for Developers to implement.'
      ],
      tags: ['TypeScript', 'Headless Components', 'ViTest', 'Semantic Release', 'RadixUI', 'Storybook'],
      highlights: [
        'Fully accessible and easy to use component library based on Radix',
        'Implementation allows themes to fully decide layout as well as style, driving different UX in order to fit within multiple LMS systems',
        'Multiple theme systems allowing for drastically different look and feel',
        'Semi-Automated semantic releases via Gitlab Pipelines',
      ],
      githubUrl: 'https://gitlab.com/knowledge-integration/libraries/lib-halfway-ui',
      media: [
        {
          url: Halfway.appshellDemo,
          type: 'gif',
          alt: 'AppShell layout and responsive frame demo'
        },
        {
          url: Halfway.formPageShellDemo,
          type: 'gif',
          alt: 'Form page shell layout demonstration'
        },
        {
          url: Halfway.lookupPageShellDemo,
          type: 'gif',
          alt: 'Lookup page shell flow and layout demo'
        },
        {
          url: Halfway.multiComboboxDemo,
          type: 'gif',
          alt: 'Multi-combobox component interaction'
        },
        {
          url: Halfway.dialogDemo,
          type: 'gif',
          alt: 'Accessible dialog modal overlay demo'
        },
        {
          url: Halfway.toastDemo,
          type: 'gif',
          alt: 'Toast notification system demo'
        },
        {
          url: Halfway.datatable,
          type: 'image',
          alt: 'Data table component styling and structure'
        },
        {
          url: Halfway.dateTimePicker,
          type: 'image',
          alt: 'Date & time picker component'
        },
        {
          url: Halfway.combobox,
          type: 'image',
          alt: 'Combobox input component'
        },
        {
          url: Halfway.dropdown,
          type: 'image',
          alt: 'Dropdown menu component'
        },
        {
          url: Halfway.select,
          type: 'image',
          alt: 'Select dropdown input'
        },
        {
          url: Halfway.buttons,
          type: 'image',
          alt: 'Button variants and states'
        },
        {
          url: Halfway.checkbox,
          type: 'image',
          alt: 'Checkbox component'
        },
        {
          url: Halfway.chips,
          type: 'image',
          alt: 'Chip and tag components'
        },
        {
          url: Halfway.list,
          type: 'image',
          alt: 'List component layout'
        },
        {
          url: Halfway.boxesHalfway,
          type: 'image',
          alt: 'Halfway layout primitives overview'
        },
        {
          url: Halfway.boxesStripes,
          type: 'image',
          alt: 'Stripes-inspired layout boxes comparison'
        }
      ],
      wikiLinks: [
        {
          url: 'https://gitlab.com/knowledge-integration/libraries/lib-halfway-ui/-/blob/v0.6.1/README.md',
          label: 'HalfwayUI README'
        },
        {
          url: 'https://gitlab.com/knowledge-integration/libraries/lib-halfway-ui/-/blob/v0.6.1/README.md',
          label: 'HalfwayUI README'
        },
      ],
      timeframe: '2026',
      role: [
        {
          role: 'Original Author',
          timeframe: '2026'
        }
      ]
    },
  {
    id: 'access-control-engine',
    title: 'Access Control Engine',
    category: 'libraries',
    description: 'A pure Java implementation of an AccessControl engine, enabling flexible RBAC and soft multi-tenancy for FOLIO ERM apps without tight coupling to underlying frameworks.',
    descriptionDeep: [
      'A framework-agnostic Java library designed to handle complex access control operations. It separates core engine logic from implementation frameworks, allowing seamless use across Grails, Micronaut, and future architectures.',
      'Features a highly modular, plugin-based architecture comprising Core, Main, Grails framework layers, and specific implementation plugins (such as FOLIO Acquisition units).',
      'Introduces a custom `@PolicyControlled` annotation and relational ownership chains. This ensures existing domain models remain unpolluted by access control fields, delegating policy assignments to a robust join-table structure.',
      'Translates complex domain restrictions (e.g., READ, UPDATE, CLAIM, APPLY_POLICIES) into raw SQL subqueries dynamically to pass down to the implementing framework.'
    ],
    media: [
      {
        url: AccessControl.accessControlDiagram,
        alt: "Diagram displaying the infrastructure breakdown for access control implementation."
      }
    ],
    githubUrl: 'https://gitlab.com/knowledge-integration/libraries/access-control/access-control',
    tags: [
      'Java',
      'RBAC',
      'ABAC',
      'Grails',
      'Project Lombok',
      'Jackson',
      'Software Architecture'
    ],
    highlights: [
      'Architected a framework-agnostic core to future-proof authorization boundaries across KInt modules.',
      'Implemented a complex tree-based ownership resolution system, allowing child resources to inherit or map restrictions directly from their parents.',
      'Developed an extensible plugin system built for open-ended implementation (e.g., Keycloak, KI Grants, Acquisition Units).',
      'Engineered an asynchronous, wrapper-friendly `FolioClient` using Java\'s HttpClient and CompletableFutures for performant cross-module fetches.'
    ],
    role: [
      {
        role: 'Architect & Original Author',
        timeframe: '2026'
      }
    ],
    timeframe: '2026',
    wikiLinks: [
      {
        url: 'https://blog.kihosting.net/blog/2026-06-09-foundry-platform-services-docking-layer/',
        label: 'Foundry platform-services docking-layer note'
      }
    ]
  },
  {
    id: 'stripes-kint-components',
    title: 'Stripes Kint Components',
    category: 'libraries',
    description: 'Component and utility library built on top of FOLIO Stripes to streamline and accelerate 3-pane Search-And-Sort-Query (SASQ) application development.',
    descriptionDeep: [
      'Originally created during developer onboarding to simplify complex FOLIO Stripes patterns into intuitive, reusable abstractions.',
      'Features the core `SASQRoute` wrapper component which handles URL state management, query parameter sync, and pane layouts out of the box.',
      'Also features the fully fledged generateKiwtQueryParams utility function which can transform a state object into a query designed for the KIWT API shape',
      'Includes standard components such as custom typedowns, action lists, and icon select inputs designed to standardize UI/UX across FOLIO modules.',
      'Adopted across KInt FOLIO ecosystem, achieving over 900 weekly downloads on NPM.'
    ],
    githubUrl: 'https://gitlab.com/knowledge-integration/folio/stripes-kint-components',
    npmUrl: 'https://www.npmjs.com/package/@k-int/stripes-kint-components',
    tags: ['React', 'JavaScript', 'i18n', 'FOLIO Stripes', 'NPM', 'Frontend Architecture', 'Semantic Releases'],
    highlights: [
      'First attempts at learning to abstract problem spaces into development tooling',
      'Authored the `SASQRoute` wrapper, dramatically reducing boilerplate for FOLIO 3-pane workflows',
      'Several innovative components introduced such as Typedown/QueryTypedown for rich combobox functionality, ActionList to replace EntryManager and more.',
      'Created during developer onboarding to standardize internal patterns and speed up development',
      'Evolved through multiple major revisions to keep maintained across major Stripes version changes',
      'Automated release process through Gitlab CI pipelines'
    ],
    media: [
      {
        url: KintComponents.sasqOa,
        type: 'image',
        alt: 'SASQ 3-pane layout pattern built with stripes-kint-components'
      },
      {
        url: KintComponents.typedownDemo,
        type: 'gif',
        alt: 'Typedown component search and select demo'
      },
      {
        url: KintComponents.buttonTypedownDemo,
        type: 'gif',
        alt: 'Button typedown variant interaction demo'
      },
      {
        url: KintComponents.actionListDemo,
        type: 'gif',
        alt: 'Dynamic action list interaction demo'
      },
      {
        url: KintComponents.iconSelectDemo,
        type: 'gif',
        alt: 'Icon selection component demo'
      }
    ],
    role: [
      {
        role: 'Original Author & Maintainer',
        timeframe: '2021-2026'
      }
    ],
    timeframe: '2021-2026'
  },
  {
    id: 'stripes-erm-testing',
    title: 'Stripes ERM Testing',
    category: 'libraries',
    description: 'A specialized testing utility library for FOLIO ERM applications, standardizing Jest mocks, custom BigTest/Cypress interactors, and test setup boilerplate.',
    descriptionDeep: [
      'Created after identifying a fundamental structural issue in default FOLIO Stripes testing patterns, where manual Jest mocks were centralized and imported everywhere—causing hoisting conflicts and breaking module-level overrides.',
      'Inverted the mock hierarchy to align with Jest best practices: centralizing global environment mocks while modularizing test-specific implementations.',
      'Encapsulates custom component interactors for UI testing and houses the shared Cypress testing suite across ERM modules.',
      'Provided a dedicated domain space for ERM page interactors without requiring breaking changes to core FOLIO central testing libraries.'
    ],
    githubUrl: 'https://github.com/folio-org/stripes-erm-testing',
    tags: ['Jest', 'Cypress', 'React', 'Testing Library', 'FOLIO Stripes', 'Frontend Architecture'],
    highlights: [
      'Refactored FOLIO test architecture to fix Jest hoisting issues and manual mock isolation',
      'Created reusable mock helpers and render utilities used across all ERM applications',
      'Built custom component interactors for both Jest/React Testing Library and Cypress end-to-end suites',
      'Author of official FOLIO K-Int Jest Test Documentation'
    ],
    wikiLinks: [
      {
        label: 'K-Int Jest Test Documentation',
        url: 'https://folio-org.atlassian.net/wiki/spaces/ERM/pages/951713801/K-Int+Jest+Test+Documentation'
      }
    ],
    role: [
      {
        role: 'Original Author & Maintainer',
        timeframe: '2020-2026'
      }
    ],
    timeframe: '2020-2026'
  },
  {
    id: 'address-plugins',
    title: 'Address Plugins',
    category: 'libraries',
    description: 'A suite of pluggable React address components and data massagers designed to simplify international address formatting and validation.',
    descriptionDeep: [
      'Built to solve complex internationalization challenges by modeling address forms after the OASIS CIQ TC Standard xAL data model.',
      'Features localized plugins (e.g., British Isles, North America, Generic) that dynamically adjust field ordering, labels, and validation rules based on ISO 3166-2 country codes.',
      'Decouples form rendering from backend persistence with modular `backendToFields` and `fieldsToBackend` translation utilities.',
      'Designed to accept flexible input abstractions (`AddressTextField`) so it integrates seamlessly with any form framework like Final Form or React Hook Form.'
    ],
    githubUrl: 'https://gitlab.com/knowledge-integration/folio/addressplugins',
    npmUrl: 'https://www.npmjs.com/package/@k-int/address-plugins',
    tags: ['React', 'JavaScript', 'OASIS xAL Standard', 'NPM', 'Form Abstractions'],
    highlights: [
      'Architected internationalized address models aligned with the OASIS CIQ xAL standard',
      'Designed dynamic region-based field layouts (e.g. State vs. Province, custom postal code rules)',
      'Created bidirectional data transformation utilities between standardized backend representations and flat form states',
      'Engineered framework-agnostic component bindings using custom input injection patterns'
    ],
    media: [
      {
        url: AddressPlugins.addressOptions,
        type: 'image',
        alt: 'Country selection dropdown switching active address formatting plugin'
      },
      {
        url: AddressPlugins.englandAddress,
        type: 'image',
        alt: 'UK and British Isles localized address form layout'
      },
      {
        url: AddressPlugins.usaAddress,
        type: 'image',
        alt: 'US and North America localized address form layout'
      },
      {
        url: AddressPlugins.genericAddress,
        type: 'image',
        alt: 'Fallback generic international address form layout'
      }
    ],
    role: [
      {
        role: 'Original Author',
        timeframe: '2020-2026'
      }
    ],
    timeframe: '2020-2026'
  },
  // --- FEATURES ---
  {
    id: 'erm-resource-deletion',
    title: 'ERM Resource Delete',
    category: 'features',
    parentApp: 'folio-erm',
    description: 'A robust backend feature allowing users to safely delete harvested resources that are not in use and are no longer required.',
    descriptionDeep: [
      'The API allows users to select one or more PCIs, PTIs, or TIs for deletion, enforcing strict validations to ensure resources linked to active agreement lines cannot be deleted.',
      'Implemented a four-stage recursive algorithm (markForDelete) that cascades through PCIs, PTIs, TIs, and Works. Each stage checks if the current resource is valid for deletion, and if so, uses it to identify resources at the next level that also need checking.',
      'Engineered separate `/delete` and `/markForDelete` endpoints. This architectural decision opens the potential for future UI implementations to preview the exact cascading impact of a deletion before committing it to the database.',
      'Package-level deletions leverage an asynchronous Job system (`/delete/pkg`) because large packages can take a long time to process, returning a job status object to prevent UI timeouts.',
      'I engineered this feature in 2025 and utilized it as a structured onboarding task. After collaborating with the Product Owner on the architectural diagrams, I handed the implementation off to a team member and iteratively guided them through the delivery.'
    ],
    tags: [
      'Grails',
      'Java',
      'Spock Framework',
      'Combinatorial Testing',
      'REST API',
      'Data Integrity'
    ],
    highlights: [
      'Designed a four-stage algorithm to safely traverse complex ERM hierarchies and isolate orphaned resources for deletion.',
      'Separated `/markForDelete` and `/delete` API actions to enable future destructive-action preview screens.',
      'Implemented asynchronous Job processing for package-level deletions to ensure system stability on large data payloads.',
      'Pioneered a combinatorial integration testing strategy using the Spock framework\'s "where" blocks to mathematically verify all possible resource-to-agreement-line relationship structures.',
      'Successfully used the technical design as an onboarding and mentorship vehicle for a newer team member.'
    ],
    media: [
      {
        url: ResourceDeletion.deleteStructures,
        type: 'image',
        alt: 'Diagram showing all four hierarchical structures that might exist between resources.'
      },
      {
        url: ResourceDeletion.deleteResources,
        type: 'image',
        alt: 'Flowchart detailing the recursive mark-for-deletion algorithm across PCIs, PTIs, TIs, and Works.'
      },
      {
        url: ResourceDeletion.dataModel,
        type: 'image',
        alt: 'The foundational ERM Domain Model illustrating structural relationships.'
      }
    ],
    role: [
      {
        role: 'Lead Engineer & Mentor',
        timeframe: '2025'
      }
    ],
    timeframe: '2025',
    wikiLinks: [
      {
        label: 'Resource Deletion documentation',
        url: 'https://github.com/folio-org/mod-agreements/blob/v7.3.4/doc/resource-deletion-documentation.md'
      },
      {
        label: 'ErmResourceService::markForDelete() Code',
        url: 'https://github.com/folio-org/mod-agreements/blob/v7.3.4/service/grails-app/services/org/olf/ErmResourceService.groovy#L87-L111'
      },
      {
        label: 'ErmResourceService::deleteResources() Code',
        url: 'https://github.com/folio-org/mod-agreements/blob/v7.3.4/service/grails-app/services/org/olf/ErmResourceService.groovy#L291'
      },
      {
        label: 'Combinatorial Testing Spec Code',
        url: 'https://github.com/folio-org/mod-agreements/blob/v7.3.4/service/src/integration-test/groovy/org/olf/DeleteResources/ResourceDeletionSpec.groovy'
      }
    ]
  },

  // --- OTHER ---
  {
    id: 'bruno-api-workspace',
    title: 'Centralized Bruno API Workspace',
    category: 'other',
    description: 'Led the engineering team\'s migration from fragmented Postman instances to a centralized, Git-controlled API testing workspace using Bruno.',
    descriptionDeep: [
      'Recognized the friction and siloed nature of individual, free-tier Postman setups across the team and spearheaded a migration to Bruno, an open-source, Git-native API client.',
      'Set up and structured centralized Git repositories to house shared API collections for major internal projects, including FOLIO, ILL, DocDel, PushKB, and GOKB.',
      'To streamline the transition, I created and published a shared NPM package (@k-int/bruno-shared-scripts) to handle complex FOLIO authentication. This allowed the team to easily import standardized auth flows directly into their local collections.',
      'Actively drove adoption across the engineering team, providing a significantly improved Developer Experience (DX) and ensuring API exploration, testing, and documentation are now version-controlled directly alongside the code.'
    ],
    media: [
      {
        url: Bruno.automatedAccessControl,
        type: 'gif',
        alt: 'An automated collection for creating access controlled resources in a given environment'
      },
      {
        url: Bruno.folioCollection,
        alt: 'The Bruno FOLIO collection'
      },
      {
        url: Bruno.illCollection,
        alt: 'The Bruno ILL collection'
      },
      {
        url: Bruno.gokbCollection,
        alt: 'The Bruno GOKB collection'
      }
    ],
    tags: [
      'Bruno',
      'API Testing',
      'Git',
      'NPM',
      'Developer Experience',
      'JavaScript'
    ],
    highlights: [
      'Migrated the entire engineering team to a collaborative, Git-native API workflow.',
      'Created and maintained shared API collections covering FOLIO, ILL, DocDel, PushKB, and GOKB.',
      'Published reusable authentication scripts to NPM (@k-int/bruno-shared-scripts) to standardize FOLIO API access.',
      'Eliminated testing silos by making API requests reviewable, shareable, and PR-friendly.'
    ],
    role: [
      {
        role: 'Initiative Lead',
        timeframe: '2025-2026'
      }
    ],
    timeframe: '2025-2026',
    wikiLinks: [
      {
        label: '@k-int/bruno-shared-scripts on NPM',
        url: 'https://www.npmjs.com/package/@k-int/bruno-shared-scripts'
      }
    ]
  },
  {
    id: 'shared-pipeline-utils',
    title: 'Shared CI/CD Pipeline Infrastructure',
    category: 'other',
    description: 'Centralized cross-platform pipeline infrastructure enabling reusable GitLab Components and GitHub Actions for automated API documentation, SBOM generation, and vulnerability scanning.',
    descriptionDeep: [
      'Designed a "write once, run anywhere" automation architecture separating proprietary execution logic (bash scripts) from structural workflow definitions to keep code DRY and secure.',
      'Built a centralized catalog of GitLab CI/CD Components and GitHub Reusable Workflows that abstract core DevOps tasks and repository change delivery.',
      'Developed automated Git-delivery engines that dynamically clone repositories, stage modified files, commit differentials, and safely manage merge gates via GitHub PRs and GitLab MRs.',
      'Set up reusable dependency scanning using Grype and Syft to generate standard CycloneDX Software Bill of Materials (SBOM) layers, running on an automated weekly matrix schedule.',
      'Engineered a decoupled OpenAPI pipeline utilizing Redocly to compile, validate, and deploy FOLIO API documentation directly to AWS S3.'
    ],
    tags: [
      'GitHub Actions',
      'GitLab CI/CD',
      'Bash',
      'DevSecOps',
      'Syft & Grype',
      'Redocly',
      'SBOM'
    ],
    highlights: [
      'Migrated complex CI/CD logic into a shared infrastructure repository, preventing workflow duplication across the organization.',
      'Implemented a zero-configuration authentication architecture utilizing native CI_JOB_TOKENs and group-level masks to remove manual secret provisioning.',
      'Built automated loop-prevention guardrails for background CI/CD Git write-backs.',
      'Standardized automated OpenAPI documentation generation and deployment across several FOLIO modules.'
    ],
    media: [
      {
        url: PipelineUtils.vulnerabilitiesPipeline,
        type: 'gif',
        alt: 'Vulnerability scanning pipeline running in an automated weekly matrix.'
      },
      {
        url: PipelineUtils.vulnerabilitiesReport,
        type: 'image',
        alt: 'SBOM vulnerability scan output report.'
      },
      {
        url: PipelineUtils.folioApiDocumentation,
        type: 'image',
        alt: 'Folio OpenAPI documentation pipeline orchestrator.'
      },
      {
        url: PipelineUtils.helloWorldGithub,
        type: 'image',
        alt: 'Hello World structural blueprint execution on GitHub Actions.'
      },
      {
        url: PipelineUtils.helloWorldGitlab,
        type: 'image',
        alt: 'Hello World graph pipeline model execution on GitLab CI/CD.'
      }
    ],
    role: [
      {
        role: 'DevOps Architect',
        timeframe: '2026'
      }
    ],
    timeframe: '2026'
  }
]
