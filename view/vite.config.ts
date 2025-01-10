import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'crossorigin',
      transformIndexHtml(html) {
        return html.replace(/crossorigin/g, '');
      },
    },
  ],
});
