import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'loginPage',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/chatPage',
    name: 'chatPage',
    component: () => import('../views/ChatPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
