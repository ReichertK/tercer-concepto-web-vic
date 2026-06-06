import { Mail } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'
import SectionHeading from '../components/ui/SectionHeading'
import ContactForm from '../components/ui/ContactForm'
import FAQAccordion from '../components/ui/FAQAccordion'
import AnimatedSection from '../components/ui/AnimatedSection'
import { asset } from '../utils/assets'

const faqItems = [
  {
    question: '¿Qué es el ecosistema PHIR-IT y cómo puede ayudar a mi institución?',
    answer:
      'El ecosistema PHIR-IT es un conjunto integrado de módulos (WorkList, PACS, Informes y Portal de Pacientes) que cubren todo el flujo de trabajo de diagnóstico por imágenes. Desde la admisión del paciente hasta la entrega del informe médico, cada paso queda digitalizado y optimizado.',
  },
  {
    question: '¿Puedo implementar solo algunos módulos del ecosistema?',
    answer: 'Sí. Cada módulo funciona de forma independiente y puede integrarse con sistemas existentes. Podés comenzar con PhirITPacs o PhirITInformes y agregar el resto a medida que tu institución lo necesite.',
  },
  {
    question: '¿Ofrecen soporte técnico después de la implementación?',
    answer: 'Por supuesto. Brindamos soporte técnico continuo, actualizaciones periódicas y capacitación al personal. Nuestro equipo está disponible para resolver cualquier inconveniente que surja.',
  },
  {
    question: '¿Cuáles son las modalidades de implementación disponibles?',
    answer: 'Ofrecemos implementación In Situ (en sus servidores locales) y Cloud (en la nube, con servidores propios o gestionados por PHIR-IT). Ambas opciones se adaptan a las necesidades y presupuesto de cada institución.',
  },
  {
    question: '¿Es compatible con otros sistemas de gestión de salud (HIS/RIS)?',
    answer: 'Sí. Nuestro módulo PhirITInterface proporciona una API completa para la integración con sistemas RIS, HIS y otros proveedores externos, garantizando interoperabilidad total.',
  },
]

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contacto"
        description="Contactá a PHIR-IT. Resolvemos tus consultas y te acompañamos en la transformación digital de tu institución de salud."
        path="/contacto"
        image="/img/illustrations/video-call.svg"
      />

      <section className="relative overflow-hidden bg-brand-dark pt-24 pb-16 lg:pt-32 lg:pb-24">
        <img
          src={asset('/img/fondo-sala-control.png')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-brand-dark/70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl">
              ¿Tenés alguna <span className="text-highlight">consulta</span>?
            </h1>
            <p className="mt-4 text-lg text-gray-100/90">
              Nuestro equipo está para ayudarte. Envianos un mensaje y te respondemos a la brevedad.
            </p>
            <a
              href="mailto:info@phir-it.ar"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-dark"
            >
              <Mail size={18} />
              info@phir-it.ar
            </a>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <div className="rounded-2xl bg-white p-6 shadow-medium dark:bg-gray-900 sm:p-8">
                <ContactForm />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <img
                src={asset('/img/illustrations/video-call.svg')}
                alt="Contacto PHIR-IT"
                className="mx-auto w-full max-w-md"
                loading="lazy"
                decoding="async"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-brand-dark lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Preguntas Frecuentes"
            highlight="Frecuentes"
            subtitle="Respuestas a las consultas más comunes sobre nuestros productos y servicios."
          />
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <FAQAccordion items={faqItems} />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
