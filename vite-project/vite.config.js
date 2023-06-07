import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
    }),
	Components({
      // 指定自动导入的组件位置，默认是 src/components
       dirs: ['src/components','src/otherComponents'],
    }),
  ],
})
