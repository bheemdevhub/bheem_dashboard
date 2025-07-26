<template>
  <div class="interview-widget">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-section">
        <h3 class="widget-title">
          <svg class="widget-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Onboarding
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
            placeholder="Search onboarding..."
            class="search-input"
          />
        </div>
        
        <!-- Add Button -->
        <button @click="handleAddOnboarding" class="add-btn" title="Add New Onboarding">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Onboarding Content Display -->
    <div v-if="selectedOnboarding" class="interview-content">
      <OnboardingContent 
        :onboarding="selectedOnboarding" 
        @refresh="fetchOnboardings"
        @edit="handleEditOnboarding"
        @back="selectedOnboarding = null"
      />
    </div>

    <!-- Widget Content -->
    <div v-else class="widget-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading onboarding records...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchOnboardings" class="retry-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredOnboardings.length" class="empty-container">
        <svg class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h4>No Onboarding Records Found</h4>
        <p v-if="searchText">No records match your search criteria.</p>
        <p v-else>Start by creating your first onboarding record.</p>
        <button @click="handleAddOnboarding" class="add-first-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Create First Onboarding
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
                <th class="sortable" @click="sortBy('candidate_name')">
                  Candidate
                  <svg v-if="sortField === 'candidate_name'" class="sort-icon" :class="{ 'rotate-180': !sortAsc }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </th>
                <th>Offer</th>
                <th>Documents</th>
                <th>System Setup</th>
                <th>Orientation</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="onboarding in paginatedOnboardings" :key="onboarding.id">
                <!-- Main Onboarding Row -->
                <tr 
                  @click="toggleOnboardingExpansion(onboarding)"
                  class="table-row"
                  :class="{ 
                    'selected': selectedOnboarding?.id === onboarding.id,
                    'expanded': expandedOnboardings.includes(onboarding.id)
                  }"
                >
                  <td class="expand-cell">
                    <button 
                      @click.stop="toggleOnboardingExpansion(onboarding)"
                      class="expand-btn"
                      :class="{ 'expanded': expandedOnboardings.includes(onboarding.id) }"
                      title="Toggle onboarding details"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <div class="name-cell">
                      <div class="avatar">
                        {{ getCandidateInitials(onboarding) }}
                      </div>
                      <div class="name-info">
                        <div class="name">{{ getCandidateName(onboarding) }}</div>
                        <div class="email">{{ getCandidateEmail(onboarding) }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="offer-info">
                      <span class="offer-badge" :class="getOfferStatusClass(onboarding)">
                        {{ getOfferStatus(onboarding) }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="progress-info">
                      <span>{{ getDocumentProgress(onboarding) }}%</span>
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: getDocumentProgress(onboarding) + '%' }"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="progress-info">
                      <span>{{ getSystemProgress(onboarding) }}%</span>
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: getSystemProgress(onboarding) + '%' }"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="progress-info">
                      <span>{{ getOrientationProgress(onboarding) }}%</span>
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: getOrientationProgress(onboarding) + '%' }"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="overall-progress">
                      <span class="progress-text">{{ getOverallProgress(onboarding) }}%</span>
                      <div class="circular-progress" :class="getProgressClass(onboarding)">
                        <svg class="progress-ring" width="30" height="30">
                          <circle
                            class="progress-ring-circle"
                            stroke="currentColor"
                            stroke-width="3"
                            fill="transparent"
                            r="12"
                            cx="15"
                            cy="15"
                            :stroke-dasharray="75.4"
                            :stroke-dashoffset="75.4 - (75.4 * getOverallProgress(onboarding)) / 100"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button @click.stop="handleDeleteOnboarding(onboarding)" class="action-btn delete-btn" title="Delete Onboarding">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"/>
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                <!-- Expandable Onboarding Details Row -->
                <tr v-if="expandedOnboardings.includes(onboarding.id)" class="expanded-row">
                  <td colspan="8" class="expanded-content">
                    <div class="onboarding-details-container">
                      <OnboardingContent 
                        :onboarding="onboarding" 
                        @refresh="fetchOnboardings"
                        @edit="handleEditOnboarding"
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
            Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, totalCount) }} of {{ totalCount }} records
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
import { ref, computed, onMounted, watch } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import OnboardingContent from './OnboardingContent.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'

