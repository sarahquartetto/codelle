import React from 'react'
import { ChevronDown } from 'lucide-react'
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
    <section className="min-h-screen flex flex-col relative border-[32px] sm:border-[40px] border-brand box-border">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center gap-8 z-10 relative w-full max-w-3xl">
          <h1 className="flex w-full justify-center">
            <img
              src="/logo-codelle-2.png"
              alt="codelle"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain mix-blend-screen"
              loading="eager"
              decoding="async"
            />
          </h1>

          <nav className="hero-nav-dots flex flex-wrap justify-center gap-x-6 gap-y-3" aria-label="Section navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="hero-nav-dot-btn font-pixel pl-3.5 text-xs sm:text-sm text-stone-700 hover:text-brand transition-colors duration-200 underline-offset-4 underline leading-relaxed"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

     {/*} <p className="w-full max-w-[94vw] mx-auto px-4 sm:px-6 pb-28 text-center text-xl lg:text-2xl text-stone-600 leading-relaxed">
        {t.hero?.description || 'A Swiss web developer crafting beautiful, functional digital experiences with modern technologies.'}
      </p>*/}

      <button
        type="button"
        onClick={() => scrollTo('#about')}
        aria-label={t.hero?.scrollDown || 'Scroll down'}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-brand hover:text-brand/80 transition-opacity duration-500 ${
          showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronDown className="scroll-hint-chevron w-7 h-7" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}
