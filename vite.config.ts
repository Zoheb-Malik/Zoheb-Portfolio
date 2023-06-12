import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = './public';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Zoheb-Portfolio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: `${__dirname}/index.html`,
        404: `${__dirname}/404.html`,
      },
    },
  },
})
