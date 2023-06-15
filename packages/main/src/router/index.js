import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

const basicRoutes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    //   hidden: true,
    children: [
      {
        name: 'setup',
        path: '/setup',
        component: () => {
          return import('@/readme/TestSetup.vue');
        },
      },
      {
        name: 'props',
        path: '/props',
        component: () => import('@/readme/emit/parent.vue'),
        // component: () =>import("@views/admin/alarmCenter/index"),
      },
      {
        path: '/ref',
        name: 'ref',
        component: () => import('@/readme/ref/index.vue'),
      },
      {
        path: '/watchEffect',
        name: 'watchEffect',
        component: () => import('@/readme/watchEffect/template.vue'),
      },
      {
        path: '/vmodel',
        name: 'vmodel',
        component: () => import('@/readme/vmodel/index.vue'),
      },
      {
        path: '/provide',
        name: 'provide',
        component: () => import('@/readme/provide&inject/index.vue'),
      },
      {
        path: '/mixin',
        name: 'mixin',
        component: () => import('@/readme/mixin/index.vue'),
      },
      {
        path: '/childOne/:path*',
        name: 'childOne',
        component: () => import('@/subViews/childOne.vue'),
      },
    ],
  },
  // 子应用 /childOne
];

// app router
export const router = createRouter({
  //   history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  history: createWebHistory(),
  routes: basicRoutes,
  strict: true,
});

// config router
export function setupRouter(app) {
  app.use(router);
}

export default router;
