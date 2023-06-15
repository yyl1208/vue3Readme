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

let history = createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || '/microChild');

// history =
// app router
const router = createRouter({
  //   history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  history: history,
  routes: basicRoutes,
  strict: true,
});

// config router
export function setupRouter(app) {
  app.use(router);
}

export { history };

export default router;
