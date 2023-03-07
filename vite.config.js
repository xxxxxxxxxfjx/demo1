import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'; //这个path用到了上面安装的@types/node
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        WindiCSS(),
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src'), // @代替src
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://ceshi13.dishait.cn/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
              },
        }
    }
});
