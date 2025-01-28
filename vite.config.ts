import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    root: '.',
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'VueSmoothPicker',
            fileName: 'vue-smooth-picker'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
}); 