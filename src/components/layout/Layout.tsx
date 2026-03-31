import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-dark focus:px-4 focus:py-2 focus:text-white focus:shadow-medium"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="content" className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
