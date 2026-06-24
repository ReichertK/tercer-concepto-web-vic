import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
  keywords?: string
}

const BASE_URL = 'https://phirit.com'

// Términos por los que queremos aparecer en las búsquedas. Se aplican a todas las
// páginas salvo que una pase su propia lista por la prop keywords.
const DEFAULT_KEYWORDS = [
  'delivery de imágenes',
  'delivery de estudios',
  'digitalización de imágenes médicas',
  'PACS',
  'servidores de imágenes médicas',
  'imágenes médicas',
  'visualizadores DICOM',
  'DICOM',
  'API diagnóstico',
  'integraciones PACS',
  'integraciones médicas',
  'PACS DICOM',
  'worklist',
  'Mirth',
  'HL7',
  'RIS',
  'informe médico',
  'cloud médica',
  'cloud RIS',
  'Oviyam',
  'OHIF',
  'portal de pacientes',
  'DIMSE',
  'C-MOVE',
  'C-GET',
  'WADO',
  'DICOMweb',
  'WADO-RS',
  'WADO-URI',
  'teleinforme',
  'telemedicina',
  'visualizador 3D',
  'MPR',
  'hosting',
  'Informes',
  'dicomizador',
  'interfaces',
].join(', ')

export default function SEOHead({ title, description, path, image = '/img/logo-banana.png', noIndex, keywords = DEFAULT_KEYWORDS }: SEOHeadProps) {
  const fullTitle = `${title} | PHIR-IT`
  const canonicalUrl = `${BASE_URL}${path}`
  const imageUrl = `${BASE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content="PHIR-IT" />
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
