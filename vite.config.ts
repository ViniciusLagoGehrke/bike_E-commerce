import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    strictPort: true,
    port: 8000, // This is the port which we will use in docker
    watch: {
      // when using windows and hot reload doesn't work
      usePolling: true
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    coverage: {
      provider: 'c8'
    },
    include: ['**/*.test.{ts,tsx}']
  }
})
