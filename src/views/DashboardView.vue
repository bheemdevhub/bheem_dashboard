<template>
  <div class="dashboard-layout">
    <!-- Enhanced Loading Spinner for Dashboard -->
    <LoadingSpinner
      :visible="showDashboardLoader"
      title="Loading Dashboard"
      subtitle="Setting up your intelligent workspace..."
      :showSuccess="dashboardLoadingSuccess"
      @hidden="onDashboardLoaderHidden"
    />
    
    <!-- Sidebar -->
    <SidebarComponent @toggle-sidebar="handleSidebarToggle" />
    
    <!-- Main Content Area -->
    <div class="main-content" :class="{ 'content-collapsed': sidebarCollapsed }">
      <!-- Top Navbar -->
      <NavbarComponent />
      
      <!-- Main Dashboard Content -->
      <main class="dashboard-main">
        <div class="container">
          <!-- Welcome Section -->
          <section class="welcome-section">
            <div class="welcome-content">
              <h1 class="welcome-title">Welcome back, {{ authStore.getUserName }}!</h1>
              <p class="welcome-subtitle">Here's what's happening with your projects today.</p>
            </div>
            <div class="welcome-stats">
              <div class="stat-item">
                <div class="stat-icon success">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-number" ref="projectsCounter">{{ animatedProjects }}</span>
                  <span class="stat-label">Projects</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon warning">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-number">{{ animatedPending }}</span>
                  <span class="stat-label">Pending</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon info">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-number">{{ animatedPerformance }}%</span>
                  <span class="stat-label">Performance</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Stats Cards -->
          <section class="stats-section">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-card-header">
                  <h3 class="stat-card-title">Total Revenue</h3>
                  <div class="stat-card-icon revenue">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                </div>
                <div class="stat-card-body">
                  <div class="stat-value">$54,239</div>
                  <div class="stat-change positive">
                    <svg class="change-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    +12.5%
                  </div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <h3 class="stat-card-title">Active Users</h3>
                  <div class="stat-card-icon users">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="stat-card-body">
                  <div class="stat-value">8,249</div>
                  <div class="stat-change positive">
                    <svg class="change-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    +5.2%
                  </div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <h3 class="stat-card-title">Orders</h3>
                  <div class="stat-card-icon orders">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                  </div>
                </div>
                <div class="stat-card-body">
                  <div class="stat-value">1,429</div>
                  <div class="stat-change negative">
                    <svg class="change-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 15.586l3.293-3.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    -2.1%
                  </div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <h3 class="stat-card-title">Conversion Rate</h3>
                  <div class="stat-card-icon conversion">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                  </div>
                </div>
                <div class="stat-card-body">
                  <div class="stat-value">3.24%</div>
                  <div class="stat-change positive">
                    <svg class="change-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    +0.8%
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Enhanced Stats Section -->
          <StatsWidget />

          <!-- Charts and Data Section -->
          <section class="charts-section">
            <div class="charts-grid">
              <!-- Sales Chart -->
              <div class="chart-card">
                <div class="chart-header">
                  <h3 class="chart-title">Sales Overview</h3>
                  <div class="chart-actions">
                    <select class="chart-select" v-model="selectedPeriod" @change="updateSalesChart">
                      <option value="7days">Last 7 days</option>
                      <option value="30days">Last 30 days</option>
                      <option value="3months">Last 3 months</option>
                    </select>
                  </div>
                </div>
                <div class="chart-body">
                  <SalesChart :period="selectedPeriod" />
                </div>
              </div>

              <!-- Analytics Chart -->
              <div class="chart-card">
                <div class="chart-header">
                  <h3 class="chart-title">Traffic Sources</h3>
                  <div class="chart-actions">
                    <button class="chart-btn">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="chart-body">
                  <AnalyticsChart />
                </div>
              </div>

              <!-- Revenue Chart -->
              <div class="chart-card chart-card-wide">
                <div class="chart-header">
                  <h3 class="chart-title">Revenue vs Expenses</h3>
                  <div class="chart-actions">
                    <div class="chart-legend">
                      <div class="legend-item">
                        <div class="legend-color revenue"></div>
                        <span>Revenue</span>
                      </div>
                      <div class="legend-item">
                        <div class="legend-color expenses"></div>
                        <span>Expenses</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chart-body">
                  <RevenueChart />
                </div>
              </div>

              <!-- Recent Activity Widget -->
              <div class="chart-card">
                <RecentActivityWidget />
              </div>
            </div>
          </section>

          <!-- Quick Actions -->
          <section class="actions-section">
            <h2 class="section-title">Quick Actions</h2>
            <div class="actions-grid">
              <button class="action-card">
                <div class="action-icon create">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 class="action-title">Create Project</h3>
                <p class="action-description">Start a new project with our template gallery</p>
              </button>

              <button class="action-card">
                <div class="action-icon invite">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                </div>
                <h3 class="action-title">Invite Team</h3>
                <p class="action-description">Add team members to collaborate on projects</p>
              </button>

              <button class="action-card">
                <div class="action-icon report">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 class="action-title">Generate Report</h3>
                <p class="action-description">Create detailed analytics and performance reports</p>
              </button>

              <button class="action-card">
                <div class="action-icon backup">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                </div>
                <h3 class="action-title">Backup Data</h3>
                <p class="action-description">Secure your data with automated backups</p>
              </button>
            </div>
          </section>
        </div>
      </main>

      <!-- Footer -->
      <FooterComponent />
    </div>

    <!-- Scroll to Top Button -->
    <transition name="fade">
      <button 
        v-if="showScrollButton" 
        @click="scrollToTop" 
        class="scroll-top-btn"
        aria-label="Scroll to top"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </transition>

    <!-- Floating Action Menu -->
    <div class="floating-actions">
      <button 
        @click="toggleFloatingMenu" 
        class="fab-main"
        :class="{ 'fab-active': showFloatingMenu }"
        aria-label="Quick actions menu"
      >
        <svg v-if="!showFloatingMenu" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <transition-group name="fab" tag="div" class="fab-menu">
        <button 
          v-if="showFloatingMenu" 
          key="new-project"
          @click="createNewProject"
          class="fab-item fab-project"
          title="New Project"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </button>
        
        <button 
          v-if="showFloatingMenu" 
          key="analytics"
          @click="openAnalytics"
          class="fab-item fab-analytics"
          title="Analytics"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </button>
        
        <button 
          v-if="showFloatingMenu" 
          key="settings"
          @click="openSettings"
          class="fab-item fab-settings"
          title="Settings"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </transition-group>
    </div>

    <!-- Progress Bar for Page Loading -->
    <div v-if="isLoading" class="page-progress">
      <div class="progress-bar"></div>
    </div>

    <!-- Notification Toast Container -->
    <transition-group name="toast" tag="div" class="toast-container">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="toast-notification"
        :class="notification.type"
      >
        <div class="toast-content">
          <div class="toast-icon">
            <svg v-if="notification.type === 'success'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else-if="notification.type === 'error'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="toast-text">
            <h4>{{ notification.title }}</h4>
            <p>{{ notification.message }}</p>
          </div>
        </div>
        <button @click="removeNotification(notification.id)" class="toast-close">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import SidebarComponent from '@/components/SidebarComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import StatsWidget from '@/components/widgets/StatsWidget.vue'
