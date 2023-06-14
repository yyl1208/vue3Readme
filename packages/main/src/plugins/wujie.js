import WujieVue from 'wujie-vue3';
import router from '@/router';
import hostMap from '.././hostMap';
const { bus, setupApp, preloadApp, destroyApp } = WujieVue;
import credentialsFetch from './fetch';
import lifecycles from './lifecycle';

const isProduction = process.env.NODE_ENV === 'production';

// 初始化无界
export function setupWujie(app) {
  app.use(WujieVue);
}

initWujie();

function initWujie() {
  bus.$on('click', (msg) => window.alert(msg));

  // 逻辑传参修改
  // 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
  bus.$on('sub-route-change', (name, path) => {
    console.log('name====', name, path);

    // const mainName = `${name}-sub`;
    // const mainPath = `/${name}-sub${path}`;
    // const currentName = router.currentRoute.name;
    // const currentPath = router.currentRoute.path;
    // if (mainName === currentName && mainPath !== currentPath) {
    //   console.log('router=-=-=-=', router, mainPath);
    //   router.push({ path: mainPath });
    // }
  });

  const degrade = window.localStorage.getItem('degrade') === 'true' || !window.Proxy || !window.CustomElementRegistry;
  const props = {
    jump: (name) => {
      console.log('jumop name', name);
      console.log('router=-=-=-=', router);
      router.push({ name: name });
    },
  };

  const attrs = isProduction ? { src: hostMap('//localhost:8000/') } : {};
  // const attrs = isProduction ? { src: hostMap('//localhost:8000/') } : {};
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
      // preloadApp({
      //   name: 'vue3',
      // });
      // preloadApp({
      //   name: 'vite',
      // });
    }
  }
}