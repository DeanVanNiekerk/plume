import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
  ],
  server: { https: true, port: 5080, host: '0.0.0.0' },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
