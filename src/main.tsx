import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from './hooks/ThemeProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LazyMotion features={domAnimation} strict>
          <App />
        </LazyMotion>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
