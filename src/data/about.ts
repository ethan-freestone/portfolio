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

export type ExperienceBullet = {
  text: string;
  showOnCV?: boolean; // Defaults to true if undefined. Set false to hide on the printed CV.
}

export type Experience = {
  role: string;
  company: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets?: ExperienceBullet[];
}

export type Education = {
  institution: string;
  qualification: string;
  period: string;
  startDate: string;
  endDate: string;
  description?: string;
  showOnCV?: boolean;
}

export type Hobby = {
  name: string;
  Icon?: LucideIcon;
  description: string;
}

export type ProfileData = {
  name: string;
  role: string;
  github: string;
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
  github: 'github.com/ethan-freestone',
  role: 'Full-Stack Software Engineer & Architect',
  avatarUrl: avatarImg,
  location: 'Sheffield, UK',
  bio: "Building web applications in the library tech space since 2019. I specialize in untangling complex problem spaces and designing scalable, elegant solutions that meet customer needs.",
  bioDeep: "I work best when allowed to flow between tackling high-level system architecture and hands-on team leadership. Refactoring systems into extensible/maintainable patterns, building framework-agnostic libraries, and overhauling CI/CD infrastructure, my favourite work is in the abstraction behind the code that developers use day to day. Beyond writing code, I am passionate about mentoring engineers, working with modern developer tooling to improve the day to day work across a team, and fostering a collaborative environment to build accessible, user-first applications.",
  skills: [
    {
      category: 'Frontend',
      strengths: [
        'React', 'TypeScript', 'Jest', 'Headless Components', 'Tailwind CSS',
        'Vite', 'ViTest', 'Frontside Interactors', 'Stripes', 'Semantic Release',
        'Storybook', 'Accessibility', 'Axe DevTools'
      ],
      tried: ['Tanstack Start', 'NextJS', 'Vue', 'Nuxt']
    },
    {
      category: 'Backend',
      strengths: [
        'Java', 'Micronaut', 'Grails', 'PostgreSQL', 'SQL', 'Liquibase',
        'Flyway', 'Spock Tests', 'JUnit', 'Project Reactor', 'API Design',
        'System Architecture'
      ],
      tried: ['FaunaDB', 'Supabase']
    },
    {
      category: 'Tooling & DevOps',
      strengths: [
        'Linux Development', 'Gradle', 'Bash', 'Docker', 'GitLab CI',
        'GitHub Actions', 'Kubernetes', 'Bruno/Postman', 'Conventional Commits'
      ],
      tried: ['Portainer', 'Rancher', 'Maven', 'AI Assisted Development', 'Caddy', 'NGINX', 'curl']
    },
  ],
  experience: [
    {
      role: 'Senior Software Engineer & Team Leader',
      company: 'Knowledge Integration',
      period: '2024-2026',
      startDate: '2024-01',
      endDate: 'Present',
      description: 'Architecting and leading development across FOLIO ERM suite, Open Access, Serials applications' +
        'and ILL application. Acting as a technical lead, I work on turning complex requirements into maintainable solutions.' +
        'I actively mentor engineers, working wherever possible to improve the developer experience, and collaborate' +
        'directly with stakeholders to ensure our applications deliver on all requirements.' +
        'My work has spanned from creating centralised CI/CD components to perform security analysis on our software to' +
        'engineering a new heaadless component library to drive the next era of library applications.',
      bullets: [
        {
          text: 'Architected centralized cross-platform CI/CD infrastructure using GitLab Components and GitHub Actions' +
            ' for automated SBOM generation, vulnerability scanning, and documentation page deployments.'
        },
        {
          text: 'Regularly managed containerized environments utilizing Docker, with working knowledge of Kubernetes and' +
            ' Rancher to orchestrate microservices and debug complex live deployment issues.'
        },
        {
          text: 'Architect and frontend technical lead for the ILL (Interlibrary Loan) application, ' +
            'after initially implementing ISO 18626 messaging and sitting on the standards committee.'
        },
        {
          text: 'Mentored engineers and worked on improving developer experiences'
        },
        { text: 'Engineered new headless component library (HalfwayUI).' },
        {
          text: 'Represented Knowledge Integration at WolfCon 2025, networking with existing and potential clients for ' +
            'the OpenRS platform and discussing FOLIO features and deliverables.'
        },
      ],
    },
    {
      role: 'Software Engineer with DevOps Support',
      company: 'Knowledge Integration',
      period: '2019 — 2024',
      startDate: '2019-01',
      endDate: '2024-01',
      description: 'Engineered complex applications for the FOLIO ecosystem (ERM suite, Open Access, Serials).' +
        'Progressed from feature delivery to high-level system design in a tech lead capacity, focusing heavily on' +
        'software library development, testing architecture inversion, and standardizing shared UI components.' +
        'Work included interacting directly with stakeholders to best deliver on their needs.',
      bullets: [
        {
          text: 'Delivered and grew ownership of the FOLIO ERM suite, Open Access, and Serials apps, progressing from ' +
            'feature delivery into a tech lead capacity.'
        },
        {
          text: 'Authored core frontend libraries (900+ weekly NPM downloads), led a ' +
            'frontend testing overhaul, engineered fully and semi automated semantic release pipelines via Gitlab CI to ' +
            'streamline NPM workflows.'
        },
        {
          text: 'Provided DevOps support, leveraging Linux, Bash, and docker containers to resolve infrastructure ' +
            'bottlenecks, optimize application performance, and support client testing and production environments.'
        },
        {
          text: 'Represented knowledge integration in meetings with stakeholders and worked closely with product owners ' +
            'to translate requirements into working features.'
        },
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
      description: 'Focused on pure mathematics — topology, algebra, and algebraic geometry. Final year project (building on a Harry Burkill summer studentship) proved Mordell’s Theorem for elliptic curves. Picked up Python during two programming courses and kept reaching for it: writing tools from scratch to visualise vector fields and to generate graphs for the final project when doing it by hand stopped being practical.',
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
