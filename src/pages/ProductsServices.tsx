import { Building2, Cloud } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/ui/Hero'
import SectionHeading from '../components/ui/SectionHeading'
import AnimatedSection from '../components/ui/AnimatedSection'
import { asset } from '../utils/assets'

interface ProductCard {
  image: string
  title: string
  description: string
  features: string[]
}

const ecosystemProducts: ProductCard[] = [
  {
    image: '/img/phir-worklist.png',
    title: 'PhirITWorkList',
    description: 'Módulo webservice que recibe mensajes del RIS del cliente en el momento de la admisión del turno/paciente/práctica.',
    features: [
      'Publica turnos en la consola de cada modalidad',
      'Avisa al profesional sobre nuevos pacientes',
      'Actualiza el orden de atención en tiempo real',
    ],
  },
  {
    image: '/img/phir-pacs.png',
    title: 'PhirITPacs',
    description: 'Servidor de imágenes DICOM con un motor de visualización versátil y veloz.',
    features: [
      'Almacenamiento eficiente y seguro de estudios',
      'Rápida visualización de imágenes',
      'Parametrización del tiempo de almacenamiento',
    ],
  },
  {
    image: '/img/phirit-informes.png',
    title: 'PhirITInformes',
    description: 'El corazón del ecosistema: gestiona todo el workflow desde el ingreso de la imagen hasta la entrega del informe médico.',
    features: [
      'Manejo de estado de imágenes y estudios',
      'Asignación de médicos informantes',
      'Herramientas de edición de informes',
      'Gestión de usuarios internos y externos',
    ],
  },
]

const additionalProducts: ProductCard[] = [
  {
    image: '/img/phir-portalpacientes.png',
    title: 'PhirITPortal de Pacientes',
    description: 'Permite a los pacientes acceder a su historial de estudios, prácticas e informes dentro de la institución.',
    features: [
      'Acceso fácil al historial médico',
      'Compartir información con profesionales y familiares',
      'Reduce el uso de papel y CDs',
    ],
  },
  {
    image: '/img/phir-api.png',
    title: 'PhirITInterface',
    description: 'API para acceder a la información de estudios y estados del workflow.',
    features: [
      'Integración con software RIS del cliente',
      'Acceso a datos para terceros externos',
      'Interoperabilidad entre sistemas',
    ],
  },
  {
    image: '/img/phir-ris.png',
    title: 'PhirITRis',
    description: 'Sistema integral que gestiona todas las agendas de turnos y pacientes de la empresa.',
    features: [
      'Administración de profesionales y equipos',
      'Gestión de contratos, convenios y obras sociales',
      'Generación de informes y URL para ver imágenes',
    ],
  },
]

function ProductEntry({ product, delay }: { product: ProductCard; delay: number }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="flex h-full flex-col rounded-xl border border-brand-border bg-white p-6 shadow-soft transition-shadow hover:shadow-medium dark:border-gray-800 dark:bg-gray-900">
        <img
          src={asset(product.image)}
          alt={product.title}
          className="mb-4 h-28 w-28 self-center object-contain"
          loading="lazy"
          decoding="async"
        />
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{product.title}</h3>
        <p className="mb-3 text-sm text-brand-muted dark:text-gray-400">{product.description}</p>
        <ul className="mt-auto space-y-1.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-brand-muted dark:text-gray-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}

export default function ProductsServices() {
  return (
    <>
      <SEOHead
        title="Productos y Servicios"
        description="Explora el Ecosistema PHIRIT: WorkList, PACS, Informes, Portal de Pacientes y más. Implementaciones flexibles para instituciones de salud."
        path="/productos-servicios"
        image="/img/productos_servicios.png"
      />

      <Hero
        title={
          <>
            Nuestros <span className="text-highlight">productos</span> y servicios
          </>
        }
        subtitle="Descubrí el Ecosistema PHIRIT, diseñado para optimizar el flujo de trabajo en el sector salud, desde la gestión de turnos hasta la entrega de informes médicos."
        primaryAction={{ label: 'Explorar Ecosistema', to: '#ecosistema' }}
        image={{ src: '/img/phir-it-ecosistema.png', alt: 'Ecosistema PHIRIT' }}
      />

      {/* Ecosystem */}
      <section id="ecosistema" className="scroll-mt-20 bg-brand-surface-alt py-16 dark:bg-gray-900/50 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="El Ecosistema de PHIRIT"
            highlight="PHIRIT"
            subtitle="Nuestro producto insignia que abarca todo el flujo de trabajo en el sector salud."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ecosystemProducts.map((product, i) => (
              <ProductEntry key={product.title} product={product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional products */}
      <section id="adicionales" className="scroll-mt-20 bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Productos Adicionales"
            highlight="Adicionales"
            subtitle="Complementá tu ecosistema con estas soluciones especializadas."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalProducts.map((product, i) => (
              <ProductEntry key={product.title} product={product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Service modalities */}
      <section id="modalidades" className="scroll-mt-20 bg-brand-surface-alt py-16 dark:bg-gray-900/50 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Modalidades de Servicio"
            highlight="Servicio"
            subtitle="Ofrecemos flexibilidad en la implementación de nuestras soluciones para adaptarnos a sus necesidades."
          />
          <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
            <AnimatedSection>
              <div className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-white p-8 text-center shadow-soft dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary shadow-md">
                  <Building2 size={32} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">In Situ</h3>
                <p className="text-sm text-brand-muted dark:text-gray-400">
                  Implementación en sus propias instalaciones, adaptada a su infraestructura existente.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-white p-8 text-center shadow-soft dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary shadow-md">
                  <Cloud size={32} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Cloud</h3>
                <p className="text-sm text-brand-muted dark:text-gray-400">
                  Solución basada en la nube, con opciones de servidor propio o gestionado por PHIRIT.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
