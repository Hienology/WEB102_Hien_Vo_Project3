import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this app under /WEB102_Hien_Vo_Project3/.
  // Keep localhost rooted at / during development.
  base: command === 'build' ? '/WEB102_Hien_Vo_Project3/' : '/',
}))
