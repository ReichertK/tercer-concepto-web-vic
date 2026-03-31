import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface HeroProps {
  title: ReactNode
  subtitle: string
  primaryAction?: { label: string; to: string }
  secondaryAction?: { label: string; to: string }
  image?: { src: string; alt: string }
}

export default function Hero({ title, subtitle, primaryAction, secondaryAction, image }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white dark:from-gray-900 dark:via-brand-dark dark:to-brand-dark">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[10%] h-[600px] w-[1200px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5" />
        <div className="absolute -top-32 left-[5%] h-[480px] w-[900px] rounded-full bg-brand-accent/8 blur-3xl dark:bg-brand-accent/3" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg text-brand-muted dark:text-gray-400">
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
                    className="inline-flex items-center rounded-xl border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white active:translate-y-px dark:border-brand-primary dark:text-brand-primary"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full max-w-lg"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
