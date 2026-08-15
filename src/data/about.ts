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
  period: string; // display string, e.g. "2024-2026" — shown as-is on About and CV
  startDate: string; // ISO-ish sort key, e.g. "2024-01" — never displayed, just used for ordering
  endDate: string; // ISO-ish sort key, or "Present" — never displayed, just used for ordering
  description: string; // full prose, used on the About page
  bullets?: string[]; // CV-specific highlights. Falls back to `description` on the CV if omitted.
}

export type Education = {
  institution: string;
  qualification: string;
  period: string; // display string, e.g. "2015-2019"
  startDate: string; // ISO-ish sort key, e.g. "2015-09"
  endDate: string; // ISO-ish sort key, or "Present"
  description?: string; // optional: honours, dissertation, notable modules
  showOnCV?: boolean; // default true. Set false to keep something on /about but off the one-page CV.
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
  education: Education[];
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
        'Docker',
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

  // Ordering doesn't matter any more — both /about and /cv sort by startDate.
  experience: [
    {
      role: 'Senior Software Engineer & Team Leader',
      company: 'Knowledge Integration',
      period: '2024-2026',
      startDate: '2024-01',
      endDate: 'Present',
      description: 'Architecting and leading development across FOLIO ERM suite, Open Access, Serials applications and ILL application. Acting as a core technical strategist, I work on turning complex domain requirements into maintainable solutions. I actively mentor engineers, champion cross-team developer experience initiatives, and collaborate directly with stakeholders to ensure our architecture delivers long-term value.',
      bullets: [
        'Architect and technical lead across FOLIO ERM, OA and Serials, as well as ILL, turning complex requirements into maintainable solutions.',
        'Mentor engineers and drive developer-experience initiatives: shared testing libraries, centralised CI/CD pipeline components, and a team-wide migration to a Git-native API workspace (Bruno).',
        'Represented Knowledge Integration at WolfCon 2025 and sat on the ISO 18626 (interlibrary loan) standards committee.',
      ],
    },
    {
      role: 'Software Engineer with DevOps Support',
      company: 'Knowledge Integration',
      period: '2019 — 2024',
      startDate: '2019-01',
      endDate: '2024-01',
      description: 'Engineered complex applications for the FOLIO ecosystem (ERM suite, Open Access, Serials). Progressed from feature delivery to high-level system design, focusing heavily on software library development, testing architecture inversion, and standardizing shared UI components. Work included interacting directly with stakeholders to best deliver on their needs.',
      bullets: [
        'Delivered and grew ownership of the FOLIO ERM suite, Open Access, and Serials apps, progressing from feature delivery into high-level system design.',
        'Authored stripes-kint-components (900+ weekly NPM downloads) and led a testing-architecture inversion, standardising shared UI and test patterns across FOLIO modules.',
        'Represented the company in meetings with stakeholders to discuss user needs and technical solutions.'
      ],
    },
  ],

  education: [
    {
      institution: 'University of Sheffield',
      qualification: 'MMath Mathematics (1st Class)',
      period: '2015-2019',
      startDate: '2015-09',
      endDate: '2019-06',
      description: 'Focused on pure mathematics — topology, algebra, and algebraic geometry. Final year project (building on a Harry Burkill summer studentship) proved Mordell\u2019s Theorem for elliptic curves. Picked up Python during two programming courses and kept reaching for it: writing tools from scratch to visualise vector fields and to generate graphs for the final project when doing it by hand stopped being practical.',
    },
    {
      institution: 'South Wolds Academy',
      qualification: 'A-Levels: Maths (A), English Language (A), Further Maths (B)',
      period: '2008-2015',
      startDate: '2008-09',
      endDate: '2015-06',
      showOnCV: false,
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
