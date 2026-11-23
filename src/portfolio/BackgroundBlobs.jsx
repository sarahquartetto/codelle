import React from 'react'

const blobs = [
  { color: 'bg-moss', size: 'w-[42rem] h-[42rem]', position: 'top-[-8%] left-[-10%]', delay: '' },
  { color: 'bg-moss-soft', size: 'w-[46rem] h-[46rem]', position: 'top-[18%] left-[32%]', delay: 'delay-300' },
  { color: 'bg-honey-soft', size: 'w-[36rem] h-[36rem]', position: 'top-[28%] left-[-8%]', delay: 'delay-700' },
  { color: 'bg-honey-pale', size: 'w-[34rem] h-[34rem]', position: 'top-[52%] left-[18%]', delay: '' },
  { color: 'bg-moss', size: 'w-[40rem] h-[40rem]', position: 'top-[68%] right-[-14%]', delay: 'delay-1000' },
  { color: 'bg-honey', size: 'w-[38rem] h-[38rem]', position: 'top-[78%] left-[-6%]', delay: 'delay-300' },
  { color: 'bg-moss-soft', size: 'w-[42rem] h-[42rem]', position: 'top-[88%] right-[-8%]', delay: 'delay-700' },
  { color: 'bg-honey-soft', size: 'w-[36rem] h-[36rem]', position: 'top-[94%] left-[30%]', delay: 'delay-500' },
]

const CURSOR_BLOB_SIZE = 280

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
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.06]"
        aria-hidden="true"
      >
        {blobs.map((blob, index) => (
          <div
            key={index}
            className={`absolute ${blob.size} ${blob.color} ${blob.position} rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${blob.delay}`}
          />
        ))}
      </div>

      {showCursorBlob && (
        <div
          ref={cursorBlobRef}
          className="pointer-events-none fixed top-0 left-0 z-0 h-[17.5rem] w-[17.5rem] rounded-full bg-honey opacity-[0.04] mix-blend-multiply blur-3xl will-change-transform"
          aria-hidden="true"
        />
      )}
    </>
  )
}
