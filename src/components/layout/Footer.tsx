import { Link } from 'react-router-dom'
import { asset } from '../../utils/assets'

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  )
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  )
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
  )
}

const footerSections = [
  {
    title: 'Productos',
    links: [
      { label: 'PhirITWorkList', href: '/productos-servicios#ecosistema' },
      { label: 'PhirITPacs', href: '/productos-servicios#ecosistema' },
      { label: 'PhirITInformes', href: '/productos-servicios#ecosistema' },
      { label: 'Portal de Pacientes', href: '/productos-servicios#adicionales' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Casos de Éxito', href: '/casos-exito' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Implementación In Situ', href: '/productos-servicios#modalidades' },
      { label: 'Solución Cloud', href: '/productos-servicios#modalidades' },
      { label: 'Soporte Técnico', href: '/contacto' },
    ],
  },
]

const socialLinks = [
  { icon: FacebookIcon, label: 'Facebook de PHIRIT', href: '#' },
  { icon: XIcon, label: 'X (Twitter) de PHIRIT', href: '#' },
  { icon: InstagramIcon, label: 'Instagram de PHIRIT', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-white dark:border-gray-800 dark:bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={asset('/img/logo2.png')} alt="PHIRIT" className="h-10 w-10" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">PHIRIT</span>
            </Link>
            <p className="mt-3 text-sm text-brand-muted dark:text-gray-400">
              Soluciones tecnológicas integrales para el sector salud. Ecosistema completo de gestión de imágenes médicas e informes.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-brand-muted transition-colors hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-brand-border dark:border-gray-800" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-brand-muted dark:text-gray-500">
            &copy; 2026 PHIRIT. Todos los derechos reservados.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="rounded-lg p-2 text-brand-muted transition-colors hover:text-brand-primary dark:text-gray-500 dark:hover:text-brand-primary"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
