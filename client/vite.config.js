import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/create': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/logout': 'http://localhost:8080',
      '/forget': 'http://localhost:8080',
      '/adduser': 'http://localhost:8080',
      '/isuser': 'http://localhost:8080',
      '/addcanvas': 'http://localhost:8080',
      '/updatecanvas': 'http://localhost:8080',
      '/getcanvas': 'http://localhost:8080',
      '/loadcanvas': 'http://localhost:8080',
      '/getuser': 'http://localhost:8080',
      '/deletecanvas': 'http://localhost:8080',
      '/updatepassword': 'http://localhost:8080',
      '/updatename': 'http://localhost:8080',
      '/deleteuser': 'http://localhost:8080',
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
