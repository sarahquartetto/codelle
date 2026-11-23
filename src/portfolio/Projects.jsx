import React from 'react'
import projects from '../projectData.js'
import { Github } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import tagDesign from '../assets/tags/tag-design.svg'
import tagIntegration from '../assets/tags/tag-integration.svg'
import tagDeploiement from '../assets/tags/tag-deploiement.svg'

const TAG_ICONS = {
  Design: tagDesign,
  Integration: tagIntegration,
  Deploiement: tagDeploiement,
}

export default function Projects() {
  const { t, language } = useLanguage()
  const gridRef = React.useRef(null)
  const [visible, setVisible] = React.useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  React.useEffect(() => {
    const grid = gridRef.current
    if (!grid) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="projects-grid-bg relative overflow-visible py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="inline-block text-5xl lg:text-6xl font-bold section-title section-title--cream mb-4">
            {t.projects.title}
          </h2>
          <p className="text-xl text-ink-muted max-w-3xl mx-auto mb-8">{t.projects.subtitle}</p>
        </div>

        <div ref={gridRef} className={`project-cards grid gap-8 md:grid-cols-2 ${visible ? 'is-in' : ''}`}>
          {projects.map((project, index) => {
            const title = project?.title?.[language] ?? project?.title?.en ?? project?.title
            const description = project?.description?.[language] ?? project?.description?.en ?? project?.description

            return (
              <div
                key={project.slug}
                className={`project-card group overflow-hidden rounded-2xl bg-[#fdf4e2] border-[1.5px] lg:border-[1.75px] border-[#9a885c] shadow-[0_20px_50px_-30px_rgba(101,118,32,0.35)] hover:shadow-[0_24px_60px_-28px_rgba(255,245,202,0.55)] transition-shadow duration-500 ${project.demo ? 'cursor-pointer' : ''}`}
                style={{ '--i': index }}
                role={project.demo ? 'link' : undefined}
                tabIndex={project.demo ? 0 : undefined}
                onClick={() => {
                  if (!project.demo) return
                  window.open(project.demo, '_blank', 'noopener,noreferrer')
                }}
                onKeyDown={(e) => {
                  if (!project.demo) return
                  if (e.key !== 'Enter' && e.key !== ' ') return
                  e.preventDefault()
                  window.open(project.demo, '_blank', 'noopener,noreferrer')
                }}
                aria-label={project.demo ? `${title} — live demo` : undefined}
              >
                <div className="bg-[#fdf4e2] px-4 pt-4">
                  <div className="overflow-hidden rounded-xl border-[1.5px] lg:border-[1.75px] border-[#9a885c] bg-[#fffaf0]">
                    <div className="flex items-center gap-1.5 px-3 h-7 border-b border-[#9a885c]/80" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-[#6e4a2c] bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-[#6e4a2c] bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-[#6e4a2c] bg-[#28c840]" />
                    </div>
                    <div className="aspect-[16/11] overflow-hidden relative">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ objectPosition: project.imagePosition || 'center top' }}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-6xl text-ink-faint">●</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-[#fdf4e2] px-8 pb-8 pt-4 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <h3 className="text-2xl font-semibold text-ink group-hover:text-brand transition-colors">{title}</h3>
                      <p className="text-ink/80 leading-relaxed">{description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {project.tags.map((tech, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#9a885c]/45 text-ink/80 pl-1.5 pr-2.5 py-1 text-xs tracking-wide">
                              {TAG_ICONS[tech] && (
                                <img src={TAG_ICONS[tech]} alt="" aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                              )}
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full bg-site-elevated border border-brand/20 text-ink hover:text-brand hover:border-brand/50 transition-all duration-300"
                          aria-label="GitHub repo"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