export default {
  name: 'OnboardingList',
  components: {
    OnboardingContent
  },
  emits: ['add-onboarding', 'edit-onboarding'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // State
    const onboardings = ref([])
    const candidates = ref([])
    const offers = ref([])
    const companies = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchText = ref('')
    const selectedOnboarding = ref(null)
    const expandedOnboardings = ref([])
    
    // Pagination
    const currentPage = ref(1)
    const pageSize = ref(10)
    
    // Sorting
    const sortField = ref('candidate_name')
    const sortAsc = ref(true)

    // Computed properties
    const totalCount = computed(() => onboardings.value.length)
    
    const filteredOnboardings = computed(() => {
      let filtered = [...onboardings.value]
      
      // Search
      if (searchText.value) {
        const search = searchText.value.toLowerCase()
        filtered = filtered.filter(onboarding => {
          const candidateName = getCandidateName(onboarding).toLowerCase()
          const candidateEmail = getCandidateEmail(onboarding).toLowerCase()
          
          return candidateName.includes(search) || 
                 candidateEmail.includes(search)
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
          default:
            aValue = a[sortField.value] || ''
            bValue = b[sortField.value] || ''
        }
        
        if (aValue < bValue) return sortAsc.value ? -1 : 1
        if (aValue > bValue) return sortAsc.value ? 1 : -1
        return 0
      })
      
      return filtered
    })
    
    const totalPages = computed(() => Math.ceil(filteredOnboardings.value.length / pageSize.value))
    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
    const endIndex = computed(() => startIndex.value + pageSize.value)
    
    const paginatedOnboardings = computed(() => {
      return filteredOnboardings.value.slice(startIndex.value, endIndex.value)
    })
    
    const visiblePages = computed(() => {
      const total = totalPages.value
      const current = currentPage.value
      const delta = 2
      
      const range = []
      const rangeWithDots = []
      
      for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
        range.push(i)
      }
      
      if (current - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }
      
      rangeWithDots.push(...range)
      
      if (current + delta < total - 1) {
        rangeWithDots.push('...', total)
      } else if (total > 1) {
        rangeWithDots.push(total)
      }
      
      return rangeWithDots
    })

    // Methods
    const fetchOnboardings = async (showSuccessToast = false) => {
      loading.value = true
      error.value = null
      
      try {
        const result = await HRApiService.getOnboardings()
        if (result.success) {
          onboardings.value = result.data.items || result.data.results || result.data || []
          await fetchCandidatesAndOffers()
          if (showSuccessToast) {
            toast.success('Onboarding records refreshed successfully')
          }
        } else {
          throw new Error(result.error || 'Failed to fetch onboarding records')
        }
      } catch (err) {
        console.error('Error fetching onboardings:', err)
        error.value = err.message || 'Failed to load onboarding records'
        toast.error(`Error loading onboarding records: ${error.value}`)
      } finally {
        loading.value = false
      }
    }

    const fetchCandidatesAndOffers = async () => {
      try {
        // Fetch candidates
        const candidatesResult = await HRApiService.getCandidates()
        if (candidatesResult.success) {
          candidates.value = candidatesResult.data.items || candidatesResult.data.results || candidatesResult.data || []
        }

        // Fetch offers
        const offersResult = await HRApiService.getOffers()
        if (offersResult.success) {
          offers.value = offersResult.data.items || offersResult.data.results || offersResult.data || []
        }

        // Fetch companies
        const companiesResult = await HRApiService.getCompanies()
        if (companiesResult.success) {
          companies.value = companiesResult.data.items || companiesResult.data.results || companiesResult.data || []
        }
      } catch (error) {
        console.error('Error fetching related data:', error)
      }
    }
    
    const getCandidateName = (onboarding) => {
      const candidate = candidates.value.find(c => c.id === onboarding.candidate_id)
      if (!candidate?.person) return 'Unknown Candidate'
      const parts = [candidate.person.first_name, candidate.person.middle_name, candidate.person.last_name].filter(Boolean)
      return parts.join(' ') || candidate.person.preferred_name || 'Unknown Candidate'
    }

    const getCandidateInitials = (onboarding) => {
      const name = getCandidateName(onboarding)
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    }

    const getCandidateEmail = (onboarding) => {
      const candidate = candidates.value.find(c => c.id === onboarding.candidate_id)
      return candidate?.person?.email || 'N/A'
    }

    const getOfferStatus = (onboarding) => {
      const offer = offers.value.find(o => o.id === onboarding.offer_id)
      return offer?.offer_status || 'N/A'
    }

    const getOfferStatusClass = (onboarding) => {
      const status = getOfferStatus(onboarding).toLowerCase()
      return {
        'status-pending': status === 'pending',
        'status-accepted': status === 'accepted',
        'status-rejected': status === 'rejected',
        'status-withdrawn': status === 'withdrawn'
      }
    }

    const getDocumentProgress = (onboarding) => {
      const documentFields = [
        'offer_letter_signed',
        'id_proof_submitted',
        'educational_documents',
        'background_verification',
        'bank_account_details'
      ]
      const completed = documentFields.filter(field => onboarding[field]).length
      return Math.round((completed / documentFields.length) * 100)
    }

    const getSystemProgress = (onboarding) => {
      const systemFields = [
        'work_email_created',
        'system_allocation',
        'software_access_setup',
        'employee_id_created'
      ]
      const completed = systemFields.filter(field => onboarding[field]).length
      return Math.round((completed / systemFields.length) * 100)
    }

    const getOrientationProgress = (onboarding) => {
      const orientationFields = [
        'welcome_kit_given',
        'assigned_buddy',
        'first_day_orientation',
        'department_introduction',
        'hr_policy_acknowledgement',
        'training_plan_shared',
        'probation_period_set'
      ]
      const completed = orientationFields.filter(field => onboarding[field]).length
      return Math.round((completed / orientationFields.length) * 100)
    }

    const getOverallProgress = (onboarding) => {
      const allFields = [
        'offer_letter_signed',
        'id_proof_submitted',
        'educational_documents',
        'background_verification',
        'bank_account_details',
        'work_email_created',
        'system_allocation',
        'software_access_setup',
        'welcome_kit_given',
        'assigned_buddy',
        'first_day_orientation',
        'department_introduction',
        'hr_policy_acknowledgement',
        'training_plan_shared',
        'probation_period_set',
        'employee_id_created'
      ]
      const completed = allFields.filter(field => onboarding[field]).length
      return Math.round((completed / allFields.length) * 100)
    }

    const getProgressClass = (onboarding) => {
      const progress = getOverallProgress(onboarding)
      if (progress >= 80) return 'progress-high'
      if (progress >= 50) return 'progress-medium'
      return 'progress-low'
    }

    const selectOnboarding = (onboarding) => {
      selectedOnboarding.value = selectedOnboarding.value?.id === onboarding.id ? null : onboarding
    }

    const handleAddOnboarding = () => {
      emit('add-onboarding')
    }

    const handleEditOnboarding = (onboarding) => {
      emit('edit-onboarding', onboarding)
    }

    const handleDeleteOnboarding = async (onboarding) => {
      const candidateName = getCandidateName(onboarding)
      
      const result = await Swal.fire({
        title: 'Delete Onboarding Record',
        text: `Are you sure you want to delete the onboarding record for ${candidateName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      })

      if (result.isConfirmed) {
        try {
          const deleteResult = await HRApiService.deleteOnboarding(onboarding.id)
          if (deleteResult.success) {
            toast.success('Onboarding record deleted successfully')
            await fetchOnboardings()
          } else {
            throw new Error(deleteResult.error || 'Failed to delete onboarding record')
          }
        } catch (error) {
          console.error('Error deleting onboarding:', error)
          toast.error('Failed to delete onboarding record')
        }
      }
    }

    // Pagination methods
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== '...') {
        currentPage.value = page
      }
    }

    const sortBy = (field) => {
      if (sortField.value === field) {
        sortAsc.value = !sortAsc.value
      } else {
        sortField.value = field
        sortAsc.value = true
      }
    }

    const toggleOnboardingExpansion = (onboarding) => {
      const index = expandedOnboardings.value.indexOf(onboarding.id)
      if (index > -1) {
        expandedOnboardings.value.splice(index, 1)
      } else {
        expandedOnboardings.value.push(onboarding.id)
      }
    }

    // Watch for search changes to reset pagination
    watch(searchText, () => {
      currentPage.value = 1
    })

    // Initialize
    onMounted(() => {
      fetchOnboardings()
    })

    return {
      onboardings,
      candidates,
      offers,
      companies,
      loading,
      error,
      searchText,
      selectedOnboarding,
      expandedOnboardings,
      currentPage,
      totalCount,
      filteredOnboardings,
      paginatedOnboardings,
      totalPages,
      startIndex,
      endIndex,
      visiblePages,
      sortField,
      sortAsc,
      fetchOnboardings,
      selectOnboarding,
      handleAddOnboarding,
      handleEditOnboarding,
      handleDeleteOnboarding,
      getCandidateName,
      getCandidateInitials,
      getCandidateEmail,
      getOfferStatus,
      getOfferStatusClass,
      getDocumentProgress,
      getSystemProgress,
      getOrientationProgress,
      getOverallProgress,
      getProgressClass,
      goToPage,
      sortBy,
      toggleOnboardingExpansion
    }
  }
}
</script>

<style scoped>
/* Using interview styles exactly */
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.widget-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.widget-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.widget-icon {
  width: 24px;
  height: 24px;
}

.item-count {
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.8;
}

.widget-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: #9ca3af;
  z-index: 10;
}

.search-input {
  padding: 8px 12px 8px 36px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.875rem;
  width: 200px;
  backdrop-filter: blur(10px);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.add-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.add-btn svg {
  width: 20px;
  height: 20px;
}

.widget-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.loading-container,
.error-container,
.empty-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  width: 48px;
  height: 48px;
  color: #9ca3af;
  margin-bottom: 16px;
}

.error-container p,
.empty-container p {
  color: #6b7280;
  margin: 8px 0;
}

.empty-container h4 {
  margin: 0 0 8px 0;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
}

.retry-btn,
.add-first-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 16px;
}

.retry-btn:hover,
.add-first-btn:hover {
  background: #2563eb;
}

.retry-btn svg,
.add-first-btn svg {
  width: 16px;
  height: 16px;
}

.table-container {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.data-table th.sortable:hover {
  background: #f3f4f6;
}

.sort-icon {
  width: 14px;
  height: 14px;
  margin-left: 4px;
  transition: transform 0.2s ease;
}

.sort-icon.rotate-180 {
  transform: rotate(180deg);
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
  color: #374151;
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
  gap: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.name-info {
  min-width: 0;
}

.name {
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.email {
  color: #6b7280;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.offer-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-accepted {
  background: #d1fae5;
  color: #065f46;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-withdrawn {
  background: #f3f4f6;
  color: #4b5563;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-info span {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  min-width: 30px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #f3f4f6;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.overall-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  min-width: 30px;
}

.circular-progress {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.3s ease;
}

.progress-high .progress-ring-circle {
  stroke: #10b981;
}

.progress-medium .progress-ring-circle {
  stroke: #f59e0b;
}

.progress-low .progress-ring-circle {
  stroke: #ef4444;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.delete-btn {
  color: #ef4444;
}

.delete-btn:hover {
  background: #fef2f2;
  border-color: #fecaca;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:not(:disabled):hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:disabled {
  cursor: default;
  border: none;
  background: transparent;
}

.page-btn:not(:disabled):hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.page-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.page-btn.active:hover {
  background: #2563eb;
  border-color: #2563eb;
}

/* Expandable Rows */
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

.table-row.expanded {
  background: #f0f9ff;
  border-bottom: 1px solid #0ea5e9;
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

.onboarding-details-container {
  background: #ffffff;
  border-radius: 8px;
  margin: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
