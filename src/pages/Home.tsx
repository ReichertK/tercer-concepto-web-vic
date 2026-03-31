import { Link } from 'react-router-dom'
import { Monitor, HeartPulse, Wrench } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/ui/Hero'
import ServiceCard from '../components/ui/ServiceCard'
import AnimatedSection from '../components/ui/AnimatedSection'
import { asset } from '../utils/assets'

const features = [
  {
    icon: Monitor,
    title: 'Productos Web',
    description: 'Todos nuestros productos son 100% web, con módulos de uso sencillo y funcionamiento en equipos Windows o Linux.',
    href: '/productos-servicios',
    linkText: 'Conocé más',
  },
  {
    icon: HeartPulse,
    title: 'Experiencia en Salud',
    description: 'Con amplia experiencia en el mercado de la salud, entendemos las necesidades del sector.',
    href: '/casos-exito',
    linkText: 'Ver casos de éxito',
  },
  {
    icon: Wrench,
    title: 'Soluciones Personalizadas',
    description: 'Desarrollos propios y adaptables, según la necesidad real de cada empresa.',
    href: '/productos-servicios',
    linkText: 'Descubrí cómo',
  },
]

export default function Home() {
  return (
    <>
      <SEOHead
        title="Inicio"
        description="Soluciones tecnológicas integrales para salud. Ecosistema PHIRIT: RIS, PACS, informes y portal de pacientes. Implementación in situ o en la nube."
        path="/"
      />

      <Hero
        title={
          <>
            Soluciones Tecnológicas{' '}
            <span className="text-highlight">Integrales</span> para Salud
          </>
        }
        subtitle="Acompañamos a nuestros clientes con soluciones a todas las situaciones diarias, así como en sus proyectos de desarrollo y ampliaciones del negocio."
        primaryAction={{ label: 'Nuestros Productos', to: '/productos-servicios' }}
        secondaryAction={{ label: 'Contáctenos', to: '/contacto' }}
        image={{ src: '/img/illustrations/teamwork.svg', alt: 'Ilustración de trabajo en equipo' }}
      />

      <section className="bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => (
              <ServiceCard key={feat.title} {...feat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-surface-alt py-16 dark:bg-gray-900/50 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <img
                src={asset('/img/illustrations/presentation-2.svg')}
                alt="Presentación del ecosistema"
                className="w-full max-w-md mx-auto"
                loading="lazy"
                decoding="async"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-900 dark:text-white sm:text-3xl">
                El Ecosistema de PHIRIT
              </h2>
              <p className="mt-4 text-brand-muted dark:text-gray-400">
                Nuestro producto insignia se ocupa de todo el flujo de trabajo, desde el turno del paciente hasta la visualización en el dispositivo de imágenes correspondiente.
              </p>
              <Link
                to="/productos-servicios"
                className="mt-6 inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(28,154,234,0.25)] transition-all hover:bg-brand-primary-600 active:translate-y-px"
              >
                Conocé más
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-primary p-8 text-white sm:p-10 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-2xl font-bold">¿No está seguro de qué producto utilizar?</h2>
                <p className="mt-1 text-white/80">Nuestro equipo puede asesorarlo sin compromiso.</p>
              </div>
              <Link
                to="/contacto"
                className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-gray-100"
              >
                Contáctenos
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
