import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/api-test',
    name: 'ApiTest',
    component: () => import('@/views/ApiTestView.vue')
  },
  {
    path: '/organization-chart',
    name: 'OrganizationChart',
    component: () => import('@/views/OrganizationChartView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/hr-dashboard',
    name: 'HR',
    component: () => import('@/modules/hr/views/HRDashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/accounting-dashboard',
    name: 'Accounting',
    component: () => import('@/modules/accounting/views/AccountingDashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check authentication status
  await authStore.checkAuth()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
