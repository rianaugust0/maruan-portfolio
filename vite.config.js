import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        curativos: resolve(__dirname, 'curativos-domiciliares-goiania/index.html'),
        sondagem: resolve(__dirname, 'passagem-de-sonda-goiania/index.html'),
      },
    },
  },
});
