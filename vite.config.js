import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
        @safeArea: 1200px;
        @navSpan:70px;
        @breakpoint:800px;
        @navHeight: calc(@navSpan - 20px);
        `
      },
    }
  }
})
