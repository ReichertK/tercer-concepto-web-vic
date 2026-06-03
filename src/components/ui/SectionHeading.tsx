interface SectionHeadingProps {
  title: string
  subtitle?: string
  highlight?: string
  centered?: boolean
}

export default function SectionHeading({ title, subtitle, highlight, centered = true }: SectionHeadingProps) {
  const alignment = centered ? 'text-center mx-auto' : ''

  const parts = highlight ? title.split(highlight) : null
  const titleContent = parts ? (
    <>
      {parts[0]}<span className="text-highlight">{highlight}</span>{parts[1]}
    </>
  ) : (
    title
  )

  return (
    <div className={`max-w-2xl ${alignment} mb-12`}>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
        {titleContent}
      </h2>
      {subtitle && (
        <p className="mt-4 text-brand-muted dark:text-gray-400">{subtitle}</p>
      )}
    </div>
  )
}
