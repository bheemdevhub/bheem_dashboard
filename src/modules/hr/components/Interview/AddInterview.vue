<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div class="header-text">
            <h2>{{ isEdit ? 'Edit Interview' : 'Schedule New Interview' }}</h2>
            <p>{{ isEdit ? 'Update interview information' : 'Create a new interview schedule' }}</p>
          </div>
        </div>
        <button @click="closeModal" class="close-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="interview-form">
          <!-- Interview Details Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h3>Interview Details</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label required">Candidate</label>
                <select 
                  v-model="formData.candidate_id" 
                  class="form-input"
                  :class="{ 'error': errors.candidate_id }"
                  required 
                >
                  <option value="">Select Candidate</option>
                  <option 
                    v-for="candidate in candidates" 
                    :key="candidate.id" 
                    :value="candidate.id"
                  >
                    {{ getCandidateName(candidate) }}
                  </option>
                </select>
                <span v-if="errors.candidate_id" class="error-text">{{ errors.candidate_id }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Interviewer</label>
                <select 
                  v-model="formData.interviewer_id" 
                  class="form-input"
                  :class="{ 'error': errors.interviewer_id }"
                  required 
                >
                  <option value="">Select Interviewer</option>
                  <option 
                    v-for="employee in employees" 
                    :key="employee.id" 
                    :value="employee.id"
                  >
                    {{ getEmployeeName(employee) }}
                  </option>
                </select>
                <span v-if="errors.interviewer_id" class="error-text">{{ errors.interviewer_id }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Company</label>
                <select 
                  v-model="formData.company_id" 
                  class="form-input"
                  :class="{ 'error': errors.company_id }"
                  required 
                >
                  <option value="">Select Company</option>
                  <option 
                    v-for="company in companies" 
                    :key="company.id" 
                    :value="company.id"
                  >
                    {{ company.company_name }}
                  </option>
                </select>
                <span v-if="errors.company_id" class="error-text">{{ errors.company_id }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Interview Date & Time</label>
                <input 
                  v-model="formData.interview_date_time" 
                  type="datetime-local" 
                  class="form-input"
                  :class="{ 'error': errors.interview_date_time }"
                  required 
                />
                <span v-if="errors.interview_date_time" class="error-text">{{ errors.interview_date_time }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Round Type</label>
                <select 
                  v-model="formData.round_type" 
                  class="form-input"
                  :class="{ 'error': errors.round_type }"
                  required 
                >
                  <option value="">Select Round Type</option>
                  <option value="HR">HR</option>
                  <option value="Technical">Technical</option>
                  <option value="Managerial">Managerial</option>
                  <option value="Final">Final</option>
                  <option value="Behavioral">Behavioral</option>
                </select>
                <span v-if="errors.round_type" class="error-text">{{ errors.round_type }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Status</label>
                <select 
                  v-model="formData.status" 
                  class="form-input"
                  :class="{ 'error': errors.status }"
                  required 
                >
                  <option value="">Select Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Rescheduled">Rescheduled</option>
                </select>
                <span v-if="errors.status" class="error-text">{{ errors.status }}</span>
              </div>
            </div>
          </div>

          <!-- Feedback Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.5 8a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM3 16a6 6 0 0112 0v1H3v-1z"/>
                <path d="M16.5 8a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM12 16a6 6 0 0112 0v1H12v-1z"/>
              </svg>
              <h3>Feedback & Rating</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Rating</label>
                <select 
                  v-model="formData.rating" 
                  class="form-input"
                >
                  <option value="">Select Rating</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Below Average">Below Average</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Feedback Comments</label>
                <textarea 
                  v-model="formData.feedback_comments" 
                  class="form-input"
                  rows="4"
                  placeholder="Enter detailed feedback about the candidate's performance..."
                ></textarea>
              </div>

              <div class="form-group full-width">
                <label class="form-label">Next Step</label>
                <textarea 
                  v-model="formData.next_step" 
                  class="form-input"
                  rows="3"
                  placeholder="Describe the next steps in the interview process..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <svg v-if="loading" class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              {{ isEdit ? 'Update Interview' : 'Schedule Interview' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import { useToast } from 'vue-toastification'

export default {
  name: 'AddInterview',
  props: {
    isVisible: { type: Boolean, default: false },
    interview: { type: Object, default: null }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const toast = useToast()
    const loading = ref(false)
    const errors = ref({})
    const candidates = ref([])
    const employees = ref([])
    const companies = ref([])
    const isLoadingData = ref(false)

    // Form data
    const formData = reactive({
      candidate_id: '',
      interview_date_time: '',
      interviewer_id: '',
      round_type: '',
      feedback_comments: '',
      rating: '',
      next_step: '',
      status: 'Scheduled',
      company_id: '',
      is_active: true
    })

    const isEdit = computed(() => !!props.interview)

    // Watch for interview data to populate form
    watch(() => props.interview, (newInterview) => {
      if (newInterview) {
        Object.keys(formData).forEach(key => {
          if (newInterview[key] !== undefined) {
            if (key === 'interview_date_time' && newInterview[key]) {
              // Convert ISO string to datetime-local format
              const date = new Date(newInterview[key])
              formData[key] = date.toISOString().slice(0, 16)
            } else {
              formData[key] = newInterview[key]
            }
          }
        })
      }
    }, { immediate: true })

    // Methods
    const loadData = async () => {
      isLoadingData.value = true
      try {
        // Load candidates
        const candidatesResponse = await HRApiService.getCandidates()
        if (candidatesResponse.success) {
          candidates.value = candidatesResponse.data.items || candidatesResponse.data.results || candidatesResponse.data || []
        }

        // Load employees (for interviewers)
        const employeesResponse = await HRApiService.getEmployees()
        if (employeesResponse.success) {
          employees.value = employeesResponse.data.items || employeesResponse.data.results || employeesResponse.data || []
        }

        // Load companies
        const companiesResponse = await HRApiService.getCompanies()
        if (companiesResponse.success) {
          companies.value = companiesResponse.data.filter(company => company.is_active)
        }
      } catch (error) {
        console.error('Error loading data:', error)
        toast.error('Error loading form data. Please try again.', {
          timeout: 3000,
          icon: '❌'
        })
      } finally {
        isLoadingData.value = false
      }
    }

    const getCandidateName = (candidate) => {
      if (!candidate?.person) return 'Unknown Candidate'
      const parts = [candidate.person.first_name, candidate.person.middle_name, candidate.person.last_name].filter(Boolean)
      return parts.join(' ') || candidate.person.preferred_name || 'Unknown Candidate'
    }

    const getEmployeeName = (employee) => {
      if (!employee) return 'Unknown Employee'
      const parts = [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean)
      return parts.join(' ') || employee.preferred_name || 'Unknown Employee'
    }

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      // Validate required fields
      const requiredFields = [
        'candidate_id', 'interviewer_id', 'company_id', 'interview_date_time', 
        'round_type', 'status'
      ]

      requiredFields.forEach(field => {
        if (!formData[field]) {
          const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          errors.value[field] = `${fieldName} is required`
          isValid = false
        }
      })

      // Validate interview date is in the future (for new interviews)
      if (formData.interview_date_time && !isEdit.value) {
        const interviewDate = new Date(formData.interview_date_time)
        const now = new Date()
        if (interviewDate <= now) {
          errors.value.interview_date_time = 'Interview date must be in the future'
          isValid = false
        }
      }

      return isValid
    }

    const prepareSubmissionData = () => {
      const data = { ...formData }

      // Convert datetime-local to ISO string
      if (data.interview_date_time) {
        data.interview_date_time = new Date(data.interview_date_time).toISOString()
      }

      // Clean up empty string values
      Object.keys(data).forEach(key => {
        if (data[key] === '' && ['feedback_comments', 'rating', 'next_step'].includes(key)) {
          data[key] = data[key] || null
        }
      })

      return data
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        const errorFields = Object.keys(errors.value)
        if (errorFields.length > 0) {
          const firstError = errors.value[errorFields[0]]
          toast.warning(`Please fix the following: ${firstError}`, {
            timeout: 4000,
            icon: '⚠️'
          })
        }
        return
      }

      loading.value = true

      try {
        const data = prepareSubmissionData()
        console.log('Prepared data for submission:', data)
        
        let result

        if (isEdit.value) {
          console.log('Editing interview with ID:', props.interview.id)
          result = await HRApiService.updateInterview(props.interview.id, data)
        } else {
          console.log('Creating new interview')
          result = await HRApiService.createInterview(data)
        }

        console.log('API result:', result)

        if (result.success) {
          const candidateName = getCandidateName(candidates.value.find(c => c.id === formData.candidate_id))
          const actionText = isEdit.value ? 'updated' : 'scheduled'
          
          toast.success(`Interview with "${candidateName}" has been ${actionText} successfully!`, {
            timeout: 4000,
            icon: '✅'
          })

          emit('success', result.data)
          closeModal()
        } else {
          const actionText = isEdit.value ? 'update' : 'schedule'
          let errorMessage = 'Unknown error occurred'
          
          if (result.error && typeof result.error === 'string') {
            errorMessage = result.error
          }

          // Improve error messages for common issues
          if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
            errorMessage = 'An interview with this information already exists'
          } else if (errorMessage.includes('required')) {
            errorMessage = 'Please fill in all required fields'
          } else if (errorMessage.includes('invalid')) {
            errorMessage = 'Please check the information and try again'
          }
          
          toast.error(`Failed to ${actionText} interview: ${errorMessage}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error saving interview:', error)
        const actionText = isEdit.value ? 'update' : 'schedule'
        
        let errorMessage = 'Unknown error occurred'
        if (error && typeof error.message === 'string') {
          errorMessage = error.message
        }
        
        toast.error(`Failed to ${actionText} interview: ${errorMessage}`, {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        loading.value = false
      }
    }

    const closeModal = () => {
      // Reset form data
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'string') {
          formData[key] = key === 'status' ? 'Scheduled' : ''
        } else if (typeof formData[key] === 'boolean') {
          formData[key] = key === 'is_active'
        } else {
          formData[key] = ''
        }
      })

      errors.value = {}
      emit('close')
    }

    // Initialize
    onMounted(() => {
      loadData()
    })

    return {
      loading,
      errors,
      formData,
      candidates,
      employees,
      companies,
      isLoadingData,
      isEdit,
      getCandidateName,
      getEmployeeName,
      handleSubmit,
      closeModal
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.header-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.header-text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.header-text p {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
}

.close-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background: #fafbfc;
}

.interview-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.section-header {
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

.section-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.form-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-label.required::after {
  content: '*';
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error {
  border-color: #ef4444;
  background: #fef2f2;
}

.error-text {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: white;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  min-width: 120px;
  justify-content: center;
}

.btn svg {
  width: 1rem;
  height: 1rem;
}

.btn-secondary {
  background: white;
  border-color: #d1d5db;
  color: #374151;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  border-color: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-container {
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1.5rem;
  }
  
  .interview-form {
    padding: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
