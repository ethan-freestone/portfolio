import { createFileRoute } from '@tanstack/react-router'
import { Printer, Mail, Globe, Github, MapPin } from 'lucide-react'
import { PROFILE_DATA, type Experience } from '@/data/about'
import { PROJECTS_DATA } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/cv')({ component: CV })

// ---------------------------------------------------------------------------
// The only thing curated here (rather than pulled straight from data) is
// which projects make the cut for a one-page CV. Everything else (experience,
// education, skills) is entirely data-driven from projects.ts
// ---------------------------------------------------------------------------
const CV_PROJECT_IDS = ['folio-erm', 'pushkb', 'access-control-engine', 'stripes-kint-components'] as const

// Single scaling dial for output PDF
const CV_SCALE = 0.80

// Group experience entries by company (supports any number of companies,
// each with any number of roles), most recent company/role first.
function groupExperienceByCompany(experience: Experience[]) {
  const groups = new Map<string, Experience[]>()
  for (const exp of experience) {
    groups.set(exp.company, [...(groups.get(exp.company) ?? []), exp])
  }
  return Array.from(groups.entries())
    .map(([company, roles]) => ({
      company,
      roles: [...roles].sort((a, b) => b.startDate.localeCompare(a.startDate)),
    }))
    .sort((a, b) => b.roles[0].startDate.localeCompare(a.roles[0].startDate))
}

// A company's overall period, derived from its roles' sort keys rather than
// their free-text `period` strings (which aren't formatted consistently).
function companyPeriod(roles: Experience[]) {
  const start = roles[roles.length - 1].startDate.slice(0, 4)
  const latestEnd = roles[0].endDate
  const end = latestEnd === 'Present' ? 'Present' : latestEnd.slice(0, 4)
  return `${start}–${end}`
}

// Merge bullets across a company's roles (most recent role's bullets first),
// dropping near-duplicates and capping the total so a promotion doesn't
// double the space a single-role company would take.
function mergedCompanyBullets(roles: Experience[], maxBullets = 10) {
  const seen = new Set<string>()
  const bullets: string[] = []
  for (const role of roles) {
    // Check if bullets exist. If so, filter out those explicitly hidden on the CV.
    const roleBullets = role.bullets
      ? role.bullets.filter(b => b.showOnCV !== false).map(b => b.text)
      : [role.description]

    for (const bullet of roleBullets) {
      const key = bullet.trim().toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      bullets.push(bullet)
      if (bullets.length >= maxBullets) return bullets
    }
  }
  return bullets
}

