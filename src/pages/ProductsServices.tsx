import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/ui/Hero'
import SectionHeading from '../components/ui/SectionHeading'
import AnimatedSection from '../components/ui/AnimatedSection'
import Lightbox from '../components/ui/Lightbox'
import { asset } from '../utils/assets'

interface ProductCard {
  image: string
  title: string
  description: string
  features: string[]
}

const products: ProductCard[] = [
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
      <div className="group flex h-full flex-col rounded-xl border border-brand-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium dark:border-gray-800 dark:bg-gray-900">
        <img
          src={asset(product.image)}
          alt={product.title}
          width={112}
          height={112}
          className="mb-4 size-28 self-center object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{product.title}</h3>
        <p className="mb-3 text-sm text-brand-muted dark:text-gray-400">{product.description}</p>
        <ul className="mt-auto space-y-1.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-brand-muted dark:text-gray-400">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-primary" />
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
        description="Explorá el ecosistema PHIR-IT: WorkList, PACS, Informes, Portal de Pacientes y más. Implementaciones flexibles para instituciones de salud."
        path="/productos-servicios"
        image="/img/productos_servicios.png"
      />

      <Hero
        title={
          <>
            Nuestros <span className="text-highlight">productos</span> y servicios
          </>
        }
        subtitle="El ecosistema PHIR-IT integra cada etapa del diagnóstico por imágenes —desde la gestión del turno hasta la entrega del informe— en una plataforma web única, segura e interoperable."
        primaryAction={{ label: 'Explorar ecosistema', to: '#ecosistema' }}
        image={{ src: '/img/phir-it-ecosistema.png', alt: 'Diagrama del ecosistema PHIR-IT' }}
        zoomableImage
        plainBackground
      />

      {/* Ecosistema: todos los productos juntos */}
      <section id="ecosistema" className="scroll-mt-24 bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="El ecosistema PHIR-IT"
            highlight="PHIR-IT"
            subtitle="Una plataforma modular que cubre cada etapa del flujo clínico en diagnóstico por imágenes."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductEntry key={product.title} product={product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Modalidades de servicio */}
      <section id="modalidades" className="scroll-mt-24 bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Modalidades de Servicio"
            highlight="Servicio"
            subtitle="Ofrecemos flexibilidad en la implementación de nuestras soluciones para adaptarnos a sus necesidades."
          />
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            <AnimatedSection>
              <div className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium dark:border-gray-800 dark:bg-gray-900">
                <Lightbox
                  src={asset('/img/data-center-insitu.png')}
                  alt="Implementación In Situ de PHIR-IT"
                  className="mb-4 h-32 w-full"
                />
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">In Situ</h3>
                <p className="text-sm text-brand-muted dark:text-gray-400">
                  Implementación en sus propias instalaciones, adaptada a su infraestructura existente.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium dark:border-gray-800 dark:bg-gray-900">
                <Lightbox
                  src={asset('/img/estructura-cloud.png')}
                  alt="Solución Cloud de PHIR-IT"
                  className="mb-4 h-32 w-full"
                />
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Cloud</h3>
                <p className="text-sm text-brand-muted dark:text-gray-400">
                  Solución basada en la nube, con opciones de servidor propio o gestionado por PHIR-IT.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
