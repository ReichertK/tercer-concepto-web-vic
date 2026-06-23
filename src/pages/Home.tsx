import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/ui/Hero'
import AnimatedSection from '../components/ui/AnimatedSection'
import Lightbox from '../components/ui/Lightbox'
import { asset } from '../utils/assets'

const clientes = [
  { logo: '/img/clientes/cmh-salud.jpg', name: 'CMH Salud' },
  { logo: '/img/clientes/sirio-libanes.jpg', name: 'Hospital Sirio Libanés' },
  { logo: '/img/clientes/sanatorio-estrada.jpg', name: 'Sanatorio Estrada' },
  { logo: '/img/clientes/diagnosticar.jpg', name: 'Diagnosticar' },
  { logo: '/img/clientes/dime.jpg', name: 'DiMe Diagnóstico Médico' },
  { logo: '/img/clientes/radiomedical.jpg', name: 'Radiomedical' },
  { logo: '/img/clientes/amoemra.jpg', name: 'Amoemra' },
  { logo: '/img/clientes/san-camilo.png', name: 'Centro Médico San Camilo' },
  { logo: '/img/clientes/hospital-modelo.jpg', name: 'Hospital Privado Modelo' },
]

const carteles = [
  {
    image: '/img/plataforma-web.png',
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
    image: '/img/software-modular.png',
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
            {carteles.map((cartel, i) => (
              <AnimatedSection key={cartel.title}>
                <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={`group overflow-hidden rounded-2xl shadow-soft ring-1 ring-black/5 dark:ring-white/10 ${
                      i % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <img
                      src={asset(cartel.image)}
                      alt={cartel.alt}
                      className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] lg:h-full lg:object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="mb-5 h-1 w-12 rounded-full bg-brand-primary" />
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
              <Lightbox
                src={asset('/img/phir-it-ecosistema.png')}
                alt="Diagrama del ecosistema PHIR-IT"
                className="mx-auto w-full max-w-md"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <span className="mb-5 inline-block h-1 w-12 rounded-full bg-brand-primary" />
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

      <section className="bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-5 inline-block h-1 w-12 rounded-full bg-brand-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Confían en <span className="text-highlight">nosotros</span>
              </h2>
              <p className="mt-4 text-brand-muted dark:text-gray-400">
                Clínicas, hospitales y centros de diagnóstico que ya digitalizaron su flujo de
                trabajo con el ecosistema PHIR-IT.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {clientes.map((cliente) => (
                <div
                  key={cliente.name}
                  className="flex items-center justify-center rounded-xl border border-brand-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium dark:border-gray-800 dark:bg-gray-900"
                >
                  <img
                    src={asset(cliente.logo)}
                    alt={cliente.name}
                    className="h-16 w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
              <div className="group relative overflow-hidden rounded-xl border border-brand-primary/30 bg-white shadow-medium ring-1 ring-brand-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-medium hover:ring-brand-primary/30 dark:border-brand-primary/30 dark:bg-gray-900">
                <img
                  src={asset('/img/clientes/otros-clientes.png')}
                  alt="Y muchas otras instituciones que confían en PHIR-IT"
                  className="h-full min-h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                  <span className="text-sm font-bold uppercase tracking-wide text-white drop-shadow-md">
                    Otros clientes
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
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
