import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwindcss()], publicDir: false, build: {outDir:'lib',lib:{entry:'src/design-system/index.ts',formats:['es'],fileName:'index',cssFileName:'styles'},rollupOptions:{external:['react','react-dom','react/jsx-runtime']}} });
