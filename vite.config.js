import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['codelle.ch', 'www.codelle.ch', '.infomaniak.site'],
  },
})
