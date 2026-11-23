import React from 'react'
import sarahImg from '../assets/SarahNew.jpg'
import feuilleRose from '../assets/feuille-rose.svg'
import iBuild from '../assets/about/i-build.svg'
import iTransform from '../assets/about/i-transform.svg'
import iMakeVisible from '../assets/about/i-make-you-visible.svg'
import { useLanguage } from '../contexts/LanguageContext'

const PHOTO_LEAVES = [
  {
    className: 'absolute z-20 -top-3 -right-3 w-8',
    rest: '18deg',
    from: '-20deg',
    drop: '-52px',
    drift: '12px',
    fall: '1.55s',
  },
  {
    className: 'absolute z-20 -bottom-4 -left-4 w-7',
    rest: '-32deg',
    from: '14deg',
    drop: '-96px',
    drift: '-16px',
    fall: '1.35s',
  },
  {
    className: 'absolute z-20 top-[42%] -right-8 w-6 hidden lg:block',
    rest: '8deg',
    from: '-6deg',
    drop: '-64px',
    drift: '12px',
    fall: '1.25s',
  },
]

const SERVICE_CARD_STYLES = [
  {
    card: 'bg-white/85 border-honey/30 hover:border-honey/55 shadow-[inset_0_3px_0_0_#EFBD21,0_16px_40px_-24px_rgba(44,42,38,0.18)] hover:shadow-[inset_0_3px_0_0_#EFBD21,0_24px_60px_-28px_rgba(239,189,33,0.4)]',
    titleHover: 'group-hover:text-honey-dark',
    glow: 'bg-honey',
  },
  {
    card: 'bg-white/85 border-honey/30 hover:border-honey/55 shadow-[inset_0_3px_0_0_#EFBD21,0_16px_40px_-24px_rgba(44,42,38,0.18)] hover:shadow-[inset_0_3px_0_0_#EFBD21,0_24px_60px_-28px_rgba(239,189,33,0.4)]',
    titleHover: 'group-hover:text-honey-dark',
    glow: 'bg-moss',
  },
  {
    card: 'bg-white/85 border-honey/30 hover:border-honey/55 shadow-[inset_0_3px_0_0_#EFBD21,0_16px_40px_-24px_rgba(44,42,38,0.18)] hover:shadow-[inset_0_3px_0_0_#EFBD21,0_24px_60px_-28px_rgba(239,189,33,0.4)]',
    titleHover: 'group-hover:text-honey-dark',
    glow: 'bg-honey',
  },
]

const SERVICE_VISUALS = [iBuild, iTransform, iMakeVisible]

export default function About() {
  const { t } = useLanguage()
  const photoRef = React.useRef(null)
  const [leavesIn, setLeavesIn] = React.useState(false)

  React.useEffect(() => {
    const photo = photoRef.current
    if (!photo) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setLeavesIn(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    observer.observe(photo)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 bg-gradient-to-br from-[#fbf4d2] via-[#fae6de] to-[#e9eed7]"
    >
      <div
        className="about-fade-top pointer-events-none absolute inset-x-0 top-0 h-80 sm:h-[28rem] lg:h-[32rem]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-b from-transparent via-site/70 to-site"
        aria-hidden="true"
      />
      <div className="about-copy relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-left">
            <h2 className="text-5xl lg:text-6xl font-bold section-title section-title--moss">{t.about.title}</h2>
            <p
              className="text-xl lg:text-2xl text-ink leading-relaxed mb-8 font-medium"
              dangerouslySetInnerHTML={{ __html: t.hero.description }}
            />
            <div className="space-y-4 text-lg text-ink-muted leading-relaxed">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
            </div>
          </div>

          <div ref={photoRef} className={`about-photo relative mx-auto md:mx-0 md:ml-auto w-fit ${leavesIn ? 'is-in' : ''}`}>
            <div className="about-photo-ring w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-brand/70 to-moss/40 flex items-center justify-center shadow-[0_24px_60px_-20px_rgba(245,140,118,0.35)]">
              <img
                src={sarahImg}
                alt="Sarah Quartetto"
                className="w-[88%] h-[88%] rounded-full object-cover shadow-lg border-2 border-white/80"
              />
            </div>
            {PHOTO_LEAVES.map((leaf, index) => (
              <img
                key={leaf.rest}
                src={feuilleRose}
                alt=""
                aria-hidden="true"
                className={`about-leaf ${leaf.className}`}
                style={{
                  '--i': index,
                  '--from': leaf.from,
                  '--rest': leaf.rest,
                  '--drop': leaf.drop,
                  '--drift': leaf.drift,
                  '--fall': leaf.fall,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-brand mb-6">
            {t.about.services.title}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {t.about.services.items.map((item, index) => {
              const style = SERVICE_CARD_STYLES[index]
              return (
              <div key={item.label} className="relative flex flex-col pb-10 sm:pb-12">
                <article className={`group relative z-10 rounded-2xl border transition-all duration-500 p-6 lg:p-7 pr-12 md:pr-1 pb-12 md:pb-16 lg:pb-14 flex flex-col grow ${style.card}`}>
                  <h3 className={`text-xl lg:text-2xl font-medium text-ink transition-colors leading-snug ${style.titleHover}`}>
                    {item.label}
                  </h3>
                  <p className="mt-3 text-base text-ink/85 leading-relaxed grow">{item.description}</p>
                </article>
                <div
                  className="absolute z-20 -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 flex aspect-square w-[6.5rem] sm:w-[7.5rem] items-center justify-center rounded-full border-2 border-honey bg-white/85 p-1.5"
                  aria-hidden="true"
                >
                  <span
                    className={`pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl sm:h-24 sm:w-24 ${style.glow}`}
                  />
                  <img
                    src={SERVICE_VISUALS[index]}
                    alt=""
                    className="relative z-10 h-full w-full object-contain"
                  />
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
