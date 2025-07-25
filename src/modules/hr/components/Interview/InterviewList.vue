<template>
  <div class="interview-widget">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-section">
        <h3 class="widget-title">
          <svg class="widget-icon" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Interviews
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
            placeholder="Search interviews..."
            class="search-input"
          />
        </div>
        
        <!-- Add Button -->
        <button @click="handleAddInterview" class="add-btn" title="Schedule New Interview">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Interview Content Display -->
    <div v-if="selectedInterview" class="interview-content">
      <InterviewContent 
        :interview="selectedInterview" 
        @refresh="fetchInterviews"
        @edit="handleEditInterview"
        @back="selectedInterview = null"
      />
    </div>

    <!-- Widget Content -->
    <div class="widget-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading interviews...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchInterviews" class="retry-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredInterviews.length" class="empty-container">
        <svg class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <h4>No Interviews Found</h4>
        <p v-if="searchText">No interviews match your search criteria.</p>
        <p v-else>Start by scheduling your first interview to manage the hiring process.</p>
        <button @click="handleAddInterview" class="add-first-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Schedule First Interview
        </button>
      </div>

      <!-- Data Table -->
      <div v-else class="table-container">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="sortable" @click="sortBy('candidate_name')">
                  Candidate
                  <svg v-if="sortField === 'candidate_name'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('interviewer_name')">
                  Interviewer
                  <svg v-if="sortField === 'interviewer_name'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('interview_date_time')">
                  Date & Time
                  <svg v-if="sortField === 'interview_date_time'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('round_type')">
                  Round Type
                  <svg v-if="sortField === 'round_type'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th class="sortable" @click="sortBy('status')">
                  Status
                  <svg v-if="sortField === 'status'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="interview in paginatedInterviews" 
                :key="interview.id" 
                class="table-row"
                @click="selectInterview(interview)"
              >
                <td>
                  <div class="name-cell">
                    <div class="avatar">
                      {{ getCandidateInitials(interview) }}
                    </div>
                    <div class="name-info">
                      <div class="name">{{ getCandidateName(interview) }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ getInterviewerName(interview) }}</td>
                <td>{{ formatDateTime(interview.interview_date_time) }}</td>
                <td>
                  <span class="round-badge" :class="getRoundClass(interview.round_type)">
                    {{ interview.round_type }}
                  </span>
                </td>
                <td>
                  <span class="status-badge" :class="getStatusClass(interview.status)">
                    {{ interview.status }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button @click.stop="handleDeleteInterview(interview)" class="action-btn delete" title="Delete Interview">
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
        <div class="pagination-container">
          <div class="pagination-info">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalCount }} interviews
          </div>
          <div class="pagination-controls">
            <button 
              @click="goToPage(currentPage - 1)" 
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                :class="['page-btn', { active: page === currentPage }]"
                :disabled="page === '...'"
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
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import InterviewContent from './InterviewContent.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'

