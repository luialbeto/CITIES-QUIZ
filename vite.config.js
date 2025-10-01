import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@context': path.resolve(__dirname, './src/context'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@services': path.resolve(__dirname, './src/services'),
            '@types': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@data': path.resolve(__dirname, './src/data'),
            '@styles': path.resolve(__dirname, './src/assets/styles'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@import \"@styles/abstracts/_variables.scss\"; @import \"@styles/abstracts/_mixins.scss\";",
            },
        },
    },
});
