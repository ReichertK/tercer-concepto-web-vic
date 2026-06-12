import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { asset } from '../../utils/assets'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/productos-servicios', label: 'Productos y Servicios' },
  { to: '/casos-exito', label: 'Casos de Éxito' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#fcfdfc] shadow-soft border-b border-brand-border dark:border-gray-800 dark:bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            aria-label="PHIR-IT — Ir al inicio"
            className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <img
              src={asset('/img/logo-banana.png')}
              alt="Logo de PHIR-IT"
              className="h-16 max-w-[260px] w-auto object-contain sm:h-[4.5rem] sm:max-w-[340px] transition-[filter] dark:[filter:invert(1)_hue-rotate(180deg)_contrast(0.86)]"
            />
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  pathname === link.to
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="ml-2 rounded-lg p-2 transition-colors text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-white"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="rounded-lg p-2 transition-colors text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-white"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menú de navegación"
              aria-expanded={mobileOpen}
              className="rounded-lg p-2 transition-colors text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-white"
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
                    pathname === link.to
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5'
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
