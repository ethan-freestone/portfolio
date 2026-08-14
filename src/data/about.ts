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
  bioDeep: string;
  skills: Skill[];
  experience: Experience[];
  hobbies: Hobby[];
}

export const PROFILE_DATA: ProfileData = {
  name: 'Ethan Freestone',
  role: 'Full-Stack Software Engineer & Architect',
  avatarUrl: avatarImg,
  location: 'Sheffield, UK',
  bio: "Building robust web applications in the library tech space since 2019. I specialize in untangling complex problem domains and designing scalable, elegant solutions that meet critical customer needs.",
  bioDeep: "I work beest at the intersection of high-level system architecture and hands-on team leadership. Refactoring monolithic systems into extensible strategy patterns, building framework-agnostic libraries, and overhauling CI/CD infrastructure, I focus on creating abstractions that genuinely make sense. Beyond writing code, I am passionate about mentoring engineers, driving the adoption of modern developer tooling (DX), and fostering a collaborative environment to build accessible, user-first applications.",
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
        'API Design',
        'System Architecture'
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
      role: 'Senior Software Engineer & Team Leader',
      company: 'Knowledge Integration',
      period: '2024-2026',
      description: 'Architecting and leading development across FOLIO, ILL, and DocDel platforms. Acting as a core technical strategist, I translate complex domain requirements into maintainable, high-level solutions. I actively mentor engineers, champion cross-team developer experience (DX) initiatives, and collaborate directly with stakeholders to ensure our architecture delivers long-term value.',
    },
    {
      role: 'Software Engineer with DevOps Support',
      company: 'Knowledge Integration',
      period: '2019 — 2024',
      description: 'Engineered complex applications for the FOLIO ecosystem (ERM suite, Open Access, Serials). Progressed from feature delivery to high-level system design, focusing heavily on software library development, testing architecture inversion, and standardizing shared UI components.',
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
      description: 'Playing weekly and following my beloved West Ham through the ups and downs (mostly downs).'
    },
  ],
};
