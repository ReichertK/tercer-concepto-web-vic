import { Hospital, Building2, ClipboardPlus, Network, FileHeart, MonitorSmartphone } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/ui/Hero'
import CaseCard from '../components/ui/CaseCard'

const cases = [
  {
    icon: Hospital,
    title: 'CMH Salud – Hurlingham',
    description: 'Implementación exitosa del Ecosistema PHIRIT, optimizando la gestión de turnos y estudios médicos.',
  },
  {
    icon: Building2,
    title: 'HSL – CABA',
    description: 'Mejora significativa en la eficiencia de procesos y manejo de información médica con nuestras soluciones.',
  },
  {
    icon: ClipboardPlus,
    title: 'Dime – Gualeguay',
    description: 'Implementación exitosa de PhirITPacs, mejorando la gestión y visualización de imágenes médicas.',
  },
  {
    icon: Network,
    title: 'Radiomed – F. Varela',
    description: 'Optimización de flujos de trabajo y mejora en la calidad de atención al paciente mediante el Ecosistema PHIRIT.',
  },
  {
    icon: FileHeart,
    title: 'Amoemra – CABA',
    description: 'Integración exitosa de PhirITInformes, mejorando la eficiencia en la generación y gestión de informes médicos.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Diagnosticar – Berazategui',
    description: 'Transformación digital integral en procesos de diagnóstico por imágenes con el Ecosistema PHIRIT completo.',
  },
]

export default function SuccessCases() {
  return (
    <>
      <SEOHead
        title="Casos de Éxito"
        description="Conocé casos de éxito de instituciones de salud que optimizaron sus procesos con el Ecosistema PHIRIT."
        path="/casos-exito"
        image="/img/illustrations/ranking.svg"
      />

      <Hero
        title={
          <>
            Nuestros casos de <span className="text-highlight">éxito</span>
          </>
        }
        subtitle="Descubrí cómo hemos ayudado a diversas instituciones de salud a optimizar sus procesos con nuestras soluciones tecnológicas."
        image={{ src: '/img/illustrations/ranking.svg', alt: 'Casos de éxito' }}
      />

      <section className="bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((item, i) => (
              <CaseCard key={item.title} {...item} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
