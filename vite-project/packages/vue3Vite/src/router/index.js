import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

const basicRoutes = [
  { path: '/', redirect: '/chileVite' },
  {
    path: '/chileVite',
    name: 'home',
    component: Layout,
    //   hidden: true,
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => {
          return import('@/pages/home.vue');
        },
      },
      {
        name: 'childRoute',
        path: '/route',
        component: () => import('@/pages/testRoute.vue'),
        // component: () =>import("@views/admin/alarmCenter/index"),
      },
      {
        name: 'childContact',
        path: '/childContact',
        component: () => import('@/pages/contact.vue'),
      },
    ],
  },
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
