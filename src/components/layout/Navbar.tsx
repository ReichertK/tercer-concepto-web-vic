import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <nav className="fixed top-0 inset-x-0 z-50 bg-brand-primary shadow-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src={asset('/img/logo2.png')} alt="PHIRIT" className="h-12 w-12" />
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  pathname === link.to
                    ? 'text-white bg-white/15'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="ml-2 rounded-lg p-2 text-white/85 transition-colors hover:text-white hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="rounded-lg p-2 text-white/85 hover:text-white"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menú de navegación"
              aria-expanded={mobileOpen}
              className="rounded-lg p-2 text-white/85 hover:text-white"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
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
                      ? 'text-white bg-white/15'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
