import avatarImg from '@/assets/avatar.jpeg'
import {
  CodeXml,
  Gamepad2,
  Pickaxe,
  Volleyball,
  type LucideIcon,
} from 'lucide-react'

export type Skill = {
  category: string;
  strengths: string[];
  tried?: string[];
}

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
}

export type Hobby = {
  name: string;
  Icon?: LucideIcon;
  description: string;
}

export type ProfileData = {
  name: string;
  role: string;
  avatarUrl: string;
  location: string;
  bio: string;
  skills: Skill[];
  experience: Experience[];
  hobbies: Hobby[];
}

export const PROFILE_DATA = {
  name: 'Ethan Freestone',
  role: 'Full-Stack Software Engineer',
  avatarUrl: avatarImg,
  location: 'Sheffield, UK',
  bio: "Building robust web applications and backend solutions with a focus on clean architecture, modern frontend frameworks, and maintainable systems.",

  skills: [
    {
      category: 'Frontend',
      strengths: [
        'React',
        'TypeScript',
        'Jest',
        'Headless Components',
        'Tailwind CSS',
        'ViTest',
        'Frontside Interactors',
        'Stripes',
        'Semantic Release'
      ],
      tried: ['Tanstack Start', 'NextJS', 'Vue', 'Nuxt']
    },
    {
      category: 'Backend',
      strengths: [
        'Java',
        'Micronaut',
        'Grails',
        'PostgreSQL',
        'SQL',
        'Project Reactor',
        'API Design'
      ],
      tried: [
        'FaunaDB',
        'Supabase',
      ]
    },
    {
      category: 'Tooling & DevOps',
      strengths: [
        'Linux Development',
        'Gradle',
        'Bash',
        'GitLab CI',
        'GitHub Actions',
        'Vite',
        'Kubernetes',
        'Bruno/Postman',
        'Conventional Commits'
      ],
      tried: [
        'AI Assisted Development',
        'Caddy',
        'NGINX',
        'curl'
      ]
    },
  ],

  experience: [
    {
      role: 'Full-Stack Software Engineer & Team Leader',
      company: 'Knowledge Integration',
      period: '2024-2026',
      description: 'Leading development on FOLIO, ILL and DocDel web applications, mentoring junior engineers, having a hand in key strategic decisions and working directly with customers to provide the best solutions possible.',
    },
    {
      role: 'Software Engineer with DevOps Support',
      company: 'Knowledge Integration',
      period: '2019 — 2024',
      description: 'Developing applications for FOLIO, namely the ERM suite, OA and Serials, with a strong focus on maintainability and software library development.',
    },
  ],

  hobbies: [
    {
      Icon: Gamepad2,
      name: 'Gaming',
      description: 'Playing indie gems on the Steam Deck, or sports games on the PS5.'
    },
    {
      Icon: CodeXml,
      name: 'Web Development',
      description: 'Sometimes I get the bug on my own time, and side projects have included a Quote Wall application written with FaunaDB (now defunct) and a project with a friend to set up a silly fantasy league game using Supabase and Vue.'
    },
    {
      Icon: Pickaxe,
      name: 'Tinkering',
      description: 'Working on home deployments like Jellyfin, or modding games through Arch on the Steam Deck, or just tinkering with CLIs and tools on Windows and Linux.'
    },
    {
      Icon: Volleyball,
      name: 'Football',
      description: 'Playing weekly and following my beloved West Ham'
    },
  ],
} as ProfileData;
