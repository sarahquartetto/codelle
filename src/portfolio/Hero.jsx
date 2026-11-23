import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [showScrollHint, setShowScrollHint] = React.useState(true)

  React.useEffect(() => {
    const handleScroll = () => setShowScrollHint(window.scrollY < 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: t.nav?.about || 'About', href: '#about' },
    { label: t.nav?.skills || 'Skills', href: '#skills' },
    { label: t.nav?.projects || 'Projects', href: '#projects' },
    { label: t.nav?.contact || 'Contact', href: '#contact' },
  ]

  return (
    <section id="home" className="min-h-screen flex flex-col box-border">
      <div className="hero-frame relative flex flex-1 flex-col min-h-0">
        <div className="hero-vortex" aria-hidden="true">
          <div className="hero-vortex__shape" />
        </div>

        <div className="relative z-[1] flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="hero-brand-stack flex flex-col items-center justify-center text-center z-10 relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <h1 className="flex w-full justify-center leading-none">
              <span className="hero-logo-gradient w-full">
                <img
                  src="/codelle-logo-degrade-corail.png"
                  alt="codelle"
                  width="2172"
                  height="724"
                  loading="eager"
                  decoding="async"
                />
              </span>
            </h1>

            <nav
              className="hero-nav-dots flex flex-wrap justify-between items-center w-[94%] sm:w-[95%] gap-y-2"
              aria-label="Section navigation"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="hero-nav-dot-btn pl-4 text-sm sm:text-lg font-medium tracking-wide text-brand hover:text-moss transition-colors duration-300 underline-offset-[6px] hover:underline leading-none"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollTo('#about')}
          aria-label={t.hero?.scrollDown || 'Scroll down'}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 ${
            showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <svg className="scroll-hint-kawaii w-9 h-auto" viewBox="0 0 40 48" aria-hidden="true">
            <g className="scroll-hint-kawaii__bob">
              <g className="scroll-hint-kawaii__chevron scroll-hint-kawaii__chevron--top">
                <path d="M9 12 L20 21 L31 12" fill="none" stroke="#f58c76" strokeWidth="4.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12 L20 21 L31 12" fill="none" stroke="#fff1ee" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <g className="scroll-hint-kawaii__chevron scroll-hint-kawaii__chevron--bottom">
                <path d="M9 25 L20 34 L31 25" fill="none" stroke="#f58c76" strokeWidth="4.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 25 L20 34 L31 25" fill="none" stroke="#fcd0c6" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
          </svg>
        </button>
      </div>
    </section>
  )
}
