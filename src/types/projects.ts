export type ProjectCategory =
  'applications' | 'libraries' | 'features' | 'other'
export type ProjectCategoryDefinition = {
  slug: ProjectCategory
  label: string
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

export type Role =
  | string
  | {
      role: string
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
  wikiLinks?: Link[]
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
  parentApp: string
}

export type OtherProject = BaseProject & {
  category: 'other'
  highlights?: string[]
  githubUrl?: string | Link[]
  npmUrl?: string
}

export type Project =
  ApplicationProject | LibraryProject | FeatureProject | OtherProject
