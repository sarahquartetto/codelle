import React from 'react'

const blobs = [
  // Hero
  { color: 'bg-amber-400', size: 'w-[28rem] h-[28rem]', position: 'top-[3%] left-[1%]', delay: '' },
  { color: 'bg-terracotta-soft', size: 'w-[26rem] h-[26rem]', position: 'top-[8%] right-[-6%]', delay: 'delay-1000' },
  { color: 'bg-green-400', size: 'w-[34rem] h-[34rem]', position: '-top-24 left-[52%]', delay: 'delay-300' },
  { color: 'bg-green-400', size: 'w-[30rem] h-[30rem]', position: 'top-[18%] left-[8%]', delay: 'delay-500' },
  { color: 'bg-amber-400', size: 'w-[22rem] h-[22rem]', position: 'top-[22%] right-[18%]', delay: 'delay-700' },
  // About
  { color: 'bg-terracotta-soft', size: 'w-[32rem] h-[32rem]', position: 'top-[30%] right-[-8%]', delay: 'delay-300' },
  { color: 'bg-green-400', size: 'w-[24rem] h-[24rem]', position: 'top-[36%] left-[-6%]', delay: 'delay-1000' },
  { color: 'bg-amber-400', size: 'w-[28rem] h-[28rem]', position: 'top-[42%] left-[30%]', delay: '' },
  // Skills
  { color: 'bg-green-400', size: 'w-[30rem] h-[30rem]', position: 'top-[48%] right-[2%]', delay: 'delay-500' },
  { color: 'bg-terracotta-soft', size: 'w-[26rem] h-[26rem]', position: 'top-[52%] left-[10%]', delay: 'delay-700' },
  { color: 'bg-amber-400', size: 'w-[22rem] h-[22rem]', position: 'top-[56%] right-[28%]', delay: 'delay-300' },
  // Projects
  { color: 'bg-paleGreen-soft', size: 'w-[28rem] h-[28rem]', position: 'top-[62%] left-[-4%]', delay: 'delay-1000' },
  { color: 'bg-paleGreen-soft', size: 'w-[32rem] h-[32rem]', position: 'top-[66%] right-[-6%]', delay: '' },
  { color: 'bg-amber-400', size: 'w-[24rem] h-[24rem]', position: 'top-[72%] left-[22%]', delay: 'delay-500' },
  { color: 'bg-green-400', size: 'w-[26rem] h-[26rem]', position: 'top-[76%] right-[14%]', delay: 'delay-700' },
  // Contact
  { color: 'bg-amber-400', size: 'w-[30rem] h-[30rem]', position: 'top-[82%] left-[4%]', delay: 'delay-300' },
  { color: 'bg-green-400', size: 'w-[28rem] h-[28rem]', position: 'top-[88%] right-[8%]', delay: 'delay-1000' },
  { color: 'bg-terracotta-soft', size: 'w-[24rem] h-[24rem]', position: 'top-[92%] left-[35%]', delay: '' },
]

const CURSOR_BLOB_SIZE = 224 // w-56 = 14rem = 224px

export default function BackgroundBlobs() {
  const cursorBlobRef = React.useRef(null)
  const [showCursorBlob, setShowCursorBlob] = React.useState(false)

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches

    if (prefersReducedMotion || !hasFinePointer) return undefined

    setShowCursorBlob(true)

    const handleMove = (event) => {
      if (!cursorBlobRef.current) return
      const offset = CURSOR_BLOB_SIZE / 2
      cursorBlobRef.current.style.transform = `translate(${event.clientX - offset}px, ${event.clientY - offset}px)`
    }

    window.addEventListener('mousemove', handleMove)

    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-visible opacity-10"
        aria-hidden="true"
      >
        {blobs.map((blob, index) => (
          <div
            key={index}
            className={`absolute ${blob.size} ${blob.color} ${blob.position} rounded-full mix-blend-multiply filter blur-xl animate-pulse ${blob.delay}`}
          />
        ))}
      </div>

      {showCursorBlob && (
        <div
          ref={cursorBlobRef}
          className="pointer-events-none fixed top-0 left-0 z-0 h-56 w-56 rounded-full bg-amber-300 opacity-[0.05] mix-blend-multiply blur-xl will-change-transform"
          aria-hidden="true"
        />
      )}
    </>
  )
}
