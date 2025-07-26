<template>
  <div class="offer-widget">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-section">
        <h2 class="widget-title">
          <svg class="widget-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Job Offers
        </h2>
        <span class="item-count">({{ totalCount }} offers)</span>
      </div>
      <div class="widget-actions">
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search offers..." 
            v-model="searchText"
            class="search-input"
          />
        </div>
        <button @click="handleAddOffer" class="add-btn" title="Create New Offer">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Widget Content -->
    <div class="widget-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading offers...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchOffers" class="retry-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredOffers.length" class="empty-container">
        <svg class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h4>No Offers Found</h4>
        <p v-if="searchText">No offers match your search criteria.</p>
        <p v-else>Start by creating your first job offer to manage hiring process.</p>
        <button @click="handleAddOffer" class="add-first-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Create First Offer
        </button>
      </div>

      <!-- Offers Table -->
      <div v-else class="table-container">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Company</th>
                <th>CTC</th>
                <th>Offer Date</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Background Check</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="offer in filteredOffers" 
                :key="offer.id"
                class="table-row"
                @click="selectOffer(offer)"
              >
                <td>
                  <div class="name-cell">
                    <div class="avatar">
                      {{ getCandidateInitials(offer) }}
                    </div>
                    <div class="name-info">
                      <div class="name">{{ getCandidateName(offer) }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ getCompanyName(offer) }}</td>
                <td>
                  <div class="ctc-amount">₹{{ formatCurrency(offer.offered_ctc) }}</div>
                </td>
                <td>{{ formatDate(offer.offer_date) }}</td>
                <td>{{ formatDate(offer.joining_date) }}</td>
                <td>
                  <span class="status-badge" :class="getOfferStatusClass(offer.offer_status)">
                    {{ offer.offer_status }}
                  </span>
                </td>
                <td>
                  <span class="status-badge" :class="getBackgroundCheckClass(offer.background_check_status)">
                    {{ offer.background_check_status }}
                  </span>
                </td>
                <td>
                  <span class="docs-badge" :class="offer.documents_submitted ? 'submitted' : 'pending'">
                    {{ offer.documents_submitted ? 'Submitted' : 'Pending' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button @click.stop="deleteOffer(offer)" class="action-btn delete" title="Delete Offer">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Offer Content Component -->
    <OfferContent 
      v-if="selectedOffer"
      :offer="selectedOffer"
      @back="selectedOffer = null"
      @edit="editOffer"
      @refresh="fetchOffers"
      class="interview-content"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import OfferContent from './OfferContent.vue'
import Swal from 'sweetalert2'
import { useToast } from 'vue-toastification'

export default {
  name: 'OfferList',
  emits: ['add-offer', 'edit-offer'],
  components: {
    OfferContent
  },
  setup(props, { emit }) {
    const toast = useToast()
    
    // State
    const offers = ref([])
    const candidates = ref([])
    const companies = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchText = ref('')
    const selectedOffer = ref(null)
    const editingOffer = ref(null)

    // Computed properties
    const totalCount = computed(() => offers.value.length)

    const filteredOffers = computed(() => {
      if (!searchText.value) return offers.value
      
      const search = searchText.value.toLowerCase()
      return offers.value.filter(offer => {
        const candidateName = getCandidateName(offer).toLowerCase()
        const companyName = getCompanyName(offer).toLowerCase()
        const status = offer.offer_status?.toLowerCase() || ''
        const ctc = offer.offered_ctc?.toString() || ''
        
        return candidateName.includes(search) ||
               companyName.includes(search) ||
               status.includes(search) ||
               ctc.includes(search)
      })
    })

    // Methods
    const fetchOffers = async () => {
      loading.value = true
      error.value = null
      
      try {
        const result = await HRApiService.getOffers()
        if (result.success) {
          offers.value = result.data || []
          await fetchCandidatesAndCompanies()
        } else {
          error.value = result.error || 'Failed to fetch offers'
        }
      } catch (err) {
        console.error('Error fetching offers:', err)
        error.value = 'Network error occurred'
      } finally {
        loading.value = false
      }
    }

    const fetchCandidatesAndCompanies = async () => {
      try {
        // Fetch candidates for the offers
        const candidateIds = [...new Set(offers.value.map(offer => offer.candidate_id).filter(Boolean))]
        for (const candidateId of candidateIds) {
          if (!candidates.value.find(c => c.id === candidateId)) {
            try {
              const result = await HRApiService.getCandidateById(candidateId)
              if (result.success) {
                candidates.value.push(result.data)
              }
            } catch (error) {
              console.error(`Error fetching candidate ${candidateId}:`, error)
            }
          }
        }

        // Fetch companies
        if (companies.value.length === 0) {
          try {
            const result = await HRApiService.getCompanies()
            if (result.success) {
              companies.value = result.data || []
            }
          } catch (error) {
            console.error('Error fetching companies:', error)
          }
        }
      } catch (error) {
        console.error('Error fetching related data:', error)
      }
    }

    const selectOffer = (offer) => {
      selectedOffer.value = selectedOffer.value?.id === offer.id ? null : offer
    }

    const handleAddOffer = () => {
      emit('add-offer')
    }

    const editOffer = (offer) => {
      emit('edit-offer', offer)
    }

    const deleteOffer = async (offer) => {
      const candidateName = getCandidateName(offer)
      
      const result = await Swal.fire({
        title: 'Delete Offer',
        text: `Are you sure you want to delete the offer for ${candidateName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      })

      if (!result.isConfirmed) {
        return
      }

      try {
        const deleteResult = await HRApiService.deleteOffer(offer.id)
        if (deleteResult.success) {
          // Show toast message after successful deletion
          toast.success(`Offer for ${candidateName} has been deleted successfully!`, {
            timeout: 4000,
            icon: '✅'
          })
          
          await fetchOffers()
        } else {
          toast.error(`Failed to delete offer: ${deleteResult.error}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error deleting offer:', error)
        toast.error('Failed to delete offer. Please try again.', {
          timeout: 5000,
          icon: '❌'
        })
      }
    }

    const handleOfferSuccess = async () => {
      await fetchOffers()
    }

    // Helper methods
    const getCandidateName = (offer) => {
      const candidate = candidates.value.find(c => c.id === offer.candidate_id)
      if (candidate?.person) {
        const person = candidate.person
        const parts = [person.first_name, person.middle_name, person.last_name].filter(Boolean)
        return parts.join(' ') || person.preferred_name || 'Unknown Candidate'
      }
      return 'Loading...'
    }

    const getCandidateEmail = (offer) => {
      const candidate = candidates.value.find(c => c.id === offer.candidate_id)
      if (candidate?.person?.contacts && candidate.person.contacts.length > 0) {
        return candidate.person.contacts[0].email_primary || 'N/A'
      }
      return 'N/A'
    }

    const getCandidateInitials = (offer) => {
      const name = getCandidateName(offer)
      if (name === 'Loading...' || name === 'Unknown Candidate') return 'OF'
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const getCompanyName = (offer) => {
      const company = companies.value.find(c => c.id === offer.company_id)
      if (company) {
        return `${company.company_name} (${company.company_code})`
      }
      return offer.company_id ? 'Loading...' : 'N/A'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleDateString('en-GB')
    }

    const formatCurrency = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-IN').format(amount)
    }

    const getOfferStatusClass = (status) => {
      if (!status) return 'offered'
      const statusLower = status.toLowerCase()
      
      switch (statusLower) {
        case 'offered': return 'offered'
        case 'accepted': return 'accepted'
        case 'rejected': return 'rejected'
        case 'withdrawn': return 'withdrawn'
        default: return 'offered'
      }
    }

    const getBackgroundCheckClass = (status) => {
      if (!status) return 'pending'
      const statusLower = status.toLowerCase()
      
      switch (statusLower) {
        case 'pending': return 'pending'
        case 'in progress': return 'in-progress'
        case 'completed': return 'completed'
        case 'failed': return 'failed'
        default: return 'pending'
      }
    }

    // Lifecycle
    onMounted(async () => {
      await fetchOffers()
    })

    return {
      offers,
      candidates,
      companies,
      loading,
      error,
      searchText,
      selectedOffer,
      editingOffer,
      totalCount,
      filteredOffers,
      fetchOffers,
      selectOffer,
      handleAddOffer,
      editOffer,
      deleteOffer,
      handleOfferSuccess,
      getCandidateName,
      getCandidateEmail,
      getCandidateInitials,
      getCompanyName,
      formatDate,
      formatCurrency,
      getOfferStatusClass,
      getBackgroundCheckClass
    }
  }
}
</script>

<style scoped>
.offer-widget {
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

.ctc-amount {
  font-weight: 600;
  color: #059669;
  font-size: 0.875rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.status-badge.offered {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.accepted {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.withdrawn {
  background: #f3f4f6;
  color: #374151;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.in-progress {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.failed {
  background: #fee2e2;
  color: #991b1b;
}

.docs-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.docs-badge.submitted {
  background: #d1fae5;
  color: #065f46;
}

.docs-badge.pending {
  background: #fef3c7;
  color: #92400e;
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

/* Offer Content Display */
.interview-content {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
