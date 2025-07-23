<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <SidebarComponent @toggle-sidebar="handleSidebarToggle" />
    
    <!-- Main Content Area -->
    <div class="main-content" :class="{ 'content-collapsed': sidebarCollapsed }">
      <!-- Top Navbar -->
      <NavbarComponent />
      
      <!-- Organization Chart Content -->
      <main class="orgchart-main">
        <OrganizationChart />
      </main>
      
      <!-- Footer -->
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import OrganizationChart from '@/components/OrganizationChart/index.vue'

export default {
  name: 'OrganizationChartView',
  components: {
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    OrganizationChart
  },
  setup() {
    const sidebarCollapsed = ref(false)
    
    const handleSidebarToggle = (isCollapsed) => {
      sidebarCollapsed.value = isCollapsed
    }
    
    return {
      sidebarCollapsed,
      handleSidebarToggle
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: flex;
  background-color: #f8fafc;
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

.orgchart-main {
  flex: 1;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    margin-left: 0;
  }
  
  .content-collapsed {
    margin-left: 0;
  }
}
</style>
