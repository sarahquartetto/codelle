import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function FloatingSayHi() {
  const { t } = useLanguage()
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const contact = document.querySelector('#contact')
    if (!contact) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToContact}
      aria-label={t.sayHi.aria}
      className={`floating-say-hi fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 ${
        visible ? 'is-visible' : 'is-hidden'
      }`}
    >
      <span className="floating-say-hi__badge" aria-hidden="true">
        <span className="floating-say-hi__spiral" />
      </span>
      <span className="floating-say-hi__label">{t.sayHi.label}</span>
    </button>
  )
}
