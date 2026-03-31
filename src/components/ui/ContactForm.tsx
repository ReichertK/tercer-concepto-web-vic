import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresá un email válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormData) => {
    setStatus('submitting')
    try {
      // Simular envío — reemplazar con endpoint real
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-8 text-center">
        <CheckCircle className="text-brand-accent" size={48} />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">¡Mensaje enviado!</h3>
        <p className="text-sm text-brand-muted dark:text-gray-400">
          Gracias por contactarnos. Te responderemos a la brevedad.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 rounded-xl bg-brand-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-600"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle size={18} />
          Hubo un error al enviar el mensaje. Intentá de nuevo.
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-200">
          Nombre
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          autoComplete="name"
          placeholder="Tu nombre"
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-gray-900 shadow-soft transition-shadow focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-200">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          placeholder="tu@email.com"
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-gray-900 shadow-soft transition-shadow focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-gray-200">
          Mensaje
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          placeholder="Escribí tu mensaje..."
          className="w-full resize-y rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-gray-900 shadow-soft transition-shadow focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(28,154,234,0.25)] transition-all hover:bg-brand-primary-600 disabled:opacity-60 active:translate-y-px"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  )
}
