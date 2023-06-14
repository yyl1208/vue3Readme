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

  app.mount('#app');
}

bootstrap();
