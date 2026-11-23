import React from 'react'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
import Layout from './Layout'
import { useLanguage } from '../contexts/LanguageContext'

export default function Portfolio() {
  const { t } = useLanguage()

  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="relative z-10 border-t border-brand-muted/15 bg-site text-ink py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="pt-0 flex flex-col items-center">
              <img
                src="/codelle-badge-spiral.png"
                alt=""
                aria-hidden="true"
                className="mb-4 h-10 w-10 sm:h-12 sm:w-12 object-contain"
                loading="lazy"
                decoding="async"
              />
              <p className="text-ink-muted text-sm tracking-wide">© {new Date().getFullYear()} codelle. {t.footer.copyright}</p>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-muted/25 bg-site-elevated text-ink-muted text-sm">
                  🇨🇭 {t.footer.swissMade}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  )
}
