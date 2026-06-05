import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/ui/Hero'
import AnimatedSection from '../components/ui/AnimatedSection'
import { asset } from '../utils/assets'

const carteles = [
  {
    image: '/img/cartel1.png',
    alt: 'Plataforma web de PHIR-IT accesible desde múltiples dispositivos',
    title: 'Plataforma 100% web, en cualquier dispositivo',
    paragraphs: [
      'Acceda a cada módulo desde cualquier navegador y sistema operativo, sin necesidad de instalar complementos o plugins. Además, la plataforma es completamente responsive, lo que permite su visualización desde cualquier dispositivo y ubicación, ya sea desde un puesto de trabajo dentro de la institución o desde el exterior.',
    ],
  },
  {
    image: '/img/cartel2.png',
    alt: 'Equipo de PHIR-IT especializado en tecnología para el sector salud',
    title: 'Más de una década acompañando a clínicas y centros de diagnóstico',
    paragraphs: [
      'Contamos con una sólida trayectoria en el sector salud, respaldada por profesionales con más de 30 años de experiencia en tecnologías para modalidades de diagnóstico por imágenes, sistemas PACS y soluciones de gestión sanitaria.',
      'Conocemos en profundidad los flujos de trabajo de clínicas, hospitales y centros de diagnóstico, lo que nos permite diseñar, desarrollar y adaptar soluciones tecnológicas alineadas con los estándares del mercado. Nuestro objetivo es optimizar los procesos asistenciales, mejorar la eficiencia operativa y elevar la calidad del servicio brindado por cada institución.',
      'Desarrollamos soluciones intuitivas, amigables y orientadas a las necesidades reales de los equipos médicos. Gracias a su diseño centrado en el usuario y a su adaptación natural a los procesos de trabajo existentes, nuestros sistemas logran una rápida adopción, minimizando los tiempos de capacitación y maximizando los beneficios desde el primer día.',
    ],
  },
  {
    image: '/img/Cartel3.png',
    alt: 'Software modular de PHIR-IT que escala con la institución',
    title: 'Software modular que impulsa su crecimiento',
    paragraphs: [
      'Se adapta a su operación hoy y escala con usted mañana. Integramos nuevas prestaciones cuando su negocio las demanda.',
    ],
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
        backgroundImage="/img/fondo-sala-control.png"
      />

      <section className="bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 lg:gap-24">
            {carteles.map((cartel) => (
              <AnimatedSection key={cartel.title}>
                <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
                  <img
                    src={asset(cartel.image)}
                    alt={cartel.alt}
                    className="w-full rounded-2xl shadow-soft lg:h-full lg:object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                      {cartel.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-brand-muted dark:text-gray-400">
                      {cartel.paragraphs.map((parrafo) => (
                        <p key={parrafo.slice(0, 40)}>{parrafo}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
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
