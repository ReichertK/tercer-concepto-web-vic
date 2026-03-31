import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

const BASE_URL = 'https://phirit.com'

export default function SEOHead({ title, description, path, image = '/img/logo2.png', noIndex }: SEOHeadProps) {
  const fullTitle = `${title} - PHIRIT`
  const canonicalUrl = `${BASE_URL}${path}`
  const imageUrl = `${BASE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content="PHIRIT" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
