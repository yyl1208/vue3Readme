import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupGlobDirectives } from '@/directives';

import 'uno.css';

import DemoBlock from './components/DemoBlock.vue';
import PreCode from './components/PreCode.vue';

// 引入message 样式
import '@arco-design/web-vue/dist/arco.css';

import { Message } from '@arco-design/web-vue';

import '@arco-design/web-vue/es/message/style/css.js'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

import microApp from '@micro-zoe/micro-app';

microApp.start({
  plugins: {
    modules: {
      'appname-vite': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(/(from|import)(\s*['"])(\/child\/vite\/)/g, (all) => {
                return all.replace('/child/vite/', 'http://localhost:4007/child/vite/');
              });
            }

            return code;
          },
        },
      ],

      'microChild': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(/(from|import)(\s*['"])(\/microChild\/)/g, (all) => {
                return all.replace('/microChild/', 'http://localhost:6001/microChild/');
              });
            }

            return code;
          },
        },
      ],
    },
  },
});

async function bootstrap() {
  const app = createApp(App);

  app.config.globalProperties.$message = Message;

  app.component('PreCode', PreCode);
  app.component(DemoBlock.name, DemoBlock);

  // 注册路由
  setupRouter(app);

  // 注册pinia
  setupStore(app);

  // 注册全局指令
  setupGlobDirectives(app);

  // 注册无界
  // setupWujie(app);

  app.mount('#app');
}

bootstrap();
