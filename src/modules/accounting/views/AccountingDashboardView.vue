<template>
  <div class="accounting-dashboard">
    <div class="app-container">
      <!-- Sidebar -->
      <SidebarComponent 
        :collapsed="sidebarCollapsed" 
        @toggle="handleSidebarToggle" 
      />

      <div class="content-wrapper" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <!-- Navbar -->
        <NavbarComponent />

        <!-- Main Content -->
        <main class="main-content">
          <!-- Accounting Statistics Section -->
          <section class="stats-section">
            <div class="stats-container">
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                  </div>
                  <div class="stat-details">
                    <div class="stat-number">{{ companyStats.total }}</div>
                    <div class="stat-label">Total Companies</div>
                  </div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon active">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="stat-details">
                    <div class="stat-number">{{ companyStats.active }}</div>
                    <div class="stat-label">Active Companies</div>
                  </div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon inactive">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="stat-details">
                    <div class="stat-number">{{ companyStats.inactive }}</div>
                    <div class="stat-label">Inactive Companies</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Accounting Modules Grid - Single Widget Per Row -->
          <section class="modules-section">
            <div class="modules-grid">
              <!-- Company Management - First Module -->
              <div class="module-card primary-module">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Company Management</h3>
                    <p class="module-description">Manage company profiles, legal entities, and organizational structure</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">{{ companyStats.total }}</span>
                      <span class="stat-text">Total</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <CompanyList 
                    ref="companyListRef"
                    @add-company="handleAddCompany"
                    @edit-company="handleEditCompany" 
                  />
                </div>
              </div>

              <!-- Fiscal Year Management -->
              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Fiscal Year Management</h3>
                    <p class="module-description">Define fiscal years and accounting periods</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">-</span>
                      <span class="stat-text">Coming Soon</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <div class="coming-soon-content">
                    <div class="coming-soon-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4>Coming Soon</h4>
                    <p>Fiscal year management features will be available in the next update.</p>
                  </div>
                </div>
              </div>

              <!-- Journal Entries -->
              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Journal Entries</h3>
                    <p class="module-description">Record and manage accounting transactions</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">-</span>
                      <span class="stat-text">Coming Soon</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <div class="coming-soon-content">
                    <div class="coming-soon-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4>Coming Soon</h4>
                    <p>Journal entries management will be available in the next update.</p>
                  </div>
                </div>
              </div>

              <!-- Currencies -->
              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Currency Management</h3>
                    <p class="module-description">Manage currencies and exchange rates</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">-</span>
                      <span class="stat-text">Coming Soon</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <div class="coming-soon-content">
                    <div class="coming-soon-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4>Coming Soon</h4>
                    <p>Currency management features will be available in the next update.</p>
                  </div>
                </div>
              </div>

              <!-- Budget Management -->
              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Budget Management</h3>
                    <p class="module-description">Create and track budgets and forecasts</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">-</span>
                      <span class="stat-text">Coming Soon</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <div class="coming-soon-content">
                    <div class="coming-soon-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4>Coming Soon</h4>
                    <p>Budget management features will be available in the next update.</p>
                  </div>
                </div>
              </div>

              <!-- Chart of Accounts -->
              <div class="module-card">
                <div class="module-header">
                  <div class="module-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z"/>
                    </svg>
                  </div>
                  <div class="module-info">
                    <h3 class="module-title">Chart of Accounts</h3>
                    <p class="module-description">Manage account structure and classifications</p>
                  </div>
                  <div class="module-stats">
                    <div class="quick-stat">
                      <span class="stat-value">-</span>
                      <span class="stat-text">Coming Soon</span>
                    </div>
                  </div>
                </div>
                <div class="module-content">
                  <div class="coming-soon-content">
                    <div class="coming-soon-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4>Coming Soon</h4>
                    <p>Chart of accounts management will be available in the next update.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- Footer -->
        <FooterComponent />
      </div>
    </div>

    <!-- Modals -->
    <AddCompany
      v-if="showAddCompanyModal"
      :company="editingCompany"
      @close="handleCloseCompanyModal"
      @success="handleCompanySaved"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import CompanyList from '../components/Company/CompanyList.vue'
import AddCompany from '../components/Company/AddCompany.vue'
import { AccountingApiService } from '../services/accountingApiService'

export default {
  name: 'AccountingDashboardView',
  components: {
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    CompanyList,
    AddCompany
  },
  setup() {
    // State
    const sidebarCollapsed = ref(false)
    const companies = ref([])
    
    // Modals
    const showAddCompanyModal = ref(false)
    const editingCompany = ref(null)

    // Refs
    const companyListRef = ref(null)

    // Computed
    const companyStats = computed(() => {
      const total = companies.value.length
      const active = companies.value.filter(company => company.is_active).length
      const inactive = total - active

      return {
        total,
        active,
        inactive
      }
    })

    // Methods
    const handleSidebarToggle = (collapsed) => {
      sidebarCollapsed.value = collapsed
    }

    const fetchCompanies = async () => {
      try {
        const result = await AccountingApiService.getCompanies()
        if (result.success) {
          companies.value = result.data || []
        }
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }

    // Company Modal Handlers
    const handleAddCompany = () => {
      editingCompany.value = null
      showAddCompanyModal.value = true
    }

    const handleEditCompany = (company) => {
      editingCompany.value = company
      showAddCompanyModal.value = true
    }

    const handleCloseCompanyModal = () => {
      showAddCompanyModal.value = false
      editingCompany.value = null
    }

    const handleCompanySaved = () => {
      // Refresh company list
      if (companyListRef.value) {
        companyListRef.value.fetchCompanies()
      }
      fetchCompanies()
    }

    // Lifecycle
    onMounted(() => {
      fetchCompanies()
    })

    return {
      sidebarCollapsed,
      companies,
      companyStats,
      showAddCompanyModal,
      editingCompany,
      companyListRef,
      handleSidebarToggle,
      handleAddCompany,
      handleEditCompany,
      handleCloseCompanyModal,
      handleCompanySaved
    }
  }
}
</script>

<style scoped>
.accounting-dashboard {
  min-height: 100vh;
  background: #f8f9fa;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  margin-left: 250px;
}

.content-wrapper.sidebar-collapsed {
  margin-left: 80px;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Statistics Section */
.stats-section {
  margin-bottom: 2rem;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

.stat-icon.active {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.inactive {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.stat-details {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin-top: 0.25rem;
}

/* Modules Section - Single Widget Per Row */
.modules-section {
  margin-bottom: 2rem;
}

.modules-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.module-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

.module-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.module-card.primary-module {
  border: 2px solid #3b82f6;
}

.module-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.module-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.module-icon svg {
  width: 2rem;
  height: 2rem;
}

.module-info {
  flex: 1;
}

.module-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.module-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.module-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quick-stat {
  text-align: center;
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-text {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  margin-top: 0.25rem;
}

.module-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.module-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Coming Soon Content */
.coming-soon-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #6b7280;
}

.coming-soon-icon {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.coming-soon-icon svg {
  width: 2rem;
  height: 2rem;
  color: white;
}

.coming-soon-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4b5563;
  margin: 0 0 0.5rem 0;
}

.coming-soon-content p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-wrapper {
    margin-left: 80px;
  }
  
  .content-wrapper.sidebar-collapsed {
    margin-left: 80px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
  }
  
  .main-content {
    padding: 1rem;
  }

  .stats-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .module-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .module-stats {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 1rem;
  }

  .stat-content {
    flex-direction: column;
    text-align: center;
  }

  .module-header {
    padding: 1rem;
  }
}
</style>