export default {
  name: 'InterviewList',
  components: {
    InterviewContent
  },
  emits: ['add-interview', 'edit-interview'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // State
    const interviews = ref([])
    const candidates = ref([])
    const employees = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchText = ref('')
    const selectedInterview = ref(null)
    
    // Pagination
    const currentPage = ref(1)
    const pageSize = ref(10)
    
    // Sorting
    const sortField = ref('interview_date_time')
    const sortAsc = ref(false)

    // Computed properties
    const totalCount = computed(() => interviews.value.length)
    
    const filteredInterviews = computed(() => {
      let filtered = [...interviews.value]
      
      // Search
      if (searchText.value) {
        const search = searchText.value.toLowerCase()
        filtered = filtered.filter(interview => {
          const candidateName = getCandidateName(interview).toLowerCase()
          const interviewerName = getInterviewerName(interview).toLowerCase()
          const roundType = (interview.round_type || '').toLowerCase()
          const status = (interview.status || '').toLowerCase()
          
          return candidateName.includes(search) || 
                 interviewerName.includes(search) || 
                 roundType.includes(search) ||
                 status.includes(search)
        })
      }
      
      // Sort
      filtered.sort((a, b) => {
        let aValue, bValue
        
        switch (sortField.value) {
          case 'candidate_name':
            aValue = getCandidateName(a).toLowerCase()
            bValue = getCandidateName(b).toLowerCase()
            break
          case 'interviewer_name':
            aValue = getInterviewerName(a).toLowerCase()
            bValue = getInterviewerName(b).toLowerCase()
            break
          case 'round_type':
            aValue = (a.round_type || '').toLowerCase()
            bValue = (b.round_type || '').toLowerCase()
            break
          case 'status':
            aValue = (a.status || '').toLowerCase()
            bValue = (b.status || '').toLowerCase()
            break
          case 'interview_date_time':
            aValue = new Date(a.interview_date_time || 0)
            bValue = new Date(b.interview_date_time || 0)
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
    
    const totalPages = computed(() => Math.ceil(filteredInterviews.value.length / pageSize.value))
    
    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, filteredInterviews.value.length))
    
    const paginatedInterviews = computed(() => {
      return filteredInterviews.value.slice(startIndex.value, endIndex.value)
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
    const fetchInterviews = async (showSuccessToast = false) => {
      loading.value = true
      error.value = null
      
      try {
        const result = await HRApiService.getInterviews()
        if (result.success) {
          interviews.value = result.data.items || result.data.results || result.data || []
          if (showSuccessToast) {
            toast.success('Interviews refreshed successfully')
          }
        } else {
          throw new Error(result.error || 'Failed to fetch interviews')
        }
      } catch (err) {
        console.error('Error fetching interviews:', err)
        error.value = err.message || 'Failed to load interviews'
        toast.error(`Error loading interviews: ${error.value}`)
      } finally {
        loading.value = false
      }
    }

    const fetchCandidatesAndEmployees = async () => {
      try {
        // Fetch candidates
        const candidatesResult = await HRApiService.getCandidates()
        if (candidatesResult.success) {
          candidates.value = candidatesResult.data.items || candidatesResult.data.results || candidatesResult.data || []
        }

        // Fetch employees
        const employeesResult = await HRApiService.getEmployees()
        if (employeesResult.success) {
          employees.value = employeesResult.data.items || employeesResult.data.results || employeesResult.data || []
        }
      } catch (error) {
        console.error('Error fetching candidates/employees:', error)
      }
    }
    
    const getCandidateName = (interview) => {
      const candidate = candidates.value.find(c => c.id === interview.candidate_id)
      if (!candidate?.person) return 'Unknown Candidate'
      const parts = [candidate.person.first_name, candidate.person.middle_name, candidate.person.last_name].filter(Boolean)
      return parts.join(' ') || candidate.person.preferred_name || 'Unknown Candidate'
    }

    const getCandidateInitials = (interview) => {
      const name = getCandidateName(interview)
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const getInterviewerName = (interview) => {
      const employee = employees.value.find(e => e.id === interview.interviewer_id)
      if (!employee) return 'Unknown Interviewer'
      const parts = [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean)
      return parts.join(' ') || employee.preferred_name || 'Unknown Interviewer'
    }
    
    const getRoundClass = (roundType) => {
      if (!roundType) return 'default'
      const type = roundType.toLowerCase()
      
      switch (type) {
        case 'hr': return 'hr'
        case 'technical': return 'technical'
        case 'managerial': return 'managerial'
        case 'final': return 'final'
        case 'behavioral': return 'behavioral'
        default: return 'default'
      }
    }
    
    const getStatusClass = (status) => {
      if (!status) return 'scheduled'
      const statusLower = status.toLowerCase()
      
      switch (statusLower) {
        case 'scheduled': return 'scheduled'
        case 'in progress': return 'in-progress'
        case 'completed': return 'completed'
        case 'cancelled': return 'cancelled'
        case 'rescheduled': return 'rescheduled'
        default: return 'scheduled'
      }
    }
    
    const formatDateTime = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) + ' ' + date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    const sortBy = (field) => {
      if (sortField.value === field) {
        sortAsc.value = !sortAsc.value
      } else {
        sortField.value = field
        sortAsc.value = true
      }
    }
    
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== '...') {
        currentPage.value = page
      }
    }
    
    const selectInterview = (interview) => {
      selectedInterview.value = interview
    }
    
    const handleAddInterview = () => {
      emit('add-interview')
    }
    
    const handleEditInterview = (interview) => {
      emit('edit-interview', interview)
    }
    
    const handleDeleteInterview = async (interview) => {
      const candidateName = getCandidateName(interview)
      const interviewerName = getInterviewerName(interview)
      
      const result = await Swal.fire({
        title: 'Delete Interview?',
        html: `
          <div style="text-align: left; margin: 1rem 0;">
            <p><strong>Candidate:</strong> ${candidateName}</p>
            <p><strong>Interviewer:</strong> ${interviewerName}</p>
            <p><strong>Date:</strong> ${formatDateTime(interview.interview_date_time)}</p>
            <p><strong>Round:</strong> ${interview.round_type}</p>
          </div>
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
          const deleteResult = await HRApiService.deleteInterview(interview.id)
          
          if (deleteResult.success) {
            toast.success(`Interview with "${candidateName}" has been deleted successfully!`, {
              timeout: 4000,
              icon: '✅'
            })
            
            // Remove from local state
            interviews.value = interviews.value.filter(i => i.id !== interview.id)
            
            // Reset pagination if current page is empty
            if (paginatedInterviews.value.length === 0 && currentPage.value > 1) {
              currentPage.value = currentPage.value - 1
            }
          } else {
            throw new Error(deleteResult.error || 'Failed to delete interview')
          }
        } catch (error) {
          console.error('Error deleting interview:', error)
          toast.error(`Failed to delete interview: ${error.message}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      }
    }

    // Initialize
    onMounted(async () => {
      await fetchCandidatesAndEmployees()
      await fetchInterviews()
    })

    return {
      // State
      loading,
      error,
      searchText,
      selectedInterview,
      
      // Computed
      totalCount,
      filteredInterviews,
      totalPages,
      startIndex,
      endIndex,
      paginatedInterviews,
      visiblePages,
      currentPage,
      sortField,
      sortAsc,
      
      // Methods
      fetchInterviews,
      getCandidateName,
      getCandidateInitials,
      getInterviewerName,
      getRoundClass,
      getStatusClass,
      formatDateTime,
      sortBy,
      goToPage,
      selectInterview,
      handleAddInterview,
      handleEditInterview,
      handleDeleteInterview
    }
  }
}
</script>

<style scoped>
.interview-widget {
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

.round-badge,
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.round-badge.hr {
  background: #ede9fe;
  color: #5b21b6;
}

.round-badge.technical {
  background: #dbeafe;
  color: #1e40af;
}

.round-badge.managerial {
  background: #d1fae5;
  color: #065f46;
}

.round-badge.final {
  background: #fef3c7;
  color: #92400e;
}

.round-badge.behavioral {
  background: #fce7f3;
  color: #be185d;
}

.round-badge.default {
  background: #f3f4f6;
  color: #374151;
}

.status-badge.scheduled {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.in-progress {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.rescheduled {
  background: #e0e7ff;
  color: #3730a3;
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

.action-btn.edit {
  background: #eff6ff;
  color: #2563eb;
}

.action-btn.edit:hover {
  background: #dbeafe;
  color: #1d4ed8;
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

/* Interview Content Display */
.interview-content {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
