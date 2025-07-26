<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="header-content">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
          </div>
          <div class="header-text">
            <h2>{{ isEdit ? 'Edit Company' : 'Add New Company' }}</h2>
            <p>{{ isEdit ? 'Update company information' : 'Create a new company profile' }}</p>
          </div>
        </div>
        <button @click="$emit('close')" class="close-btn">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="company-form">
          <!-- Basic Information Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
              </div>
              <h3>Basic Information</h3>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label required">Company Code</label>
                <input
                  v-model="formData.company_code"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.company_code }"
                  placeholder="e.g., BHM001"
                  required
                />
                <span v-if="errors.company_code" class="error-text">{{ errors.company_code }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Company Name</label>
                <input
                  v-model="formData.company_name"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.company_name }"
                  placeholder="Enter company name"
                  required
                />
                <span v-if="errors.company_name" class="error-text">{{ errors.company_name }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Legal Name</label>
                <input
                  v-model="formData.legal_name"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.legal_name }"
                  placeholder="Enter legal name"
                  required
                />
                <span v-if="errors.legal_name" class="error-text">{{ errors.legal_name }}</span>
              </div>

              <div class="form-group">
                <label class="form-label required">Company Type</label>
                <select
                  v-model="formData.company_type"
                  class="form-input"
                  :class="{ 'error': errors.company_type }"
                  required
                >
                  <option value="">Select company type</option>
                  <option value="HOLDING">Holding Company</option>
                  <option value="SUBSIDIARY">Subsidiary</option>
                </select>
                <span v-if="errors.company_type" class="error-text">{{ errors.company_type }}</span>
              </div>
            </div>
          </div>

          <!-- Financial Information Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
              </div>
              <h3>Financial Information</h3>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Parent Company ID</label>
                <input
                  v-model="formData.parent_company_id"
                  type="text"
                  class="form-input"
                  placeholder="Leave empty if root company"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Functional Currency ID</label>
                <input
                  v-model="formData.functional_currency_id"
                  type="text"
                  class="form-input"
                  placeholder="Enter functional currency ID"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Reporting Currency ID</label>
                <input
                  v-model="formData.reporting_currency_id"
                  type="text"
                  class="form-input"
                  placeholder="Enter reporting currency ID"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Consolidation Method</label>
                <select
                  v-model="formData.consolidation_method"
                  class="form-input"
                >
                  <option value="">Select consolidation method</option>
                  <option value="FULL">Full Consolidation</option>
                  <option value="EQUITY">Equity Method</option>
                  <option value="PROPORTIONAL">Proportional Consolidation</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Registration Details Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <h3>Registration Details</h3>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Tax ID</label>
                <input
                  v-model="formData.tax_id"
                  type="text"
                  class="form-input"
                  placeholder="Enter tax identification number"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Registration Number</label>
                <input
                  v-model="formData.registration_number"
                  type="text"
                  class="form-input"
                  placeholder="Enter registration number"
                />
              </div>
            </div>
          </div>

          <!-- Address Information Section -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.94L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.94C18.78,16.56 20,17.71 20,19Z"/>
                </svg>
              </div>
              <h3>Address Information</h3>
            </div>
            
            <div class="form-group full-width">
              <label class="form-label">Address</label>
              <textarea
                v-model="formData.address"
                class="form-input"
                rows="3"
                placeholder="Enter complete address"
              ></textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" @click="$emit('close')" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" :disabled="loading" class="btn btn-primary">
              <svg v-if="loading" class="animate-spin" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              {{ loading ? 'Saving...' : (isEdit ? 'Update Company' : 'Create Company') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { AccountingApiService } from '../../services/accountingApiService'
import { useToast } from 'vue-toastification'

export default {
  name: 'AddCompany',
  props: {
    company: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    const toast = useToast()
    
    // State
    const isVisible = ref(true)
    const loading = ref(false)
    const errors = ref({})

    // Form data
    const formData = reactive({
      company_code: '',
      company_name: '',
      legal_name: '',
      company_type: '',
      parent_company_id: null,
      functional_currency_id: null,
      reporting_currency_id: null,
      consolidation_method: '',
      address: '',
      tax_id: '',
      registration_number: ''
    })

    // Computed
    const isEdit = computed(() => !!props.company?.id)

    const isFormValid = computed(() => {
      return formData.company_code.trim() &&
             formData.company_name.trim() &&
             formData.legal_name.trim() &&
             formData.company_type.trim()
    })

    // Methods
    const closeModal = (event) => {
      if (event.target === event.currentTarget) {
        emit('close')
      }
    }

    const validateForm = () => {
      errors.value = {}

      if (!formData.company_code.trim()) {
        errors.value.company_code = 'Company code is required'
      }

      if (!formData.company_name.trim()) {
        errors.value.company_name = 'Company name is required'
      }

      if (!formData.legal_name.trim()) {
        errors.value.legal_name = 'Legal name is required'
      }

      if (!formData.company_type.trim()) {
        errors.value.company_type = 'Company type is required'
      }

      return Object.keys(errors.value).length === 0
    }

    const resetForm = () => {
      Object.keys(formData).forEach(key => {
        if (key.includes('_id') || key === 'parent_company_id') {
          formData[key] = null
        } else {
          formData[key] = ''
        }
      })
      errors.value = {}
    }

    const populateForm = () => {
      if (props.company) {
        Object.keys(formData).forEach(key => {
          if (props.company[key] !== undefined) {
            formData[key] = props.company[key]
          }
        })
      }
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        toast.warning('Please fill in all required fields', {
          timeout: 3000,
          icon: '⚠️'
        })
        return
      }

      loading.value = true

      try {
        // Prepare data for API
        const submitData = { ...formData }
        
        // Convert empty strings to null for optional fields
        Object.keys(submitData).forEach(key => {
          if (key.includes('_id') || key === 'parent_company_id') {
            if (submitData[key] === '') {
              submitData[key] = null
            }
          }
        })

        let result
        if (isEdit.value) {
          result = await AccountingApiService.updateCompany(props.company.id, submitData)
        } else {
          result = await AccountingApiService.createCompany(submitData)
        }

        if (result.success) {
          const actionText = isEdit.value ? 'updated' : 'created'
          toast.success(`Company "${formData.company_name}" has been ${actionText} successfully!`, {
            timeout: 4000,
            icon: '✅'
          })
          emit('success', result.data)
          emit('close')
        } else {
          const errorMessage = result.error || 'Unknown error occurred'
          const actionText = isEdit.value ? 'update' : 'create'
          toast.error(`Failed to ${actionText} company: ${errorMessage}`, {
            timeout: 5000,
            icon: '❌'
          })
        }
      } catch (error) {
        console.error('Error saving company:', error)
        const actionText = isEdit.value ? 'update' : 'create'
        let errorMessage = 'Unknown error occurred'
        
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error
        } else if (error.message) {
          errorMessage = error.message
        }
        
        toast.error(`Failed to ${actionText} company: ${errorMessage}`, {
          timeout: 5000,
          icon: '❌'
        })
      } finally {
        loading.value = false
      }
    }

    // Watchers
    watch(() => props.company, () => {
      if (props.company) {
        populateForm()
      } else {
        resetForm()
      }
    }, { immediate: true })

    // Lifecycle
    onMounted(() => {
      if (props.company) {
        populateForm()
      }
    })

    return {
      isVisible,
      loading,
      errors,
      formData,
      isEdit,
      isFormValid,
      closeModal,
      handleSubmit
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
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
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
  margin: 0;
  opacity: 0.9;
  font-size: 0.875rem;
}

.close-btn {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.company-form {
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f3f4f6;
}

.section-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.section-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.form-label.required::after {
  content: '*';
  color: #ef4444;
  font-weight: 700;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: #fafafa;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:hover:not(:focus) {
  border-color: #d1d5db;
  background: white;
}

.form-input.error {
  border-color: #ef4444;
  background: #fef2f2;
}

.form-input::placeholder {
  color: #9ca3af;
}

.error-text {
  font-size: 0.75rem;
  color: #ef4444;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.error-text::before {
  content: '⚠';
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
  justify-content: center;
}

.btn svg {
  width: 1rem;
  height: 1rem;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover:not(:disabled) {
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
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
  .modal-container {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }

  .modal-header {
    padding: 1.5rem;
  }

  .company-form {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
}
</style>