import { createFileRoute } from '@tanstack/react-router'
import { Printer, Mail, Globe, Github, MapPin } from 'lucide-react'
import { PROFILE_DATA, type Experience } from '@/data/about'
import { PROJECTS_DATA } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/cv')({ component: CV })

// ---------------------------------------------------------------------------
// The only thing curated here (rather than pulled straight from data) is
// which projects make the cut for a one-page CV — that's a judgement call,
// not something to infer automatically. Everything else (experience,
// education, skills) is entirely data-driven: add a job, a degree, or a
// role change to about.ts and this page updates itself, in the right order,
// grouped correctly, with no edits needed here.
// ---------------------------------------------------------------------------
const CV_PROJECT_IDS = ['folio-erm', 'pushkb', 'access-control-engine', 'stripes-kint-components'] as const

// Single scale knob. Turn down (e.g. 0.85) if a new job/project pushes the
// sheet past one page; turn up if there's spare room.
//
// On screen (sm+) this drives real CSS `zoom` for a quick, cheap preview —
// fine there because a screen preview never becomes the PDF.
// For print, every print:text-[..]/gap-[..]/etc below is wired to this same
// value via calc(basePx * var(--cv-zoom)), so print scales identically
// without ever using `zoom` — which Chromium can rasterize during print,
// silently destroying the PDF's selectable/searchable text layer. calc() on
// font-size/spacing is just normal text layout, so there's no such risk.
const CV_SCALE = 0.85

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
function mergedCompanyBullets(roles: Experience[], maxBullets = 7) {
  const seen = new Set<string>()
  const bullets: string[] = []
  for (const role of roles) {
    for (const bullet of role.bullets ?? [role.description]) {
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
        <p className="text-sm text-muted-foreground">
          This page is formatted to print cleanly as a one-page PDF. In the print dialog, save as PDF and open{' '}
          <span className="font-medium text-foreground">More settings</span> to turn off{' '}
          <span className="font-medium text-foreground">Headers and footers</span> — that removes the browser's own title/URL/date line.
        </p>
        <Button onClick={() => window.print()} className="gap-2 shrink-0">
          <Printer className="h-4 w-4" /> Print / Save as PDF
        </Button>
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
          zoom-[1] sm:zoom-(--cv-zoom)
        "
        style={{ '--cv-zoom': CV_SCALE } as React.CSSProperties}
      >
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 pb-5 print:pb-[calc(20px*var(--cv-zoom))] border-b border-border print:border-black/20">
          <div>
            <h1 className="text-2xl sm:text-3xl print:text-[calc(30px*var(--cv-zoom))] font-extrabold tracking-tight">
              {PROFILE_DATA.name}
            </h1>
            <p className="text-base print:text-[calc(16px*var(--cv-zoom))] font-medium text-primary print:text-black mt-0.5">
              {PROFILE_DATA.role}
            </p>
          </div>
          <div className="text-left sm:text-right text-xs print:text-[calc(12px*var(--cv-zoom))] text-muted-foreground print:text-black/70 space-y-1 shrink-0">
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
        <p className="text-sm print:text-[calc(14px*var(--cv-zoom))] leading-relaxed print:leading-snug py-4 print:py-[calc(16px*var(--cv-zoom))] border-b border-border print:border-black/20 text-muted-foreground print:text-black/85">
          {PROFILE_DATA.bio}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 print:gap-[calc(32px*var(--cv-zoom))] pt-5 print:pt-[calc(20px*var(--cv-zoom))]">
          {/* Left: Experience + Education + Projects */}
          <div className="md:col-span-2 space-y-6 print:space-y-[calc(24px*var(--cv-zoom))]">
            <section>
              <h2 className="text-xs print:text-[calc(12px*var(--cv-zoom))] font-bold uppercase tracking-wider text-primary print:text-black mb-2 print:mb-[calc(8px*var(--cv-zoom))]">
                Experience
              </h2>
              <div className="space-y-4 print:space-y-[calc(16px*var(--cv-zoom))]">
                {experienceByCompany.map(({ company, roles }) => (
                  <div key={company}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-0 mb-1">
                      <p className="text-sm print:text-[calc(14px*var(--cv-zoom))] font-bold">
                        {roles.length > 1
                          ? [...roles].reverse().map((r) => r.role).join(' \u2192 ')
                          : roles[0].role}
                      </p>
                      <span className="text-xs print:text-[calc(12px*var(--cv-zoom))] text-muted-foreground print:text-black/70 shrink-0 sm:ml-3">
                        {roles.length > 1 ? companyPeriod(roles) : roles[0].period}
                      </span>
                    </div>
                    <p className="text-xs print:text-[calc(12px*var(--cv-zoom))] text-muted-foreground print:text-black/70 mb-1.5">
                      {company}
                    </p>
                    <ul className="space-y-1 print:space-y-[calc(4px*var(--cv-zoom))] text-sm print:text-[calc(14px*var(--cv-zoom))] text-muted-foreground print:text-black/85 leading-snug list-disc list-outside pl-4">
                      {(roles.length > 1 ? mergedCompanyBullets(roles) : roles[0].bullets ?? [roles[0].description]).map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs print:text-[calc(12px*var(--cv-zoom))] font-bold uppercase tracking-wider text-primary print:text-black mb-2 print:mb-[calc(8px*var(--cv-zoom))]">
                Education
              </h2>
              <div className="space-y-2 print:space-y-[calc(8px*var(--cv-zoom))]">
                {education.map((edu) => (
                  <div key={`${edu.institution}-${edu.qualification}`} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-3">
                    <p className="text-sm print:text-[calc(14px*var(--cv-zoom))]">
                      <span className="font-bold">{edu.qualification}</span>
                      <span className="text-muted-foreground print:text-black/70"> — {edu.institution}</span>
                    </p>
                    <span className="text-xs print:text-[calc(12px*var(--cv-zoom))] text-muted-foreground print:text-black/70 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs print:text-[calc(12px*var(--cv-zoom))] font-bold uppercase tracking-wider text-primary print:text-black mb-2 print:mb-[calc(8px*var(--cv-zoom))]">
                Key Projects
              </h2>
              <div className="space-y-3 print:space-y-[calc(12px*var(--cv-zoom))]">
                {cvProjects.map((project) => (
                  <div key={project.id}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-0">
                      <p className="text-sm print:text-[calc(14px*var(--cv-zoom))] font-bold">{project.title}</p>
                      {project.timeframe && (
                        <span className="text-xs print:text-[calc(12px*var(--cv-zoom))] text-muted-foreground print:text-black/70 shrink-0 sm:ml-3">
                          {project.timeframe}
                        </span>
                      )}
                    </div>
                    <p className="text-sm print:text-[calc(14px*var(--cv-zoom))] text-muted-foreground print:text-black/85 leading-snug">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Skills */}
          <div className="md:col-span-1">
            <h2 className="text-xs print:text-[calc(12px*var(--cv-zoom))] font-bold uppercase tracking-wider text-primary print:text-black mb-2 print:mb-[calc(8px*var(--cv-zoom))]">
              Skills
            </h2>
            <div className="space-y-4 print:space-y-[calc(16px*var(--cv-zoom))]">
              {PROFILE_DATA.skills.map((group) => (
                <div key={group.category}>
                  <p className="text-xs print:text-[calc(12px*var(--cv-zoom))] font-semibold text-muted-foreground print:text-black/70 uppercase tracking-wide mb-1">
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
                  <p className="hidden print:block print:text-[calc(14px*var(--cv-zoom))] text-black/85 leading-snug">
                    {group.strengths.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-6 print:mt-[calc(24px*var(--cv-zoom))] pt-3 print:pt-[calc(12px*var(--cv-zoom))] border-t border-border print:border-black/20 text-center">
          <p className="text-xs print:text-[calc(12px*var(--cv-zoom))] text-muted-foreground print:text-black/70">
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
          /* Belt-and-braces: force zoom off for print regardless of viewport
             width matching the sm: breakpoint. zoom during print can cause
             Chromium to rasterize text instead of keeping it selectable —
             print sizing is handled entirely by the calc()-based text/gap
             classes above instead. */
          .cv-sheet {
            zoom: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}
