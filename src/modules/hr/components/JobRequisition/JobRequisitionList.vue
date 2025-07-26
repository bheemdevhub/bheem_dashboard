<template>
  <div class="interview-widget">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-section">
        <h3 class="widget-title">
          <svg class="widget-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          Job Requisitions
          <span class="item-count">({{ totalCount }})</span>
        </h3>
      </div>
      
      <div class="widget-actions">
        <!-- Search Input -->
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input
            v-model="searchText"
            type="text"
            placeholder="Search job requisitions..."
            class="search-input"
          />
        </div>
        
        <!-- Add Button -->
        <button @click="handleAddJobRequisition" class="add-btn" title="Add New Job Requisition">
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
        <p>Loading job requisitions...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchJobRequisitions" class="retry-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredJobRequisitions.length" class="empty-container">
        <svg class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
        <h4>No Job Requisitions Found</h4>
        <p>{{ searchText ? 'No job requisitions match your search criteria.' : 'Get started by creating your first job requisition.' }}</p>
        <button v-if="!searchText" @click="handleAddJobRequisition" class="add-first-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Job Requisition
        </button>
      </div>

      <!-- Data Table -->
      <div v-else class="table-container">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="expand-column">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('job_title')">
                  Job Title
                  <svg v-if="sortField === 'job_title'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('department_name')">
                  Department
                  <svg v-if="sortField === 'department_name'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('location')">
                  Location
                  <svg v-if="sortField === 'location'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('number_of_openings')">
                  Openings
                  <svg v-if="sortField === 'number_of_openings'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                </th>
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
              <template v-for="jobRequisition in paginatedJobRequisitions" :key="jobRequisition.id">
                <!-- Main Job Requisition Row -->
                <tr 
                  @click="toggleJobRequisitionExpansion(jobRequisition)"
                  class="table-row"
                  :class="{ 
                    'selected': selectedJobRequisition?.id === jobRequisition.id,
                    'expanded': expandedJobRequisitions.includes(jobRequisition.id)
                  }"
                >
                  <td class="expand-cell">
                    <div class="expand-cell">
                      <button 
                        @click.stop="toggleJobRequisitionExpansion(jobRequisition)"
                        class="expand-btn"
                        :class="{ 'expanded': expandedJobRequisitions.includes(jobRequisition.id) }"
                        title="Toggle job requisition details"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div class="name-cell">
                      <div class="avatar">
                        {{ getJobInitials(jobRequisition) }}
                      </div>
                      <div class="name-info">
                        <div class="name">{{ jobRequisition.job_title }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ getDepartmentName(jobRequisition) }}</td>
                  <td>{{ jobRequisition.location || 'N/A' }}</td>
                  <td>
                    <span class="openings-badge">{{ jobRequisition.number_of_openings }}</span>
                  </td>
                  <td>
                    <span class="status-badge" :class="jobRequisition.is_active ? 'active' : 'inactive'">
                      {{ jobRequisition.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button @click.stop="handleDeleteJobRequisition(jobRequisition)" class="action-btn delete" title="Delete Job Requisition">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                <!-- Expandable Job Requisition Details Row -->
                <tr v-if="expandedJobRequisitions.includes(jobRequisition.id)" class="expanded-row">
                  <td colspan="7" class="expanded-content">
                    <div class="job-requisition-details-container">
                      <JobRequisitionContent 
                        :jobRequisition="jobRequisition" 
                        @refresh="fetchJobRequisitions"
                        @edit="handleEditJobRequisition"
                        :is-expanded="true"
                      />
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-container">
          <div class="pagination-info">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredJobRequisitions.length }} job requisitions
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
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import JobRequisitionContent from './JobRequisitionContent.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'

