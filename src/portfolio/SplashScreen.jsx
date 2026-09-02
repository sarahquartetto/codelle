import React from 'react'

export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = React.useState(false)

  React.useEffect(() => {
    const spinTimer = window.setTimeout(() => setExiting(true), 2000)
    return () => window.clearTimeout(spinTimer)
  }, [])

  React.useEffect(() => {
    if (!exiting) return

    const finishTimer = window.setTimeout(() => onFinish(), 500)
    return () => window.clearTimeout(finishTimer)
  }, [exiting, onFinish])

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#fffaec] transition-opacity duration-500 ease-out ${
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-hidden={exiting}
      aria-label="Chargement"
    >
      {/* <div className="site-grain" aria-hidden="true" /> */}
      <img
        src="/mini-logo-codelle-violet2.png"
        alt=""
        aria-hidden="true"
        className="splash-logo-spin relative z-10 h-28 w-28 sm:h-36 sm:w-36 object-contain select-none"
        decoding="async"
      />
    </div>
  )
}
