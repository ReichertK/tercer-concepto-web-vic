import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  linkText: string
  delay?: number
}

export default function ServiceCard({ icon: Icon, title, description, href, linkText, delay = 0 }: ServiceCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group h-full rounded-xl border border-brand-border bg-white p-6 shadow-soft transition-shadow hover:shadow-medium dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-dark text-brand-primary">
          <Icon size={24} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="mb-4 text-sm text-brand-muted dark:text-gray-400">{description}</p>
        <Link
          to={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-600"
        >
          {linkText}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </AnimatedSection>
  )
}