export default {
  name: 'JobRequisitionList',
  components: {
    JobRequisitionContent
  },
  emits: ['add-job-requisition', 'edit-job-requisition'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // Reactive data
    const jobRequisitions = ref([])
    const selectedJobRequisition = ref(null)
    const expandedJobRequisitions = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchText = ref('')
    const departments = ref([])
    const jobTypes = ref([])
    
    // Sorting
    const sortField = ref('job_title')
    const sortAsc = ref(true)
    
    // Pagination
    const currentPage = ref(1)
    const pageSize = ref(10)
    
    // Computed properties
    const totalCount = computed(() => jobRequisitions.value.length)
    
    const filteredJobRequisitions = computed(() => {
      let filtered = jobRequisitions.value
      
      if (searchText.value) {
        const search = searchText.value.toLowerCase()
        filtered = filtered.filter(jobReq => 
          jobReq.job_title?.toLowerCase().includes(search) ||
          jobReq.location?.toLowerCase().includes(search) ||
          getDepartmentName(jobReq)?.toLowerCase().includes(search) ||
          jobReq.experience_required?.toLowerCase().includes(search)
        )
      }
      
      // Sort
      filtered.sort((a, b) => {
        let aVal = a[sortField.value]
        let bVal = b[sortField.value]
        
        // Handle department name sorting
        if (sortField.value === 'department_name') {
          aVal = getDepartmentName(a)
          bVal = getDepartmentName(b)
        }
        
        // Handle string comparison
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }
        
        if (aVal < bVal) return sortAsc.value ? -1 : 1
        if (aVal > bVal) return sortAsc.value ? 1 : -1
        return 0
      })
      
      return filtered
    })
    
    const totalPages = computed(() => Math.ceil(filteredJobRequisitions.value.length / pageSize.value))
    
    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, filteredJobRequisitions.value.length))
    
    const paginatedJobRequisitions = computed(() => {
      return filteredJobRequisitions.value.slice(startIndex.value, endIndex.value)
    })
    
    const visiblePages = computed(() => {
      const pages = []
      const total = totalPages.value
      const current = currentPage.value
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) pages.push(i)
          pages.push('...')
          pages.push(total)
        } else if (current >= total - 3) {
          pages.push(1)
          pages.push('...')
          for (let i = total - 4; i <= total; i++) pages.push(i)
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = current - 1; i <= current + 1; i++) pages.push(i)
          pages.push('...')
          pages.push(total)
        }
      }
      
      return pages
    })
    
    // Methods
    const fetchJobRequisitions = async (showSuccessToast = false) => {
      loading.value = true
      error.value = null
      
      try {
        const result = await HRApiService.getJobRequisitions()
        if (result.success) {
          jobRequisitions.value = result.data || []
          if (showSuccessToast) {
            toast.success('Job requisitions refreshed successfully!', {
              timeout: 3000,
              icon: '✅'
            })
          }
        } else {
          error.value = result.error || 'Failed to fetch job requisitions'
          toast.error(`Failed to fetch job requisitions: ${result.error}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (err) {
        error.value = 'An unexpected error occurred'
        console.error('Error fetching job requisitions:', err)
        toast.error('An unexpected error occurred while fetching job requisitions', {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        loading.value = false
      }
    }

    const fetchLookups = async () => {
      try {
        const lookupsResult = await HRApiService.getLookups()
        if (lookupsResult.success) {
          const lookups = lookupsResult.data
          departments.value = lookups.filter(item => item.type === 'department' && item.is_active)
          jobTypes.value = lookups.filter(item => item.type === 'job_type' && item.is_active)
        }
      } catch (err) {
        console.error('Error fetching lookups:', err)
      }
    }
    
    const getJobInitials = (jobRequisition) => {
      if (!jobRequisition?.job_title) return 'JR'
      return jobRequisition.job_title
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const getDepartmentName = (jobRequisition) => {
      if (!jobRequisition.department_id) return 'N/A'
      const dept = departments.value.find(d => d.id === jobRequisition.department_id)
      return dept?.name || 'N/A'
    }

    const getJobTypeName = (jobRequisition) => {
      if (!jobRequisition.job_type_id) return 'N/A'
      const jobType = jobTypes.value.find(jt => jt.id === jobRequisition.job_type_id)
      return jobType?.name || 'N/A'
    }
    
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleDateString('en-GB') // DD/MM/YYYY format
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
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }
    
    const selectJobRequisition = (jobRequisition) => {
      selectedJobRequisition.value = jobRequisition
    }
    
    const toggleJobRequisitionExpansion = (jobRequisition) => {
      const index = expandedJobRequisitions.value.indexOf(jobRequisition.id)
      if (index > -1) {
        expandedJobRequisitions.value.splice(index, 1)
      } else {
        expandedJobRequisitions.value.push(jobRequisition.id)
      }
    }
    
    const handleAddJobRequisition = () => {
      emit('add-job-requisition')
    }

    const handleEditJobRequisition = (jobRequisition) => {
      emit('edit-job-requisition', jobRequisition)
    }
    
    const handleDeleteJobRequisition = async (jobRequisition) => {
      const result = await Swal.fire({
        title: 'Delete Job Requisition?',
        text: `Are you sure you want to delete "${jobRequisition.job_title}"? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      })
      
      if (result.isConfirmed) {
        try {
          const deleteResult = await HRApiService.deleteJobRequisition(jobRequisition.id)
          if (deleteResult.success) {
            await fetchJobRequisitions()
            if (selectedJobRequisition.value?.id === jobRequisition.id) {
              selectedJobRequisition.value = null
            }
            toast.success(`Job requisition "${jobRequisition.job_title}" deleted successfully!`, {
              timeout: 4000,
              icon: '✅'
            })
          } else {
            toast.error(`Failed to delete job requisition: ${deleteResult.error}`, {
              timeout: 5000,
              icon: '❌'
            })
          }
        } catch (error) {
          console.error('Error deleting job requisition:', error)
          toast.error('An unexpected error occurred while deleting the job requisition', {
            timeout: 5000,
            icon: '❌'
          })
        }
      }
    }
    
    // Watch for search changes to reset pagination
    watch(searchText, () => {
      currentPage.value = 1
    })
    
    // Initialize
    onMounted(() => {
      fetchLookups()
      fetchJobRequisitions()
    })
    
    return {
      // Data
      jobRequisitions,
      selectedJobRequisition,
      expandedJobRequisitions,
      loading,
      error,
      searchText,
      sortField,
      sortAsc,
      currentPage,
      pageSize,
      departments,
      jobTypes,
      
      // Computed
      totalCount,
      filteredJobRequisitions,
      totalPages,
      startIndex,
      endIndex,
      paginatedJobRequisitions,
      visiblePages,
      
      // Methods
      fetchJobRequisitions,
      getJobInitials,
      getDepartmentName,
      getJobTypeName,
      formatDate,
      sortBy,
      goToPage,
      selectJobRequisition,
      toggleJobRequisitionExpansion,
      handleAddJobRequisition,
      handleEditJobRequisition,
      handleDeleteJobRequisition
    }
  }
}
</script>

