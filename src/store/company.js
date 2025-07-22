import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { companyAPI, handleAPIError } from '@/config/api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    isLoading: false,
    companies: [],
    currentCompany: null,
    error: null,
    registrationStep: 1,
    registrationData: {
      // Step 1: Basic Information
      company_code: '',
      company_name: '',
      legal_name: '',
      company_type: '',
      
      // Step 2: Financial Configuration
      parent_company_id: null,
      functional_currency_id: null,
      reporting_currency_id: null,
      consolidation_method: '',
      
      // Step 3: Address & Legal Information
      address: '',
      tax_id: '',
      registration_number: ''
    }
  }),

  getters: {
    isStepOneValid: (state) => {
      return !!(
        state.registrationData.company_code &&
        state.registrationData.company_name &&
        state.registrationData.legal_name &&
        state.registrationData.company_type
      )
    },
    
    isStepTwoValid: (state) => {
      return !!(
        state.registrationData.consolidation_method
        // parent_company_id, functional_currency_id, reporting_currency_id can be null
      )
    },
    
    isStepThreeValid: (state) => {
      return !!(
        state.registrationData.address &&
        state.registrationData.tax_id &&
        state.registrationData.registration_number
      )
    },
    
    canProceedToNextStep: (state) => {
      switch (state.registrationStep) {
        case 1: {
          return state.isStepOneValid
        }
        case 2: {
          return state.isStepTwoValid
        }
        case 3: {
          return state.isStepThreeValid
        }
        default:
          return false
      }
    },
    
    getCompletionPercentage: (state) => {
      const totalSteps = 3
      return Math.round((state.registrationStep - 1) / totalSteps * 100)
    }
  },

  actions: {
    // Reset registration data
    resetRegistration() {
      this.registrationStep = 1
      this.registrationData = {
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
      }
      this.error = null
    },

    // Navigation methods
    nextStep() {
      if (this.registrationStep < 3) {
        this.registrationStep++
      }
    },

    previousStep() {
      if (this.registrationStep > 1) {
        this.registrationStep--
      }
    },

    goToStep(step) {
      if (step >= 1 && step <= 3) {
        this.registrationStep = step
      }
    },

    // Update registration data
    updateRegistrationData(data) {
      this.registrationData = { ...this.registrationData, ...data }
    },

    // Validate step data
    validateCurrentStep() {
      const toast = useToast()
      
      switch (this.registrationStep) {
        case 1:
          if (!this.registrationData.company_code) {
            toast.error('Company code is required', { icon: '⚠️' })
            return false
          }
          if (!this.registrationData.company_name) {
            toast.error('Company name is required', { icon: '⚠️' })
            return false
          }
          if (!this.registrationData.legal_name) {
            toast.error('Legal name is required', { icon: '⚠️' })
            return false
          }
          if (!this.registrationData.company_type) {
            toast.error('Company type is required', { icon: '⚠️' })
            return false
          }
          break
          
        case 2:
          if (!this.registrationData.consolidation_method) {
            toast.error('Consolidation method is required', { icon: '⚠️' })
            return false
          }
          break
          
        case 3:
          if (!this.registrationData.address) {
            toast.error('Address is required', { icon: '⚠️' })
            return false
          }
          if (!this.registrationData.tax_id) {
            toast.error('Tax ID is required', { icon: '⚠️' })
            return false
          }
          if (!this.registrationData.registration_number) {
            toast.error('Registration number is required', { icon: '⚠️' })
            return false
          }
          break
      }
      
      return true
    },

    // Create company
    async createCompany() {
      const toast = useToast()
      this.isLoading = true
      this.error = null

      try {
        // Validate all steps before submitting
        if (!this.isStepOneValid) {
          toast.error('Please complete step 1 correctly', { icon: '⚠️' })
          this.registrationStep = 1
          return { success: false, error: 'Step 1 validation failed' }
        }

        if (!this.isStepTwoValid) {
          toast.error('Please complete step 2 correctly', { icon: '⚠️' })
          this.registrationStep = 2
          return { success: false, error: 'Step 2 validation failed' }
        }

        if (!this.isStepThreeValid) {
          toast.error('Please complete step 3 correctly', { icon: '⚠️' })
          this.registrationStep = 3
          return { success: false, error: 'Step 3 validation failed' }
        }

        // Show loading toast
        toast.info('Creating your company...', {
          timeout: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          icon: '🏢'
        })

        // Prepare payload according to API specification
        const payload = {
          company_code: this.registrationData.company_code.trim(),
          company_name: this.registrationData.company_name.trim(),
          legal_name: this.registrationData.legal_name.trim(),
          company_type: this.registrationData.company_type,
          parent_company_id: this.registrationData.parent_company_id || null,
          functional_currency_id: this.registrationData.functional_currency_id || null,
          reporting_currency_id: this.registrationData.reporting_currency_id || null,
          consolidation_method: this.registrationData.consolidation_method,
          address: this.registrationData.address.trim(),
          tax_id: this.registrationData.tax_id.trim(),
          registration_number: this.registrationData.registration_number.trim()
        }

        console.log('Creating company with payload:', payload)

        const result = await companyAPI.create(payload)

        toast.dismiss() // Clear loading toast

        console.log('Company creation result received:', result)

        if (result.success) {
          this.currentCompany = result.data
          
          // Show success toast with animation
          toast.success(`🎉 Company "${payload.company_name}" created successfully!`, {
            timeout: 8000,
            icon: '✅',
            position: 'top-center'
          })

          // Additional success notification
          setTimeout(() => {
            toast.info('Redirecting to dashboard...', {
              timeout: 3000,
              icon: '🚀'
            })
          }, 2000)

          // Reset registration data
          this.resetRegistration()

          return { success: true, data: result.data }
        } else {
          // Handle API failure - properly extract error message
          let errorMessage = 'Company creation failed'
          
          if (result.error) {
            if (typeof result.error === 'string') {
              errorMessage = result.error
            } else if (typeof result.error === 'object') {
              // Handle different error object structures
              if (result.error.detail) {
                errorMessage = String(result.error.detail)
              } else if (result.error.message) {
                errorMessage = String(result.error.message)
              } else if (result.error.non_field_errors) {
                errorMessage = Array.isArray(result.error.non_field_errors) 
                  ? result.error.non_field_errors.join(', ')
                  : String(result.error.non_field_errors)
              } else {
                // Extract field validation errors
                const fieldErrors = Object.keys(result.error)
                  .filter(key => key !== 'success')
                  .map(field => {
                    const fieldError = Array.isArray(result.error[field]) 
                      ? result.error[field].join(', ') 
                      : String(result.error[field])
                    return `${field}: ${fieldError}`
                  })
                
                if (fieldErrors.length > 0) {
                  errorMessage = fieldErrors.join('; ')
                } else {
                  try {
                    errorMessage = JSON.stringify(result.error, null, 2)
                  } catch (e) {
                    errorMessage = 'Unknown error format received from server'
                  }
                }
              }
            }
          }
          
          console.error('API returned error:', errorMessage)
          console.error('Original error object:', result.error)
          
          this.error = errorMessage
          toast.error(`Company creation failed: ${errorMessage}`, {
            timeout: 8000,
            icon: '❌'
          })
          
          return { success: false, error: errorMessage }
        }
      } catch (error) {
        console.error('Company creation error:', error)
        console.error('Error type:', typeof error)
        console.error('Error keys:', error ? Object.keys(error) : 'null')
        
        // Ensure error is properly converted to string
        let errorMessage = 'Failed to create company'
        
        if (error instanceof Error) {
          errorMessage = error.message
        } else if (typeof error === 'string') {
          errorMessage = error
        } else if (typeof error === 'object' && error !== null) {
          try {
            // Try to extract meaningful error message
            if (error.message) {
              errorMessage = String(error.message)
            } else if (error.error) {
              errorMessage = String(error.error)
            } else {
              errorMessage = JSON.stringify(error, null, 2)
            }
          } catch (e) {
            console.error('Failed to stringify error:', e)
            errorMessage = 'Unknown error occurred during company creation'
          }
        }
        
        console.log('Final error message:', errorMessage)
        
        this.error = errorMessage
        
        toast.dismiss() // Clear any existing toasts
        
        // Enhanced error handling
        toast.error(`Company creation failed: ${errorMessage}`, {
          timeout: 8000,
          icon: '❌'
        })
        
        return { success: false, error: errorMessage }
      } finally {
        this.isLoading = false
      }
    },

    // Fetch companies list
    async fetchCompanies() {
      const toast = useToast()
      this.isLoading = true
      
      try {
        const result = await companyAPI.list()
        
        if (result.success) {
          this.companies = result.data
          return { success: true, data: result.data }
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        console.error('Fetch companies error:', error)
        this.error = error.message
        handleAPIError(error.message, toast)
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    // Generate company code suggestion
    generateCompanyCode() {
      if (this.registrationData.company_name) {
        const name = this.registrationData.company_name.trim().toUpperCase()
        const words = name.split(' ')
        
        if (words.length === 1) {
          // Single word: take first 3 characters + 001
          this.registrationData.company_code = words[0].substring(0, 3) + '001'
        } else {
          // Multiple words: take first letter of each word + 001
          const initials = words.map(word => word.charAt(0)).join('')
          this.registrationData.company_code = initials.substring(0, 3) + '001'
        }
      }
    },

    // Clear errors
    clearError() {
      this.error = null
    }
  }
})
