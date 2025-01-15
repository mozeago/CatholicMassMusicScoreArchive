import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build', // specify where to output the build
        chunkSizeWarningLimit: 500, // Avoid chunk size warnings for larger files
        minify: 'esbuild', // Use esbuild for faster and smaller minification
        sourcemap: false, // Disable source maps in production for smaller build size
        cssCodeSplit: true, // Enable CSS code splitting for more efficient CSS loading
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'; // Split vendor libraries into a separate file
                    }
                }
            }
        }
    },
    server: {
        proxy: {
            // Example of proxy configuration for API requests
            '/api': 'http://localhost', // Set your backend URL
        }
    },
});