import RecentActivityWidget from '@/components/widgets/RecentActivityWidget.vue'
import SalesChart from '@/components/charts/SalesChart.vue'
import AnalyticsChart from '@/components/charts/AnalyticsChart.vue'
import RevenueChart from '@/components/charts/RevenueChart.vue'

export default {
  name: 'DashboardView',
  components: {
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LoadingSpinner,
    StatsWidget,
    RecentActivityWidget,
    SalesChart,
    AnalyticsChart,
    RevenueChart
  },
  setup() {
    const authStore = useAuthStore()
    const sidebarCollapsed = ref(false)
    const selectedPeriod = ref('7days')
    const showScrollButton = ref(false)
    const showFloatingMenu = ref(false)
    const isLoading = ref(false)
    const notifications = ref([])
    
    // Dashboard loading state
    // eslint-disable-next-line no-unused-vars
    const showDashboardLoader = ref(true)
    const dashboardLoadingSuccess = ref(false)
    
    // Animated counters
    const animatedProjects = ref(0)
    const animatedPending = ref(0)
    const animatedPerformance = ref(0)

    // Initialize animated counters
    const initializeCounters = () => {
      // Animate project counter to 24
      animateCounter(animatedProjects, 24, 1500)
      
      // Animate pending tasks to 8
      setTimeout(() => {
        animateCounter(animatedPending, 8, 1200)
      }, 500)
      
      // Animate performance to 94%
      setTimeout(() => {
        animateCounter(animatedPerformance, 94, 1800)
      }, 1000)
    }

    // Handle dashboard loader completion
    const onDashboardLoaderHidden = () => {
      showDashboardLoader.value = false
      // Initialize counters after loader is hidden
      setTimeout(() => {
        initializeCounters()
        showNotification('success', 'Welcome!', 'Dashboard loaded successfully')
      }, 300)
    }

    const handleSidebarToggle = (collapsed) => {
      sidebarCollapsed.value = collapsed
    }

    const updateSalesChart = () => {
      // Chart will automatically update via reactive prop
      console.log('Sales chart updated for period:', selectedPeriod.value)
    }

    const handleScroll = () => {
      showScrollButton.value = window.scrollY > 300
    }

    const scrollToTop = () => {
      // Smooth and slow scroll to top
      const scrollStep = -window.scrollY / (1500 / 15) // Slower scroll duration
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep)
        } else {
          clearInterval(scrollInterval)
        }
      }, 15)
    }

    // Floating Action Menu
    const toggleFloatingMenu = () => {
      showFloatingMenu.value = !showFloatingMenu.value
    }

    const createNewProject = () => {
      showNotification('success', 'New Project', 'Project creation dialog opened!')
      showFloatingMenu.value = false
    }

    const openAnalytics = () => {
      showNotification('info', 'Analytics', 'Analytics dashboard loading...')
      showFloatingMenu.value = false
    }

    const openSettings = () => {
      showNotification('info', 'Settings', 'Settings panel opened!')
      showFloatingMenu.value = false
    }

    // Notification System
    const showNotification = (type, title, message) => {
      const id = Date.now()
      notifications.value.push({ id, type, title, message })
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        removeNotification(id)
      }, 5000)
    }

    const removeNotification = (id) => {
      const index = notifications.value.findIndex(n => n.id === id)
      if (index > -1) {
        notifications.value.splice(index, 1)
      }
    }

    // Animated Counter Function
    const animateCounter = (target, finalValue, duration = 2000) => {
      const startValue = target.value
      const increment = (finalValue - startValue) / (duration / 16)
      
      const timer = setInterval(() => {
        target.value += increment
        if (target.value >= finalValue) {
          target.value = finalValue
          clearInterval(timer)
        }
      }, 16)
    }

    // Simulate loading on mount
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      
      // Start the dashboard loading simulation
      setTimeout(() => {
        dashboardLoadingSuccess.value = true
        // The loader will hide itself after showing success animation
      }, 3500) // Show loader for 3.5 seconds before success
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      authStore,
      sidebarCollapsed,
      selectedPeriod,
      showScrollButton,
      showFloatingMenu,
      isLoading,
      notifications,
      showDashboardLoader,
      dashboardLoadingSuccess,
      animatedProjects,
      animatedPending,
      animatedPerformance,
      handleSidebarToggle,
      updateSalesChart,
      scrollToTop,
      toggleFloatingMenu,
      createNewProject,
      openAnalytics,
      openSettings,
      removeNotification,
      onDashboardLoaderHidden
    }
  }
}
</script>

