import avatarImg from '@/assets/avatar.jpeg'
import {
  Cat,
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
  bio: "Building web applications in the library tech space since 2019. I specialize in untangling complex problem spaces and designing scalable, elegant solutions that meet customer needs.",
  bioDeep: "I work best when allowed to flow between tackling high-level system architecture and hands-on team leadership. Refactoring systems into extensible/maintainable patterns, building framework-agnostic libraries, and overhauling CI/CD infrastructure, my favourite work is in the abstraction behind the code that developers use day to day. Beyond writing code, I am passionate about mentoring engineers, working with modern developer tooling to improve the day to day work across a team, and fostering a collaborative environment to build accessible, user-first applications.",
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
      description: 'Architecting and leading development across FOLIO, and ILL platforms, as well as smaller projects that fit into the greater whole. Acting as a technical strategist, I work on turning complex domain requirements into maintainable, innovative solutions. I actively mentor engineers, champion cross-team developer experience initiatives, and collaborate directly with stakeholders to ensure our architecture delivers long-term value.',
    },
    {
      role: 'Software Engineer with DevOps Support',
      company: 'Knowledge Integration',
      period: '2019 — 2024',
      description: 'Developed and engineered complex applications for the FOLIO ecosystem (ERM suite, Open Access, Serials). Progressed from feature delivery to high-level system design, focusing heavily on software library development, testing architecture inversion, and standardizing shared UI components. Work included interacting directly with customers to best deliver on their needs.',
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
    {
      Icon: Cat,
      name: 'Animals'
      description: 'A total sucker for any and all creatures, fluffy, scaly or otherwise! Can often be found in an evening relaxing and watching a film cuddled with my two cats. (Kitty photos available on request!)'
    },
  ],
};
