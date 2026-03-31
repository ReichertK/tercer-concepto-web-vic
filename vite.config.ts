import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/tercer-concepto-web-vic/',
  plugins: [react(), tailwindcss()],
})
