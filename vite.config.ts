import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Production builds are served from https://gapeslape.github.io/nedo/ on GitHub Pages
  base: command === 'build' ? '/nedo/' : '/',
  plugins: [react()],
}))
