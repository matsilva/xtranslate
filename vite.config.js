import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'XTranslate',
            formats: ['es', 'umd'],
            fileName: (format) => `x-translate.${format}.js`,
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
    },
});
