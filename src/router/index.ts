import { createRouter, createWebHistory } from 'vue-router';
import useBaseStore from '@/stores/base';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = useBaseStore();
  if (to.meta.requiresAuth) {
    if (!store.isAuthenticated) await store.checkAuth();

    if (store.isAuthenticated) next();
    else next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
