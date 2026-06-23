import AnimatedSection from './AnimatedSection'
import { asset } from '../../utils/assets'

interface CaseCardProps {
  image: string
  title: string
  description: string
  delay?: number
}

export default function CaseCard({ image, title, description, delay = 0 }: CaseCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group flex h-full flex-col items-center rounded-xl border border-brand-border bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex h-20 w-full items-center justify-center rounded-lg border border-brand-border bg-white px-4">
          <img
            src={asset(image)}
            alt={title}
            className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-brand-muted dark:text-gray-400">{description}</p>
      </div>
    </AnimatedSection>
  )
}
