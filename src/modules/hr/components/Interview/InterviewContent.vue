<template>
  <div class="interview-content">
    <div class="content-header">
      <div class="interview-info">
        <div class="interview-avatar">
          {{ getInterviewInitials() }}
        </div>
        <div class="interview-details">
          <h2>{{ getCandidateName() }}</h2>
          <div class="interview-meta">
            <span>{{ getRoundType() }}</span>
            <span class="separator">•</span>
            <span>{{ getInterviewerName() }}</span>
            <span class="separator">•</span>
            <span>{{ formatDateTime(interview.interview_date_time) }}</span>
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
        <span class="status-label">Status</span>
        <span class="status-badge" :class="getStatusClass(interview.status)">
          {{ interview.status || 'Scheduled' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Rating</span>
        <span class="rating-badge" :class="getRatingClass(interview.rating)">
          {{ interview.rating || 'Not Rated' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Active</span>
        <span class="status-badge" :class="interview.is_active ? 'active' : 'inactive'">
          {{ interview.is_active ? 'Active' : 'Inactive' }}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Interview Date</span>
        <div class="interview-date">
          {{ formatDate(interview.interview_date_time) }}
        </div>
      </div>
    </div>

    <!-- Interview Details -->
    <div class="details-grid">
      <!-- Basic Information -->
      <div class="detail-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
          Basic Information
        </h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Candidate:</span>
            <span class="detail-value">{{ getCandidateName() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Candidate Email:</span>
            <span class="detail-value">{{ getCandidateEmail() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Candidate Phone:</span>
            <span class="detail-value">{{ getCandidatePhone() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Interviewer:</span>
            <span class="detail-value">{{ getInterviewerName() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Interviewer Email:</span>
            <span class="detail-value">{{ getInterviewerEmail() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Round Type:</span>
            <span class="detail-value">{{ getRoundType() }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Company:</span>
            <span class="detail-value">{{ getCompanyName() }}</span>
          </div>
        </div>
      </div>

      <!-- Interview Details -->
      <div class="detail-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          Interview Status
        </h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Status:</span>
            <span class="detail-value">
              <span class="status-badge" :class="getStatusClass(interview.status)">
                {{ interview.status || 'Scheduled' }}
              </span>
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Rating:</span>
            <span class="detail-value">
              <span class="rating-badge" :class="getRatingClass(interview.rating)">
                {{ interview.rating || 'Not Rated' }}
              </span>
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Date & Time:</span>
            <span class="detail-value">{{ formatDateTime(interview.interview_date_time) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">{{ getDuration() }}</span>
          </div>
        </div>
      </div>

      <!-- Feedback Section -->
      <div class="detail-section full-width" v-if="interview.feedback_comments || interview.next_step">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          Feedback & Next Steps
        </h4>
        <div class="feedback-content">
          <div v-if="interview.feedback_comments" class="feedback-item">
            <h5 class="feedback-label">Feedback Comments:</h5>
            <p class="feedback-text">{{ interview.feedback_comments }}</p>
          </div>
          <div v-if="interview.next_step" class="feedback-item">
            <h5 class="feedback-label">Next Steps:</h5>
            <p class="feedback-text">{{ interview.next_step }}</p>
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
  name: 'InterviewContent',
  props: {
    interview: {
      type: Object,
      required: true
    }
  },
  emits: ['refresh', 'edit', 'back'],
  setup(props, { emit }) {
    // State
    const candidate = ref(null)
    const interviewer = ref(null)
    const company = ref(null)
    const loading = ref(false)

    // Helper methods first
    const handleEdit = () => {
      emit('edit', props.interview)
    }

    const handleBack = () => {
      emit('back')
    }

    const getCandidateName = () => {
      if (candidate.value?.person) {
        const person = candidate.value.person
        const parts = [person.first_name, person.middle_name, person.last_name].filter(Boolean)
        return parts.join(' ') || person.preferred_name || 'N/A'
      }
      return 'Loading...'
    }

    const getInterviewInitials = () => {
      const candidateName = getCandidateName()
      if (candidateName === 'N/A') return 'IV'
      return candidateName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
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

    const getInterviewerName = () => {
      if (interviewer.value?.person) {
        const person = interviewer.value.person
        const parts = [person.first_name, person.middle_name, person.last_name].filter(Boolean)
        return parts.join(' ') || person.preferred_name || 'N/A'
      }
      return 'Loading...'
    }

    const getInterviewerEmail = () => {
      if (interviewer.value?.person?.contacts && interviewer.value.person.contacts.length > 0) {
        return interviewer.value.person.contacts[0].email_primary || 'N/A'
      }
      return 'N/A'
    }

    const getRoundType = () => {
      return props.interview.round_type || 'N/A'
    }

    const getCompanyName = () => {
      if (company.value?.company_name) {
        return `${company.value.company_name} (${company.value.company_code})`
      }
      return props.interview.company_id ? 'Loading...' : 'N/A'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleDateString('en-GB') // DD/MM/YYYY format
    }

    const formatDateTime = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getDuration = () => {
      // Default interview duration (this could be a field in the interview object)
      return '1 hour (estimated)'
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

    const getRatingClass = (rating) => {
      if (!rating) return 'not-rated'
      const ratingLower = rating.toLowerCase()
      
      switch (ratingLower) {
        case 'excellent': return 'excellent'
        case 'good': return 'good'
        case 'average': return 'average'
        case 'below average': return 'below-average'
        case 'poor': return 'poor'
        default: return 'not-rated'
      }
    }

    // API methods
    const fetchCandidate = async () => {
      if (props.interview.candidate_id) {
        try {
          const result = await HRApiService.getCandidateById(props.interview.candidate_id)
          if (result.success) {
            candidate.value = result.data
          }
        } catch (error) {
          console.error('Error fetching candidate:', error)
        }
      }
    }

    const fetchInterviewer = async () => {
      if (props.interview.interviewer_id) {
        try {
          const result = await HRApiService.getEmployeeById(props.interview.interviewer_id)
          if (result.success) {
            interviewer.value = result.data
          }
        } catch (error) {
          console.error('Error fetching interviewer:', error)
        }
      }
    }

    const fetchCompany = async () => {
      if (props.interview.company_id) {
        try {
          const response = await fetch(`/api/accounting/companies/companies/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          
          if (response.ok) {
            const companies = await response.json()
            company.value = companies.find(c => c.id === props.interview.company_id)
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
          fetchInterviewer(),
          fetchCompany()
        ])
      } catch (error) {
        console.error('Error fetching related data:', error)
      } finally {
        loading.value = false
      }
    }

    // Watch for interview changes to fetch related data
    watch(() => props.interview, async (newInterview) => {
      if (newInterview) {
        await fetchRelatedData()
      }
    }, { immediate: true })

    return {
      loading,
      candidate,
      interviewer,
      company,
      getInterviewInitials,
      getCandidateName,
      getCandidateEmail,
      getCandidatePhone,
      getInterviewerName,
      getInterviewerEmail,
      getRoundType,
      getCompanyName,
      formatDate,
      formatDateTime,
      getDuration,
      getStatusClass,
      getRatingClass,
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
  gap: 0.5rem;
}

.edit-btn {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

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

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.rating-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
}

.rating-badge.excellent {
  background: #dcfce7;
  color: #166534;
}

.rating-badge.good {
  background: #dbeafe;
  color: #1e40af;
}

.rating-badge.average {
  background: #fef3c7;
  color: #92400e;
}

.rating-badge.below-average {
  background: #fed7aa;
  color: #ea580c;
}

.rating-badge.poor {
  background: #fee2e2;
  color: #991b1b;
}

.rating-badge.not-rated {
  background: #f3f4f6;
  color: #6b7280;
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
}
</style>
