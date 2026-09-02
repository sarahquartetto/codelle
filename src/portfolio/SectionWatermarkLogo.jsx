import React from 'react'

export default function SectionWatermarkLogo({ align = 'left', contained = false }) {
  const ref = React.useRef(null)
  const [inView, setInView] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setReducedMotion(true)
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const horizontalClasses =
    align === 'right'
      ? 'right-4 sm:right-6 lg:right-8 translate-x-[38%]'
      : align === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : 'left-4 sm:left-6 lg:left-8 -translate-x-[38%]'

  const verticalClasses =
    contained && align === 'left'
      ? 'bottom-0 translate-y-[35%]'
      : contained
        ? 'bottom-0'
        : 'top-0 -translate-y-[58%]'

  const logoClasses = [
    'section-watermark-logo h-full w-full object-contain opacity-[0.08] select-none',
    inView && (reducedMotion ? 'is-revealed' : 'is-visible'),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 h-[min(88vw,36rem)] sm:h-[min(82vw,40rem)] lg:h-[min(76vw,44rem)] aspect-square w-auto max-w-none ${verticalClasses} ${horizontalClasses}`}
    >
      <img
        src="/mini-logo-codelle-violet2.png"
        alt=""
        className={logoClasses}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
