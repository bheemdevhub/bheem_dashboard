<template>
  <div class="company-widget">
    <CompanyContent 
      v-if="selectedCompany"
      :company="selectedCompany"
      @back="selectedCompany = null"
      @edit="editCompany"
      @refresh="fetchCompanies"
      class="company-content"
    />
    
    <div v-else class="widget-container">
      <!-- Widget Header -->
      <div class="widget-header">
        <div class="widget-title-section">
          <h3 class="widget-title">
            <svg class="widget-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Companies
            <span class="item-count">({{ totalCount }})</span>
          </h3>
        </div>
        
        <div class="widget-actions">
          <!-- Search Input -->
          <div class="search-container">
            <input
              v-model="searchText"
              type="text"
              placeholder="Search companies..."
              class="search-input"
            />
            <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <!-- Add Button -->
          <button @click="addCompany" class="add-btn" title="Add New Company">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Widget Content -->
      <div class="widget-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Loading companies...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container">
          <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <p>{{ error }}</p>
          <button @click="fetchCompanies" class="retry-btn">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Retry
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!filteredCompanies.length" class="empty-container">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <h4>No Companies Found</h4>
          <p>{{ searchText ? 'No companies match your search criteria.' : 'No companies have been added yet.' }}</p>
          <button v-if="!searchText" @click="addCompany" class="add-first-btn">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add First Company
          </button>
        </div>

        <!-- Data Table -->
        <div v-else class="table-container">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="sortable" @click="sortBy('company_name')">
                    Company Name
                    <svg v-if="sortField === 'company_name'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                  </th>
                  <th class="sortable" @click="sortBy('company_code')">
                    Code
                    <svg v-if="sortField === 'company_code'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                  </th>
                  <th class="sortable" @click="sortBy('company_type')">
                    Type
                    <svg v-if="sortField === 'company_type'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                  </th>
                  <th>Legal Name</th>
                  <th class="sortable" @click="sortBy('is_active')">
                    Status
                    <svg v-if="sortField === 'is_active'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="company in paginatedCompanies" 
                  :key="company.id"
                  class="table-row"
                  :class="{ 'selected': selectedCompany?.id === company.id }"
                  @click="selectCompany(company)"
                >
                  <td>
                    <div class="name-cell">
                      <div class="avatar">
                        {{ getCompanyInitials(company.company_name) }}
                      </div>
                      <div class="name-info">
                        <div class="name">{{ company.company_name }}</div>
                        <div class="company-address">{{ company.address || 'N/A' }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="company-code">{{ company.company_code }}</span>
                  </td>
                  <td>
                    <span class="type-badge" :class="getTypeClass(company.company_type)">
                      {{ formatCompanyType(company.company_type) }}
                    </span>
                  </td>
                  <td>{{ company.legal_name || 'N/A' }}</td>
                  <td>
                    <span class="status-badge" :class="company.is_active ? 'active' : 'inactive'">
                      {{ company.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button @click.stop="editCompany(company)" class="action-btn edit" title="Edit Company">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                      </button>
                      <button @click.stop="deleteCompany(company)" class="action-btn delete" title="Delete Company">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination-container">
            <div class="pagination-info">
              Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ totalCount }} companies
            </div>
            <div class="pagination-controls">
              <button 
                @click="goToPage(currentPage - 1)" 
                :disabled="currentPage === 1"
                class="pagination-btn"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <div class="page-numbers">
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="goToPage(page)"
                  class="page-btn"
                  :class="{ active: page === currentPage }"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="goToPage(currentPage + 1)" 
                :disabled="currentPage === totalPages"
                class="pagination-btn"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Company Modal -->
    <AddCompany 
      v-if="showAddModal"
      :isVisible="showAddModal"
      :isEdit="isEditMode"
      :company="editingCompany"
      @close="closeModal"
      @saved="handleCompanySaved"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { AccountingApiService } from '../../services/accountingApiService'
import CompanyContent from './CompanyContent.vue'
import AddCompany from './AddCompany.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'

export default {
  name: 'CompanyList',
  components: {
    CompanyContent,
    AddCompany
  },
  emits: ['add-company', 'edit-company'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // State
    const companies = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchText = ref('')
    const selectedCompany = ref(null)
    const showAddModal = ref(false)
    const isEditMode = ref(false)
    const editingCompany = ref(null)
    
    // Pagination
    const currentPage = ref(1)
    const pageSize = ref(10)
    
    // Sorting
    const sortField = ref('company_name')
    const sortAsc = ref(true)

    // Computed properties
    const filteredCompanies = computed(() => {
      if (!searchText.value) return companies.value
      
      const search = searchText.value.toLowerCase()
      return companies.value.filter(company => 
        company.company_name?.toLowerCase().includes(search) ||
        company.company_code?.toLowerCase().includes(search) ||
        company.legal_name?.toLowerCase().includes(search) ||
        company.company_type?.toLowerCase().includes(search)
      )
    })

    const sortedCompanies = computed(() => {
      const sorted = [...filteredCompanies.value]
      sorted.sort((a, b) => {
        let aVal = a[sortField.value] || ''
        let bVal = b[sortField.value] || ''
        
        if (typeof aVal === 'string') aVal = aVal.toLowerCase()
        if (typeof bVal === 'string') bVal = bVal.toLowerCase()
        
        if (aVal < bVal) return sortAsc.value ? -1 : 1
        if (aVal > bVal) return sortAsc.value ? 1 : -1
        return 0
      })
      return sorted
    })

    const totalCount = computed(() => filteredCompanies.value.length)
    const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))
    
    const paginatedCompanies = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return sortedCompanies.value.slice(start, end)
    })

    const visiblePages = computed(() => {
      const pages = []
      const total = totalPages.value
      const current = currentPage.value
      
      if (total <= 5) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 3) {
          pages.push(1, 2, 3, 4, 5)
        } else if (current >= total - 2) {
          pages.push(total - 4, total - 3, total - 2, total - 1, total)
        } else {
          pages.push(current - 2, current - 1, current, current + 1, current + 2)
        }
      }
      
      return pages
    })

    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, totalCount.value))

    // Methods
    const fetchCompanies = async () => {
      loading.value = true
      error.value = null
      
      try {
        const result = await AccountingApiService.getCompanies()
        if (result.success) {
          companies.value = result.data || []
        } else {
          error.value = result.error || 'Failed to fetch companies'
          toast.error('Failed to load companies', {
            timeout: 4000,
            icon: '❌'
          })
        }
      } catch (err) {
        error.value = 'Network error occurred'
        console.error('Error fetching companies:', err)
        toast.error('Network error occurred while loading companies', {
          timeout: 4000,
          icon: '❌'
        })
      } finally {
        loading.value = false
      }
    }

    const selectCompany = (company) => {
      selectedCompany.value = company
    }

    const sortBy = (field) => {
      if (sortField.value === field) {
        sortAsc.value = !sortAsc.value
      } else {
        sortField.value = field
        sortAsc.value = true
      }
      currentPage.value = 1
    }

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== '...') {
        currentPage.value = page
      }
    }

    const getCompanyInitials = (name) => {
      if (!name) return 'C'
      const words = name.split(' ')
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase()
      }
      return name.substring(0, 2).toUpperCase()
    }

    const formatCompanyType = (type) => {
      if (!type) return 'N/A'
      return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    }

    const getTypeClass = (type) => {
      if (!type) return 'default'
      const typeKey = type.toLowerCase()
      
      switch (typeKey) {
        case 'holding': return 'holding'
        case 'subsidiary': return 'subsidiary'
        default: return 'default'
      }
    }

    const addCompany = () => {
      isEditMode.value = false
      editingCompany.value = null
      showAddModal.value = true
      emit('add-company')
    }

    const editCompany = (company) => {
      isEditMode.value = true
      editingCompany.value = company
      showAddModal.value = true
      selectedCompany.value = null // Close content view if open
      emit('edit-company', company)
    }

    const deleteCompany = async (company) => {
      const result = await Swal.fire({
        title: 'Delete Company?',
        html: `
          <p>Are you sure you want to delete <strong>"${company.company_name}"</strong>?</p>
          <p style="color: #dc2626; margin-top: 1rem;">This action cannot be undone.</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      })

      if (result.isConfirmed) {
        try {
          const deleteResult = await AccountingApiService.deleteCompany(company.id)
          if (deleteResult.success) {
            // Show toast message after successful deletion
            toast.success(`Company "${company.company_name}" has been deleted successfully!`, {
              timeout: 4000,
              icon: '✅'
            })
            
            await fetchCompanies()
          } else {
            toast.error(`Failed to delete company: ${deleteResult.error}`, {
              timeout: 5000,
              icon: '❌'
            })
          }
        } catch (error) {
          console.error('Error deleting company:', error)
          toast.error('Failed to delete company. Please try again.', {
            timeout: 5000,
            icon: '❌'
          })
        }
      }
    }

    const closeModal = () => {
      showAddModal.value = false
      isEditMode.value = false
      editingCompany.value = null
    }

    const handleCompanySaved = async (company) => {
      await fetchCompanies()
      closeModal()
      
      // Show the newly created/edited company
      if (company) {
        setTimeout(() => {
          selectedCompany.value = company
        }, 100)
      }
    }

    // Watchers
    watch(searchText, () => {
      currentPage.value = 1
    })

    // Lifecycle
    onMounted(() => {
      fetchCompanies()
    })

    return {
      companies,
      loading,
      error,
      searchText,
      selectedCompany,
      showAddModal,
      isEditMode,
      editingCompany,
      currentPage,
      pageSize,
      sortField,
      sortAsc,
      filteredCompanies,
      totalCount,
      totalPages,
      paginatedCompanies,
      visiblePages,
      startIndex,
      endIndex,
      fetchCompanies,
      selectCompany,
      sortBy,
      goToPage,
      getCompanyInitials,
      formatCompanyType,
      getTypeClass,
      addCompany,
      editCompany,
      deleteCompany,
      closeModal,
      handleCompanySaved
    }
  }
}
</script>

<style scoped>
.company-widget {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.widget-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.widget-title-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.widget-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.widget-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3b82f6;
}

.item-count {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.widget-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;
  min-width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  pointer-events: none;
}

.add-btn {
  padding: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.add-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.widget-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  color: #6b7280;
  text-align: center;
  flex: 1;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  stroke-width: 1;
}

.error-container h4,
.empty-container h4 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
}

.retry-btn,
.add-first-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.retry-btn:hover,
.add-first-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.retry-btn svg,
.add-first-btn svg {
  width: 1rem;
  height: 1rem;
}

.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
  border-bottom: 1px solid #e5e7eb;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  position: relative;
}

.data-table th.sortable:hover {
  background: #f3f4f6;
}

.sort-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}

.table-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: #f9fafb;
}

.table-row.selected {
  background: #eff6ff;
  border-color: #dbeafe;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.name-info {
  min-width: 0;
}

.name {
  font-weight: 600;
  color: #1f2937;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.name-info {
  min-width: 0;
}

.name {
  font-weight: 600;
  color: #1f2937;
}

.company-address {
  font-size: 0.75rem;
  color: #6b7280;
}

.company-code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: #374151;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.type-badge.holding {
  background: #fef3c7;
  color: #d97706;
}

.type-badge.subsidiary {
  background: #dbeafe;
  color: #2563eb;
}

.type-badge.default {
  background: #f3f4f6;
  color: #374151;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.active {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.action-btn.edit {
  background: #fef3c7;
  color: #d97706;
}

.action-btn.edit:hover {
  background: #fde68a;
}

.action-btn.delete {
  background: #fee2e2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background: #fecaca;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.active {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.actions-column {
  width: 100px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.edit-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.edit-btn:hover {
  background: #3b82f6;
  color: white;
}

.delete-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
}

.action-btn.edit:hover {
  background: #eff6ff;
  color: #1d4ed8;
}

.action-btn.delete {
  color: #dc2626;
}

.action-btn.delete:hover {
  background: #fef2f2;
  color: #b91c1c;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.edit-btn {
  background: #dbeafe;
  color: #2563eb;
}

.edit-btn:hover {
  background: #bfdbfe;
  transform: translateY(-1px);
}

.delete-btn {
  background: #fee2e2;
  color: #dc2626;
}

.delete-btn:hover {
  background: #fecaca;
  transform: translateY(-1px);
}

.pagination-container {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn,
.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.pagination-btn:hover:not(:disabled),
.page-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.pagination-btn svg {
  width: 1rem;
  height: 1rem;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .widget-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .widget-actions {
    justify-content: space-between;
  }
  
  .search-input {
    min-width: 150px;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.75rem 0.5rem;
  }
  
  .pagination-container {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .search-input {
    min-width: 120px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.5rem 0.25rem;
    font-size: 0.875rem;
  }
}

/* Company Content Display */
.company-content {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
