import React from 'react'
import projects from '../projectData.js'
import { Github, Tag } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Projects() {
  const { t, language } = useLanguage()

  return (
    <section id="projects" className="relative overflow-visible py-24 bg-brand">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="inline-block text-5xl lg:text-6xl font-bold text-[#fffaec] mb-4 title-stroke-dark">
            {t.projects.title}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">{t.projects.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            (() => {
              const title = project?.title?.[language] ?? project?.title?.en ?? project?.title
              const description = project?.description?.[language] ?? project?.description?.en ?? project?.description

              return (
            <div
              key={project.slug}
              className={`group overflow-hidden rounded-3xl bg-stone-100 shadow-[12px_12px_0_0_#78716c] hover:shadow-[14px_14px_0_0_#78716c] transition-all duration-500 border border-stone-200/80 ${project.demo ? 'cursor-pointer' : ''}`}
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
              <div className="aspect-[16/11] overflow-hidden bg-gradient-to-br from-stone-200 to-amber-100 relative">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={title} 
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl text-stone-400">🚀</div>
                  </div>
                )}
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <h3 className="text-2xl font-bold text-stone-600 group-hover:text-brand transition-colors">{title}</h3>
                    <p className="text-stone-600 leading-relaxed">{description}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-4 h-4 text-stone-500" />
                        {project.tags.map((tech, idx) => (
                          <span key={idx} className="inline-flex items-center rounded-full bg-white text-stone-700 px-2.5 py-1 text-xs">
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
                        className="p-2 rounded-full bg-white hover:bg-amber-100 text-stone-600 hover:text-amber-700 transition-all duration-300 hover:scale-110"
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
            })()
          ))}
        </div>
      </div>
    </section>
  )
}
