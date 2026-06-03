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
    title: 'Plataforma 100% web',
    description:
      'Acceda a cada módulo desde el navegador, sin instalaciones complejas. Compatible con entornos Windows y Linux, y operativo en cualquier puesto de trabajo de la institución.',
    href: '/productos-servicios',
    linkText: 'Conocer la plataforma',
  },
  {
    icon: HeartPulse,
    title: 'Especialistas en salud',
    description:
      'Más de una década acompañando a clínicas y centros de diagnóstico. Conocemos los flujos clínicos reales y construimos soluciones que el equipo médico adopta sin fricción.',
    href: '/casos-exito',
    linkText: 'Ver casos de éxito',
  },
  {
    icon: Wrench,
    title: 'Desarrollo a medida',
    description:
      'Software propio y modular que se adapta a la operación de cada institución. Crecemos junto a su negocio, integrando nuevas prestaciones a medida que las necesita.',
    href: '/productos-servicios',
    linkText: 'Solicitar una propuesta',
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
            Tecnología que ordena el{' '}
            <span className="text-highlight">flujo clínico</span> de su institución
          </>
        }
        subtitle="Digitalizamos el recorrido del paciente de punta a punta: desde la gestión del turno hasta la entrega del informe médico. Soluciones confiables, seguras y pensadas para el día a día del sector salud."
        primaryAction={{ label: 'Ver productos', to: '/productos-servicios' }}
        secondaryAction={{ label: 'Hablar con un asesor', to: '/contacto' }}
        backgroundImage="/img/fondo-sala-control-pacs-salud.png"
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
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                El ecosistema PHIR-IT
              </h2>
              <p className="mt-4 text-brand-muted dark:text-gray-400">
                Un conjunto de módulos integrados que cubre todo el circuito de diagnóstico por
                imágenes: admisión del turno, lista de trabajo en cada modalidad, almacenamiento
                DICOM, informe médico y portal del paciente. Una única plataforma, sin islas de
                información.
              </p>
              <Link
                to="/productos-servicios"
                className="mt-6 inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(28,154,234,0.25)] transition-all hover:bg-brand-primary-600 active:translate-y-px"
              >
                Explorar el ecosistema
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
                <h2 className="text-2xl font-bold">¿No sabe por dónde empezar?</h2>
                <p className="mt-1 text-white/80">
                  Analizamos su operación actual y le recomendamos el camino, sin compromiso.
                </p>
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