<style scoped>
/* CSS Variables for consistent theming */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-light: #9ca3af;
  --border-light: #e5e7eb;
  --border-color: #d1d5db;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 1rem;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Ultra-wide screen optimization */
@media (min-width: 1920px) {
  .container {
    max-width: 2000px;
    padding: 0 3rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 3rem;
  }
  
  .charts-grid {
    grid-template-columns: 3fr 1fr;
    gap: 3rem;
  }
  
  .actions-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
  }
  
  .welcome-section {
    padding: 4rem;
    margin-bottom: 3.5rem;
  }
  
  .dashboard-main {
    padding: 3rem 0;
  }
}

.dashboard-layout {
  min-height: 100vh;
  display: flex;
  background-color: var(--bg-secondary);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s ease-in-out;
}

.content-collapsed {
  margin-left: 80px;
}

.dashboard-main {
  flex: 1;
  padding: 2.5rem 0;
}

.container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

/* Welcome Section */
.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  border-radius: var(--radius-xl);
  padding: 3.5rem;
  margin-bottom: 3rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.welcome-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.welcome-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ffffff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.welcome-subtitle {
  opacity: 0.95;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.welcome-stats {
  display: flex;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.stat-icon.success { background: var(--success-color); }
.stat-icon.warning { background: var(--warning-color); }
.stat-icon.info { background: var(--primary-color); }

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-label {
  opacity: 0.9;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Stats Cards */
.stats-section {
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
}

.stat-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(229, 231, 235, 0.8);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color);
}

.stat-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.stat-card-title {
  font-weight: 700;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stat-card-icon {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  position: relative;
}

.stat-card-icon::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3));
}

