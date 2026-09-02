import React from 'react'
/* import BackgroundBlobs from './BackgroundBlobs' */
import LanguageSwitcher from '../contexts/LanguageSwitcher'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-site relative overflow-hidden">
      {/* <div className="site-grain" aria-hidden="true" /> */}
      {/* <BackgroundBlobs /> */}

      <div className="fixed top-6 right-4 sm:right-8 z-50">
        <LanguageSwitcher />
      </div>

      <main id="top" className="relative z-[1]">
        {children}
      </main>
    </div>
  )
}
