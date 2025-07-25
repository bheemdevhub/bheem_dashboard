<template>
  <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <!-- Logo and Brand -->
      <div class="sidebar-brand">
        <div class="logo-icon">
          <img src="@/assets/images/bheemlogo.png" alt="Agent Bheem Logo" class="bheem-logo">
        </div>
        <div v-if="!isCollapsed" class="brand-content">
          <span class="brand-text">Agent Bheem</span>
         
        </div>
      </div>
      
      <!-- Toggle Button -->
      <button @click="toggleSidebar" class="sidebar-toggle">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                :d="isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'"></path>
        </svg>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" :class="{ active: $route.name === 'Dashboard' }" @click="setActiveLink('dashboard')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('approvals')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Approvals</span>
            <span v-if="!isCollapsed && pendingApprovals > 0" class="nav-badge urgent">{{ pendingApprovals }}</span>
          </a>
        </li>

        <li class="nav-item">
          <router-link to="/hr-dashboard" class="nav-link" :class="{ active: $route.name === 'HR' }" @click="setActiveLink('hr')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">HR</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('department')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Department</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('permission')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Permission</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('api')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">API</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('accounting')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Accounting</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('reports')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Reports</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('sku')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">SKU</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('billing')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Billing</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('bundle-items')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Bundle Items</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('customers')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Customers</span>
          </a>
        </li>

        <li class="nav-item">
          <router-link to="/organization-chart" class="nav-link" @click="setActiveLink('organisation-chart')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10M9 9l1 1v4h4v-4l1-1"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Organisation Chart</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Bottom Section -->
    <div class="sidebar-bottom">
      <div class="nav-list">
        <div class="nav-item">
          <a href="#" class="nav-link" @click="setActiveLink('settings')">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Settings</span>
          </a>
        </div>

        <div class="nav-item">
          <button @click="handleLogout" class="nav-link logout-btn">
            <div class="nav-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="nav-text">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

export default {
  name: 'SidebarComponent',
  emits: ['toggle-sidebar'],
  setup(props, { emit }) {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const isCollapsed = ref(false)
    const activeLink = ref('dashboard')
    const pendingApprovals = ref(5) // Example pending approvals count

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
      emit('toggle-sidebar', isCollapsed.value)
    }

    const setActiveLink = (linkName) => {
      activeLink.value = linkName
      // Add router navigation here when you have more pages
      console.log(`Navigating to: ${linkName}`)
    }

    const handleLogout = async () => {
      await authStore.logout()
      router.push('/login')
    }

    return {
      isCollapsed,
      activeLink,
      pendingApprovals,
      toggleSidebar,
      setActiveLink,
      handleLogout
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  min-height: 100vh;
  background: linear-gradient(180deg, #374151 0%, #1f2937 100%);
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40;
  border-right: 1px solid #4b5563;
  transition: all 0.3s ease-in-out;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #4b5563;
  min-height: 80px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  padding: 0.25rem;
}

.logo-icon .bheem-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(1.2);
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}

.sidebar-toggle {
  width: 2rem;
  height: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--radius-md);
  color: #d1d5db;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #4b5563 transparent;
}

.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 2px;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0.25rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: #d1d5db;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border-radius: 0;
  position: relative;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active,
.nav-link.router-link-active {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  color: white;
  border-right: 3px solid #667eea;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-text {
  flex: 1;
  text-align: left;
  white-space: nowrap;
}

.nav-badge {
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

.nav-divider {
  margin: 1rem 0;
  padding: 0 1rem;
}

.divider-line {
  border: none;
  border-top: 1px solid #4b5563;
  margin: 0;
}

.divider-dot {
  width: 4px;
  height: 4px;
  background: #4b5563;
  border-radius: 50%;
  margin: 0 auto;
}

.sidebar-bottom {
  padding: 1rem 0;
  border-top: 1px solid #4b5563;
  margin-top: auto;
}

.logout-btn {
  color: #fca5a5 !important;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1) !important;
  color: #ef4444 !important;
}

/* Collapsed state adjustments */
.sidebar-collapsed .sidebar-header {
  justify-content: center;
  padding: 1.5rem 0.5rem;
}

.sidebar-collapsed .nav-link {
  justify-content: center;
  padding: 0.875rem 0.5rem;
}

.sidebar-collapsed .nav-divider {
  padding: 0 0.5rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }

  .sidebar-collapsed {
    width: 280px;
    transform: translateX(-100%);
  }
}

/* Animation for smooth transitions */
.sidebar * {
  transition: all 0.2s ease;
}

/* Scrollbar styling for better appearance */
.sidebar-nav {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 transparent;
}

.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
  margin: 0.5rem 0;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Focus states for accessibility */
.nav-link:focus,
.sidebar-toggle:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Active link indicator animation */
.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>
