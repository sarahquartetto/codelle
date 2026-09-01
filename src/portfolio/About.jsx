import React from 'react'
import sarahImg from '../assets/SarahNew.jpg'
import { useLanguage } from '../contexts/LanguageContext'

const PHOTO_DOTS = [
  {
    className: 'absolute z-20 -top-2 -right-2 w-5 h-5 bg-brand rounded-full',
    phase: 'phase-b',
    landDelay: '0ms',
  },
  {
    className: 'absolute z-20 -bottom-3 -left-3 w-4 h-4 bg-brand rounded-full',
    phase: 'phase-a',
    landDelay: '120ms',
  },
  {
    className: 'absolute z-20 top-1/2 -right-6 w-3 h-3 bg-brand rounded-full',
    phase: 'phase-c',
    landDelay: '240ms',
  },
]

export default function About() {
  const { t } = useLanguage()
  const sectionRef = React.useRef(null)
  const [dotState, setDotState] = React.useState('hidden') // hidden | landing | bouncing

  React.useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReducedMotion) {
            setDotState('bouncing')
          } else {
            setDotState('landing')
          }
        } else {
          setDotState('hidden')
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (dotState !== 'landing') return undefined
    const timer = window.setTimeout(() => setDotState('bouncing'), 1000)
    return () => window.clearTimeout(timer)
  }, [dotState])

  const dotClass = (phase) => {
    if (dotState === 'landing') return `land-dot is-landing ${phase}`
    if (dotState === 'bouncing') return `land-dot is-bouncing ${phase}`
    return 'land-dot'
  }

  return (
    <section ref={sectionRef} id="about" className="relative overflow-visible py-24 bg-brand/10">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-left">
            <h2 className="text-5xl lg:text-6xl font-bold text-[#fffaec] title-stroke-dark">{t.about.title}</h2>
            <p
              className="font-title text-xl lg:text-2xl text-stone-700 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: t.hero.description }}
            />
            <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
            </div>
          </div>

          <div className="relative mx-auto md:mx-0 md:ml-auto w-fit">
            <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-brand/10 to-brand flex items-center justify-center shadow-xl">
              <img
                src={sarahImg}
                alt="Sarah Quartetto"
                className="w-[88%] h-[88%] rounded-full object-cover shadow-lg border-4 border-white"
              />
            </div>
            {PHOTO_DOTS.map((dot) => (
              <div
                key={dot.phase}
                className={`${dot.className} ${dotClass(dot.phase)}`}
                style={dotState === 'landing' ? { animationDelay: dot.landDelay } : undefined}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
