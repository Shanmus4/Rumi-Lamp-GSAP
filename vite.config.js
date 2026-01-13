import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Rumi-Lamp-GSAP/',
  // Ensure resources folder is copied to dist
  publicDir: 'resources',
  build: {
    // Copy resources to dist/resources
    assetsDir: 'assets',
  }
})
