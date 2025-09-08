import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ensures relative asset paths so it works on GitHub Pages
  base: './',
})
