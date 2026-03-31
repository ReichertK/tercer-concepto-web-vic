import SEOHead from '../components/seo/SEOHead'
import SectionHeading from '../components/ui/SectionHeading'
import ContactForm from '../components/ui/ContactForm'
import FAQAccordion from '../components/ui/FAQAccordion'
import AnimatedSection from '../components/ui/AnimatedSection'
import { asset } from '../utils/assets'

const faqItems = [
  {
    question: '¿Qué es el Ecosistema PHIRIT y cómo puede ayudar a mi institución?',
    answer: 'El Ecosistema PHIRIT es un conjunto integrado de módulos (WorkList, PACS, Informes y Portal de Pacientes) que cubren todo el flujo de trabajo de diagnóstico por imágenes. Desde la admisión del paciente hasta la entrega del informe médico, cada paso queda digitalizado y optimizado.',
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
    answer: 'Ofrecemos implementación In Situ (en sus servidores locales) y Cloud (en la nube, con servidores propios o gestionados por PHIRIT). Ambas opciones se adaptan a las necesidades y presupuesto de cada institución.',
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
        description="Contactá a PHIRIT. Resolvemos tus consultas y te acompañamos en la transformación digital de tu institución de salud."
        path="/contacto"
        image="/img/illustrations/video-call.svg"
      />

      <section className="bg-gradient-to-b from-sky-50 via-white to-white pt-24 pb-16 dark:from-gray-900 dark:via-brand-dark dark:to-brand-dark lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="¿Tenés alguna consulta?"
            highlight="consulta"
            subtitle="Nuestro equipo está para ayudarte. Envianos un mensaje y te respondemos a la brevedad."
          />
          <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <img
                src={asset('/img/illustrations/video-call.svg')}
                alt="Contacto PHIRIT"
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
