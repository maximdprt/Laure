import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-dom') || id.includes('react/') || id.includes('react-jsx') || id.includes('scheduler')) {
            return 'react-vendor'
          }
          if (id.includes('framer-motion')) return 'motion-vendor'
          if (id.includes('@stripe')) return 'stripe-vendor'
          if (id.includes('three') || id.includes('@react-three')) return 'three-vendor'
          if (id.includes('@supabase')) return 'supabase-vendor'
          return 'vendor'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  }
})