.stat-card-icon.revenue { background: var(--success-color); }
.stat-card-icon.users { background: var(--primary-color); }
.stat-card-icon.orders { background: var(--warning-color); }
.stat-card-icon.conversion { background: #8b5cf6; }

.stat-card-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  z-index: 1;
}

.stat-card-body {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--text-primary), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  background: rgba(16, 185, 129, 0.1);
}

.stat-change.positive { 
  color: var(--success-color);
  background: rgba(16, 185, 129, 0.1);
}
.stat-change.negative { 
  color: var(--danger-color);
  background: rgba(239, 68, 68, 0.1);
}

.change-icon {
  width: 1rem;
  height: 1rem;
}

/* Charts Section */
.charts-section {
  margin-bottom: 3rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 2.5rem;
}

.chart-card, .activity-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(229, 231, 235, 0.8);
  overflow: hidden;
  transition: all 0.3s ease;
}

.chart-card:hover, .activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.chart-header, .activity-header {
  padding: 2rem;
  border-bottom: 1px solid rgba(229, 231, 235, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
}

.chart-title, .activity-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.chart-select {
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.chart-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.chart-btn {
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.chart-btn svg {
  width: 1rem;
  height: 1rem;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.revenue {
  background: rgb(99, 102, 241);
}

.legend-color.expenses {
  background: rgb(239, 68, 68);
}

.chart-card-wide {
  grid-column: span 2;
}

@media (max-width: 1024px) {
  .chart-card-wide {
    grid-column: span 1;
  }
}

.chart-body {
  padding: 2rem;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--text-light);
}

.chart-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
}

.activity-body {
  padding: 2rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.activity-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
  color: var(--text-light);
}

/* Actions Section */
.actions-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 2rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.action-card {
  background: var(--bg-primary);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.action-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.action-card:hover::before {
  left: 100%;
}

.action-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.action-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.action-icon.create { background: var(--success-color); }
.action-icon.invite { background: var(--primary-color); }
.action-icon.report { background: var(--warning-color); }
.action-icon.backup { background: #8b5cf6; }

.action-icon svg {
  width: 2rem;
  height: 2rem;
}

.action-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.action-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 1400px) {
  .container {
    max-width: 1200px;
    padding: 0 2rem;
  }
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    max-width: 100%;
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .content-collapsed {
    margin-left: 0;
  }

  .dashboard-main {
    padding: 1rem 0;
  }

  .welcome-section {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 2rem;
  }

  .welcome-stats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .stats-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }

  .welcome-content h1 {
    font-size: 2rem;
  }

  .stat-value {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 1.5rem;
  }

  .stat-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
    padding: 1rem;
  }

  .welcome-stats {
    gap: 1rem;
    flex-direction: column;
  }
  
  .action-card {
    padding: 2rem;
  }
}

/* Animations */
.stat-card, .chart-card, .activity-card, .action-card {
  animation: fadeInUp 0.6s ease-out;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }

.action-card:nth-child(1) { animation-delay: 0.1s; }
.action-card:nth-child(2) { animation-delay: 0.2s; }
.action-card:nth-child(3) { animation-delay: 0.3s; }
.action-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced hover effects */
.stat-card, .chart-card, .action-card {
  will-change: transform;
}

/* Glass morphism effect for cards */
.stat-card, .chart-card, .action-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
}

/* Gradient overlays */
.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.01), rgba(118, 75, 162, 0.01));
  pointer-events: none;
  border-radius: inherit;
}

