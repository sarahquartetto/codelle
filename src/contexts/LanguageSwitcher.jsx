import React from 'react'
import { useLanguage } from './LanguageContext'

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-stone-300 text-stone-800 hover:bg-white hover:border-amber-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
    >
      <span className="text-sm font-bold">
        {language === 'en' ? 'FR' : 'EN'}
      </span>
    </button>
  )
}

export default LanguageSwitcher
