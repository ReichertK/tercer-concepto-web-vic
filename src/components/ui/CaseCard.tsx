import type { LucideIcon } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

interface CaseCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export default function CaseCard({ icon: Icon, title, description, delay = 0 }: CaseCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="flex h-full flex-col items-center rounded-xl border border-brand-border bg-white p-6 text-center shadow-soft transition-shadow hover:shadow-medium dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <Icon size={28} />
        </div>
        <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-brand-muted dark:text-gray-400">{description}</p>
      </div>
    </AnimatedSection>
  )
}
