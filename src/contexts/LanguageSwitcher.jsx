import React from 'react'
import { useLanguage } from './LanguageContext'

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage()

  const choose = (code) => {
    if (code !== language) toggleLanguage()
  }

  const optionClass = (code) =>
    `lang-switch__option ${language === code ? 'is-active' : ''}`

  return (
    <div
      className="lang-switch flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand/25 text-ink text-sm tracking-wide"
      role="group"
      aria-label={language === 'fr' ? 'Langue' : 'Language'}
    >
      <button type="button" onClick={() => choose('fr')} aria-pressed={language === 'fr'} className={optionClass('fr')}>
        FR
      </button>
      <span aria-hidden="true">/</span>
      <button type="button" onClick={() => choose('en')} aria-pressed={language === 'en'} className={optionClass('en')}>
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher
