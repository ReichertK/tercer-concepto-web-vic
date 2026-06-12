import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

interface LightboxImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function Lightbox({ src, alt, className = '', width, height }: LightboxImageProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar imagen: ${alt}`}
        className={`group relative block cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${className}`}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-dark/0 opacity-0 transition-all duration-300 group-hover:bg-brand-dark/30 group-hover:opacity-100">
          <ZoomIn className="text-white drop-shadow" size={28} />
        </span>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar imagen"
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X size={24} />
              </button>

              <m.img
                src={src}
                alt={alt}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
              />
            </m.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
