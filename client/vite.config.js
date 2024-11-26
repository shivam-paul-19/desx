import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/create': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/forget': 'http://localhost:8080',
      '/adduser': 'http://localhost:8080',
      '/update': 'http://localhost:8080'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
