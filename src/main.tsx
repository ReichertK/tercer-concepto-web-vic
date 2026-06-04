import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from './hooks/ThemeProvider'
import { NavbarVariantProvider } from './hooks/NavbarVariantProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <NavbarVariantProvider>
          <LazyMotion features={domAnimation} strict>
            <App />
          </LazyMotion>
        </NavbarVariantProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
