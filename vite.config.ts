import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
