import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Sin hash: arriba de todo, como siempre.
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    // Con hash, scrolleamos a la sección. Como las páginas son lazy, el elemento
    // puede no estar montado todavía, así que reintentamos unos frames.
    const id = decodeURIComponent(hash.slice(1))
    let frames = 0
    let raf = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (frames++ < 30) {
        raf = requestAnimationFrame(tryScroll)
      }
    }
    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-dark focus:px-4 focus:py-2 focus:text-white focus:shadow-medium"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="content" className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
