// vite.config.ts
import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  const config: UserConfig = {
    base: './',
    plugins: [tsconfigPaths(), react()],
    build: {
      target: 'esnext',
      outDir: 'dist'
    },
    esbuild: {
      target: 'esnext',
      supported: { 'import-meta': true }
    },
    optimizeDeps: {
      entries: ['src/app.tsx'],
      include: ['react', 'react-dom', 'zmp-ui', 'recoil'],
      esbuildOptions: {
        target: 'esnext',
        supported: { 'import-meta': true }
      }
    }
  }

  return config
})
