import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deployed as a GitHub Pages *user site* (pethupraveen.github.io),
// which is served from the domain root, so the base path is '/'.
// If this ever moves to a project repo, change base to '/<repo-name>/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
