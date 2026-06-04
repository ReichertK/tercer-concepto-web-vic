import { useMemo, useState, type ReactNode } from 'react'
import { NavbarVariantContext, NAV_VARIANT_KEY, type NavVariant } from './navbarVariant'

function resolveInitialVariant(): NavVariant {
  if (typeof window === 'undefined') return 'color'
  const stored = localStorage.getItem(NAV_VARIANT_KEY)
  return stored === 'white' || stored === 'color' ? stored : 'color'
}

export function NavbarVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<NavVariant>(resolveInitialVariant)

  const setVariant = (v: NavVariant) => {
    setVariantState(v)
    try {
      localStorage.setItem(NAV_VARIANT_KEY, v)
    } catch {
      // localStorage no disponible
    }
  }

  const ctx = useMemo(() => ({ variant, setVariant }), [variant])

  return <NavbarVariantContext.Provider value={ctx}>{children}</NavbarVariantContext.Provider>
}
