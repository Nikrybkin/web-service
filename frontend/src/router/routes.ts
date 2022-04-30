import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/departments',
        component: () => import('pages/Departments/Departments.vue')
      },
      {
        path: '/departments/:id',
        component: () => import('pages/Departments/Department.vue')
      },
      {
        path: '/workers',
        component: () => import('pages/Workers/Workers.vue')
      },
      {
        path: '/workers/:id',
        component: () => import('pages/Workers/Worker.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
