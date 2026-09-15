import { useState} from "react";

import { createFileRoute } from '@tanstack/react-router'
import { Phone, Printer, Mail, Globe, Github, MapPin, Settings2 } from 'lucide-react'

import { PROFILE_DATA, PROJECTS_DATA } from '@/data'

import {
  // Raw Components
  Badge,
  Button,
  Combobox,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSortableChip,
  ComboboxSortableChips,
  ComboboxValue,
  useComboboxAnchor,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  useIsMobile,
  Label,
  Slider,
  // Page Components
  ContactDetail,
} from '@/components'

export const Route = createFileRoute('/cv')({ component: CV })

// ---------------------------------------------------------------------------
// The only thing curated here (rather than pulled straight from data) is
// which projects make the cut for a one-page CV. Everything else (experience,
// education, skills) is entirely data-driven from projects.ts
// ---------------------------------------------------------------------------
const CV_PROJECT_IDS = ['folio-erm', 'pushkb', 'access-control-engine', 'shared-pipeline-utils', 'stripes-kint-components']

function CV() {
  const isMobile = useIsMobile();
  // Single scaling dial for output PDF
  const [cvScale, setCvScale] = useState<number[]>([0.76]);

  const anchor = useComboboxAnchor();
  const [projects, setProjects] = useState<string[]>(CV_PROJECT_IDS)

  // Sort experience newest first.
  const sortedExperience = [...PROFILE_DATA.experience].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );

  const education = PROFILE_DATA.education
    .filter((edu) => edu.showOnCV !== false)
    .sort((a, b) => b.startDate.localeCompare(a.startDate))

  const cvProjects = projects.map((id) =>
    PROJECTS_DATA.find((p) => p.id === id),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <Drawer
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? 'down' : 'right'}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Customise CV</DrawerTitle>
          <DrawerDescription>
            Select which information to include on the CV and choose a scale
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex px-2 py-3">
          <div className="flex flex-col mt-3 gap-1 w-full">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="combobox-projects">Projects</Label>
            </div>
            <Combobox
              autoHighlight
              items={PROJECTS_DATA.map((project) => project.id)}
              multiple
              value={projects}
              onValueChange={setProjects}
            >
              <ComboboxSortableChips
                ref={anchor}
                items={projects}
                onReorder={setProjects}
              >
                <ComboboxValue>
                  {projects.map((val) => (
                    <ComboboxSortableChip id={val} key={val}>
                      {val}
                    </ComboboxSortableChip>
                  ))}
                </ComboboxValue>
                <ComboboxChipsInput />
              </ComboboxSortableChips>
              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="slider-scale">Scale</Label>
              <span className="text-sm text-muted-foreground">{cvScale}</span>
              <Slider
                id="slider-scale"
                onValueChange={(value) => setCvScale(value)}
                value={cvScale}
                min={0.4}
                max={1}
                step={0.01}
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
      <div className="page-wrap py-6 sm:py-10 print:py-0">
        {/* Toolbar — never printed */}
        <div className="no-print print:hidden mb-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground max-w-2xl">
            This page is formatted to print cleanly as a one-page PDF. In the
            print dialog, save as PDF and open{' '}
            <span className="font-medium text-foreground">More settings</span>{' '}
            to turn off{' '}
            <span className="font-medium text-foreground">
              Headers and footers
            </span>{' '}
            — that removes the browser's own title/URL/date line.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <DrawerTrigger
              render={
                <Button
                  variant="outline"
                  className="gap-2"
                  title="TODO: Dynamic customization coming soon!"
                >
                  <Settings2 className="h-4 w-4" /> Customize CV
                </Button>
              }
            />
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
          style={{ '--cv-zoom': cvScale } as React.CSSProperties}
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
              <ContactDetail detail={PROFILE_DATA.location} Icon={MapPin} />
              <ContactDetail detail="portfolio.efreestone.co.uk" Icon={Globe} />
              <ContactDetail
                detail="github.com/ethan-freestone"
                Icon={Github}
              />
              <ContactDetail
                detail="(+44)7531922203"
                Icon={Phone}
              />
              <ContactDetail detail="e.j.freestone@gmail.com" Icon={Mail} />
            </div>
          </header>

          {/* Summary */}
          <p className="text-sm leading-relaxed py-4 border-b border-border print:border-black/20 text-muted-foreground print:text-black/85">
            {PROFILE_DATA.bio}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-5">
            {/* Left: Skills */}
            <div className="md:col-span-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-black mb-2">
                Skills
              </h2>
              <div className="space-y-3">
                {PROFILE_DATA.skills.map((group) => (
                  <div key={group.category}>
                    {/* Screen version: Category title and badges inline */}
                    <div className="flex flex-wrap items-center gap-1.5 print:hidden">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mr-1">
                        {group.category}:
                      </span>
                      {group.strengths.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-[10px] font-medium px-1.5 py-0"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Print version: Category title and text inline */}
                    <p className="hidden print:block text-sm text-black/85 leading-snug">
                      <span className="text-[11px] font-bold text-black/70 uppercase tracking-wide mr-1">
                        {group.category}:
                      </span>
                      {group.strengths.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: Experience + Education + Projects */}
            <div className="md:col-span-2 space-y-6">
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-black mb-2">
                  Experience
                </h2>
                <div className="space-y-4">
                  {sortedExperience.map((job) => {
                    // Filter bullets based on showOnCV flag, fallback to description if no bullets exist
                    const bullets = job.bullets
                      ? job.bullets
                          .filter((b) => b.showOnCV !== false)
                          .map((b) => b.text)
                      : [job.description]

                    return (
                      <div key={`${job.company}-${job.role}`}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-0 mb-1">
                          <p className="text-sm font-bold">{job.role}</p>
                          <span className="text-xs text-muted-foreground print:text-black/70 shrink-0 sm:ml-3">
                            {job.period}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground print:text-black/70 mb-1.5">
                          {job.company}
                        </p>
                        <ul className="space-y-1 text-sm text-muted-foreground print:text-black/85 leading-snug list-disc list-outside pl-4">
                          {bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </section>

              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-black mb-2">
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div
                      key={`${edu.institution}-${edu.qualification}`}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-3"
                    >
                      <p className="text-sm">
                        <span className="font-bold">{edu.qualification}</span>
                        <span className="text-muted-foreground print:text-black/70">
                          {' '}
                          — {edu.institution}
                        </span>
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
          </div>

          <footer className="mt-6 pt-3 border-t border-border print:border-black/20 text-center">
            <p className="text-xs text-muted-foreground print:text-black/70">
              Full write-ups, screenshots and animated demos for these projects
              (and more) at{' '}
              <span className="font-semibold text-primary print:text-black">
                portfolio.efreestone.co.uk
              </span>
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
    </Drawer>
  )
}
