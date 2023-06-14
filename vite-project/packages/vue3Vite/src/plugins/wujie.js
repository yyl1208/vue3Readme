import WujieVue from 'wujie-vue3';

const { bus, setupApp, preloadApp, destroyApp } = WujieVue;


// 初始化无界
export function setupWujie(app) {
  app.use(WujieVue);
}
