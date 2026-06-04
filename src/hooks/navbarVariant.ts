import { createContext, use } from 'react'

export type NavVariant = 'color' | 'white'

export interface NavbarVariantValue {
  variant: NavVariant
  setVariant: (v: NavVariant) => void
}

export const NAV_VARIANT_KEY = 'phirit-navbar-variant'

export const NavbarVariantContext = createContext<NavbarVariantValue | undefined>(undefined)

export function useNavbarVariant() {
  const ctx = use(NavbarVariantContext)
  if (!ctx) throw new Error('useNavbarVariant debe usarse dentro de NavbarVariantProvider')
  return ctx
}
