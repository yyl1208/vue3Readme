import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './public-path'

import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupGlobDirectives } from '@/directives';
import { handleMicroData } from '@/plugins/micro';

import router, { history } from '@/router';

import 'uno.css';

import DemoBlock from './components/DemoBlock.vue';
import PreCode from './components/PreCode.vue';

// 引入message 样式
import '@arco-design/web-vue/dist/arco.css';

import { Message } from '@arco-design/web-vue';

import '@arco-design/web-vue/es/message/style/css.js'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

let app = null;

async function mount() {
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

  app.mount('#child-app');

  handleMicroData(router);
}

// 将卸载操作放入 unmount 函数
function unmount() {
  app?.unmount();
  history?.destroy();
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener();
  app = null;
  router = null;
  history = null;
  console.log('微应用child-vite卸载了');
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-appname-vite'] = { mount, unmount };
} else {
  // 非微前端环境直接渲染
  mount();
}

// setupMicro(bootstrap);
