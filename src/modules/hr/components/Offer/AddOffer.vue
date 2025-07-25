<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="header-text">
            <h2>{{ isEdit ? 'Edit Offer' : 'Create New Offer' }}</h2>
            <p>{{ isEdit ? 'Update offer information' : 'Extend a job offer to a candidate' }}</p>
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
        <form @submit.prevent="handleSubmit" class="offer-form">
          <!-- Offer Details Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3>Offer Details</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label required">Candidate</label>
                <select 
                  v-model="formData.candidate_id" 
                  class="form-input"
                  :class="{ error: errors.candidate_id }"
                  :disabled="isLoadingData"
                >
                  <option value="">Select a candidate</option>
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
                <label class="form-label required">Company</label>
                <select 
                  v-model="formData.company_id" 
                  class="form-input"
                  :class="{ error: errors.company_id }"
                  :disabled="isLoadingData"
                >
                  <option value="">Select a company</option>
                  <option 
                    v-for="company in companies" 
                    :key="company.id" 
                    :value="company.id"
                  >
                    {{ company.company_name }} ({{ company.company_code }})
                  </option>
                </select>
                <span v-if="errors.company_id" class="error-text">{{ errors.company_id }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Offer Date</label>
                <input 
                  type="date" 
                  v-model="formData.offer_date" 
                  class="form-input"
                  :class="{ error: errors.offer_date }"
                />
                <span v-if="errors.offer_date" class="error-text">{{ errors.offer_date }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Joining Date</label>
                <input 
                  type="date" 
                  v-model="formData.joining_date" 
                  class="form-input"
                  :class="{ error: errors.joining_date }"
                />
                <span v-if="errors.joining_date" class="error-text">{{ errors.joining_date }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Offered CTC (₹)</label>
                <input 
                  type="number" 
                  v-model="formData.offered_ctc" 
                  class="form-input"
                  :class="{ error: errors.offered_ctc }"
                  placeholder="e.g., 1200000"
                  step="1000"
                  min="0"
                />
                <span v-if="errors.offered_ctc" class="error-text">{{ errors.offered_ctc }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Offer Status</label>
                <select 
                  v-model="formData.offer_status" 
                  class="form-input"
                  :class="{ error: errors.offer_status }"
                >
                  <option value="">Select status</option>
                  <option value="Offered">Offered</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>
                <span v-if="errors.offer_status" class="error-text">{{ errors.offer_status }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Background Check Status</label>
                <select 
                  v-model="formData.background_check_status" 
                  class="form-input"
                  :class="{ error: errors.background_check_status }"
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
                <span v-if="errors.background_check_status" class="error-text">{{ errors.background_check_status }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Information Section -->
          <div class="form-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <h3>Additional Information</h3>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <div class="checkbox-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="formData.documents_submitted"
                    />
                    Documents Submitted
                  </label>
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="formData.is_active"
                    />
                    Active Offer
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <svg v-if="loading" class="animate-spin" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
              </svg>
              <svg v-else viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ loading ? 'Saving...' : (isEdit ? 'Update Offer' : 'Create Offer') }}
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
  name: 'AddOffer',
  props: {
    isVisible: { type: Boolean, default: false },
    offer: { type: Object, default: null }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const toast = useToast()
    const loading = ref(false)
    const errors = ref({})
    const candidates = ref([])
    const companies = ref([])
    const isLoadingData = ref(false)

    // Form data
    const formData = reactive({
      candidate_id: '',
      company_id: '',
      offer_date: '',
      offered_ctc: '',
      joining_date: '',
      offer_status: 'Offered',
      background_check_status: 'Pending',
      documents_submitted: false,
      is_active: true
    })

    const isEdit = computed(() => !!props.offer)

    // Watch for offer data to populate form
    watch(() => props.offer, (newOffer) => {
      if (newOffer) {
        Object.keys(formData).forEach(key => {
          if (newOffer[key] !== undefined) {
            if (key === 'offer_date' || key === 'joining_date') {
              // Convert date to YYYY-MM-DD format for input[type="date"]
              if (newOffer[key]) {
                formData[key] = new Date(newOffer[key]).toISOString().split('T')[0]
              }
            } else {
              formData[key] = newOffer[key]
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

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      // Validate required fields
      const requiredFields = [
        'candidate_id', 'company_id', 'offer_date', 'joining_date', 
        'offered_ctc', 'offer_status', 'background_check_status'
      ]

      requiredFields.forEach(field => {
        if (!formData[field]) {
          const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          errors.value[field] = `${fieldName} is required`
          isValid = false
        }
      })

      // Validate CTC is positive
      if (formData.offered_ctc && formData.offered_ctc <= 0) {
        errors.value.offered_ctc = 'CTC must be greater than 0'
        isValid = false
      }

      // Validate joining date is after offer date
      if (formData.offer_date && formData.joining_date) {
        const offerDate = new Date(formData.offer_date)
        const joiningDate = new Date(formData.joining_date)
        if (joiningDate <= offerDate) {
          errors.value.joining_date = 'Joining date must be after offer date'
          isValid = false
        }
      }

      return isValid
    }

    const prepareSubmissionData = () => {
      const data = { ...formData }

      // Ensure numeric fields are properly formatted
      if (data.offered_ctc) {
        data.offered_ctc = parseFloat(data.offered_ctc)
      }

      return data
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        const errorFields = Object.keys(errors.value)
        if (errorFields.length > 0) {
          const firstError = errors.value[errorFields[0]]
          toast.warning(`Please fix the following: ${firstError}`, {
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
          console.log('Editing offer with ID:', props.offer.id)
          result = await HRApiService.updateOffer(props.offer.id, data)
        } else {
          console.log('Creating new offer')
          result = await HRApiService.createOffer(data)
        }

        console.log('API result:', result)

        if (result.success) {
          const candidateName = getCandidateName(candidates.value.find(c => c.id === formData.candidate_id))
          const actionText = isEdit.value ? 'updated' : 'created'
          
          toast.success(`Offer for "${candidateName}" has been ${actionText} successfully!`, {
            icon: '✅'
          })

          emit('success', result.data)
          closeModal()
        } else {
          const actionText = isEdit.value ? 'update' : 'create'
          let errorMessage = 'Unknown error occurred'
          
          if (result.error && typeof result.error === 'string') {
            errorMessage = result.error
          } else if (result.error && typeof result.error === 'object') {
            errorMessage = JSON.stringify(result.error)
          }

          // Improve error messages for common issues
          if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
            errorMessage = 'An offer with this information already exists'
          } else if (errorMessage.includes('required')) {
            errorMessage = 'Please fill in all required fields'
          } else if (errorMessage.includes('invalid')) {
            errorMessage = 'Please check your input values'
          }
          
          toast.error(`Failed to ${actionText} offer: ${errorMessage}`, {
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error saving offer:', error)
        const actionText = isEdit.value ? 'update' : 'create'
        
        let errorMessage = 'Unknown error occurred'
        if (error && typeof error.message === 'string') {
          errorMessage = error.message
        }
        
        toast.error(`Failed to ${actionText} offer: ${errorMessage}`, {
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
          formData[key] = key === 'offer_status' ? 'Offered' : key === 'background_check_status' ? 'Pending' : ''
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
      companies,
      isLoadingData,
      isEdit,
      getCandidateName,
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

.offer-form {
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

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
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
  
  .offer-form {
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
