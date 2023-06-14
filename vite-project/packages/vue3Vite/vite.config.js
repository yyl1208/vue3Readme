import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
      // 指定自动导入的组件位置，默认是 src/components
      dirs: ['src/components', 'src/otherComponents'],
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      rules: [
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${d}px` })],
        [/^p-(\d+)$/, (match) => ({ padding: `${match[1] / 4}px` })],
        [/^w-(\d+)$/, ([, d]) => ({ width: `${d}px` })],
        [/^h-(\d+)$/, ([, d]) => ({ height: `${d}px` })],
        [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
      ],
    }),
  ],
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      '~/': `${pathSrc}/`,
      '@': `${pathSrc}`,
      '@type': resolve(__dirname, './src/types'),
    },
  },
  server: {
    cors: true,
    host: true,
    port: 6001,
  },
});
