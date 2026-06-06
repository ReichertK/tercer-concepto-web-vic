import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { asset } from '../../utils/assets'
import Lightbox from './Lightbox'

interface HeroProps {
  title: ReactNode
  subtitle: string
  primaryAction?: { label: string; to: string }
  secondaryAction?: { label: string; to: string }
  image?: { src: string; alt: string }
  // Permite ampliar la imagen al hacer clic (Lightbox).
  zoomableImage?: boolean
  // Fondo blanco liso en lugar del degradado celeste.
  plainBackground?: boolean
  // Imagen de fondo a pantalla completa con overlay oscuro. Si se define, el
  // texto del Hero pasa a blanco. Ruta relativa a /public.
  backgroundImage?: string
}

export default function Hero({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  image,
  zoomableImage,
  plainBackground,
  backgroundImage,
}: HeroProps) {
  const hasBg = Boolean(backgroundImage)

  return (
    <section
      className={
        hasBg
          ? 'relative overflow-hidden bg-brand-dark'
          : plainBackground
            ? 'relative overflow-hidden bg-white dark:bg-brand-dark'
            : 'relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white dark:from-gray-900 dark:via-brand-dark dark:to-brand-dark'
      }
    >
      {hasBg ? (
        <>
          {/* Imagen de fondo */}
          <img
            src={asset(backgroundImage!)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Overlay para que el texto blanco se lea bien */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40" />
          <div className="absolute inset-0 bg-brand-dark/30" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0">
          {!plainBackground && (
            <>
              <div className="absolute -top-24 right-[10%] h-[600px] w-[1200px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5" />
              <div className="absolute -top-32 left-[5%] h-[480px] w-[900px] rounded-full bg-brand-accent/8 blur-3xl dark:bg-brand-accent/3" />
            </>
          )}
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1
              className={
                hasBg
                  ? 'text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl'
                  : 'text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl'
              }
            >
              {title}
            </h1>
            <p className={hasBg ? 'mt-6 text-lg text-gray-100/90' : 'mt-6 text-lg text-brand-muted dark:text-gray-400'}>
              {subtitle}
            </p>
            {(primaryAction || secondaryAction) && (
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                {primaryAction && (
                  <Link
                    to={primaryAction.to}
                    className="inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(28,154,234,0.25)] transition-all hover:bg-brand-primary-600 active:translate-y-px"
                  >
                    {primaryAction.label}
                  </Link>
                )}
                {secondaryAction && (
                  <Link
                    to={secondaryAction.to}
                    className={
                      hasBg
                        ? 'inline-flex items-center rounded-xl border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand-dark active:translate-y-px'
                        : 'inline-flex items-center rounded-xl border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white active:translate-y-px dark:border-brand-primary dark:text-brand-primary'
                    }
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}
          </m.div>

          {image && !hasBg && (
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center"
            >
              {zoomableImage ? (
                <Lightbox
                  src={asset(image.src)}
                  alt={image.alt}
                  className="w-full max-w-lg"
                />
              ) : (
                <img
                  src={asset(image.src)}
                  alt={image.alt}
                  className="w-full max-w-lg"
                  loading="eager"
                  decoding="async"
                />
              )}
            </m.div>
          )}
        </div>
      </div>
    </section>
  )
}
