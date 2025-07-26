<template>
  <div class="candidate-widget">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-section">
        <h3 class="widget-title">
          <svg class="widget-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Candidates
          <span class="item-count">({{ totalCount }})</span>
        </h3>
      </div>
      
      <div class="widget-actions">
        <!-- Search Input -->
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
          </svg>
          <input
            type="text"
            v-model="searchText"
            placeholder="Search candidates..."
            class="search-input"
          />
        </div>
        
        <!-- Add Button -->
        <button @click="handleAddCandidate" class="add-btn" title="Add New Candidate">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Candidate Content Display -->
    <div v-if="selectedCandidate" class="candidate-content">
      <CandidateContent 
        :candidate="selectedCandidate" 
        @refresh="fetchCandidates"
        @edit="handleEditCandidate"
      />
    </div>

    <!-- Widget Content -->
    <div class="widget-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading candidates...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchCandidates" class="retry-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredCandidates.length" class="empty-container">
        <svg class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h4>No Candidates Found</h4>
        <p v-if="searchText">No candidates match your search criteria.</p>
        <p v-else>Start by adding your first candidate to track applications and manage the hiring process.</p>
        <button @click="handleAddCandidate" class="add-first-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add First Candidate
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
                <th class="sortable" @click="sortBy('name')">
                  Name
                  <svg v-if="sortField === 'name'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('email')">
                  Email
                  <svg v-if="sortField === 'email'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('status')">
                  Status
                  <svg v-if="sortField === 'status'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('application_date')">
                  Applied Date
                  <svg v-if="sortField === 'application_date'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="candidate in paginatedCandidates" :key="candidate.id">
                <!-- Main Candidate Row -->
                <tr 
                  @click="toggleCandidateExpansion(candidate)"
                  class="table-row"
                  :class="{ 
                    'selected': selectedCandidate?.id === candidate.id,
                    'expanded': expandedCandidates.includes(candidate.id)
                  }"
                >
                  <td class="expand-cell">
                    <div class="expand-cell">
                      <button 
                        @click.stop="toggleCandidateExpansion(candidate)"
                        class="expand-btn"
                        :class="{ 'expanded': expandedCandidates.includes(candidate.id) }"
                        title="Toggle candidate details"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div class="name-cell">
                      <div class="avatar">{{ getInitials(candidate) }}</div>
                      <div>
                        <div class="candidate-name">{{ getFullName(candidate) }}</div>
                        <div class="candidate-phone">{{ getMobile(candidate) }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="candidate-email">{{ getEmail(candidate) }}</span>
                  </td>
                  <td>
                    <span class="status-badge" :class="getStatusClass(candidate.status)">
                      {{ candidate.status || 'Applied' }}
                    </span>
                  </td>
                  <td>{{ formatDate(candidate.application_date) }}</td>
                  <td>
                    <div class="action-buttons">
                      <button @click.stop="handleDeleteCandidate(candidate)" class="action-btn delete-btn" title="Delete Candidate">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                <!-- Expandable Candidate Details Row -->
                <tr v-if="expandedCandidates.includes(candidate.id)" class="expanded-row">
                  <td colspan="6" class="expanded-content">
                    <div class="candidate-details-container">
                      <CandidateContent 
                        :candidate="candidate" 
                        @refresh="fetchCandidates"
                        @edit="handleEditCandidate"
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
        <div v-if="totalPages > 1" class="pagination-container">
          <div class="pagination-info">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalCount }} candidates
          </div>
          <div class="pagination-controls">
            <button @click="goToPage(1)" :disabled="currentPage === 1" class="pagination-btn">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-btn">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
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
            
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="pagination-btn">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages" class="pagination-btn">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
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
import CandidateContent from './CandidateContent.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'

