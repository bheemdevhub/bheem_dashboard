<template>
  <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          {{ isEdit ? 'Edit Onboarding Record' : 'Create New Onboarding Record' }}
        </h2>
        <button @click="$emit('close')" class="modal-close-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="onboarding-form">
          <!-- Basic Information -->
          <div class="form-section">
            <h3 class="section-title">Basic Information</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="candidate" class="form-label required">Candidate</label>
                <select 
                  id="candidate" 
                  v-model="formData.candidate_id" 
                  class="form-select"
                  required
                  :disabled="isEdit"
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
              </div>

              <div class="form-group">
                <label for="offer" class="form-label required">Offer</label>
                <select 
                  id="offer" 
                  v-model="formData.offer_id" 
                  class="form-select"
                  required
                  :disabled="isEdit"
                >
                  <option value="">Select an offer</option>
                  <option 
                    v-for="offer in filteredOffers" 
                    :key="offer.id" 
                    :value="offer.id"
                  >
                    {{ getOfferDisplayText(offer) }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="company" class="form-label required">Company</label>
                <select 
                  id="company" 
                  v-model="formData.company_id" 
                  class="form-select"
                  required
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
              </div>
            </div>
          </div>

          <!-- Document Collection -->
          <div class="form-section">
            <h3 class="section-title">Document Collection</h3>
            
            <div class="checkbox-grid">
              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.offer_letter_signed"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Offer Letter Signed</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.id_proof_submitted"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">ID Proof Submitted</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.educational_documents"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Educational Documents</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.background_verification"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Background Verification</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.bank_account_details"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Bank Account Details</span>
                </label>
              </div>
            </div>
          </div>

          <!-- System Setup -->
          <div class="form-section">
            <h3 class="section-title">System Setup</h3>
            
            <div class="checkbox-grid">
              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.work_email_created"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Work Email Created</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.system_allocation"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">System Allocation</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.software_access_setup"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Software Access Setup</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.employee_id_created"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Employee ID Created</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Orientation & Training -->
          <div class="form-section">
            <h3 class="section-title">Orientation & Training</h3>
            
            <div class="checkbox-grid">
              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.welcome_kit_given"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Welcome Kit Given</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.assigned_buddy"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Assigned Buddy</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.first_day_orientation"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">First Day Orientation</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.department_introduction"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Department Introduction</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.hr_policy_acknowledgement"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">HR Policy Acknowledgement</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.training_plan_shared"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Training Plan Shared</span>
                </label>
              </div>

              <div class="checkbox-item">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.probation_period_set"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Probation Period Set</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="form-section">
            <h3 class="section-title">Status</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="formData.is_active"
                    class="checkbox-input"
                  />
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">Active</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="$emit('close')" type="button" class="btn-secondary">
          Cancel
        </button>
        <button @click="handleSubmit" type="submit" class="btn-primary" :disabled="loading">
          <svg v-if="loading" class="loading-spinner" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          {{ loading ? 'Saving...' : (isEdit ? 'Update' : 'Create') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { HRApiService } from '../../services/hrApiService'
import { useToast } from 'vue-toastification'

export default {
  name: 'AddOnboarding',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    onboarding: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // State
    const loading = ref(false)
    const candidates = ref([])
    const offers = ref([])
    const companies = ref([])
    
    // Computed
    const isEdit = computed(() => !!props.onboarding)
    
    const filteredOffers = computed(() => {
      if (!props.formData?.candidate_id) return offers.value
      return offers.value.filter(offer => offer.candidate_id === props.formData.candidate_id)
    })

    // Form data
    const formData = ref({
      candidate_id: '',
      offer_id: '',
      company_id: '',
      offer_letter_signed: false,
      id_proof_submitted: false,
      educational_documents: false,
      background_verification: false,
      bank_account_details: false,
      work_email_created: false,
      system_allocation: false,
      software_access_setup: false,
      welcome_kit_given: false,
      assigned_buddy: false,
      first_day_orientation: false,
      department_introduction: false,
      hr_policy_acknowledgement: false,
      training_plan_shared: false,
      probation_period_set: false,
      employee_id_created: false,
      is_active: true
    })

    // Methods
    const resetForm = () => {
      formData.value = {
        candidate_id: '',
        offer_id: '',
        company_id: '',
        offer_letter_signed: false,
        id_proof_submitted: false,
        educational_documents: false,
        background_verification: false,
        bank_account_details: false,
        work_email_created: false,
        system_allocation: false,
        software_access_setup: false,
        welcome_kit_given: false,
        assigned_buddy: false,
        first_day_orientation: false,
        department_introduction: false,
        hr_policy_acknowledgement: false,
        training_plan_shared: false,
        probation_period_set: false,
        employee_id_created: false,
        is_active: true
      }
    }

    const loadFormData = () => {
      if (props.onboarding) {
        formData.value = { ...props.onboarding }
      } else {
        resetForm()
      }
    }

    const fetchDropdownData = async () => {
      try {
        // Fetch candidates
        const candidatesResult = await HRApiService.getCandidates()
        if (candidatesResult.success) {
          candidates.value = candidatesResult.data.items || candidatesResult.data.results || candidatesResult.data || []
        }

        // Fetch offers
        const offersResult = await HRApiService.getOffers()
        if (offersResult.success) {
          offers.value = offersResult.data || []
        }

        // Fetch companies
        const companiesResult = await HRApiService.getCompanies()
        if (companiesResult.success) {
          companies.value = companiesResult.data || []
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error)
        toast.error('Failed to load form data')
      }
    }

    const getCandidateName = (candidate) => {
      if (!candidate?.person) return 'Unknown Candidate'
      const parts = [candidate.person.first_name, candidate.person.middle_name, candidate.person.last_name].filter(Boolean)
      return parts.join(' ') || candidate.person.preferred_name || 'Unknown Candidate'
    }

    const getOfferDisplayText = (offer) => {
      const candidate = candidates.value.find(c => c.id === offer.candidate_id)
      const candidateName = candidate ? getCandidateName(candidate) : 'Unknown'
      return `${candidateName} - ${offer.offer_status || 'No Status'}`
    }

    const validateForm = () => {
      if (!formData.value.candidate_id) {
        toast.error('Please select a candidate')
        return false
      }
      
      if (!formData.value.offer_id) {
        toast.error('Please select an offer')
        return false
      }
      
      if (!formData.value.company_id) {
        toast.error('Please select a company')
        return false
      }
      
      return true
    }

    const handleSubmit = async () => {
      if (!validateForm()) return
      
      loading.value = true
      
      try {
        const submitData = { ...formData.value }
        
        let result
        if (isEdit.value) {
          result = await HRApiService.updateOnboarding(props.onboarding.id, submitData)
        } else {
          result = await HRApiService.createOnboarding(submitData)
        }
        
        if (result.success) {
          toast.success(`Onboarding record ${isEdit.value ? 'updated' : 'created'} successfully!`)
          emit('success', result.data)
          emit('close')
        } else {
          toast.error(`Failed to ${isEdit.value ? 'update' : 'create'} onboarding record: ${result.error}`)
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error(`Failed to ${isEdit.value ? 'update' : 'create'} onboarding record`)
      } finally {
        loading.value = false
      }
    }

    const handleOverlayClick = () => {
      emit('close')
    }

    // Watchers
    watch(() => props.isVisible, (newVal) => {
      if (newVal) {
        loadFormData()
        fetchDropdownData()
      }
    })

    watch(() => formData.value.candidate_id, (newCandidateId) => {
      // Reset offer selection when candidate changes
      if (newCandidateId) {
        formData.value.offer_id = ''
        // Auto-select company if offer has company info
        const candidateOffers = offers.value.filter(offer => offer.candidate_id === newCandidateId)
        if (candidateOffers.length === 1) {
          formData.value.offer_id = candidateOffers[0].id
          if (candidateOffers[0].company_id) {
            formData.value.company_id = candidateOffers[0].company_id
          }
        }
      }
    })

    watch(() => formData.value.offer_id, (newOfferId) => {
      // Auto-select company from offer
      if (newOfferId) {
        const selectedOffer = offers.value.find(offer => offer.id === newOfferId)
        if (selectedOffer?.company_id) {
          formData.value.company_id = selectedOffer.company_id
        }
      }
    })

    // Lifecycle
    onMounted(() => {
      if (props.isVisible) {
        loadFormData()
        fetchDropdownData()
      }
    })

    return {
      loading,
      candidates,
      offers,
      companies,
      formData,
      isEdit,
      filteredOffers,
      resetForm,
      loadFormData,
      fetchDropdownData,
      getCandidateName,
      getOfferDisplayText,
      validateForm,
      handleSubmit,
      handleOverlayClick
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  width: 800px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f8f9fa;
  border-radius: 12px 12px 0 0;
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.modal-close-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  color: #6b7280;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-body {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.onboarding-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
}

.section-title {
  margin: 0;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
}

.form-section > :not(.section-title) {
  padding: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-label.required::after {
  content: ' *';
  color: #ef4444;
}

.form-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-select:disabled {
  background: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  width: 100%;
}

.checkbox-label:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  position: relative;
}

.checkbox-input:checked + .checkbox-custom {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  width: 0.5rem;
  height: 0.75rem;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  position: absolute;
  top: 1px;
}

.checkbox-text {
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;
}

.btn-secondary,
.btn-primary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-container {
    width: 95vw;
    max-height: 95vh;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}
</style>
