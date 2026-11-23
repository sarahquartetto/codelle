import React from 'react'
import LanguageSwitcher from '../contexts/LanguageSwitcher'
import BackgroundBlobs from './BackgroundBlobs'
import FloatingSayHi from './FloatingSayHi'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-site text-ink relative overflow-hidden font-sans">
      <BackgroundBlobs />
      <div className="fixed top-6 right-4 sm:right-8 z-50">
        <LanguageSwitcher />
      </div>
      <FloatingSayHi />

      <main id="top" className="relative z-[1]">
        {children}
      </main>
    </div>
  )
}
