import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import UserGuidePage from '@/views/UserGuidePage.vue'
import FaqPage from '@/views/FaqPage.vue'
import VisualizationPage from '@/views/VisualizationPage.vue'
const DisclaimerPage = () => import('@/views/DisclaimerPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/LegalPage.vue'),
      props: { documentId: 'terms' },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/LegalPage.vue'),
      props: { documentId: 'privacy' },
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/guide',
      name: 'guide',
      component: UserGuidePage,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqPage,
    },
    {
      path: '/visualization',
      name: 'visualization',
      component: VisualizationPage,
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: DisclaimerPage,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
