import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useNavbarVariant } from '../../hooks/navbarVariant'
import { asset } from '../../utils/assets'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/productos-servicios', label: 'Productos y Servicios' },
  { to: '/casos-exito', label: 'Casos de Éxito' },
  { to: '/contacto', label: 'Contacto' },
]

// Estilos de cada opción que estamos evaluando: A (barra con color) y B (barra blanca).
// El logo A tiene un degradado azul diagonal (claro arriba-izq → oscuro abajo-der);
// la barra usa el mismo degradado para que el logo se funda sin recuadro visible.
const variantStyles = {
  color: {
    nav: 'bg-gradient-to-br from-[#0587dc] to-[#0570be] shadow-soft',
    logo: '/img/logo-letras-negras.png',
    logoClass: 'rounded-full',
    wordmark: 'text-white',
    tagline: 'text-white/75',
    focusRing: 'focus-visible:ring-white/70',
    linkActive: 'text-white bg-white/15',
    linkIdle: 'text-white/85 hover:text-white hover:bg-white/10',
    iconButton: 'text-white/85 hover:text-white hover:bg-white/10',
  },
  white: {
    nav: 'bg-[#fcfdfc] shadow-soft border-b border-brand-border dark:border-gray-800 dark:bg-brand-dark',
    logo: '/img/logo-banana.png',
    logoClass: '',
    wordmark: 'text-gray-900 dark:text-white',
    tagline: 'text-brand-muted dark:text-gray-400',
    focusRing: 'focus-visible:ring-brand-primary',
    linkActive: 'text-brand-primary bg-brand-primary/10',
    linkIdle:
      'text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5',
    iconButton: 'text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-white',
  },
} as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { variant } = useNavbarVariant()
  const { pathname } = useLocation()

  const s = variantStyles[variant]

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 ${s.nav}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            aria-label="PHIR-IT — Ir al inicio"
            className={`flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 ${s.focusRing}`}
          >
            <img
              src={asset(s.logo)}
              alt="Logo de PHIR-IT"
              className={`h-16 w-auto max-w-[180px] object-contain sm:h-[4.5rem] sm:max-w-[240px] ${s.logoClass}`}
            />
            <span className="flex flex-col leading-none">
              <span className={`text-xl font-extrabold tracking-tight sm:text-2xl ${s.wordmark}`}>
                PHIR-IT
              </span>
              <span className={`hidden text-xs font-medium tracking-wide sm:block ${s.tagline}`}>
                Soluciones Tecnológicas para Salud
              </span>
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  pathname === link.to ? s.linkActive : s.linkIdle
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className={`ml-2 rounded-lg p-2 transition-colors ${s.iconButton}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className={`rounded-lg p-2 transition-colors ${s.iconButton}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menú de navegación"
              aria-expanded={mobileOpen}
              className={`rounded-lg p-2 transition-colors ${s.iconButton}`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-1 px-4 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    pathname === link.to ? s.linkActive : s.linkIdle
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
