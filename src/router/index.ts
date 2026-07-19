import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import UserGuidePage from '@/views/UserGuidePage.vue';
import FaqPage from '@/views/FaqPage.vue';
import VisualizationPage from '@/views/VisualizationPage.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/guide',
      name: 'guide',
      component: UserGuidePage
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqPage
    },
    {
      path: '/visualization',
      name: 'visualization',
      component: VisualizationPage
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;