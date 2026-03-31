import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '../components/seo/SEOHead'
import { asset } from '../utils/assets'

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Página no encontrada"
        description="La página que buscás no existe o fue movida."
        path="/404"
        noIndex
      />
      <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-4 py-24 dark:from-gray-900 dark:to-brand-dark">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <img
            src={asset('/img/illustrations/404.svg')}
            alt="Página no encontrada"
            className="mx-auto mb-8 w-full max-w-md"
          />
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Página no encontrada
          </h1>
          <p className="mb-8 text-lg text-brand-muted dark:text-gray-400">
            No pudimos encontrar lo que estabas buscando.
          </p>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(28,154,234,0.25)] transition-all hover:bg-brand-primary-600 active:translate-y-px"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </section>
    </>
  )
}
