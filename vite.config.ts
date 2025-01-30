import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    base: './',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        rollupOptions: {
            input: {
                datetime: resolve(__dirname, 'example/datetime/index.html'),
                gender: resolve(__dirname, 'example/gender/index.html'),
                product: resolve(__dirname, 'example/product/index.html')
            },
            output: {
                dir: resolve(__dirname, "pages")
            }
        }
    }
}) 