<template>
  <div class="interview-content">
    <div class="content-header">
      <div class="interview-info">
        <div class="interview-avatar">
          {{ getOfferInitials() }}
        </div>
        <div class="interview-details">
          <h2>{{ getCandidateName() }}</h2>
          <div class="interview-meta">
            <span>{{ getCompanyName() }}</span>
            <span class="separator">•</span>
            <span>₹{{ formatCurrency(offer.offered_ctc) }}</span>
            <span class="separator">•</span>
            <span>{{ formatDate(offer.offer_date) }}</span>
          </div>
        </div>
      </div>
      <div class="content-actions">
        <button @click="handleBack" class="back-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          Back 
        </button>
        <button @click="handleEdit" class="edit-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Status Section -->
    <div class="status-section">
      <div class="status-item">
        <span class="status-label">Offer Status</span>
        <span class="status-badge" :class="getOfferStatusClass(offer.offer_status)">
          {{ offer.offer_status || 'Offered' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Background Check</span>
        <span class="status-badge" :class="getBackgroundCheckClass(offer.background_check_status)">
          {{ offer.background_check_status || 'Pending' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Documents</span>
        <span class="status-badge" :class="offer.documents_submitted ? 'submitted' : 'pending'">
          {{ offer.documents_submitted ? 'Submitted' : 'Pending' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Active</span>
        <span class="status-badge" :class="offer.is_active ? 'active' : 'inactive'">
          {{ offer.is_active ? 'Active' : 'Inactive' }}
        </span>
      </div>
    </div>

    <!-- Offer Details -->
    <div class="details-grid">
      <!-- Basic Information -->
      <div class="detail-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
          Candidate Information
        </h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Candidate Name:</span>
            <span class="detail-value">{{ getCandidateName() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email:</span>
            <span class="detail-value">{{ getCandidateEmail() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">{{ getCandidatePhone() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Company:</span>
            <span class="detail-value">{{ getCompanyName() }}</span>
          </div>
        </div>
      </div>

      <!-- Offer Details -->
      <div class="detail-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
          </svg>
          Offer Details
        </h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Offer Date:</span>
            <span class="detail-value">{{ formatDate(offer.offer_date) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Offered CTC:</span>
            <span class="detail-value ctc-highlight">₹{{ formatCurrency(offer.offered_ctc) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Joining Date:</span>
            <span class="detail-value">{{ formatDate(offer.joining_date) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Days to Join:</span>
            <span class="detail-value">{{ getDaysToJoin() }}</span>
          </div>
        </div>
      </div>

      <!-- Status Information -->
      <div class="detail-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          Status Information
        </h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Offer Status:</span>
            <span class="detail-value">
              <span class="status-badge" :class="getOfferStatusClass(offer.offer_status)">
                {{ offer.offer_status }}
              </span>
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Background Check:</span>
            <span class="detail-value">
              <span class="status-badge" :class="getBackgroundCheckClass(offer.background_check_status)">
                {{ offer.background_check_status }}
              </span>
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Documents Status:</span>
            <span class="detail-value">
              <span class="status-badge" :class="offer.documents_submitted ? 'submitted' : 'pending'">
                {{ offer.documents_submitted ? 'Submitted' : 'Pending' }}
              </span>
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Active Status:</span>
            <span class="detail-value">
              <span class="status-badge" :class="offer.is_active ? 'active' : 'inactive'">
                {{ offer.is_active ? 'Active' : 'Inactive' }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="detail-section full-width">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          Offer Timeline
        </h4>
        <div class="timeline-content">
          <div class="timeline-item">
            <div class="timeline-date">{{ formatDate(offer.offer_date) }}</div>
            <div class="timeline-event">Offer Made</div>
            <div class="timeline-description">Job offer extended to candidate</div>
          </div>
          <div v-if="offer.offer_status === 'ACCEPTED'" class="timeline-item">
            <div class="timeline-date">{{ formatDate(offer.offer_date) }}</div>
            <div class="timeline-event">Offer Accepted</div>
            <div class="timeline-description">Candidate accepted the job offer</div>
          </div>
          <div class="timeline-item future" :class="{ 'current': isJoiningDateToday() }">
            <div class="timeline-date">{{ formatDate(offer.joining_date) }}</div>
            <div class="timeline-event">Expected Joining</div>
            <div class="timeline-description">Candidate expected to join</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { HRApiService } from '../../services/hrApiService'

export default {
  name: 'OfferContent',
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  emits: ['refresh', 'edit', 'back'],
  setup(props, { emit }) {
    // State
    const candidate = ref(null)
    const company = ref(null)
    const loading = ref(false)

    // Methods
    const fetchCandidate = async () => {
      if (props.offer.candidate_id) {
        try {
          const result = await HRApiService.getCandidateById(props.offer.candidate_id)
          if (result.success) {
            candidate.value = result.data
          }
        } catch (error) {
          console.error('Error fetching candidate:', error)
        }
      }
    }

    const fetchCompany = async () => {
      if (props.offer.company_id) {
        try {
          const result = await HRApiService.getCompanies()
          if (result.success) {
            const companies = result.data || []
            company.value = companies.find(c => c.id === props.offer.company_id)
          }
        } catch (error) {
          console.error('Error fetching company:', error)
        }
      }
    }

    const fetchRelatedData = async () => {
      loading.value = true
      try {
        await Promise.all([
          fetchCandidate(),
          fetchCompany()
        ])
      } catch (error) {
        console.error('Error fetching related data:', error)
      } finally {
        loading.value = false
      }
    }

    // Watch for offer changes
    watch(() => props.offer, async (newOffer) => {
      if (newOffer) {
        await fetchRelatedData()
      }
    }, { immediate: true })

    const handleEdit = () => {
      emit('edit', props.offer)
    }

    const handleBack = () => {
      emit('back')
    }

    const getOfferInitials = () => {
      const candidateName = getCandidateName()
      if (candidateName === 'N/A' || candidateName === 'Loading...') return 'OF'
      return candidateName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const getCandidateName = () => {
      if (candidate.value?.person) {
        const person = candidate.value.person
        const parts = [person.first_name, person.middle_name, person.last_name].filter(Boolean)
        return parts.join(' ') || person.preferred_name || 'N/A'
      }
      return 'Loading...'
    }

    const getCandidateEmail = () => {
      if (candidate.value?.person?.contacts && candidate.value.person.contacts.length > 0) {
        return candidate.value.person.contacts[0].email_primary || 'N/A'
      }
      return 'N/A'
    }

    const getCandidatePhone = () => {
      if (candidate.value?.person?.contacts && candidate.value.person.contacts.length > 0) {
        return candidate.value.person.contacts[0].phone_mobile || 'N/A'
      }
      return 'N/A'
    }

    const getCompanyName = () => {
      if (company.value?.company_name) {
        return `${company.value.company_name} (${company.value.company_code})`
      }
      return props.offer.company_id ? 'Loading...' : 'N/A'
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

    const getDaysToJoin = () => {
      if (!props.offer.joining_date) return 'N/A'
      
      const joiningDate = new Date(props.offer.joining_date)
      const today = new Date()
      const diffTime = joiningDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 0) {
        return `${Math.abs(diffDays)} days ago`
      } else if (diffDays === 0) {
        return 'Today'
      } else {
        return `${diffDays} days`
      }
    }

    const isJoiningDateToday = () => {
      if (!props.offer.joining_date) return false
      
      const joiningDate = new Date(props.offer.joining_date)
      const today = new Date()
      
      return joiningDate.toDateString() === today.toDateString()
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
        case 'in_progress': return 'in-progress'
        case 'completed': return 'completed'
        case 'failed': return 'failed'
        default: return 'pending'
      }
    }

    return {
      loading,
      candidate,
      company,
      getOfferInitials,
      getCandidateName,
      getCandidateEmail,
      getCandidatePhone,
      getCompanyName,
      formatDate,
      formatCurrency,
      getDaysToJoin,
      isJoiningDateToday,
      getOfferStatusClass,
      getBackgroundCheckClass,
      handleEdit,
      handleBack
    }
  }
}
</script>

<style scoped>
.interview-content {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.interview-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.interview-avatar {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
}

.interview-details h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.interview-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.separator {
  color: #d1d5db;
}

.content-actions {
  display: flex;
  gap: 0.75rem;
}

.back-btn,
.edit-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
}

.back-btn {
  background: #f3f4f6;
  color: #374151;
}

.back-btn:hover {
  background: #e5e7eb;
}

.edit-btn {
  background: #3b82f6;
  color: white;
}

.edit-btn:hover {
  background: #2563eb;
}

.back-btn svg,
.edit-btn svg {
  width: 1rem;
  height: 1rem;
}

.status-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  flex-wrap: wrap;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.status-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
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
  background: #dcfce7;
  color: #166534;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.rescheduled {
  background: #dbeafe;
  color: #3b82f6;
}

.status-badge.offered {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.accepted {
  background: #dcfce7;
  color: #166534;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.withdrawn {
  background: #f3f4f6;
  color: #6b7280;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.failed {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.submitted {
  background: #dcfce7;
  color: #166534;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.interview-date {
  font-size: 1.125rem;
  font-weight: 700;
  color: #3b82f6;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-section {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.detail-section.full-width {
  grid-column: 1 / -1;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.section-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.detail-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 0.5rem;
  align-items: center;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.detail-value {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.detail-value.ctc-highlight {
  color: #059669;
  font-weight: 700;
  font-size: 1rem;
}

.feedback-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feedback-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feedback-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.feedback-text {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  padding: 0.75rem;
  background: white;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border-left: 4px solid #3b82f6;
  position: relative;
}

.timeline-item.future {
  border-left-color: #d1d5db;
  opacity: 0.7;
}

.timeline-item.current {
  border-left-color: #059669;
  background: #f0fdf4;
  opacity: 1;
}

.timeline-date {
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  min-width: 100px;
}

.timeline-event {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  min-width: 120px;
}

.timeline-description {
  font-size: 0.875rem;
  color: #6b7280;
  flex: 1;
}

.timeline-item.future .timeline-date,
.timeline-item.future .timeline-event {
  color: #6b7280;
}

.timeline-item.current .timeline-date,
.timeline-item.current .timeline-event {
  color: #059669;
}

/* Responsive Design */
@media (max-width: 768px) {
  .interview-content {
    margin: 0.5rem;
    padding: 1rem;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .status-section {
    flex-direction: column;
    gap: 1rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .detail-item {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .timeline-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .timeline-date,
  .timeline-event {
    min-width: auto;
  }
}
</style>
