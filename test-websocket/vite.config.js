import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define : {
    global : 'window'
  },
  server : {
    host : true
  },
  resolve : {
    alias : {
      '@' : '/src',
      'api' : '/src/api',
      'components' : '/src/components',
      'assets' : '/src/assets',
      'utils' : '/src/utils',
      'hooks' : '/src/hooks'
    }
  }
})