function CV() {
  const experienceByCompany = groupExperienceByCompany(PROFILE_DATA.experience)
  const education = PROFILE_DATA.education
    .filter((edu) => edu.showOnCV !== false)
    .sort((a, b) => b.startDate.localeCompare(a.startDate))

  const cvProjects = CV_PROJECT_IDS
    .map((id) => PROJECTS_DATA.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="page-wrap py-6 sm:py-10 print:py-0">
      {/* Toolbar — never printed */}
      <div className="no-print print:hidden mb-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground max-w-2xl">
          This page is formatted to print cleanly as a one-page PDF. In the print dialog, save as PDF and open{' '}
          <span className="font-medium text-foreground">More settings</span> to turn off{' '}
          <span className="font-medium text-foreground">Headers and footers</span> — that removes the browser's own title/URL/date line.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          {/* TODO: Hook this up to a form state that overrides the showOnCV flags */}
          {/*<Button variant="outline" className="gap-2" disabled title="TODO: Dynamic customization coming soon!">
            <Settings2 className="h-4 w-4" /> Customize CV
          </Button>*/}
          <Button onClick={() => window.print()} className="gap-2">
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* CV sheet */}
      <div
        className="
          cv-sheet mx-auto w-full max-w-[210mm] bg-card text-foreground
          border border-border rounded-lg shadow-sm
          px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10
          print:max-w-none print:border-none print:shadow-none print:rounded-none
          print:bg-white print:text-black print:px-0 print:py-0
          print:font-[ui-sans-serif,system-ui,-apple-system,Helvetica,Arial,sans-serif]
          zoom-[1] sm:zoom-(--cv-zoom) print:zoom-(--cv-zoom)
        "
        style={{ '--cv-zoom': CV_SCALE } as React.CSSProperties}
      >
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 pb-5 border-b border-border print:border-black/20">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {PROFILE_DATA.name}
            </h1>
            <p className="text-base font-medium text-primary print:text-black mt-0.5">
              {PROFILE_DATA.role}
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-muted-foreground print:text-black/70 space-y-1 shrink-0">
            <div className="flex items-center justify-start sm:justify-end gap-1.5">
              <MapPin className="h-3 w-3" />
              <span>{PROFILE_DATA.location}</span>
            </div>
            <div className="flex items-center justify-start sm:justify-end gap-1.5">
              <Globe className="h-3 w-3" />
              <span>portfolio.efreestone.co.uk</span>
            </div>
            <div className="flex items-center justify-start sm:justify-end gap-1.5">
              <Github className="h-3 w-3" />
              <span>github.com/ethan-freestone</span>
            </div>
            <div className="flex items-center justify-start sm:justify-end gap-1.5">
              <Mail className="h-3 w-3" />
              <span>e.j.freestone@gmail.com</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <p className="text-sm leading-relaxed py-4 border-b border-border print:border-black/20 text-muted-foreground print:text-black/85">
          {PROFILE_DATA.bio}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-5">
          {/* Left: Experience + Education + Projects */}
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-black mb-2">
                Experience
              </h2>
              <div className="space-y-4">
                {experienceByCompany.map(({ company, roles }) => (
                  <div key={company}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-0 mb-1">
                      <p className="text-sm font-bold">
                        {roles.length > 1
                          ? [...roles].reverse().map((r) => r.role).join(' \u2192 ')
                          : roles[0].role}
                      </p>
                      <span className="text-xs text-muted-foreground print:text-black/70 shrink-0 sm:ml-3">
                        {roles.length > 1 ? companyPeriod(roles) : roles[0].period}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground print:text-black/70 mb-1.5">
                      {company}
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground print:text-black/85 leading-snug list-disc list-outside pl-4">
                      {(roles.length > 1 ? mergedCompanyBullets(roles) : roles[0].bullets?.map(b => b.text) ?? [roles[0].description]).map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-black mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={`${edu.institution}-${edu.qualification}`} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-3">
                    <p className="text-sm">
                      <span className="font-bold">{edu.qualification}</span>
                      <span className="text-muted-foreground print:text-black/70"> — {edu.institution}</span>
                    </p>
                    <span className="text-xs text-muted-foreground print:text-black/70 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-black mb-2">
                Key Projects
              </h2>
              <div className="space-y-3">
                {cvProjects.map((project) => (
                  <div key={project.id}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-0">
                      <p className="text-sm font-bold">{project.title}</p>
                      {project.timeframe && (
                        <span className="text-xs text-muted-foreground print:text-black/70 shrink-0 sm:ml-3">
                          {project.timeframe}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground print:text-black/85 leading-snug">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Skills */}
          <div className="md:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-black mb-2">
              Skills
            </h2>
            <div className="space-y-4">
              {PROFILE_DATA.skills.map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-semibold text-muted-foreground print:text-black/70 uppercase tracking-wide mb-1">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-1 print:hidden">
                    {group.strengths.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-[10px] font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {/* Plain-text fallback for print: badge chrome wastes ink and can
                      wrap awkwardly across a printed page. */}
                  <p className="hidden print:block text-sm text-black/85 leading-snug">
                    {group.strengths.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-6 pt-3 border-t border-border print:border-black/20 text-center">
          <p className="text-xs text-muted-foreground print:text-black/70">
            Full write-ups, screenshots and animated demos for these projects (and more) at{' '}
            <span className="font-semibold text-primary print:text-black">portfolio.efreestone.co.uk</span>
          </p>
        </footer>
      </div>

      {/* @page can only be set from real CSS, not Tailwind utilities. */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 4mm;
          }
          html, body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  )
}
