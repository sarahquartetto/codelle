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
      <footer className="relative z-10 bg-brand-dark text-stone-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="pt-0">
              <p className="text-white/70">© {new Date().getFullYear()} codelle. {t.footer.copyright}</p>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">
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