/* Scroll to Top Button */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.scroll-top-btn:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.6);
  background: linear-gradient(135deg, #764ba2, #667eea);
}

.scroll-top-btn:active {
  transform: translateY(-2px) scale(1.05);
}

.scroll-top-btn svg {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
}

.scroll-top-btn:hover svg {
  transform: translateY(-2px);
}

/* Fade transition for scroll button */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Responsive scroll button */
@media (max-width: 768px) {
  .scroll-top-btn {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
  }
  
  .scroll-top-btn svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

@media (max-width: 480px) {
  .scroll-top-btn {
    bottom: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .scroll-top-btn svg {
    width: 1rem;
    height: 1rem;
  }
}

/* Floating Action Menu */
.floating-actions {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  z-index: 999;
}

.fab-main {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.fab-main::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.5s ease;
  transform: translate(-50%, -50%);
}

.fab-main:hover::before {
  width: 100%;
  height: 100%;
}

.fab-main:hover {
  transform: rotate(180deg) scale(1.1);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
}

.fab-main.fab-active {
  transform: rotate(45deg);
  background: linear-gradient(135deg, #ff6b6b, #feca57);
}

.fab-main svg {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.fab-menu {
  position: absolute;
  bottom: 4.5rem;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fab-item {
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.fab-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.4s ease;
  transform: translate(-50%, -50%);
}

.fab-item:hover::before {
  width: 120%;
  height: 120%;
}

.fab-project { background: linear-gradient(135deg, #10b981, #059669); }
.fab-analytics { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.fab-settings { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

.fab-item:hover {
  transform: translateX(-5px) scale(1.1);
}

.fab-item svg {
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  z-index: 1;
}

/* FAB Animation */
.fab-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fab-leave-active {
  transition: all 0.3s ease-in;
}

.fab-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.5);
}

.fab-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.5);
}

.fab-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Progress Bar */
.page-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(102, 126, 234, 0.1);
  z-index: 9999;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
  background-size: 200% 100%;
  animation: progressLoad 2s ease-in-out;
}

@keyframes progressLoad {
  0% { width: 0%; }
  50% { width: 60%; }
  100% { width: 100%; }
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}

.toast-notification {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 300px;
  position: relative;
  overflow: hidden;
}

.toast-notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.toast-notification.success {
  border-left-color: var(--success-color);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(255, 255, 255, 0.95));
}

.toast-notification.error {
  border-left-color: var(--danger-color);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(255, 255, 255, 0.95));
}

.toast-notification.info {
  border-left-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(255, 255, 255, 0.95));
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.toast-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.toast-notification.success .toast-icon {
  background: var(--success-color);
}

.toast-notification.error .toast-icon {
  background: var(--danger-color);
}

.toast-notification.info .toast-icon {
  background: var(--primary-color);
}

.toast-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.toast-text h4 {
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.toast-text p {
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin: 0;
}

.toast-close {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
}

.toast-close svg {
  width: 1rem;
  height: 1rem;
}

/* Toast Animation */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Enhanced Welcome Section with Parallax Effect */
.welcome-section {
  background-attachment: fixed;
  background-size: cover;
  position: relative;
}

.welcome-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    linear-gradient(45deg, rgba(255, 255, 255, 0.05), transparent);
  animation: floatAnimation 6s ease-in-out infinite;
}

@keyframes floatAnimation {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Enhanced Card Hover Effects */
.stat-card, .chart-card, .action-card {
  position: relative;
  overflow: hidden;
}

.stat-card::before, .chart-card::before, .action-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s ease;
}

.stat-card:hover::before, .chart-card:hover::before, .action-card:hover::before {
  left: 100%;
}

/* Responsive Design for New Features */
@media (max-width: 768px) {
  .floating-actions {
    bottom: 5rem;
    right: 1.5rem;
  }
  
  .fab-main, .fab-item {
    width: 3rem;
    height: 3rem;
  }
  
  .toast-container {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
  
  .toast-notification {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .floating-actions {
    bottom: 4rem;
    right: 1rem;
  }
  
  .fab-main {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .fab-item {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .toast-notification {
    padding: 1rem;
    font-size: 0.875rem;
  }
}
</style>
