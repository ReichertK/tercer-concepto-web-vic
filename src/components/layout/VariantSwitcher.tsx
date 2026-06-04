import { useNavbarVariant } from '../../hooks/navbarVariant'

/**
 * Selector temporal para comparar las dos opciones de encabezado (A y B).
 * Es una herramienta de revisión: una vez elegida la opción, se puede quitar.
 */
export default function VariantSwitcher() {
  const { variant, setVariant } = useNavbarVariant()

  return (
    <div className="fixed bottom-4 left-4 z-[60] rounded-xl border border-brand-border bg-white/95 p-2 shadow-medium backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
      <p className="px-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-muted dark:text-gray-400">
        Vista previa
      </p>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setVariant('color')}
          aria-pressed={variant === 'color'}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            variant === 'color'
              ? 'bg-brand-primary text-white'
              : 'text-gray-600 hover:bg-brand-primary/10 dark:text-gray-300'
          }`}
        >
          Opción A · barra con color
        </button>
        <button
          type="button"
          onClick={() => setVariant('white')}
          aria-pressed={variant === 'white'}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            variant === 'white'
              ? 'bg-brand-primary text-white'
              : 'text-gray-600 hover:bg-brand-primary/10 dark:text-gray-300'
          }`}
        >
          Opción B · barra blanca
        </button>
      </div>
    </div>
  )
}