export default {
  name: 'CandidateList',
  components: {
    CandidateContent
  },
  emits: ['add-candidate', 'edit-candidate'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // Reactive data
    const candidates = ref([])
    const selectedCandidate = ref(null)
    const expandedCandidates = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchText = ref('')
    
    // Sorting
    const sortField = ref('application_date')
    const sortAsc = ref(false)
    
    // Pagination
    const currentPage = ref(1)
    const pageSize = ref(10)
    
    // Computed properties
    const totalCount = computed(() => candidates.value.length)
    
    const filteredCandidates = computed(() => {
      let filtered = candidates.value
      
      if (searchText.value) {
        const search = searchText.value.toLowerCase()
        filtered = filtered.filter(candidate => {
          const fullName = getFullName(candidate).toLowerCase()
          const email = getEmail(candidate).toLowerCase()
          const mobile = getMobile(candidate).toLowerCase()
          const status = (candidate.status || '').toLowerCase()
          
          return fullName.includes(search) || 
                 email.includes(search) || 
                 mobile.includes(search) ||
                 status.includes(search)
        })
      }
      
      // Sort
      filtered.sort((a, b) => {
        let aValue, bValue
        
        switch (sortField.value) {
          case 'name':
            aValue = getFullName(a).toLowerCase()
            bValue = getFullName(b).toLowerCase()
            break
          case 'email':
            aValue = getEmail(a).toLowerCase()
            bValue = getEmail(b).toLowerCase()
            break
          case 'status':
            aValue = (a.status || '').toLowerCase()
            bValue = (b.status || '').toLowerCase()
            break
          case 'application_date':
            aValue = new Date(a.application_date || 0)
            bValue = new Date(b.application_date || 0)
            break
          default:
            return 0
        }
        
        if (aValue < bValue) return sortAsc.value ? -1 : 1
        if (aValue > bValue) return sortAsc.value ? 1 : -1
        return 0
      })
      
      return filtered
    })
    
    const totalPages = computed(() => Math.ceil(filteredCandidates.value.length / pageSize.value))
    
    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, filteredCandidates.value.length))
    
    const paginatedCandidates = computed(() => {
      return filteredCandidates.value.slice(startIndex.value, endIndex.value)
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
    const fetchCandidates = async (showSuccessToast = false) => {
      loading.value = true
      error.value = null
      
      try {
        const result = await HRApiService.getCandidates()
        if (result.success) {
          candidates.value = result.data.items || result.data.results || result.data || []
          if (showSuccessToast) {
            toast.success('Candidates refreshed successfully')
          }
        } else {
          throw new Error(result.error || 'Failed to fetch candidates')
        }
      } catch (err) {
        console.error('Error fetching candidates:', err)
        error.value = err.message || 'Failed to load candidates'
        toast.error(`Error loading candidates: ${error.value}`)
      } finally {
        loading.value = false
      }
    }
    
    const getFullName = (candidate) => {
      if (!candidate?.person) return 'N/A'
      const parts = [candidate.person.first_name, candidate.person.middle_name, candidate.person.last_name].filter(Boolean)
      return parts.join(' ') || candidate.person.preferred_name || 'N/A'
    }
    
    const getInitials = (candidate) => {
      const name = getFullName(candidate)
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    
    const getEmail = (candidate) => {
      if (!candidate?.person?.contacts || !Array.isArray(candidate.person.contacts) || candidate.person.contacts.length === 0) return 'N/A'
      return candidate.person.contacts[0].email_primary || 'N/A'
    }
    
    const getMobile = (candidate) => {
      if (!candidate?.person?.contacts || !Array.isArray(candidate.person.contacts) || candidate.person.contacts.length === 0) return 'N/A'
      return candidate.person.contacts[0].phone_mobile || 'N/A'
    }
    
    const getStatusClass = (status) => {
      if (!status) return 'applied'
      const statusLower = status.toLowerCase()
      
      switch (statusLower) {
        case 'applied': return 'applied'
        case 'screening': return 'screening'
        case 'interview': return 'interview'
        case 'offer': return 'offer'
        case 'hired': return 'hired'
        case 'rejected': return 'rejected'
        default: return 'applied'
      }
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
    
    const selectCandidate = (candidate) => {
      selectedCandidate.value = candidate
    }
    
    const toggleCandidateExpansion = (candidate) => {
      const index = expandedCandidates.value.indexOf(candidate.id)
      if (index > -1) {
        expandedCandidates.value.splice(index, 1)
      } else {
        expandedCandidates.value.push(candidate.id)
      }
    }
    
    const handleAddCandidate = () => {
      emit('add-candidate')
    }

    const handleEditCandidate = (candidate) => {
      emit('edit-candidate', candidate)
    }
    
    const handleDeleteCandidate = async (candidate) => {
      const result = await Swal.fire({
        title: 'Delete Candidate?',
        html: `Are you sure you want to delete <strong>${getFullName(candidate)}</strong>?<br><br>This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        focusCancel: true
      })
      
      if (result.isConfirmed) {
        loading.value = true
        try {
          const deleteResult = await HRApiService.deleteCandidate(candidate.id)
          if (deleteResult.success) {
            toast.success(`${getFullName(candidate)} has been deleted successfully`)
            
            // Clear selection if the deleted candidate was selected
            if (selectedCandidate.value?.id === candidate.id) {
              selectedCandidate.value = null
            }
            
            // Refresh the list
            await fetchCandidates()
          } else {
            throw new Error(deleteResult.error || 'Failed to delete candidate')
          }
        } catch (error) {
          console.error('Error deleting candidate:', error)
          toast.error(`Error deleting candidate: ${error.message}`)
        } finally {
          loading.value = false
        }
      }
    }
    
    // Watch for search changes to reset pagination
    watch(searchText, () => {
      currentPage.value = 1
    })
    
    // Initialize
    onMounted(() => {
      fetchCandidates()
    })
    
    return {
      // Data
      candidates,
      selectedCandidate,
      expandedCandidates,
      loading,
      error,
      searchText,
      sortField,
      sortAsc,
      currentPage,
      pageSize,
      
      // Computed
      totalCount,
      filteredCandidates,
      totalPages,
      startIndex,
      endIndex,
      paginatedCandidates,
      visiblePages,
      
      // Methods
      fetchCandidates,
      getFullName,
      getInitials,
      getEmail,
      getMobile,
      getStatusClass,
      formatDate,
      sortBy,
      goToPage,
      selectCandidate,
      toggleCandidateExpansion,
      handleAddCandidate,
      handleEditCandidate,
      handleDeleteCandidate
    }
  }
}
</script>

<style scoped>
.candidate-widget {
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

.candidate-content {
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

.candidate-details-container {
  background: #ffffff;
  border-radius: 8px;
  margin: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.candidate-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.candidate-phone {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.125rem;
}

.candidate-email {
  color: #3b82f6;
  font-size: 0.875rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.applied {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.screening {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.interview {
  background: #e0e7ff;
  color: #5b21b6;
}

.status-badge.offer {
  background: #dcfce7;
  color: #166534;
}

.status-badge.hired {
  background: #dcfce7;
  color: #166534;
}

.status-badge.rejected {
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

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

.delete-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
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
</style>