import avatarImg from '@/assets/avatar.jpeg'

export const PROFILE_DATA = {
  name: 'Ethan Freestone',
  role: 'Full-Stack Software Engineer',
  avatarUrl: avatarImg,
  location: 'Sheffield, UK',
  bio: "Building robust web applications and backend solutions with a focus on clean architecture, modern frontend frameworks, and maintainable systems.",

  skills: [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Jest', 'Tailwind CSS', 'ViTest', 'Bigtest Interactors', 'Tanstack Start', 'Stripes'] },
    { category: 'Backend', items: ['Java', 'Micronaut', 'Grails', 'PostgreSQL', 'Project Reactor'] },
    { category: 'Tooling & DevOps', items: ['Linux Development', 'Gradle', 'Bash', 'GitLab CI', 'GitHub Actions', 'Vite', 'Kubernetes'] },
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
    { name: 'Gaming', description: 'Playing indie gems on the Steam Deck, or sports games on the PS5.' },
    { name: 'Tinkering', description: 'Working on home deployments like Jellyfin, or modding games through Arch on the Steam Deck, or just tinkering with CLIs and tools on Windows and Linux.' },
    { name: 'Football', description: 'Playing weekly and following my beloved West Ham' },
  ],
}
