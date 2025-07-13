import { defineConfig, loadEnv } from 'vite'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log("API BASE URI:", env.VITE_API_BASE_URL);

  return {
  server: {
    host: true,
    port: Number(env.VITE_PORT),
    strictPort: true,
    proxy: {
      '/api': {
        target: env.VITE_API_BASE_URL, // Your backend port
        
        changeOrigin: true,
        secure: false
      }
    },
  },
  plugins: [react(), tailwindcss()],
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV)
  }
  }
});
