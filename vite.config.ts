import { defineConfig } from 'vite'
import { handlebars } from './vite-plugins-handlebars-precompoile'

export default defineConfig({
    plugins: [handlebars()],
    build: {
        target: 'es2017',
        outDir: 'dist',
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
    }
})