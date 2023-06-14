import WujieVue from 'wujie-vue3';
import router from '@/router';
const { bus, setupApp, preloadApp, destroyApp } = WujieVue;
import credentialsFetch from './fetch';
import lifecycles from './lifecycle';

// 初始化无界
export function setupWujie(app) {
  app.use(WujieVue);
}

function initWujie() {
  bus.$on('click', (msg) => window.alert(msg));

  // 逻辑传参修改
  // 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
  bus.$on('sub-route-change', (name, path) => {
    const mainName = `${name}-sub`;
    const mainPath = `/${name}-sub${path}`;
    const currentName = router.currentRoute.name;
    const currentPath = router.currentRoute.path;
    if (mainName === currentName && mainPath !== currentPath) {
      router.push({ path: mainPath });

      console.log('router=-=-=-=', router, mainPath);
    }
  });

  const degrade = window.localStorage.getItem('degrade') === 'true' || !window.Proxy || !window.CustomElementRegistry;
  const props = {
    jump: (name) => {
      router.push({ name });
    },
  };

  const attrs = isProduction ? { src: hostMap('//localhost:8000/') } : {};
  /**
   * 配置应用，主要是设置默认配置
   * preloadApp、startApp的配置会基于这个配置做覆盖
   */

  setupApp({
    name: 'vite',
    url: hostMap('//localhost:6001/'),
    attrs,
    exec: true,
    props,
    fetch: credentialsFetch,
    degrade,
    ...lifecycles,
  });

  if (window.localStorage.getItem('preload') !== 'false') {
    if (window.Proxy) {
      preloadApp({
        name: 'vue3',
      });
      preloadApp({
        name: 'vite',
      });
    }
  }
}
