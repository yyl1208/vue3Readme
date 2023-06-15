import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import { writeFileSync } from 'fs';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

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
    (function () {
      let basePath = '';
      return {
        name: 'microChild',
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`;
        },
        // writeBundle 钩子可以拿到完整处理后的文件，但已经无法修改
        writeBundle(options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName];
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath));
                });
                const fullPath = join(options.dir, chunk.fileName);
                writeFileSync(fullPath, chunk.code);
              }
            }
          }
        },
      };
    })(),
  ],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
  base: '/microChild/',
  server: {
    cors: true,
    // host: true,
    port: 6001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