<style scoped>
.job-requisition-widget {
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
  min-width: 250px;
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

.job-requisition-content {
  border-bottom: 1px solid #e5e7eb;
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
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
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
  width: 3rem;
  height: 3rem;
  color: #ef4444;
  margin-bottom: 1rem;
}

.empty-icon {
  color: #9ca3af;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
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

.table-row.expanded {
  background: #f0f9ff;
  border-bottom: 1px solid #0ea5e9;
}

.expand-column {
  width: 60px;
}

.expand-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.expand-btn svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}

.expand-btn.expanded svg {
  transform: rotate(180deg);
}

.expanded-row {
  background: #f8fafc !important;
}

.expanded-row:hover {
  background: #f8fafc !important;
}

.expanded-content {
  padding: 0;
  border-bottom: 1px solid #e2e8f0;
}

.job-requisition-details-container {
  background: #ffffff;
  border-radius: 8px;
  margin: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
}

.job-title {
  font-weight: 600;
  color: #1f2937;
}

.job-type {
  font-size: 0.75rem;
  color: #6b7280;
}

.openings-badge {
  padding: 0.25rem 0.5rem;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #991b1b;
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

.action-btn.delete {
  background: #fef2f2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background: #fee2e2;
  color: #b91c1c;
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.pagination-container {
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
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
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  min-width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: white;
  border-color: #3b82f6;
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
    min-width: 200px;
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
    min-width: 150px;
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
</style>
