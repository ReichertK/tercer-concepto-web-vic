import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="divide-y divide-brand-border rounded-xl border border-brand-border dark:divide-gray-800 dark:border-gray-800">
      {items.map((item, i) => (
        <Disclosure key={i} as="div">
          {({ open }) => (
            <>
              <DisclosureButton className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-brand-surface-alt dark:text-white dark:hover:bg-gray-800/50">
                {item.question}
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-brand-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </DisclosureButton>
              <DisclosurePanel className="overflow-hidden">
                <div className="px-5 pb-4 text-sm leading-relaxed text-brand-muted dark:text-gray-400">
                  {item.answer}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
