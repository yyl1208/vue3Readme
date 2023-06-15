import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupGlobDirectives } from '@/directives';

import router, { history, destoryRoute } from '@/router';

import 'uno.css';

import DemoBlock from './components/DemoBlock.vue';
import PreCode from './components/PreCode.vue';

// 引入message 样式
import '@arco-design/web-vue/dist/arco.css';

import { Message } from '@arco-design/web-vue';

import '@arco-design/web-vue/es/message/style/css.js'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

export function handleMicroData(router) {
  // eventCenterForAppNameVite 是基座添加到window的数据通信对象
  if (window.eventCenterForAppNameVite) {
    // 主动获取基座下发的数据
    console.log('child-vite getData:', window.eventCenterForAppNameVite.getData());

    // 监听基座下发的数据变化
    window.eventCenterForAppNameVite.addDataListener((data) => {
      console.log('child-vite addDataListener:', data);

      if (data.path && typeof data.path === 'string') {
        data.path = data.path.replace(/^#/, '');
        // 当基座下发path时进行跳转
        if (data.path && data.path !== router.currentRoute.value.path) {
          router.push(data.path);
        }
      }
    });

    // 向基座发送数据
    setTimeout(() => {
      window.eventCenterForAppNameVite.dispatch({ myname: 'child-vite' });
    }, 3000);
  }
}

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
function fixBugForVueRouter4(router) {
  // 判断主应用是main-vue3或main-vite，因为这这两个主应用是 vue-router4
  if (window.location.href.includes('/main-vue3') || window.location.href.includes('/main-vite')) {
    /**
     * 重要说明：
     * 1、这里主应用下发的基础路由为：`/main-xxx/app-vite`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/app-vite`，不同项目根据实际情况调整
     *
     * 2、因为vite关闭了沙箱，又是hash路由，我们这里写死realBaseRoute为：/app-vite#
     */
    const realBaseRoute = '/app-vite#';

    router.beforeEach(() => {
      if (typeof window.history.state?.current === 'string') {
        window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '');
      }
    });

    router.afterEach(() => {
      if (typeof window.history.state === 'object') {
        window.history.state.current = realBaseRoute + (window.history.state.current || '');
      }
    });
  }
}

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
  // history?.destroy();
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener();
  app = null;
  // router = null;
  // history = null;
  destoryRoute();

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
