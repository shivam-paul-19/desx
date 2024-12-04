import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/create': 'https://desx-server.onrender.com',
      '/login': 'https://desx-server.onrender.com',
      '/logout': 'https://desx-server.onrender.com',
      '/forget': 'https://desx-server.onrender.com',
      '/adduser': 'https://desx-server.onrender.com',
      '/isuser': 'https://desx-server.onrender.com',
      '/addcanvas': 'https://desx-server.onrender.com',
      '/updatecanvas': 'https://desx-server.onrender.com',
      '/getcanvas': 'https://desx-server.onrender.com',
      '/loadcanvas': 'https://desx-server.onrender.com',
      '/getuser': 'https://desx-server.onrender.com',
      '/deletecanvas': 'https://desx-server.onrender.com',
      '/updatepassword': 'https://desx-server.onrender.com',
      '/updatename': 'https://desx-server.onrender.com',
      '/deleteuser': 'https://desx-server.onrender.com',
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
